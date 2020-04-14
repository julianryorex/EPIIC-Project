/*
Gets a very rough reading of NDVI (Normalized Difference Vegetation Index), plots it out, and graphs out a linear line to show us a trend. 
Haven't figured out how to export the graph yet.

How NDVI is calculated, and why TL;DR
Plants absorb lots of red light, and reflect lots of near-infrared light. 
So if we take a ratio of:
NDVI = (red light - near-infrared light)/(red light + near-infrared light)
we can measure fairly accurately vegetation.
*/

const express = require("express");
const app = express();
var ee = require('@google/earthengine');
const PRIVATE_KEY = process.env.PRIVATE_KEY || require("../privatekey.json");

app.get("/", (req, res) => {
	res.send("Inside timeSeriesTest.js file.\n");
	
  console.log('Printing a graph measuring vegetation density based on NDVI');
  
  // This field contains UNIX time in milliseconds to get the current date.
  var timeField = 'system:time_start';
  // Initialize 
  var l8sr = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").filter(ee.Filter.date('2018-01-01', '2020-01-01'));;
  var roi = ee.Geometry.Point(111,45);


  /* 
  Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
  Clouds can give us very inaccurate readings of NDVI because we're reading clouds not vegetation.
  So we mask out clouds, and only take data if we have clear skies. 
  */
  function maskL8sr(image) {
    // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = 1 << 3;
    var cloudsBitMask = 1 << 5;
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
        .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    // Return the masked image, scaled to reflectance, without the QA bands.
    return image.updateMask(mask).divide(10000)
        .select('B[0-9]*')
        .copyProperties(image, ['system:time_start']);
  }

  // Use this function to add variables for NDVI, time and a constant
  // to Landsat 8 imagery.
  var addVariables = function(image) {
    // Compute time in fractional years since 2019.
    var date = ee.Date(image.get(timeField));
    var years = date.difference(ee.Date('2019-01-01'), 'year');
    // Return the image with the added bands.
    return image
      // Add an NDVI band.
      .addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI'))
      // Add a time band.
      .addBands(ee.Image(years).rename('t'))
      .float()
      // Add a constant band.
      .addBands(ee.Image.constant(1));
  };

  // Remove clouds, add variables and filter to the area of interest.
  var filteredLandsat = l8sr
    .filterBounds(roi)
    .map(maskL8sr)
    .map(addVariables);
    
  // ui.chart API call only works in code-editor, and not in the JavaScript client libraries
  /*
  //Plot a time series of NDVI at a single location.
  var l8Chart = ui.Chart.image.series(filteredLandsat.select('NDVI'), roi)
      .setChartType('ScatterChart')
      .setOptions({
        title: 'Landsat 8 NDVI time series at ROI',
        trendlines: {0: {
          type: 'exponential',
          visibleInLegend: true,
          color: 'CC0000'
        }},
        lineWidth: 1,
        pointSize: 3,
      });   
  print(l8Chart);
  */
});