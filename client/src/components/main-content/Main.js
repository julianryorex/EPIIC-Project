import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
import "../maps/maps.css";

function Main() {
	return (
		<div id="content">
			<div id="form">
				<DatasetForm />
			</div>
			
			<div className="space">
				{/* additional space for better design */}
			</div>
      
		</div>
  );
}



export default Main;
