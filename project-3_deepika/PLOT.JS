function init(){
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("cities.json").then(data) ; {
        row=cities[i];
        let bulk=row.city
        const options = {
        method: 'GET',
        url:`http://api.weatherapi.com/v1/current.json?key=8bbf0a19d81e45b9b84230143231602 &q=${bulk}&.json`
      };
      doit(options);
    };

      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Create the trace for the bubble chart.
      let bubbleData = [{
        x: otu_ids ,
        y: sample_values ,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Blues"
        }
      }];
  
      // Create the layout for the bubble chart.
      let bubbleLayout = {
        title: "air pressure for 5 days",
        xaxis: {title:"AIR PRESSURE"},
        // hovermode = otu_labels
      };
  
      // Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
      });

    }