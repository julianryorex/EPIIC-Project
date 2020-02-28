// Load client library.
var ee = require('@google/earthengine');

// Initialize client library and run analysis.
var initialize = function() {
  ee.initialize(null, null, function() {
    // ... run analysis ...
  }, function(e) {
    console.error('Initialization error: ' + e);
  });
};

// Authenticate using an OAuth pop-up.
ee.data.authenticateViaOauth(YOUR_CLIENT_ID, initialize, function(e) {
  console.error('Authentication error: ' + e);
}, null, function() {
  ee.data.authenticateViaPopup(initialize);
});