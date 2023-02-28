// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
  center: [58.35, -106.34],
  zoom: 3
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// var element = "temp_c"

for(var i=0;i<cities.length;i++){
  // console.log(cities.length);
  row=cities[i];
  let bulk=row.city
  const options = {
    method: 'GET',
    url:`http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&.json`
  };
  doit(options);
};
// Fetch the JSON data and console log it
function doit(options){
  d3.json(options.url).then(function(data) {
  if (data.location['country'] === 'Canada') {
      let thismarker = L.marker([data.location.lat, data.location.lon])
      .bindTooltip(data.location.name,{permanent: true,
      direction: 'right'}
    ).addTo(myMap);
    d3.selectAll("#selDataset").on("change", getData);
  function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    element = dataset
  for(var i=0;i<cities.length;i++){
      row=cities[i];
      let bulk=row.city
      const options = {
        method: 'GET',
        url:`http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&.json`
      };

        d3.json(options.url).then(function(data) {
          console.log(element)
          console.log(data.current)
          console.log(data.current[element])
          if (data.location['country'] === 'Canada') {
          thismarker.bindPopup(`<h4> ${data.current[element]} </h4>`).addTo(myMap);
          }
        });
          
  }

  }
  }
    
  }).catch(error => console.error(error));
}


