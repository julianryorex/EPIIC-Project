const express = require("express");
let router = express.Router();

const auth = require('./authenticate');
const googleEarth = require('./googleEarth');
const googleEarthTest = require("./googleEarthTest"); // testing


// routes to the various paths
router.use("/auth", authenticate);
router.use("/google-earth-data", googleEarth);
router.use("/google-test", googleEarthTest); // use this path from front end to request data from API
router.use("/get-band-data", getBandData);

// http://localhost:5000/api
router.get('/', (req, res) => {
    // need an api doc page here
    res.send("Currently in routes.js. Welcome to EPIIC Center's new API! Docs are still in the works...\n");
});




module.exports = router;