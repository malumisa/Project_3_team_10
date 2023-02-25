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
    var leafIcon = L.icon({
      iconUrl: 'image.png',
      iconSize: [10, 24],
      // iconAnchor: [22, 94],
      // popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
      });
      var marker = L.marker([data.location.lat, data.location.lon], {icon: leafIcon}).addTo(myMap);
      // var select = document.getElementById("selDataset2");
      // let cityname = data.location['name']
      // el = document.createElement("option");
      // el.textContent = cityname;
      // el.value = cityname;
      // select.appendChild(el);
      
    d3.selectAll("#selDataset").on("change", getData);
    // d3.selectAll("#selDataset2").on("change", getData2);
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
          console.log(data)
          if (data.location['country'] === 'Canada') {
            marker = L.marker([data.location.lat, data.location.lon],{icon: leafIcon})
            tooltip = L.tooltip()
            .setLatLng([data.location.lat, data.location.lon])
            .setContent(`<h6> ${data.current[element]} </h6>`).addTo(myMap);
            marker.bindPopup(`<h4> ${data.location["name"]} </h4>`).openPopup().addTo(myMap);
          }
        });
          
  }

  }
  }
    
  }).catch(error => console.error(error));
}


