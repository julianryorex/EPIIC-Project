const express = require("express");
const app = express();
var ee = require('@google/earthengine');
// This is highly unsecure, and a workaround until things are fixed
var client_id = "683180324319-3q2lk30hu7qao76g6squdcfpi6s7joe0.apps.googleusercontent.com";

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


	

	// Authenticate using an OAuth pop-up using existing credentials.
	ee.data.authenticateViaOauth(client_id, determinePrecipt(req.query.startDate, req.query.endDate), function(e) {
		console.error('Authentication errorrrrrrr: ' + e);
	}, null, onFailedLogin());

	res.json(data);
	console.log(`Received data in backend and sent data back to frontend. \nRequest was: ${req.originalUrl}`);
	// send this data to google earth engine

});


// Retrieves client_id.json, parses it, and returns the client ID.
	function returnClientId(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var c_id = JSON.parse(this.responseText);
			// document.getElementById("googleEarthTest").innerHTML = c_id.client_id;
			// client_id = c_id.client_id;
			return c_id.client_id;
			}
		};
		xmlhttp.open("GET", "client_id.json", true);
		xmlhttp.send();
	}
	
	// Prompts the user to log in, if the initial authentication failed.
	function onFailedLogin(){
		ee.data.authenticateViaPopup(function() {
			determinePrecipt(req.query.startDate, req.query.endDate);
		});
	}
	
	// Analysis function
	function determinePrecipt(StartDate, EndDate){
		// init Earth Engine
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
		var precip = precip.updateMask(mask);

		// Create a geometry representing an export region.
		var geometry = ee.Geometry.Rectangle([116.2621, 39.8412, 116.4849, 40.01236]);

		// Export the image, specifying scale and region.
		Export.image.toDrive({
			image: precip,
			description: 'Precipitation',
			scale: 1000,
			region: boundingBox
		});
	}

module.exports = app;
