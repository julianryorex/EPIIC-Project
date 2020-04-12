const express = require("express");
let router = express.Router();

const auth = require('./authenticate');
const googleEarth = require('./googleEarth');
const googleEarthTest = require("./getPrecipitation"); // testing
const getBandData = require("./getBandData"); // testing
const timeSeriesTest = require("./timeSeriesTest"); // testing


// routes to the various paths
router.use("/auth", auth);
router.use("/google-earth-data", googleEarth);
router.use("/google-test", googleEarthTest); // use this path from front end to request data from API
router.use("/get-band-data", getBandData);
// router.use("/google-earth-time-series", timeSeriesTest);

// http://localhost:8080/api
router.get('/', (req, res) => {
    // need an api doc page here
    res.send("Currently in routes.js. Welcome to EPIIC Center's new API! Docs are still in the works...\n");
});




module.exports = router;