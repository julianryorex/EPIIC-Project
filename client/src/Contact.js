import React from 'react' 
import './App.css';


function Contact(){
    return(
        <div id="container">
            <div id="Contactmain">
                <div id="YERCcontact">
                    <h2>Contact YERC</h2>
                    <br></br>
                    <h4>Office</h4>
                    <p>2048 Analysis Dr. Ste. B, Bozeman, MT 59718</p>
                    <h4>Phone</h4>
                    <p>406-556-1414</p>
                    <h4>Email</h4>
                    <p>info@yellowstoneresearch.org</p>
                    <h4>Website</h4>
                    <p><a href="https://www.yellowstoneresearch.org/">https://www.yellowstoneresearch.org/</a></p>
                </div>

                <div id="mini-footer">
                    <br></br>
                    <h6>See our <a href="https://github.com/julianryorex/EPIIC-Project">Github Repository</a> for more information about the EPIIC Project.</h6>
                </div>
            </div>
        </div>
    );
}

export default Contact; 