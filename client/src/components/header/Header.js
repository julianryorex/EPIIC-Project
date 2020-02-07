import React from 'react';


function Header() {
    return (
    	<div>
    		<Banner />   
			</div>
    );
}


function Banner() {
    return (
      <nav className="banner navbar-expand-lg navbar navbar-dark bg-dark sticky-top">
        <a className="navbar-brand mb-0 h1" href="#">
          EPIIC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="#">
              About
            </a>
            <a className="nav-item nav-link" href="#">
              Contact
            </a>
          </div>
        </div>
      </nav>
    );
}

export default Header;