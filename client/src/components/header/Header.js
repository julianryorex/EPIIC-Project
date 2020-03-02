import React from 'react';
import { Route, NavLink, Link } from "react-router-dom";

import About from "../../About.js"
import Contact from "../../Contact.js"

function Header() {
    return (
    	<div>
    		<Banner />   
			</div>
    );
}


function Banner() {
    return (
		<nav className="banner navbar-expand-md navbar navbar-dark bg-dark sticky-top">
			<li>
				<NavLink className="navbar-brand mb-0 h1" to="/Main">
					EPIIC Project
				</NavLink>
				<span className="sr-only">(current)</span>
			</li>
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
					<li className="text-decoration-none">
						<NavLink className="nav-item nav-link" to="/About">
							About
						</NavLink>
					</li>
					<li className="text-decoration-none">
						<NavLink className="nav-item nav-link" to="/Contact">
							Contact
						</NavLink>
					</li>
				</div>
			</div>
		</nav>
	);
}

export default Header;