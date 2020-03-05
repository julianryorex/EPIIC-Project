const express = require("express");
const app = express();
var client_id = require('./client_id.json')
var ee = require('@google/earthengine');

app.get("/", (req, res) => {

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

	
	// Prompts the user to log in, if the initial authentication failed.
	var onFailedLogin = function() {
		ee.data.authenticateViaPopup(function() {
			determinePrecipt(req.query.startDate, req.query.endDate);
		});
	};
	
	// Analysis function
	function determinePrecipt(StartDate, EndDate){
		ee.initialize();
		var boundingBox = ee.Geometry.Rectangle([-114.3837890625, 43.4611329335764, -107.407470703125, 54709399579075]);
		var boundsFilter = ee.Filter.bounds(boundingBox);

		// Init 1st image composite (1st Week of Jan, 2019)
		var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
			.filterBounds(boundingBox)
			.filter(ee.Filter.date(StartDate, EndDate));

		// Make a composite image out of the filtered set, and mask out anything above a certain amount.
		var precip = dataset.select('precipitationCal').mosaic();
		var mask = precip.lt(10);
		var precipitation = precip.updateMask(mask);

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

	// Attempt to authenticate using existing credentials.
	ee.data.authenticate(client_id, determinePrecipt(req.query.startDate, req.query.endDate), null, null, onFailedLogin);

	res.json(data);
	console.log(`Received data in backend and sent data back to frontend. \nRequest was: ${req.originalUrl}`);
	// send this data to google earth engine

});

module.exports = app;
