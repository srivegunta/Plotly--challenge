//=============== RUNNING DATA ===============//
d3.json("samples.json").then(data => {
    console.log(data);
  });
  
  
  //=============== SAMPLE METADATA FUNCTION ===============//
  function buildMetadata (newSelection) {
    d3.json("samples.json").then(data => {
      var metadata = data.metadata; 
      var filtered = metadata.filter(row => row.id == newSelection)[0];
      var demoInfo = d3.select("#sample-metadata");
      demoInfo.html("");
      Object.entries(filtered).forEach(([key,value]) => {
        demoInfo.append("h6").text(`${key}: ${value}`);
      });
    });
  };
  
  
  // //=============== INIT FUNCTION ===============//
  function init () {
    d3.json("samples.json").then(data => {
      console.log(data);
      var IDs = d3.select("#selDataset");
      var IDsValues = data.names;
      IDsValues.forEach(id => {
        IDs.append("option").text(id).property("value", id);
      })
    });
  }
    
  
  //=============== BAR CHART ===============//
  function buildCharts (newSelection) {
    d3.json("samples.json").then(data => {
      var samples = data.samples;
      var filtered = samples.filter(row => row.id == newSelection)[0];
      var otu_ids = filtered.otu_ids
      var sample_values = filtered.sample_values
      var otu_labels = filtered.otu_labels
      var otuidTicks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
      var barTrace = {
        x: sample_values.slice(0, 10).reverse(),
        y: otuidTicks,
        text: otu_labels.slice(0, 10).reverse(),
        name: "OTU names",
        type: "bar",
        orientation: "h"
      };
  
      // data
      var barData = [barTrace];
  
      // Apply the group bar mode to the layout
      var barLayout = {
        title: "Top Ten OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
  
  
        //=============== BUBBLE CHART ===============//
      var bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values,
        }
      };
  
      var bubleData = [bubbleTrace];
  
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        showlegend: false,
        height: 600,
        width: 600
      };
  
      Plotly.newPlot('bubble', bubleData, bubbleLayout);
  
    });
  }
  
  
  //=============== OPTION CHANGED ===============//
  // Fetch new data each time a new sample is selected 
  function optionChanged (newSelection) {
    buildCharts(newSelection);
    buildMetadata(newSelection);
  }
    
  
  //=============== CALLING THE INIT FUNCTION ===============//
  init();