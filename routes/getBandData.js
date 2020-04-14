/**
    This route is responsible for getting band data from a dataset, and returning it as a .json
 */

const express = require("express");
const app = express();
const ee = require('@google/earthengine');
const PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');


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
    getBands(startDate, endDate /**, dataSetName */);
});

function getBands(startDate, endDate /**, dataSetName */){
    ee.data.authenticateViaPrivateKey(PRIVATE_KEY);
    ee.initialize();

    // this dataSetName is a placeholder for now
    var dataSetName = 'NASA/GPM_L3/IMERG_V06';
    var dataSet = ee.ImageCollection(dataSetName)
                        .filter(ee.Filter.date(startDate, endDate))
                        .mosaic();

    // request all the known information about this collection via an AJAX call.
    var data = dataSet.getInfo();

    // data is really messy, and needs to be cleaned up before it's sent back
    // Iterate through the dataset's bands, and put the id's into an array
    var bandNames = [];
    for (var i in data.bands) {
        bandNames.push(data.bands[i].id);
    }
    // Convert array into JSON string to send back
    bandNames = JSON.stringify(bandNames);

    // Insert command here to send back to front end here
    res.json(bandNames);
	console.log(`Received data in backend and sent bandNames back to frontend. \nRequest was: ${req.originalUrl}`);
}

module.exports = app;