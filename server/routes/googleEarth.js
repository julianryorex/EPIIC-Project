/**
 * @Norman this is where you will be working on calling the google earth engine API to get the necessary 
 * data. You can furthermore call stuff from other files as well, such as the authenticate.js for 
 * authentication.
 * @note : How to run the backend? use Curl from terminal.
 * Example: curl http://localhost:5000/api/google-earth-data 
 * (the line above should print out: "Inside googleEarth.js file."). 
 */

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Inside googleEarth.js file.\n");
});

module.exports = app;
