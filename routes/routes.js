const express = require("express");
let router = express.Router();

const auth = require('./authenticate');
const googleEarth = require('./googleEarth');
const getPrecipitation = require("./getPrecipitation"); // testing
const getBandData = require("./getBandData"); // testing
const timeSeriesTest = require("./timeSeriesTest"); // testing


// routes to the various paths
router.use("/auth", auth);
router.use("/google-earth-data", googleEarth);
router.use("/get-precipitation", getPrecipitation); // use this path from front end to request data from API
router.use("/get-bands", getBandData);
// router.use("/google-earth-time-series", timeSeriesTest);

// http://localhost:8080/api
router.get('/', (req, res) => {
    // need an api doc page here
    res.send("Welcome to EPIIC Center's new API! Docs are still in the works...\n");
});


module.exports = router;