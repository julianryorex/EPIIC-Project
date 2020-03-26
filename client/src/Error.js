import React from 'react'
import Err from "./components/error/Error.js"
import './App.css';


function ErrorPage() {
    return (
        <div id="container">
            <div id="main">
                <Err />
            </div>
        </div>
    );
}

export default ErrorPage; 