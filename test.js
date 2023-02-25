console.log(cities);

// names of cities in Canada
names = cities.map(function (row){
  return row.city
});

// Trace for the Canadian cities data
let trace1 = {
    x: cities.map(row => row.city),
    y: cities.map(row => row.pop2023),
    type: "bar"
    // orientation: 'h'
    
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: "Populations by Canadian Cities"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);
