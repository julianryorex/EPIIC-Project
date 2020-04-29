const express = require("express");
const path = require('path');
let router = express.Router();

const auth = require('./authenticate');
const getPrecipitation = require("./getPrecipitation");
const getBandData = require("./getBandData");

/** unfinished feature @Norman
const timeSeriesTest = require("./timeSeriesTest");
router.use("/google-earth-time-series", timeSeriesTest);
*/

// routes to the various paths
router.use("/auth", auth);
router.use("/get-precipitation", getPrecipitation);
router.use("/get-bands", getBandData);

router.get('/', (req, res) => {
    res.sendFile(path.resolve('docs/API_Docs.md'));
});

module.exports = router;