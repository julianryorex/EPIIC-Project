/*
	Planning on using this as a full fledged authentication backend script to completely check all authentication 
*/


const express = require("express");
const app = express();
var ee = require('@google/earthengine');
// const PRIVATE_KEY = require('./privatekey.json') || "";
const PRIVATE_KEY = "";

app.get("/", (req, res) => {
	
	console.log('Authenticating server-side EE API calls via private key...');

	ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
			console.log('Authentication succeeded!');
			// Attempt to initialize Earth Engine.
			ee.initialize(
				null, null,
				// On a successful initialize
				() => {
					console.log('Successfully initialized the EE client library.');
					app.listen(PORT);
					console.log(`Listening on port ${PORT}`);
					res.send("Authenticated and initialized!\n");
				},
				// On a failure to initialize
				(err) => {
				res.send("initialization failed...!\n");

					console.log(err);
					console.log(`Initialization failed.`);
				}
			);
		},
		// When the authentication failed.
		(err) => {
		console.log(err);
		console.log('Authentication failed');
		res.send("Authentication failed...!\n");
	});
});

module.exports = app;