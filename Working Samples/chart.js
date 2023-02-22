// Initializes the page with a default plot
// json url
console.log(cities);

function init() {
  
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
  // console.log(data);

  // for (var i=0;i<data.length;i++){
      lat=[(data.location['lat'])];
      console.log(lat);
      let hum=[(data.current['humidity'])];
      console.log(hum);
      data1 = [{
    x: [lat],
    y: [hum],
}];
  Plotly.newPlot("plot",data1);

}});
};
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  let x = [];
  let y = [];

  if (dataset === 'dataset1') {
    x=[lat],
    y=[hum];
  }


  else if (dataset === 'dataset2') {
    // x = [10, 20, 30, 40, 50];
    // y = [1, 10, 100, 1000, 10000];
    d3.json(options.url).then(function(data) {
      // console.log(data);
        // let hum=[];
        if (data.location['country'] === 'Canada') {
        // hum.push(data.condition['humidity']);
        pres=[(data.current['pressure_in'])];
          x = [lat],
          y= [pres];
      
        // console.log(city);
      }
      });
      };
  

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

init();
