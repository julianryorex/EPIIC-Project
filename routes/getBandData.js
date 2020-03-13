/**
    This route is responsible for getting band data from a dataset, and returning it as a .json
 */

const express = require("express");
const app = express();
const ee = require('@google/earthengine');
// const PRIVATE_KEY = require('./privatekey.json');

app.get("/", (req, res) => {
    res.send("Inside getBandData.js file.\n");

    // Simply copypasting Julian's lines from googleEarthTest.js
    if (
		Object.keys(req.query).length < 2 ||
		Object.keys(req.query).length > 2) {
		res.status(400).json({
			status: 400,
			message:
				"GET Request requires two parameters, 'startDate' and 'endDate'"
		});
	}
	
	const data = {
		startDate: req.query.startDate + " changed",
		endDate: req.query.endDate + " changed"
	};

    // Gets the band data
    getBands(startDate, endDate);

});

function getBands(startDate, endDate /**, dataSetName */){
    ee.data.authenticateViaPrivateKey(PRIVATE_KEY);
    ee.initialize();
    var dataSetName = 'NASA/GPM_L3/IMERG_V06';
    var bandNames = [];
    var dataSet = ee.ImageCollection(dataSet)
                        .filter(ee.Filter.date(startDate, endDate))
                        .mosaic();

    // Iterate through the dataset's bands, and put the id's into an array
    for (var i in dataset.bands) {
        bandNames[i] = dataSet.bands[i].id
    }
    
    // Insert command here to send back to front end here
    /*
    res.json(bandNames);
	console.log(`Received data in backend and sent bandNames back to frontend. \nRequest was: ${req.originalUrl}`);
    */
}

module.exports = app;