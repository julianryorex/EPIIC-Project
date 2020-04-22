/*
	Planning on using this as a full fledged authentication backend script to completely check all authentication 
*/


const express = require("express");
const app = express();
var ee = require('@google/earthengine');
let PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');

// if(typeof PRIVATE_KEY === "string") PRIVATE_KEY = JSON.parse(PRIVATE_KEY);

app.get("/", (req, res) => {
	
	console.log('Authenticating server-side EE API calls via private key...');

	ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
		console.log('Authentication succeeded!');
		// Attempt to initialize Earth Engine.
		ee.initialize(null, null, () => {
			// On a successful initialize
			console.log('Successfully initialized the EE client library.');
			res.send("Authenticated and initialized!\n");					
		},
				// On a failure to initialize
		(err) => {
			res.send("initialization failed...!\n");
			console.log(err);
			console.log(`Initialization failed.`);
		});
	},
	// When the authentication failed.
	(err) => {
		console.log(err);
		console.log('Authentication failed');
		res.send("Authentication failed...!\n");
	});
});

module.exports = app;