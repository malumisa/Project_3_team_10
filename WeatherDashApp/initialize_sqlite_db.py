import sqlite3
import csv

conn = sqlite3.connect('weather.db')
c = conn.cursor()

conn.execute('''CREATE TABLE IF NOT EXISTS cities
               (id INTEGER PRIMARY KEY,
                city TEXT,
                country TEXT,
                pop2023 INTEGER,
                latitude REAL,
                longitude REAL,
                fill TEXT);''')

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


# Replace the file path with the path to your CSV file
file_path = "cities.csv"

# Open the CSV file and read its contents
with open(file_path) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Insert each row into the database
        conn.execute('''INSERT INTO cities
                        (id, city, country, pop2023, latitude, longitude, fill)
                        VALUES (:id, :city, :country, :pop2023, :latitude, :longitude, :fill);''',
                     {'id': row['id'], 'city': row['city'], 'country': row['country'],
                      'pop2023': row['pop2023'], 'latitude': row['latitude'], 
                      'longitude': row['longitude'], 'fill': row['fill']})


conn.commit()
conn.close()
