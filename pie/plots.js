// Create an array of each city's numbers
hum=[];
pres=[];
wind=[]
windd=[];
humv=[];
presv=[];
windv=[]
winddv=[];
Toronto={};
Oakville={};
Winnipeg={};
Mississauga={};
Calgary={};
Ottawa={};
Brampton={};
Montreal={};
Quebec={};
Vancouver={};
labels = ["humidity","pressure","wind speed","Wind degree"];
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
    
if (data.location['name'] === 'Toronto') {
  // console.log(data)
  // let labels = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Toronto[labels[i]] = values[i];
    // Create an array of category labels
    
  }
  // console.log(Object.values(Toronto))
  // console.log(labels)
  
  
}

else if(data.location['name'] === 'Oakville'){
  // let Oakville ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
      Oakville[labels[i]] = values[i];
  
  }
  // console.log(Oakville)
}
else if(data.location['name'] === 'Calgary'){
  // let Calgary ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Calgary[labels[i]] = values[i];
  
  }
// console.log(Calgary)
}

else if(data.location['name'] === 'Brampton'){
  // let Brampton ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Brampton[labels[i]] = values[i];
  
  }
// console.log(Brampton)
}
else if(data.location['name'] === 'Montreal'){
  // let Montreal ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Montreal[labels[i]] = values[i];
  
  }
// console.log(Montreal)
}
else if(data.location['name'] === 'Ottawa'){
  // let Ottawa ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Ottawa[labels[i]] = values[i];
  
  }
// console.log(Ottawa)
}

else if(data.location['name'] === 'Mississauga'){
  // let Mississauga ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Mississauga[labels[i]] = values[i];
  
  }
// console.log(Mississauga)
}

else if(data.location['name'] === 'Winnipeg'){
  // let Winnipeg ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Winnipeg[labels[i]] = values[i];
  
  }
// console.log(Winnipeg)
}

else if(data.location['name'] === 'Vancouver'){
  // let Vancouver ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Vancouver[labels[i]] = values[i];
  
  }
// console.log(Vancouver)
}

else if(data.location['name'] === 'Quebec'){
  // let Quebec ={};
  // let keys = ["humidity","pressure","wind speed","Wind degree"];
  let values = [data.current['humidity'],data.current['pressure_in'],data.current['wind_kph'],data.current['wind_degree']];
  for (let i = 0; i < labels.length; i++) {
    Quebec[labels[i]] = values[i];
  
  }
// console.log(Quebec)

}
   

// Display the default plot
function init() {
  let data = [{
    values: Object.values(Toronto),
    labels: Object.keys(Toronto),
    type: "pie"
  }];

  let layout = {
    height: 650,
    width: 1000
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
    let toronto= Object.values(Toronto);
      data = toronto;
  }
  else if (dataset == 'Oakville') {
    let oakville= Object.values(Oakville);
      data = oakville;
  }

  else if (dataset == 'Quebec') {
    let quebec= Object.values(Quebec);
    data = quebec;
  }

  else if (dataset == 'Winnipeg') {
    let winnipeg= Object.values(Winnipeg);
    data = winnipeg;
  }

  else if (dataset == 'Ottawa') {
    let ottawa= Object.values(Ottawa);
    data = ottawa;
  }

  
  else if (dataset == 'Montreal') {
    let montreal= Object.values(Montreal);
    data = montreal;
  }

  
  else if (dataset == 'Calgary') {
    let calgary= Object.values(Calgary);
    data = calgary;
  }

  
  else if (dataset == 'Brampton') {
    let brampton= Object.values(Brampton);
    data = brampton;
  }

  
  else if (dataset == 'Vancouver') {
    let vancouver= Object.values(Vancouver);
    data = vancouver;
  }
// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}
init();

  }
)}
