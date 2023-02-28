

// Call updatePlotly() when a change takes place to the DOM

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
        // console.log("Data Promise: ", dataPromise);
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
    let traceData = [{
      x: temp,
      y: wind,
      text: data.location['name'],
      mode: "markers",
      marker: {
        size: hum,
        color: "green",
      }
    }];
    let layout = {
      title: "Bubble Chart",
      margin: {
        r: 50,
        l: 50,
        t: 50,
        b: 50
      }
    };  
  
   // Note the extra brackets around 'x' and 'y'
    Plotly.newPlot("plot", traceData, layout);
    d3.selectAll("#selDataset").on("change", updatePlotly);
    d3.selectAll("#selDataset2").on("change", updatePlotly2);
    d3.selectAll("#selDataset3").on("change", updatePlotly3);
    function updatePlotly() {
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.property("value");
      let x = [];
      if (dataset === "Cities Temperatures") {
         
          x = temp;
             
        }
        else if (dataset === "Cities Pressures") {
         

          x = pres;
             
        }
      
        else if (dataset === "Cities WindSpeed") {
         

          x = wind;
             
        }
        else if (dataset === "Cities Humidity") {
         

          x = hum;
             
        }
        else if (dataset === "Cities Winddegree") {
         

          x = windd;
             
        }
      
        else if (dataset === "Feels Like") {
         

          x = feels_like;
             
        }
      // console.log(x);
     // Note the extra brackets around 'x' and 'y'
      Plotly.restyle("plot", "x", [x]);
    }
    function updatePlotly2() {
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset2");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.property("value");
      let y = [];
      if (dataset === "Cities Temperatures") {
         
          y = temp;
             
        }
        else if (dataset === "Cities Pressures") {
         

          y = pres;
             
        }
      
        else if (dataset === "Cities WindSpeed") {
         

          y = wind;
             
        }
        else if (dataset === "Cities Humidity") {
         

          y = hum;
             
        }
        else if (dataset === "Cities Winddegree") {
         

          y = windd;
             
        }
      
        else if (dataset === "Feels Like") {
         

          y = feels_like;
             
        }
      // console.log(x);
     // Note the extra brackets around 'x' and 'y'
      Plotly.restyle("plot", "y", [y]);
    }
    function updatePlotly3() {
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset3");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.property("value");
      let markersize = [];
      if (dataset === "Cities Temperatures") {
         
        var update = {
          'marker.size': temp
      };
             
        }
        else if (dataset === "Cities Pressures") {
         

          var update = {
            'marker.size': pres
        };
             
        }
      
        else if (dataset === "Cities WindSpeed") {
         

          var update = {
            'marker.size': wind
        };
             
        }
        else if (dataset === "Cities Humidity") {
         

          var update = {
            'marker.size': hum
        };
             
        }
        else if (dataset === "Cities Winddegree") {
         

          var update = {
            'marker.size': windd
        };
             
        }
      
        else if (dataset === "Feels Like") {
         
          var update = {
            'marker.size': feels_like
        };
             
        }
      // console.log(x);
     // Note the extra brackets around 'x' and 'y'
     Plotly.restyle(plot, update);
    }
    


    }
  
  );

}



























































