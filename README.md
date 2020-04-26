# *EPIIC Center* for Yellowstone Ecological Research Center (YERC)

## Introduction

The Customized Online Aggregation and Summarization Tool for Environmental Rasters  [COASTER](https://www.scirp.org/journal/paperinformation.aspx?paperid=26321) system was developed by the Yellowstone Ecological Research Center [YERC](https://www.yellowstoneresearch.org/) in response to the information needs of end-user communities interested in decision-support for natural resource management. The purpose of COASTER is to greatly simplify the process of creating predictor datasets for research exploring environmental impacts driven by climate change, land-use activities, disturbances (fire, flooding, etc) as well as invasive spread such as spine beetle infestations.

## Overview and Goals

The project consists of rearchitecting the COASTER system. At the time, COASTER was a great resource for getting environmental public datasets. However, it was not designed to last and the system did not undergo any periodic maintenance.

By componetizing all subsystems, the EPIIC Center will be fully modular, allowing subsystems to be swapped by newer ones in the future. On top of that, since this project is a prototype, we are hoping for these modules to be utilized in some shape or form during the production build.

The **EPIIC Center Project** will take modularity into consideration during the design stage; the system will have an easy-to-swap design that can easily be extendable and scalable in the future.

**The goal is to create a *prototype* of a refined COASTER system by componetizing all subsystems and using newer and more appropriate technologies.**

## Project Requirements

At the highest level, the **EPIIC Center system** (updated COASTER system) must include the following:

* a web-based application UI (interactive)
* access and processing of publicly available datasets such as those provided by Google Earth Engine, Microsoft, or NASA.

To be more specific, here are some required components for the EPIIC Center:

* Create a system that extracts data from public datasets (such as Google Earth Engine) and make it easily available
* Create a simple user interface to easily choose subsets of the public datasets
* Visualize the requested dataset on the UI

## Other Documentation

All other documentation will be located in `/docs`.
If you are a *potential user*, please refer to the user documentation.
If you are a *potential developer*, please refer to the dev documentation.
If you are a developer wanting to utilize *EPIIC Center's API*, please refer to the API documentation.

## Tools to follow the project

To follow this project, please refer to the links below.

* [Product Backlog](https://docs.google.com/spreadsheets/d/1r663v8wYGnEqELmsFqcDvOgluQDIYd4GUTgDRUXsdOU/edit?usp=sharing)
* [Burndown Chart](https://drive.google.com/file/d/1Y3G-vfsVTwhT0hvc5Igi2pwMmao0OJRl/view?usp=sharing)
* [Sprint Backlog](https://trello.com/b/PMgDugQn/esof-423-epiic)