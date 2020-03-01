const express = require("express");
let router = express.Router();

var auth = require('./authenticate');
var googleEarth = require('./googleEarth');


// routes to the various paths
router.use("/auth", auth);
router.use("/google-earth-data", googleEarth);


// http://localhost:5000
router.get('/', (req, res) => {
    // need an api doc page here
    res.send("Currently in routes.js. Welcome to EPIIC Center's new API! Docs are still in the works...\n");
});




module.exports = router;