const express = require("express");
const path = require('path');
let router = express.Router();


const auth = require('./authenticate');
const googleEarth = require('./googleEarth');
const getPrecipitation = require("./getPrecipitation"); // testing
const getBandData = require("./getBandData"); // testing
const timeSeriesTest = require("./timeSeriesTest"); // testing
const getPrecip = require("./getPrecip2-test");


// routes to the various paths
router.use("/auth", auth);
router.use("/google-earth-data", googleEarth);
router.use("/get-precipitation", getPrecip); // use this path from front end to request data from API
router.use("/get-bands", getBandData);
// router.use("/google-earth-time-series", timeSeriesTest);

router.get('/', (req, res) => {
    res.sendFile(path.resolve('docs/API_Docs.md'));
});


module.exports = router;