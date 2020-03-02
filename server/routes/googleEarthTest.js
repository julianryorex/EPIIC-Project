const express = require("express");
const app = express();


app.get("/", (req, res) => {

	var isEmpty = function(obj) {
		return Object.keys(obj).length === 0;
	};
	if(isEmpty) {
		throw Error('The get request requires two parameters, startDate and endDate!');
	}
	
	const data = {
		startDate: req.query.startDate + " changed",
		endDate: req.query.endDate + " changed"
	};
	res.json(data);
	console.log(`Received data in backend and sent data back to frontend. \nRequest was: ${req.originalUrl}`);
	// send this data to google earth engine

});

module.exports = app;
