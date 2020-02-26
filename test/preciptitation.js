// GPM V6.precipitationCal band between two dates, in Montana
 /*
    Script for running Google EE. It requires the Google Earth Engine js API to be installed.
    Will eventually need date strings input from user. For now using placeholders.
*/

var ee = require('@google/earthengine');

function determinePrecipt(/* StartDate, EndDate */){
    var boundingBox = ee.Geometry.Rectangle([-114.3837890625, 43.4611329335764, -107.407470703125, 54709399579075]);
    var boundsFilter = ee.Filter.bounds(boundingBox);

    // Init 1st image composite (1st Week of Jan, 2019)
    var week1 = ee.Date('2019-02-01').getRange('week');
    var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
        .filterBounds(boundingBox)
        .filter(ee.Filter.date(week1));
    print (dataset);

    // Make a composite image out of the filtered set, and mask out anything above a certain amount.
    var precip = dataset.select('precipitationCal').mosaic();
    var mask = precip.lt(10);
    var precipitation = precip.updateMask(mask);
    print (precipitation);

    // Init Visualization Styling

    var colors = [
    '000096','0064ff', '00b4ff', '33db80', '9beb4a',
    'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
    ];
    var precipVis = {
    min: 0, 
    max: 10, 
    palette: colors, 
    opacity: .75
    };

    // Add layer to map
    Map.addLayer({
    eeObject: precip,
    name: "Precipitation",
    visParams: precipVis
    });

    // Export the image
    // Load a landsat image and select three bands.
    var landsat = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_123032_20140515')
    .select(['B4', 'B3', 'B2']);

    // Create a geometry representing an export region.
    var geometry = ee.Geometry.Rectangle([116.2621, 39.8412, 116.4849, 40.01236]);

    // Export the image, specifying scale and region.
    Export.image.toDrive({
    image: precip,
    description: 'Precipitation',
    scale: 100,
    region: boundingBox
    });
}

