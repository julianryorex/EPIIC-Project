/*
Full script can be found here: 
https://code.earthengine.google.com/?scriptPath=users%2Fgibbedboy%2FGPMv6_Test%3ANASA_GPM_L3_IMERG_V06
Not sure how to get running on REACT yet.
*/
var ee = require('@google/earthengine');

// GPM V6 on 2020-1-14, in Bozeman for that day
var bozemanPoint = ee.Geometry.Point(111, 45);

var range = ee.Date('2020-1-14').getRange('day');
var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filter(ee.Filter.date(range));
print("dataset: ", dataset);
// Select the max preciptation and mask out low precipitation values.
var precipitation = dataset.select('precipitationCal').max();
var mask = precipitation.gt(0.3);
var precipitation = precipitation.updateMask(mask);

var palette = [
  '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
];
var precipitationVis = {min: 0.0, max: 5.0, palette: palette, opacity: .75};
Map.addLayer(precipitation, precipitationVis, 'Precipitation');
Map.setCenter(-111, 45, 9);

// Export geoTIFF
/*
Export.image.toDrive({
  image: precipitation,
  description: 'test',
  dimensions: 4000,
  region: gallatinValley
});
*/