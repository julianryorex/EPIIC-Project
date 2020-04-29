const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var ee = require('@google/earthengine');
const PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies


const validInput = (req) => {
	// return success and msg
	let response = {
		success: true,
		msg: "",
	};

	// no parameter check
	if (!req.body.startDate || !req.body.endDate) {
		response.success = false;
		response.msg = "Missing date parameters";
	} else if (!req.body.dataset) {
		response.success = false;
		response.msg = "Missing dataset parameter";
	} else if (!req.body.firstMarker || !req.body.secondMarker) {
		response.success = false;
		response.msg = "Missing coordinate parameters";
	}

	// invalid parameter check
	else if (
		!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(
			req.body.startDate
		) ||
		!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(
			req.body.endDate
		)
	) {
		response.success = false;
		response.msg = "Date format is incorrect";
	} else if (
		!req.body.firstMarker.lat ||
		!req.body.firstMarker.lng ||
		!req.body.secondMarker.lat ||
		!req.body.secondMarker.lng
	) {
		response.success = false;
		response.msg = "Coordinate format is incorrect";
	} else if (
		typeof req.body.firstMarker.lat !== "number" ||
		typeof req.body.firstMarker.lng !== "number" ||
		typeof req.body.secondMarker.lat !== "number" ||
		typeof req.body.secondMarker.lng !== "number"
	) {
		response.success = false;
		response.msg = "Latitude and longitude coordinates must be of type number";
	}

	return response;
};

const calcBoundingBox = (mapData) => {
	return ee.Geometry.Rectangle({
		coords: [mapData.firstMarkerChange.lng, 
				mapData.secondMarkerChange.lat, 
				mapData.secondMarkerChange.lng, 
				mapData.firstMarkerChange.lat],
		geodesic: false,
	});
};


app.post("/", (req, res) => {

	if (!validInput(req).success) {
		const responseData = {
			msg: valid.msg,
			success: valid.success,
			data: null
		};
		res.json(responseData);
		return;
	}

	const mapData = {
		startDateChange: req.body.startDate,
		endDateChange: req.body.endDate,
		datasetChange: req.body.dataset,
		firstMarkerChange: req.body.firstMarker,
		secondMarkerChange: req.body.secondMarker
    };

    
    ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
		
		ee.initialize(null, null, () => {
            console.log('Successfully initialized the EE client library.');
            var boundingBox = calcBoundingBox(mapData);
            var boundsFilter = ee.Filter.bounds(boundingBox);
            console.log("bounding boxes processed");
            

            var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
            .filter(ee.Filter.date(mapData.startDateChange, mapData.endDateChange))
            .select('precipitationCal');
            // Make a composite image out of the filtered set, and get the median precipitation.
            var precip = dataset.reduce(ee.Reducer.median());

            console.log("Dataset retrieved and reduced / filtered.");

			/**
			 * @author Julian
			 * @note to devs
			 * Supposed to Export image to Google Drive, but only works client side.
			 * Left it here just in case another solution arises.
			 
            Export.image.toDrive({
				image: precip.clip(boundingBox),
				description: "Precipitation",
				scale: 1000,
				fileDimensions: 2048,
				region: boundingBox,
			});
			console.log("File exported to drive.");
			*/

            const responseData = {
				msg: "Precipitation Data Request",
				success: true,
				data: precip
			};

            console.log("Sending response.");
            
            res.send(JSON.stringify(responseData));
		},
				// On a failure to initialize
		(err) => {
			res.send("initialization failed...!\n");
			console.log(err);
			console.log(`Initialization failed.`);
		});
	},
	// When the authentication failed.
	(err) => {
		console.log(err);
		console.log('Authentication failed');
		res.send("Authentication failed...!\n");
    });  
});

module.exports = app;