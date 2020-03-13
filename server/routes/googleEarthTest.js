const express = require("express");
const app = express();
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

	res.json(data);
	console.log(`Received data in backend and sent data back to frontend. \nRequest was: ${req.originalUrl}`);
	// send this data to google earth engine

});

// Commenting out all this authentication Google stuff to make deploying easier
/*	
	// Precipitation Analysis function
	function determinePrecipt(StartDate, EndDate, xMin, yMin, xMax, yMax){
		// init Earth Engine
		ee.initialize();

		var boundsFilter = ee.Filter.bounds(boundingBox);
		var boundingBox = ee.Geometry.Rectangle([xMin, yMin, xMax, yMax]);

		// Init 1st image composite
		var dataset = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
						.filterBounds(boundingBox)
						.filter(ee.Filter.date(StartDate, EndDate)
						.select('precipitationCal');
						);

		// Make a composite image out of the filtered set, and mask out anything above a certain amount.
		var precip = dataset.mosaic();
		var mask = precip.lt(10);
		var precip = precip.updateMask(mask);

		// Export the Gtiff, specifying scale and region.
		Export.image.toDrive({
			image: precip,
			description: 'Precipitation',
			scale: 1000,
			region: boundingBox
		});
	}
*/
module.exports = app;
