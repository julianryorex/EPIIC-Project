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
			{/* <a class="navbar-brand" href="#"> // for YERC
				<img className='logo'
					src="https://images.squarespace-cdn.com/content/v1/5c08491db10598331390f84a/1548706026875-9D52X7YA5B7CSSXEERD1/ke17ZwdGBToddI8pDm48kFwLpwhcqxzfNuBZPTq0g3kUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dkPRDYBYuFCljTJGkxECrqXbelgZhhOaZvxWxj4cwWJiCjLISwBs8eEdxAxTptZAUg/favicon.ico"
					alt=""
				/>
			</a> */}
			<NavLink
				className="text-decoration-none navbar-brand mb-0 h1"
				to="/Main"
			>
				EPIIC Project
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