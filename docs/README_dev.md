# Developer Documentation

## Project Technologies

We are using React JS as our frontend framework for our website. By using a component based approach to design the web app, it permits us to reuse certain components for multiple pages, and updating a certain component will propagate throughout the system. Also, converting the web app to a mobile platform would be seamless thanks to React Native.\
More to come for our backend technologies. (We are thinking about using Express JS as our backend framework.\
Data for this project will be stored in a NoSQL Database, which integrates nicely with our backend framework. Since the data we are storing is in a Raster/GeoTiff format, we may need to convert these files to JSON. This conversion will be done with a Python script.

## Getting Started

To get started with this project, clone this [repository](https://github.com/julianryorex/EPIIC-Project) to a local directory (You will need Node Package Manager (npm) installed on your local machine). Since we used create-react-app to initialize this project, many dependencies come with it. On top of that, we are also using external dependencies for this project. In order to download these, navigate from the root directory into the client directory.\
When inside, run the command `npm install`.This will use the package.json file located in the client folder and download all of the required dependencies.\
Once all the dependencies are installed, you are ready to run the web app! Navigate to the client directory if you are already not in there. From there run the command `npm start`. This will start up the node environment where all of the javascript will be compiled and run. This should open up a tab on a browser to showcase the web app. If not, you can go to it by typing [`https://localhost/3000`](https://localhost/3000).

## Layout of the Project

### Frontend

Our frontend files are all located inside the client directory. Inside you will find an images directory with all necessary images and ressources for the web app. If you have run through the "Getting Started" step above and installed all dependencies, you should also see a node_modules directory. This is listed in the .gitignore file so it will not be part of any commit.\
Under, you shall find a public and src directory. Public possesses the index.html file (the markdown for the website) and the src is where all the React lives in. The layout of the src directory should not change, unless new directories are put in place. All new components should live in the components folder, with an additional component folder and a capitalized component.js file inside it. Please respect this format for clarity.

### Backend

All backend files are stored inside the server directory at the root. Here is a quick visual overview of the backend structure:

```
server
│   node_modules
│   .gitignore
│   app.js
│   package.json
│   package-lock.json
│───routes
    └───authenticate.js
    └───googleEarth.js
    └───googleEarthTest.js
    └───routes.js
```

In order to get all backend dependencies, navigate to the server directory and run `npm install`. All dependencies will be installed using the package.json file.
The main backend file is `app.js`; everything will be run through there. For scalability purposes, all routes for  api calls are located in `routes`. All HTTP requests are handled in that directory. You can access the main RESTful api page by sending an HTTP GET request to `http://localhost:5000/api`.

### Building the Project

Any build related files should live in the build directory. We do not have any files in there yet.

### Documentation

In the docs directory, there should be all the documentation for this project (including this file). Please add documentation whever possible! The more docs the better!

### Testing

All testing related files should exist under the test directory. We are using [Travis CI](https://travis-ci.org/) for continuous integration, so all .yaml files should be in test.

(more to come...)
