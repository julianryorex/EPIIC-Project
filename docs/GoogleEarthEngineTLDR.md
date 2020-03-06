# GeoTIFFs and Google Earth Engine TL;DR

Google's Earth Engine (henceforth EE), is a cloud based geospatial processing platform. It can access a large number of publicly available databases for processing, drawing primarily from Landsat. It currently utilizes python or javascript to make request to Google's servers to process the requests. For the EPIIC project, we will be focusing on the javascript API. As a fun drinking game, count the times metadata is used.

## Contents

- **Google Earth Engine**
  - **First Steps**
  - **JS API**
- **GeoTIFF**

## Google Earth Engine

### First Steps

You can find these steps in a more verbose and comprehensive manner via Google's very good [documentation](https://developers.google.com/earth-engine/getstarted).

1. First we need to register to use EE. Navigate to [Google Earth Engine](https://earthengine.google.com/signup/) and follow the instructions sign up for the service. It is mentioned that it could take a few days to let you into the service.
2. Once you are able to access EE, you can install the API's via NPM, or from this [file](https://github.com/google/earthengine-api/blob/master/javascript/build/ee_api_js.js).
3. If you wanted to jump straight in, there is an in-browser code editor [here](https://code.earthengine.google.com/).

### JS API

- The github for calling the EE APIs can be found via this [link](https://github.com/google/earthengine-api).
- The javascript APIs can be installed via NPM as per the instructions [here](https://developers.google.com/earth-engine/npm_install).
- Full documentation of the API can be found [here](https://developers.google.com/earth-engine/api_docs).
  - The in-browser editor also has a built in documentation browser on the left.

### Foundational Structures

- **ee.Image**

  - This is the basic EE raster image, and what we draw data from. Contains *bands*, which are often various layers to depict the metadata, such as IR imagery, or false color photos. They also frequently contain additional metadata.
  - Some images may contain other metadata properties such as: Date, Cloud Cover, Orientation
  - To extract just the data from the bands, we would use the `Image.select();` function.
  - `print` commands work well as usual for troubleshooting
    - `print(imageName);` to get all the info
    - `print(imageName.select(nonListObj));` to just get a certain band's information
- **ee.ImageCollection**

  - This a a stack of Image objects. Not very useful on its own, you will usually have to filter, sort, or excise parts out the entire stack to get something workable, otherwise you are dealing with excessive amounts of processes.
  - `ImageCollection.filter(ee.Filter(arg))` will weed out anything that doesn't fit into the corresponding filter you enter in. This can be nested ontop of itself many times to obtain finer results. These are implicity ANDed together.

    ```javascript
    var collection = ee.ImageCollection('imageCollectionName')
      .filter(ee.Filter.(filterArgs))
      .filter(ee.Filter.eq(filterArgs2))
      .filterDate('2019-01-01', '2020-01-01');
    ```

- **ee.Map**
  - In the web IDE, this object is what you end up pasting all the processed data onto, and exporting. There can be quite a bit of image visualization wizardry to make the raw data more readable before you put everything on the map.
  - `Map.addLayer(args)` is what you'll use to show the image on the UI.

## GeoTIFF (Gtiff)

A kind of TIFF file that allows georeferencing data to be imbedded as metadata into the TIFF container. The kind of GeoTIFF we are interested in is Cloud Optimized GeoTIFF (COG). Cog allows us to more easily access aforemention georeferencing data without having to download entire TIFF file first, which tends to be enormous. It accomplishes this through GET range requests.

This means for every COG that's organized differently, we'd have to find the bit range the data we want to access, and send a GET request for that particular range. This is usually predictable, but is onerous to implement.

Thankfully Google Earth Engine allows us to bypass that completely, and makes accessing that metadata extremely easy. Refer to the JS API functions above.

## Metadata

GDAL is usally the client based software to read GeoTIFFs, and the relevent tags recognized by that software are:

- `GEO_METADATA`
  - This is where all the officially recognized georeferencing tags are embedded, following the XML-encoded instance documents prepared using 19139-based schema
- `TIFFTAG_GDAL_METADATA ASCII`
  - This is a MISC tag, where misfit tags go. These non-standard metadata items are stored into a PAM .aux.xml file

Most of the two points above are now inconsequential with Google Earth Engine doing the heavy lifting. However there are metadata tags that are commonly found in most databases.

## Common Band metadata tags

- **id**
  - The band's name, and ideally, tells us what the band is measuring.
- **crs**
  - Coordinate Reference System. This tells us what CRS is being used on this particular image. Can be returned using `Image.projection()`
- **crs_Transform**
  - Using the previously mentioned CRS, tells us the coordinates this particular band is focused on. Also returned by `Image.projection()`
- **data_type**
  - Tells us what type of data the band is measuring with. Int, Float, etc.
- **dimensions**
  - The size of the image band in pixels [x,y]
- **min** & **max**
  - Minimum and Maximum values of the metric the band is measuring. Useful when visualizing the image into something that is useful.

It doesn't seem that the units of measurement are often included in the band metadata, and so that information is best found on the datasets corresponding Earth Engine Data Catalog page.

## Common Image metadata tags

*Note that not all images will carry useful metadata outside of their bands, and are very specific to that particular dataset. Outlined here isn't the tag name, but rather what those tags usually represent.*

- Date image was taken
  - DATE_ACQUIRED, GenerationDateTime
- Algorithm used to process the image
  - ALGORITHM_VERSION, AlgorithmID
- Coordinates that encompass the image
  - Lat_Max, Lon_Min
