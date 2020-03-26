import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import { MapContainer } from "../maps/MapContainer";
import "../maps/maps.css";
import '../../App.css';
import Chart from '../Chart/chart.js';



function Main() {
	return (
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
				<div> 
					<div id="chart">
						<Chart />
					</div>
				</div>
				<div id="space">
					{/* additional space for better design */}
				</div>
			</div>
		</div>
  );
}



export default Main;
