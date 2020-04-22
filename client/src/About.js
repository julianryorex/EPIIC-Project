import React from 'react' 
import './App.css';
import './Content.css';


function About(){
    return(
        <div id="container">
            <div id="Aboutmain">
                <h1>About the EPIIC Project</h1>
                <p>The Customized Online Aggregation and Summarization Tool for Environmental Rasters COASTER system was developed by the Yellowstone Ecological Research Center, YERC, in response to the information needs of end-user communities interested in decision-support for natural resource management. The purpose of COASTER was to greatly simplify the process of creating predictor datasets for research exploring environmental impacts driven by climate change, land-use activities, disturbances (fire, flooding, etc) as well as invasive spread such as pine beetle infestations.</p>
                <p>The EPIIC Project consists of rearchitecting the COASTER system. At the time, COASTER was a great resource for getting environmental public datasets. However, it was not designed to last and maintenance was never done to the system. This project will take those elements into consideration during the design stage; we are hoping to build a sustainable system that can easily be scalable in the future. The goal of the project is to recreate a system, similar to COASTER, using newer and more appropriate technologies.</p>
                <h6>For more information, see our <a href="https://github.com/julianryorex/EPIIC-Project">Github Repository</a> for this project.</h6>
            </div>
        </div>
    )
}


export default About; 