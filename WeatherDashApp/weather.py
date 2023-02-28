from flask import Flask, request, render_template, jsonify, g
import sqlite3
import plotly
import requests
import json
import plotly.graph_objs as go
import plotly.express as px
import plotly.offline as pyo

app = Flask(__name__)

DATABASE = "weather.db"


# create database
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


with app.app_context():
    conn = get_db()
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS weather
                 (id  PRIMARY KEY,
                  country TEXT,
                  city TEXT,
                  date TEXT,
                  temp FLOAT,
                  weather TEXT,
                  icon TEXT)"""
    )
    conn.commit()


# insert data into database
def insert_data(country, city, date, temp, weather, icon):
    with app.app_context():
        conn = get_db()
        c = conn.cursor()
        c.execute(
            "INSERT INTO weather (country, city, date, temp, weather, icon) VALUES (?, ?, ?, ?, ?, ?)",
            (country, city, date, temp, weather, icon),
        )
        conn.commit()

# get data from api and insert into database
def get_weather_data(country, city, days):
    
    days = days + 1
    
    with open('api_key.txt', 'r') as file:
        api_key = file.read().strip()

    url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city},{country}&days={days}"

    response = requests.get(url)
    print(response)

    data = json.loads(response.text)

    for day in data["forecast"]["forecastday"]:
        date = day["date"]
        temp = day["day"]["avgtemp_c"]
        weather = day["day"]["condition"]["text"]
        icon = day["day"]["condition"]["icon"]

        # check if data for given country and city is already in database
        with app.app_context():
           conn = get_db()
           c = conn.cursor()
           c.execute(
            "SELECT COUNT(*) FROM weather WHERE country= ? AND city= ? AND date = ?", (country, city, date)
           )
        
           count = c.fetchone()[0]

        if count == 0:
            # if data not in database
            # get data from api and insert into database
            insert_data(country, city, date, temp, weather, icon)


# get data from database
def get_data(country, city, days):
    with app.app_context():
        conn = get_db()
        c = conn.cursor()
        c.execute(
            "SELECT * FROM weather WHERE country=? AND city=? AND date>= date('now') ORDER BY date ASC LIMIT ?",
            (country, city, days),
        )
        data = c.fetchall()
        return data


# home page
@app.route("/", methods=["GET"])
def home():
    # get countries from database
    with app.app_context():
        conn = get_db()
        c = conn.cursor()
        c.execute("SELECT DISTINCT country FROM cities")
        countries = [row[0] for row in c.fetchall()]

        # get cities from database
        c.execute("SELECT DISTINCT city FROM cities")
        cities = [row[0] for row in c.fetchall()]
    return render_template("index.html", countries=countries, cities=cities)


def generate_chart(
    data,
    x_column_idx,
    y_column_idx,
    chart_title,
    x_axis_title,
    y_axis_title,
    chart_type,
):
    if chart_type == "line":
        # Create traces for a line chart
        trace = go.Scatter(
            x=[row[x_column_idx] for row in data],
            y=[row[y_column_idx] for row in data],
            mode="lines",
            name=y_axis_title,
        )
        layout = go.Layout(
            title=chart_title,
            xaxis=dict(title=x_axis_title),
            yaxis=dict(title=y_axis_title),
        )
        fig = go.Figure(data=[trace], layout=layout)

    elif chart_type == "scatter":
        # Create traces for a scatter chart
        traces = []
        for row in data:
            trace = go.Scatter(
                x=[row[x_column_idx]],
                y=[row[y_column_idx]],
                mode="markers",
                marker_size=10,
                name=row[x_column_idx],
            )
            traces.append(trace)
        layout = go.Layout(
            title=chart_title,
            xaxis=dict(title=x_axis_title),
            yaxis=dict(title=y_axis_title),
        )
        fig = go.Figure(data=traces, layout=layout)

    elif chart_type == "pie":
        # Create data for a pie chart
        labels = [row[x_column_idx] for row in data]
        values = [row[y_column_idx] for row in data]
        fig = px.pie(
            names=labels,
            values=values,
            title=chart_title,
        )

    # Return the Plotly chart as an HTML div
    chart_div = pyo.plot(fig, output_type="div", include_plotlyjs=False)

    return chart_div


@app.route("/dashboard", methods=["POST"])
def dashboard():

    country = request.form.getlist("country")[0]
    city = request.form.getlist("city")[0]
    days = int(request.form.getlist("days")[0])

    
    # get weather data from API
    get_weather_data(country, city, days)

    # get data from database
    data = get_data(country, city, days)

    # create charts
    temp_chart = generate_chart(
      data,
      3,
      4,
    "Temperature Over Time",
    "Date",
    "Temperature (C)",
    "line",
    )

    weather_chart = generate_chart(
     data,
     3,
     5,
     "Weather Condition Over Time",
     "Date",
     "Weather Condition",
     "scatter",
    )

    # get unique weather conditions
    unique_conditions = set([row[5] for row in data])

    weather_counts = []
    for condition in unique_conditions:
        count = sum([row[5] == condition for row in data])
        weather_counts.append((condition, count))

    weather_pie_chart = generate_chart(
        weather_counts,
        0,
        1,
        "Weather Condition Counts",
        "",
        "",
        "pie",
    )

    # render dashboard template with charts
    return render_template(
        "dashboard.html",
        temp_chart_form=temp_chart,
        weather_chart=weather_chart,
        weather_pie_chart=weather_pie_chart,
    )

if __name__ == "__main__":
    app.run(debug=True)