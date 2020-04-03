import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import "../maps/maps.css";
import '../../App.css';
<<<<<<< HEAD
=======
import Chart from '../Chart/chart';
>>>>>>> 0c10e4199f240903d0e6f247030196cf60f8ac53



function Main() {
	return (
<<<<<<< HEAD
		<div id="container">
			<div id="main">
				<div id="form">
					<DatasetForm />
				</div>
				<div id="space">
					{/* add description for the map here.  */}
				</div>
				<div class="col-xl mapContainer">
					<div id="map">
						<MapContainer />
					</div>
				</div>
				<div id="space">
					{/* additional space for better design */}
=======
		<div id="main">
			<div id="form">
				<DatasetForm />
			</div>

			<div>
				<div id="chart">
					<Chart />
>>>>>>> 0c10e4199f240903d0e6f247030196cf60f8ac53
				</div>
			</div>
			<div className="space">
				{/* additional space for better design */}
			</div>
		</div>
	);
}



export default Main;
