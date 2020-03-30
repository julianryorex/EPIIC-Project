import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import "../maps/maps.css";
import '../../App.css';
import Chart from '../Chart/chart';



function Main() {
	return (
		<div id="main">
			<div id="form">
				<DatasetForm />
			</div>
			<div className="space">
				{/* add description for the map here.  */}
			</div>

			<div>
				<div id="chart">
					<Chart />
				</div>
			</div>
			<div className="space">
				{/* additional space for better design */}
			</div>
		</div>
	);
}



export default Main;
