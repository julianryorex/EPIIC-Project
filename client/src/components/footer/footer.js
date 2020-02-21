import React from "react";
import Clock from "../clock/Clock.js";
import '../main-content/main.css';



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
      <p>Work in Progress by: Julian, Michaela, and Norman.</p>
      <Clock />
    </nav>
  );
}

export default Footer;
