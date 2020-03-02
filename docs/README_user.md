# User Documentation

## Introduction

The Customized Online Aggregation and Summarization Tool for Environmental Rasters ([COASTER](https://www.scirp.org/journal/paperinformation.aspx?paperid=26321)) system was developed by the YellowStone Ecological Research Center ([YERC](https://www.yellowstoneresearch.org/)) in response to the information needs of end-user communities interested in decision-support for natural resource management. The purpose of COASTER is to greatly simplify the process of creating predictor datasets for research exploring environmental impacts driven by climate change, land-use activities, disturbances (fire, flooding, etc) as well as invasive spread such as spine beetle infestations.

## Overview of Project

The project consists of rearchitecting the COASTER system. Since it is still in early development, there are many paths we can take to improve the system. We can either:

* concentrate on rearchitecting the database and how data is stored and processed
* Expand the current datasets by integrating new public datasets to the COASTER system
* Revamping the front-end interface of COASTER

## Project Goals

Due to the time length of this project, we have decided to expand the current datasets of COASTER and create a prototype user interface on how we would access this data. (Project Goals may change overtime).

## Current Features

The only functional feature at the current moment is to send an HTTP GET request from the homepage, taking in parameters, and sending that data to our backend server. The transfered data will then be processed by our google earth engine script, which will eventually call the Google Earth API for the necessary data. Once received, the Google API will send back a confirmation and the user can then download the requested data through their Google Drive.
