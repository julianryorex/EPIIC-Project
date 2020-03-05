const express = require("express");
const app = express();
var ee = require('@google/earthengine');

app.get('/', (req, res) => {
    res.send("Inside authenticate.js file.\n");

    // Prompts the user to log in, if the initial authentication failed.
	var onFailedLogin = function() {
		ee.data.authenticateViaPopup(function() {
			determinePrecipt(req.query.startDate, req.query.endDate);
		});
	};

    // Attempt to authenticate using existing credentials.
	ee.data.authenticate(client_id, determinePrecipt(req.query.startDate, req.query.endDate), null, null, onFailedLogin);
});


module.exports = app;