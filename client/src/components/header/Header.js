import React from 'react';
import { NavLink } from "react-router-dom";


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
			<NavLink
				className="text-decoration-none navbar-brand mb-0 h1"
				to="/"
			>
				<img
					src="//static1.squarespace.com/static/5c08491db10598331390f84a/t/5c0ff31a575d1fa8aa95d76d/1584398124749/?format=1500w"
					alt="YERC"
					width="80"
					height="50"
				></img>
				&nbsp;&nbsp;EPIIC Project
			</NavLink>
			<span className="sr-only">(current)</span>
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