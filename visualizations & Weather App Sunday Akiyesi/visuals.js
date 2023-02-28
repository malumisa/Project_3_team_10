console.log(cities);
// names of cities in Canada
function init() {
names = cities.map(function (row){
  return row.city
});

// Trace for the Canadian cities data
let trace1 = {
    x: cities.map(row => row.city),
    y: cities.map(row => row.pop2023),
    type: "bar"
    
    
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: "Weather Trends in Canadian Cities"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);

};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
var citi=[];
var temp =[];
var pres=[];
var hum =[];
var wind =[];
var windd=[];
var feels_like=[];

for(var i=0;i<cities.length;i++){
        row=cities[i];
        let bulk=row.city
        const options = {
        method: 'GET',
        url:`http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&.json`
        }
        
        const dataPromise = d3.json(options.url);
        console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
        d3.json(options.url).then(function(data) {
    // console.log(data);
        
        if (data.location['country'] === 'Canada') {
            // console.log(data)
        citi.push(data.location['name']);
        // console.log(citi);
        temp.push(data.current['temp_c']);
        // console.log(temp);
        pres.push(data.current['pressure_in']);
        // console.log(pres);
        hum.push(data.current['humidity']);
        // console.log(hum);
        wind.push(data.current['wind_kph']);
        // console.log(wind);
        windd.push(data.current['wind_degree']);
        // console.log(windd);
        feels_like.push(data.current['feelslike_c']);
        // console.log(feels_like);
        
      };
    // console.log(hum);
    }
  
  );

}
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

    // Initialize x and y arrays
  
  let x = [];
  let y = [];
    if (dataset === "Cities Population") {
  x = cities.map(row => row.city);
  y = cities.map(row => row.pop2023);
  }
  
  else if (dataset === "Cities Temperatures") {
   
    x = citi;
    y = temp;
       
  }
  else if (dataset === "Cities Pressures") {
   
    x = citi;
    y = pres;
       
  }

  else if (dataset === "Cities WindSpeed") {
   
    x = citi;
    y = wind;
       
  }
  else if (dataset === "Cities Humidity") {
   
    x = citi;
    y = hum;
       
  }
  else if (dataset === "Cities Winddegree") {
   
    x = citi;
    y = windd;
       
  }

  else if (dataset === "Feels Like") {
   
    x = citi;
    y = feels_like;
       
  }

 // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

init();

