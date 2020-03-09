const express = require("express");
const app = express();
var ee = require('@google/earthengine');

app.get('/', (req, res) => {
	res.send("Inside authenticate.js file.\n");
	
// Commenting out all this authentication Google stuff to make deploying easier
/*
	// Authenticates via a service account
	ee.data.authenticateViaPrivateKey('privatekey.json');
	ee.initialize();
*/	
});


// Commenting out all this authentication Google stuff to make deploying easier
/*
// Retrieves client_id.json, parses it, and returns the client ID.
function returnClientId(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var c_id = JSON.parse(this.responseText);
		// document.getElementById("googleEarthTest").innerHTML = c_id.client_id;
		// client_id = c_id.client_id;
		return c_id.client_id;
		}
	};
	xmlhttp.open("GET", "client_id.json", true);
	xmlhttp.send();
}

// Prompts the user to log in, if the initial authentication failed.
var onFailedLogin = function() {
	ee.data.authenticateViaPopup();
};
*/
module.exports = app;