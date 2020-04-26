# EPIIC Center Product Specification

The specifications upon receiving this project were extremely vague, so creating a project specification form was believed to be the best choice for both the client and the developers. The client has since presented most of the requirements via email, so this would be a reiteration of that along with some unanswered and lingering questions.

## Content

- **Data Acquisition**
- **Data Transformation**
- **User Interface**

## Data Acquisition

**Goal:**
Acquire data from public online datasets, whether through download from YERC server or through simple API calls to the public database.

**Requirements:**
Using API requests, download/query necessary data (weather, MODIS, LandSAT) from a selected publically available dataset (Google Earth Engine, Microsoft, NASA, etc) using specified parameters such as a specific geographic area. If response time is adequate then all that will need to be done is create file for download in a client storage area. Otherwise, the results will need to be stored in Azure CosmosDB or Amphora.

**Notes:**
At the current moment it seems like querying the public datasets through their API for the necessary data sounds like an adequate method for our data acquisition process. It would depend on the number of queries it will send per day. Once the system is put in place, we shall test (if enough time), whether an API call would suffice. We will proceed with development assuming that the response time is reasonable.

_Additional Information:_

- One of our developers is looking into using the Google Earth Engine for Data Acquisition. We created a YERC Google Service Account to use this API.
- Using Amphora's data hub would be a great way to spread the public data to users interested users, although storing and testing the data on their servers may be time consuming. For this reason, we will aim to only query the necessary datasets that the user requests.
- Google Earth Engine's online playground and documentation uses Javascript to query their APIs. Therefore we are using the Earth Engine JS API (see *README_dev.md* for API limitations).

**TLDR:**

- Using Google Earth Engine API to aquire public weather datasets (will expand datasets once implemented)
- Leaning towards API requests instead of acquiring the raw data and storing it in CosmoDB.
- Will further need to test whether response time for API calls are adequate.
- Google Earth Engine playground and Google docs use Javascript, so we are too.
- Amphora sounds like a great way to expand this project, but due to limited time we will most likely not pursue its implementation.

## Data Transformation

**Goal:**
Transform the acquired data to a readable/storable format by users/databases respectively. (Format that suits Amphora and YERC's EPIIC Center).

**Requirements:**
Transform data if Google Earth Engine does not output the wanted format. Transforming GeoTiff format to either timeseries data or whatever format the user wants. If storing this data, converting to JSON or GeoJSON may be necessary.

**Notes:**
If Google Earth Engine's output format aligns with the format of YERC's EPIIC Center and Amphora, this step is somewhat unecessary. If we do end up using other public datasets, we may need to implement a data transformation sub-system as well. Performance will play a large role in how we approach this problem.

_Additional Information:_

- A developers is looking into querying only the metadata (which is a subset of the queried dataset) which may help with performance.
- Once the data is processed and transformed to a specific format, we may want to store those results so that the next query with the same parameters would be fetched from the CosmoDB instead of being processed again by YERC's server. This idea may save processing costs while boosting request performance. We can potentially develop an algorithm that searches first if the requested data is saved in the database; if it is (or if the request is a subset of the stored data), we would simply extract the information from there instead of the query. Of course, big decisions like such must *first* be tested.

## User Interface

**Goal:**
Implement a clean modern User Interface to capture/validate input parameters for data acquisition.

**Requirements:**
 Have a clean simple dashboard that takes parameters as user input. The dash would ressemble [COASTER](http://www.coasterdata.net/)'s website but with a more modern look and less features (as the project scope for now is only weather/climate data).

**Notes:**

- the user interface is built using React.js. All developers are new to using this technology so there will be a slight learning curve at the beginning of the project.
- The frontend must integrate seamlessly with the backend. The backend is built using Node.js and Express.

## Other

If there are any questions or necessary modifications for this project feel free to contact YERC or the developers. This project is open-sourced and the GitHub repository is linked [here](https://github.com/julianryorex/EPIIC-Project). Feel free to open issues or submit pull requests.
