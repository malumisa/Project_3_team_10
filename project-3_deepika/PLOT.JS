// Create an array of each country's numbers
let Toronto = Object.values(cities.Toronto);
let Montreal = Object.values(cities.Montreal);
let ottawa = Object.values(cities.ottawa);
let Quebec= Object.values(data.Quebec);
let Vancouver = Object.values(data.Vancouver);
let London = Object.values(data.London);

// Create an array of category labels
let labels = Object.keys(data.Toronto);

// Display the default plot
function init() {
  let data = [{
    values: Toronto,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'Toronto') {
      data = Toronto;
  }
  else if (dataset == 'Montreal') {
      data = Montreal;
  }
  else if (dataset == 'ottawa') {
      data = ottawa;
  }
  else if (dataset == 'Quebec') {
    data = Quebec;
  }
  else if (dataset == 'Vancouver') {
      data = Vancouver;
  }
  else if (dataset == 'London') {
    data = London;
  }
// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();


