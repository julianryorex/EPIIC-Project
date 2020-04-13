import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import "../maps/maps.css";
import '../../App.css';


function Main() {
	return (
		<div id="main">
			<div id="form">
				<DatasetForm />
			</div>

			<div className="space"></div>
			<div className="space"></div>
		</div>
	);
}



export default Main;
