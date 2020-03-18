import React from "react";
import errorImage from "../../assets/error/error-icon.png"
import "./error.css"
class Error extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: 404
        };
        // Will try to extend this to other errors as well dynamically
    }


    render() {
        return (
            <div>
                <div className="image-div">
                    <img alt="404 error message" id="error-image" src={errorImage}></img>
                </div>
                <div>
                    <br />Something is wrong here...<br />
                    We cannot find the page you are looking for. Sorry.<br />
                    <div className="home-btn">
                        <a className="btn btn-outline-secondary" href="/">Return Home</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;