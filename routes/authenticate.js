const express = require("express");
const app = express();
var ee = require('@google/earthengine');
let PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');

app.get("/", (req, res) => {
	ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
		console.log('Authentication succeeded!');
		ee.initialize(null, null, () => {
			// On a successful initialize
			console.log('Successfully initialized the EE client library.');
			res.send("Authenticated and initialized!\n");					
		},
				// On a failure to initialize
		(err) => {
			res.send("initialization failed...!\n");
			console.log(err);
		});
	},
	// When the authentication failed.
	(err) => {
		console.log(err);
		res.send("Authentication failed...!\n");
	});
});

module.exports = app;

/** @author Norman
 * Planning on using this as a full fledged authentication backend script to completely check all authentication
*/