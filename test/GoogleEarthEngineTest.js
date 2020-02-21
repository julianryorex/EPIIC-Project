/*
Full script can be found here: 
https://code.earthengine.google.com/?scriptPath=users%2Fgibbedboy%2FGPMv6_Test%3ANASA_GPM_L3_IMERG_V06
Not sure how to get running on REACT yet.
*/
var ee = require('@google/earthengine');

// GPM V6 on 2020-1-01, in Bozeman
var bozemanPoint = ee.Geometry.Point(111, 45);

// Init 1st image composite (1st Week of Jan, 2019)
var week1 = ee.Date('2019-01-01').getRange('day');
var dataset1 = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filterBounds(ee.Geometry.Point(111, 45))
    .filter(ee.Filter.date(week1));
    
// Init 2nd image composite (2nd Week of Jan, 2020)
var week2 = ee.Date('2020-01-01').getRange('day');
var dataset2 = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filterBounds(ee.Geometry.Point(111, 45))
    .filter(ee.Filter.date(week2));

// Select the max preciptation
var precip1 = dataset1.select('precipitationCal');
var precip2 = dataset2.select('precipitationCal');
//var mask = precipitation.gt(0.0);
//var precipitation = precipitation.updateMask(mask);

// This doesn't actually work, need to reduce the image collection into a single image first.
var precipDiff = precip1.subtract(precip2);

// Init Visualization Styling
/*
var palette = [
  'DarkBlue','MediumBlue', 'Blue', 'ForestGreen', 'SpringGreen',
  'Yellow', 'Orange', 'OrangeRed', 'Red', 'DarkRed'
];
*/
var palette = [
  'DarkRed', 'Green', 'Dark Blue'
];

var precipitationVis = {
  min: -10, 
  max: 20, 
  palette: palette, 
  opacity: .75};

// Add layer to map
Map.addLayer({
  eeObject: precipDiff,
  name: "Precipitation Difference",
  visParams: precipitationVis
});
Map.setCenter(-111, 45, 6);