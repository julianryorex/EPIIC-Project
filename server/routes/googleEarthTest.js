const express = require("express");
const app = express();


// app.get("/", (req, res) => {
// 	res.send("Inside googleEarthTest.js file.\n");
// });


app.get("/", (req, res) => {
	const data = {
		msg: "Received data in backend",
		startDate: req.query.startDate + " changed",
		endDate: req.query.endDate + " changed"
	};
    res.json(data);
    console.log("Received data in backend and sent data back to frontend.");
    // send this data to google earth engine

});

module.exports = app;
