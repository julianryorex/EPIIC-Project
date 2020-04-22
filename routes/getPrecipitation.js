const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var ee = require('@google/earthengine');
const PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies

const validInput = (req) => { // return success and msg
	let response = {
		success: true,
		msg: ""
	};

	// no parameter check
	if(!req.body.startDate || !req.body.endDate) {
		response.success = false;
		response.msg = "Missing date parameters";
	}
	else if(!req.body.dataset) {
		response.success = false;
		response.msg = "Missing dataset parameter";
	}
	else if (!req.body.firstMarker || !req.body.secondMarker) {
		response.success = false;
		response.msg = "Missing coordinate parameters";
	}

	// invalid parameter check
	else if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(req.body.startDate) || 
		!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(req.body.endDate)) {
			response.success = false;
			response.msg = "Date format is incorrect";
		}

	else if(!req.body.firstMarker.lat || !req.body.firstMarker.lng || !req.body.secondMarker.lat || !req.body.secondMarker.lng) {
		response.success = false;
		response.msg = "Coordinate format is incorrect";
	}

	else if(typeof req.body.firstMarker.lat !== 'number' || typeof req.body.firstMarker.lng !== 'number' || typeof req.body.secondMarker.lat !== 'number'
	|| typeof req.body.secondMarker.lng !== 'number') {
		response.success = false;
		response.msg = "Latitude and longitude coordinates must be of type number";
	}

	return response;
}


// Creating a bounding box function
const calcBoundingBox = (mapData) => {
	var xMin = mapData.firstMarkerChange.lng;
	var yMin = mapData.secondMarkerChange.lat;
	var xMax = mapData.secondMarkerChange.lng;
	var yMax = mapData.firstMarkerChange.lat;

	return ee.Geometry.Rectangle({
		coords: [xMin, yMin, xMax, yMax],
		geodesic: false
	});
};

// Precipitation Analysis function
const determinePrecipt = (mapData) => {
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
	return precipData;
};

async function getPrecipData() {
	let precipData;
	ee.data.authenticateViaPrivateKey(PRIVATE_KEY), () => {
		console.log("Authenticated");
		ee.initialize(() => {
			console.log("Initialized");
			
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
		});
	};
	return precipData;
};



app.post("/", async (req, res) => {

	const valid = validInput(req);

	if(!valid.success) {
		const responseData = {
			msg: valid.msg,
			success: valid.success,
			data: null
		};
		res.json(responseData);
		return;
	}

	console.log(`Request was: ${req.originalUrl}`);
	// validate data from external API calls

	const data = {
		startDateChange: req.body.startDate,
		endDateChange: req.body.endDate,
		datasetChange: req.body.dataset,
		firstMarkerChange: req.body.firstMarker,
		secondMarkerChange: req.body.secondMarker
	};
	
	/**
	 * @todo
	 * this part needs work with async calls with earth engine API
	 * since ee is async, we need to somehow send the info once we get the data from ee.
	 * was thinking to get it done using promises and .then()s but haven't gotten it to work
	 */

	let precipData = "BASE";
	precipData = await getPrecipData();
	console.log("right after precipdata");
	console.log(precipData);
	
	
	
	const responseData = {
		msg: "Precipitation Data Request",
		success: true,
		data: precipData
	};

	console.log("precipData:");
	console.log(precipData);

	res.json(responseData);
	console.log("Successfully sent precipitation data to user.");
});



module.exports = app;


// GPM V6 between two chosen dates, in Bozeman
Map.setCenter(-111, 45, 7);

// Simulate user input
var data = {
	startDateChange: '2019-09-01',
	endDateChange: '2019-09-15',
	firstMarkerChange: {
		lng: -111.88195030857673,
		lat: 46.05295547466941
	},
	secondMarkerChange: {
		lng: -110.21194260288826,
		lat: 44.67521785714884
	}
};

// Creating bounding box function
function calcBoundingBox(mapData) {
	// Actual Implementation
	/*
	var xMin = mapData.firstMarkerChange.lng;
	var yMin = mapData.secondMarkerChange.lat;
	var xMax = mapData.secondMarkerChange.lng;
	var yMax = mapData.firstMarkerChange.lat;
	*/

	// Code Editor Implementation
	var tL = topLeft.toGeoJSON();
	var bR = bottomRight.toGeoJSON();
	tL = tL.coordinates;
	bR = bR.coordinates;

	return ee.Geometry.Rectangle({
		coords: [tL, bR], // [xMin, yMin, xMax, yMax],
		geodesic: false
	});
}

// Precipitation analysis function
function determinePrecipt(mapData) {
	var boundingBox = calcBoundingBox(mapData);

	// Add boundingBox to map
	Map.addLayer({
		eeObject: boundingBox,
		name: 'boundingBox',
		opacity: 0.2
	});

	// Init 1st image composite
	var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
		.filter(ee.Filter.date(mapData.startDateChange, mapData.endDateChange))
		.select('precipitationCal');
	// Make a composite image out of the filtered set
	var precip = dataset.reduce(ee.Reducer.median());

	// Init Visualization Styling
	var colors = [
		'000096', '0064ff', '00b4ff', '33db80', '9beb4a',
		'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
	];
	var precipVis = {
		min: 0,
		max: .01,
		palette: colors,
		opacity: .75
	};

	var precipJPG = precip.visualize({
		bands: 'precipitationCal_median',
		min: 0,
		max: .01,
		palette: colors,
		opacity: .75
	});

	// Export the Gtiff, specifying scale and region.
	Export.image.toDrive({
		image: precipJPG.clip(boundingBox),
		description: 'Precipitation',
		scale: 1000,
		fileDimensions: 2048,
		region: boundingBox,
	});

	// Add layer to map
	Map.addLayer({
		eeObject: precip.clip(boundingBox),
		name: "Precipitation",
		visParams: precipVis
	});
}

determinePrecipt(data);
