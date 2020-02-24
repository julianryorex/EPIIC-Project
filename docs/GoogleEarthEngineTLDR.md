# GeoTIFFs and Google Earth Engine TL;DR

Google's Earth Engine (henceforth EE), is a cloud based geospatial processing platform. It can access a large number of publicly available databases for processing, drawing primarily from Landsat. It currently utilizes python or javascript to make request to Google's servers to process the requests. For the EPIIC project, we will be focusing on the javascript API.

## Contents
- **Google Earth Engine**
  - **First Steps**
  - **JS API**
- **GeoTIFF** 

## First Steps
You can find these steps in a more verbose and comprehensive manner via Google's very good documentation: <https://developers.google.com/earth-engine/getstarted>.
1. First we need to register to use EE. Navigate to: <https://earthengine.google.com/signup/>, and follow the instructions sign up for the service. It is mentioned that it could take a few days to let you into the service.
2. Once you are able to access EE, you can install the API's via NPM, or from this file: <https://github.com/google/earthengine-api/blob/master/javascript/build/ee_api_js.js>.
3. If you wanted to jump straight in, there is an in-browser code editor here: <https://code.earthengine.google.com/>

## JS API
- The github for calling the EE APIs can be found via this link: <https://github.com/google/earthengine-api>.
- The javascript APIs can be installed via NPM as per the instructions here: <https://developers.google.com/earth-engine/npm_install>.
- Full documentation of the API can be found here: <https://developers.google.com/earth-engine/api_docs>.
  - The in-browser editor also has a built in documentation browser on the left.



_Additional Information:_ 
- One of our developers is looking into using the Google Earth Engine for data Acquisition. In order to use this API, the user must have a google account. We will probably ask the user to log into their google account in order to retrieve this information. If we want to eliminate this step, we shall use the YERC google account to extract the data from Google's Database and store it in YERC's own Microsoft Azure's database. 
- Using Amphora's data hub would be a great way to spread the public data to users interested users, although storing and testing the data on their servers may be time consuming. For this reason, we will aim to either query the necessary dataset, or download it to YERC's CosmoDB. 
- Google Earth Engine's online playground and documentation uses Javascript to query their APIs. Knowing that and taking into account that we are utilizing a MERN stack for our Web App, data extracting will occur in the backend of our system using Javascript. 

**TLDR:**
- Using Google Earth Engine API to aquire public weather datasets (will expand datasets once implemented)
- Leaning towards API requests instead of acquiring the raw data and storing it in CosmoDB.
- Will further need to test whether response time for API calls are adequate.
- Google Earth Engine playground and Docs use Javascript, so we are too.
- Amphora sounds like a great way to expand this project, but due to limited time we will most likely not pursue its implementation.

## Data Transformation

**Goal** 
Transform the acquired data to a readable/storable format by users/databases respectively. (Format that suits Amphora and YERC's EPIIC Center).

**Requirements:**
Transform data if Google Earth Engine does not output the wanted format. Transforming GeoTiff format to either timeseries data or whatever format the user wants. If storing this data, converting to JSON or GeoJSON may be necessary. 

**Notes:**
If Google Earth Engine's output format aligns with the format of YERC's EPIIC Center and Amphora, this step is somewhat unecessary. If we do end up using other public datasets, we may need to implement a data transformation sub-system as well. Performance will play a large role in how we approach this problem.

_Additional Information:_ 
- One of the developers was looking into querying only the metadata (which is a subset of the queried dataset) which may help with performance.
- Once the data is processed and transformed to a specific format, we may want to store those results so that the next query with the same parameters would be fetched from the CosmoDB instead of being processed again by YERC's server. This idea may save processing costs while boosting request performance. We can potentially develop an algorithm that searches first if the requested data is saved in the database; if it is (or if the request is a subset of the stored data), we would simply extract the information from there instead of the query. Of course, big decisions like such must first be tested.

## User Interface

**Goal:**
Implement a clean modern User Interface to capture/validate input parameters for data acquisition. 

**Requirements:**
 Have a clean simple dashboard that takes parameters as user input. The dash would ressemble [COASTER](http://www.coasterdata.net/)'s website but with a more modern look and less features (as the project scope for now is only weather/climate data). 

**Notes:**
- the user interface is built using React.js. All developers are new to using this technology so there will be a slight learning curve at the beginning of the project. 
- The frontend must integrate seamlessly with the backend. The backend is built using express.js.

## Other

If there are any questions or necessary modifications for this project feel free to contact YERC or the developers. This project is open-sourced and the GitHub repository is linked [here](https://github.com/julianryorex/EPIIC-Project). Feel free to open issues or submit pull requests.





