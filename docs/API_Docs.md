# EPIIC Center API Homepage

Welcome to EPIIC Center's API Homepage!

Here are the currently available API calls:

|   api/auth
|   api/get-precipitation
|   api/get-bands

## api/auth

**Check if Google Authentication is up.**

In some rare cases the Google Earth Engine API may be unavailable, or a problem occured wih EPIIC Center's Google Service Account. To verify that it is a Google related issue, we can call this API to check if EPIIC Center's Service Account is authenticated correctly.

##### ARGUMENTS

No arguments.

##### Example

`curl http://localhost:8080/api/auth`

---

## api/get-precipitation

**Extracts precipitation levels.**

This API call extracts precipitation levels from the Google Earth Engine API. This is currently the main functionality of this API. (To access the GUI for this API call refer to this [link](https://epiic-center.herokuapp.com/)).

##### ARGUEMENTS:

**dataset** (REQUIRED): A string that corresponds to a Google Earth Engine dataset. Must be a supported dataset.

**startDate** (REQUIRED): A date of type string that corresponds to the following format: YYYY-MM-DD. Any other format will trigger a format exception error.

**endDate** (REQUIRED): A date of type string that corresponds to the following format: YYYY-MM-DD. Any other format will trigger a format exception error.

**firstMarker** (REQUIRED): An object that has two properties, `lat` and `lng`. These properties must be a number (int, long, double). It describes boundaries of the GeoTiff file the user is querying. The `firstMarker` is the coordinates of the top left corner of the surface area.

**secondMarker** (REQUIRED): An object that has two properties, `lat` and `lng`. These properties must be a number (int, long, double). It describes boundaries of the GeoTiff file the user is querying. The `secondMarker` is the coordinates of the bottom right corner of the surface area.

##### Example

```bash
curl -d '{"dataset":"AMSR-E","startDate":"2020-04-01","endDate":"2020-04-22","firstMarker":{"lat":45.46165228498309,"lng":-111.4219593203125},"secondMarker":{"lat":45.76712037352894,"lng":-110.84243051171875}}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/get-precipitation
```

## api/get-bands

Feature still in development.
