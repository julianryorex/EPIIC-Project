# EPIIC Project for Yellowstone Ecological Research Center (YERC)

## Introduction
The Customized Online Aggregation and Summarization Tool for Environmental Rasters (<a href="https://www.scirp.org/journal/paperinformation.aspx?paperid=26321">COASTER</a>) system was developed by the YellowStone Ecological Research Center (<a href="https://www.yellowstoneresearch.org/">YERC</a>) in response to the information needs of end-user communities interested in decision-support for natural resource management. The purpose of COASTER is to greatly simplify the process of creating predictor datasets for research exploring environmental impacts driven by climate change, land-use activities, disturbances (fire, flooding, etc) as well as invasive spread such as spine beetle infestations.

## Tools to follow the project
Since we are using an Agile Software Developmement Cycle, we built a <a href="https://trello.com/b/PMgDugQn/esof-423-epiic">Trello Board</a> to clearly showcase our sprint backlog. 

Our Product Backlog and Burndown chart are on <a href="https://drive.google.com/drive/folders/1LpbdXXvM87ijJrofRyG-sicKnggFeYwI?usp=sharing">Google Drive</a>.

## Overview of Project
The project consists of rearchitecting the COASTER system. Since it is still in early development, there are many paths we can take to improve the system. We can either: 
* concentrate on rearchitecting the database and how data is stored and processed
* Expand the current datasets by integrating new public datasets to the COASTER system
* Revamping the front-end interface of COASTER

## Project Goals
Due to the time length of this project, we have decided to expand the current datasets of COASTER and create a prototype user interface on how we would access this data. (Project Goals may change overtime). 

## Project Requirements
The updated COASTER system must function and include the following:
* a web-based application UI (interactive)
* access and processing of publicly available datasets such as those provided by Google Earth Engine

## Project Tasks
Here are some of the following tasks in order to satisfy our project requirements:
* Search and select a predictor dataset to be used for research, exploring environmental impacts that are either natural or caused by humans.
* Identify a publically available source for the dataset as well as the methods availbale to retrieve the data.
* Design an algorithm to map resolution of data to a specified geographic area.
* Implement an interface to capture/validate input parameters.
* Build process to retrieve data from identified data source using specified input parameters.
* Implement machanism to provide retrieved data to user.

## Structure of Project
Since we are using React as our front-end framework and most likely Express as our back-end framework, everything client/front-end related files will live in the client directory. Same thing goes for server/back-end files in the backend diectory. 
Documentation related files will live under the docs directory and same thing goes for the build files and testing related files into the build and test directories, respectively.
