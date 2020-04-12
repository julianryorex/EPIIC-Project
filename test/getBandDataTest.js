// Quick and dirty test using node.js built in assert module.
// Primarily testing the getBands() function

const assert = require('assert');
const getBandData = require('/routes/getBandData.js');
const ee = require('@google/earthengine');

// Testing variables
var startDate = '2019-01-25';
var endDate = '2019-01-26';
var dataSetName = 'NASA/GPM_L3/IMERG_V06';
// Actual results
var actualArrayLength = getBandData.getBands(startDate, endDate).bandNames.length;
var actualFirstArrayElement = getBandData.getBands(startDate, endDate).bandNames[0];
var actualLastArrayElement = getBandData.getBands(startDate, endDate).bandNames.pop();

// Expected results
var expectedArrayLength = 9;
var expectedFirstArrayElement = 'HQobservationTime';
var expectedLastArrayElement = 'randomError';

// Test to see if the array generated has the expected number of entries
assert(
  actualArrayLength == expectedArrayLength,
  "Did not get the expected array length of 9."
);

// Test to see if the array generated has the expected first entry
assert(
  actualFirstArrayElement == expectedFirstArrayElement,
  "Did not get the expected value of HQobservationTime."
);

// Test to see if the array generated has the expected last entry
assert(
  actualLastArrayElement == expectedLastArrayElement,
  "Did not get the expected value of randomError."
);