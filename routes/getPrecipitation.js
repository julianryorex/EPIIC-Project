const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var ee = require('@google/earthengine');
const PRIVATE_KEY = JSON.parse(process.env.PRIVATE_KEY) || require('../privatekey.json');

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies

app.post("/", (req, res) => {
	// validate data from external API calls

	const data = {
		startDateChange: req.body.startDate,
		endDateChange: req.body.endDate,
		datasetChange: req.body.dataset,
		firstMarkerChange: req.body.firstMarker,
		secondMarkerChange: req.body.secondMarker
	};
	
	ee.data.authenticateViaPrivateKey(PRIVATE_KEY);
	console.log("Authenticated");
	// ee.initialize();
	console.log("Initialized");
	// determinePrecipt(data);

	res.json(data);
	console.log(`Received data in backend and sent data back to frontend. \nRequest was: ${req.originalUrl}`);
	// send this data to google earth engine
});

// Creating a bounding box function
function calcBoundingBox(mapData){
	var xMin = mapData.firstMarkerChange.lng;
	var yMin = mapData.secondMarkerChange.lat;
	var xMax = mapData.secondMarkerChange.lng;
	var yMax = mapData.firstMarkerChange.lat;
	
	return ee.Geometry.Rectangle({
	  coords: [xMin, yMin, xMax, yMax],
	  geodesic: false
	});
  }

// Precipitation Analysis function
function determinePrecipt(mapData){
	var boundingBox = calcBoundingBox(mapData);
	print(boundingBox);
	var boundsFilter = ee.Filter.bounds(boundingBox);
	
	// Init 1st image composite
	var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
					.filter(ee.Filter.date(mapData.startDateChange, mapData.endDateChange))
					.select('precipitationCal');
	// Make a composite image out of the filtered set, and get the median precipitation.
	var precip = dataset.reduce(ee.Reducer.median());

	// Export the Gtiff, specifying scale and region.
	Export.image.toDrive({
		image: precip.clip(boundingBox),
		description: 'Precipitation',
		scale: 1000,
		fileDimensions: 2048,
		region: boundingBox,
	});

	// Takes EE image object's metadata, and JSON's it
	// We don't do anything with it right now.
	var precipData = precip.getInfo();
	precipData = JSON.stringify(bandNames);
}

module.exports = app;
