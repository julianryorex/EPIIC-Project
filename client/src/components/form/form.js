import React from 'react';
// import Moment from 'react-moment'; 
import "./form.css";
import { MapContainer } from "../maps/MapContainer";
import "../maps/maps.css";
class DatasetForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
			dataset: "AMSR-E",
			startDate: "",
			endDate: "",
			firstMarker: null,
			secondMarker: null
		};
					
      this.commonChange = this.commonChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
    }

    commonChange(event) {
      	this.setState({
        	[event.target.id]: event.target.value
	  	});
    }
  
    handleSubmit(event) {
		event.preventDefault(); // prevents page from reloading
		this.validateForm();
		this.callAPI();
	}

	validateForm() {
		// check for lattitude, longitude,
		// check for dates and dataset
	}

	
	callAPI() {

		const data = {
			dataset: this.state.dataset,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			firstMarker: this.state.firstMarker,
			secondMarker: this.state.secondMarker
		};

		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		};

		fetch(`http://localhost:8080/api/google-test`, requestOptions)
		.then(res => res.json()) // error handling here
		.then(data => {
			
			console.log("Data in response:");
			console.log(data);
		})
		.then(() => {
			alert(
				`You chose the ${this.state.dataset} dataset with a start date of ${this.state.startDate} and an end date of ${this.state.endDate}`
			);
		});
	}


	getLocationData = (marker1, marker2) => { // callback function from MapContainer
		this.setState({
			firstMarker: marker1,
			secondMarker: marker2
		});
		console.log("State set");
	}
	
  
    render() {
      return (
			<form onSubmit={this.handleSubmit}>
				<label className="datasetdropdown">
					<span>Choose Dataset:&nbsp;&nbsp;</span>
					<select
						id="dataset"
						value={this.state.value}
						onChange={this.commonChange}
					>
						<option value="AMSR">AMSR-E</option>
						<option value="CASA-1">CASA_1km</option>
						<option value="CASA-10">CASA_10km</option>
						<option value="CASA-500">CASA_500km</option>
					</select>
				</label>

				<div className="row">
					<div className="date-form col-xl-12">
						<span>Date 1:&nbsp;&nbsp;</span>
						<input
							id="startDate"
							type="date"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
					<div className="date-form col-xl-12">
						<span>Date 2:&nbsp;&nbsp;</span>
						<input
							id="endDate"
							type="date"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
				</div>

				{/* <div className="row">
				  <div id="lattitude" className="col-md-6">
					  Lattitude:&nbsp;&nbsp;
						<input id="lat" type="text" onChange={this.commonChange} required />
					</div>
				  <div id="longitude" className="col-md-6">
					  Longitude:&nbsp;&nbsp;
						<input id="lng" type="text" onChange={this.commonChange} required />
					</div>
			  	</div>
				
			  	<button onClick={this.locateArea} type="button" className="btn btn-outline-secondary" name="find">Find Area</button> */}

				<div className="col-xl mapContainer">
					<div id="map">
						<MapContainer
							parentCallback={this.getLocationData}
						/>
					</div>
				</div>

				<div className="space">
					{/* additional space for better design */}
				</div>

				<button
					type="submit"
					value="Submit"
					className="btn btn-outline-secondary"
				>
					Submit
				</button>
			</form>
		);
    }
  }

export default DatasetForm;