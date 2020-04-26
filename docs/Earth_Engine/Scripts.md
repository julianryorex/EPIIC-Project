# Earth Engine Scripts

This document breaks down the various Earth Engine script files, going over what it does with a fine comb, specifically the Earth Engine API.

## Contents

- **EarthEngineTest.js**
- **getBandData.js**

# **EarthEngineTest.js**
Takes data from NASA's Global Precipitation Measurement (GPM) v6 between two dates and the rectangle formed by two points and presents the median precipitation recorded.
- ``calcBoundingBox(mapData)``
    - This is a helper function for ``determinePrecipt()`` function to take the arguements passed to this script, and returns a EE object. This is a Geometry object to act as a bounds so that the Earth Engine servers don't attempt to process the entire earth. 
    - The variables each represent a corner of a rectangle. 
        - ``xMin``, and ``yMin`` translates to the bottom left of the rectangle
        - ``xMax``, and ``yMax`` translates to the upper right of the rectangle
    - ``geodesic`` is set to false in order to get a straight edged rectangle projection. Otherwise the rectangle follows the Earth's curvature.
- ``dataset``: this being set as the variable to contain our filtered image collection.
    - Filters:
        - start date, and end date.
        - band selection, which is calibrated precipitation in this case.
- ``precip``: this variable is going to store our image after we reduce ``dataset`` into a single image
    - what we do here is take the median of all the bands in the image collection, and then return it as a single image, rather then hundreds.

- ``Export.image.toDrive()``
    - Does what it says on the tin, and exports our image as a geoTIFF to a Google Drive.
    - ``scale``: this is how many square meters represent a single pixel.
    - ``fileDimensions``: sets the max size for any one image to this many pixels wide and tall.
    - **Note:** This function only works client-side, meaning in the browser. The `Export` function will not work server-side such as Node.js.

# **getBandData.js**
Takes in two arguements of start date, and end date, along with a dataset's name, and returns a JSON of all that dataset's bands.

Roughly the logic is as follows:
- create an image collection, filted by dates, and immediately flatten it using ``.mosaic``
- retrieves the value of that image collection, in the form of a collection of strings.
- iterate through those strings, and pick out the bands, and save them in an array.
- convert that array into a JSON, and send back.