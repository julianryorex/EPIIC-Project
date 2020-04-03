import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import "../maps/maps.css";
import '../../App.css';
import Chart from '../Chart/Chart';
import {MapContainer} from '../maps/MapContainer';



function Main() {
	return (
		<div id="container">
			<div id="main">
				<div id="form">
					<DatasetForm />
				</div>

				<div className="space"></div>

				{/* <div class="col-xl mapContainer">
					<div id="map">
						<MapContainer />
					</div>
				</div> */}
				<div className="space"></div>
				{/* <div id="space"></div> */}
			</div>
		</div>
	);
}



export default Main;
