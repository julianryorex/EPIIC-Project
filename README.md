# EPIIC Project for Yellowstone Ecological Research Center (YERC)

## Introduction

The Customized Online Aggregation and Summarization Tool for Environmental Rasters  [COASTER](https://www.scirp.org/journal/paperinformation.aspx?paperid=26321) system was developed by the Yellowstone Ecological Research Center [YERC](https://www.yellowstoneresearch.org/) in response to the information needs of end-user communities interested in decision-support for natural resource management. The purpose of COASTER is to greatly simplify the process of creating predictor datasets for research exploring environmental impacts driven by climate change, land-use activities, disturbances (fire, flooding, etc) as well as invasive spread such as spine beetle infestations.

## Tools to follow the project

Since we are using an Agile Software Development Cycle, we built a [Trello Board](https://trello.com/b/PMgDugQn/esof-423-epiic) to clearly showcase our sprint backlog.

Our Product Backlog and Burndown chart are on Google Drive:

* [Product Backlog](https://docs.google.com/spreadsheets/d/1r663v8wYGnEqELmsFqcDvOgluQDIYd4GUTgDRUXsdOU/edit?usp=sharing)
* [Burndown Chart](https://drive.google.com/file/d/1Y3G-vfsVTwhT0hvc5Igi2pwMmao0OJRl/view?usp=sharing)

## Overview and Goals

The project consists of rearchitecting the COASTER system. At the time, COASTER was a great resource for getting environmental public datasets. However, it was not designed to last and maintenance was never done to the system. This project will take those elements into consideration during the design stage; we are hoping to build a sustainable system that can easily be scalable in the future. 
**The goal of the project is to recreate a system, similar to COASTER, using newer and more appropriate technologies. The project will consist of:**

* creating a system that extracts data from public datasets (such as Google Earth Engine) and make it easily available
* Create a simple User Interface to choose subsets of the public datasets easily
* Visualizing the dataset requested right on the UI

## Project Requirements

The updated COASTER system must function and include the following:

* a web-based application UI (interactive)
* access and processing of publicly available datasets such as those provided by Google Earth Engine

## Project Tasks

Here are some of the following tasks in order to satisfy our project requirements:

* Search and select a predictor dataset to be used for research, exploring environmental impacts that are either natural or caused by humans.
* Identify a publicly available source for the dataset as well as the methods available to retrieve the data.
* Design an algorithm to map resolution of data to a specified geographic area.
* Implement an interface to capture/validate input parameters.
* Build process to retrieve data from identified data source using specified input parameters.
* Implement a mechanism to provide retrieved data to user.

## Structure of Project

Since we are using React as our front-end framework and most likely Express as our back-end framework, everything client/front-end related files will live in the client directory. Same thing goes for server/back-end files in the backend directory.
Documentation related files will live under the docs directory and same thing goes for the build files and testing related files into the build and test directories, respectively.
