// json url
// console.log(cities);
var city=[];
var temp =[];
var pres=[];
var hum =[];
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
        city.push(data.location['name']);
        temp.push(data.current['temp_c']);
        pres.push(data.current['pressure_in']);
        hum.push(data.current['humidity']);
        
        }
        // console.log(city);
        // console.log(temp);
        // console.log(pres);
        // console.log(hum);
        // initialize function to pull city names
function init() {
    let selector = d3.select("#selDataset");
    // retrieve JSON data
    let sampleNames=city;
    // console.log(sampleNames);
    sampleNames.forEach((sample) =>{
                selector
                .append("option")
                .text(sample)
                .property("value",sample)
            });
            var firstSample = sampleNames[0];
            buildCharts(firstSample);
            buildMetadata(firstSample);


function buildCharts(sample) {
    // variables for charts
    var sampleValuesSlice = temp.slice(0,10).reverse();
    var samplecityname=city.slice(0,10).reverse();
    // console.log(sampleValuesSlice);
    // console.log(samplecityname);
    //----------------------------------------------//
   //----------------------------------------------//
// // Trace1 for the city Data
let trace1 = {
  x: sampleValuesSlice,
  y: samplecityname,
  text: sampleValuesSlice,
  name: "Canadian Cities",
  type: "bar",
  orientation: "h"
};

// Data array

let traceData = [trace1];

// Apply a title to the layout
let layout = {
  title: "Top Ten-City Temperature",
  
};

Plotly.newPlot("plot", traceData, layout);

    //---------------------------------------------------------//
    //----------------------------------------------------------//
                // Building  a bubble chart//
        // var firsttrace = {
        //     x: otuIds,
        //     y: sampleValues,
        //     mode: "markers",
        //     marker: {
        //         size: sampleValues,
        //         color: otuIds,
        //         colorscale: "Earth"
        //     },
        //     text: otuIds
        // };
        // var bubdata = [firsttrace];
        // var bublayout = {title: "Bacteria Cultures Per Sample",
        // xaxis: {title:"OTU ID"},
        // // hovermode = otu_labels
        //     showlegend: false
        // };

        // Plotly.newPlot("bubble", bubdata, bublayout);
    };
};
    // call initialize function to run
init();





























init();
});
};




