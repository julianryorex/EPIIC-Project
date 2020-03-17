import React from "react";
import Clock from "../clock/Clock.js";
import "../main-content/main.css";

// not sure why this will not get capitalized.... 

function Footer() {
	return (
		<div>
			<Banner />
		</div> 
	);
}

function Banner() {
	return (
		<nav className="footer bg-dark text-white text-center">
			<p>Work in Progress by: Julian, Michaela, and Norman...</p>
			<p>Powered by <a id="YERC-footer" href="https://www.yellowstoneresearch.org/">YERC</a>.</p>
			<Clock />
		</nav>
	);
}

export default Footer;
