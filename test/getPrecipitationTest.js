// Quick and dirty test using node.js built in assert module.
// Primarily testing the calcBoundingBox function, as the rest of the script runs entirely on EE API calls

const assert = require('assert');
const getPrecip = require('/routes/getPrecipitation.js');
const ee = require('@google/earthengine');

// Make a fake mapData object with testing variables
const mapData = {
  startDateChange: '2019-01-25',
  endDateChange: '2019-01-26',
  datasetChange: 'NASA/GPM_L3/IMERG_V06',
  firstMarkerChange: {
    lng: 11,
    lat: 5
  },
  secondMarkerChange: {
    lng: 10,
    lat: 4
  }
};

// Actual results
var actualxMin = getPrecip.calcBoundingBox(mapData).xMin;
var actualyMin = getPrecip.calcBoundingBox(mapData).yMin;
var actualxMax = getPrecip.calcBoundingBox(mapData).xMax;
var actualxMax = getPrecip.calcBoundingBox(mapData).yMax;

// Expected results
var expectedxMin = 11;
var expectedyMin = 5;
var expectedxMax = 10;
var expectedxMax = 4;

// Test if xMin is what it should be
assert(
  actualxMin == expectedxMin,
  "Did not get the expected value of 11."
);

// Test if yMin is what it should be
assert(
  actualyMin == expectedyMin,
  "Did not get the expected value of 5."
);

// Test if xMax is what it should be
assert(
  actualxMax == expectedxMax,
  "Did not get the expected value of 10."
);

// Test if yMax is what it should be
assert(
  actualyMax == expectedyMax,
  "Did not get the expected value of 4."
);