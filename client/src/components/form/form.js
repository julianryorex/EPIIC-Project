import React from 'react';
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
			firstMarker: "",
			secondMarker: ""
		};

		this.mapContainerRef = React.createRef();
					
		this.commonChange = this.commonChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.clearCoordinates = this.clearCoordinates.bind(this);
		// this.getLocationValue = this.getLocationValue.bind(this);	
	}
	
    commonChange(event) {
      	this.setState({
        	[event.target.id]: event.target.value
		  });
	}
	
	changeValue(event) {
		const stateProp = event.target.name;
		const stateSubProp = event.target.id;
		const updateState = stateProp + "." + stateSubProp;
		event.target.value = "";
		console.log(updateState);
		this.setState( {
			[updateState]: event.target.value
		});
		console.log("updatestate:");
		console.log(this.state[stateProp][stateSubProp]);
		event.target.value = 0;
		console.log(event.target.value);
	}


	clearCoordinates = () => {
		this.mapContainerRef.current.setState({ firstMarker: "", secondMarker: "" });
		console.log("HELLOO");
		console.log(this.mapContainerRef.current.state.firstMarker);

	}
  
    handleSubmit(event) {
		event.preventDefault(); // prevents page from reloading
		console.log("validation");
		const valid = this.validateForm();
		if(valid)
			this.callAPI();
	}

	validateForm() {
		if(this.state.dataset == null) {
			alert('Please choose a dataset.');
			return false;
		}
		if(this.state.firstMarker === "" || this.state.secondMarker === "") { 
			alert("Please select two sets of coordinates.");
			return false;
		}
		if(new Date(this.state.startDate) > new Date(this.state.endDate)) {
			alert('Please select a start date earlier than the end date.');
			return false;
		}
		return true; // default
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
				`You chose the ${this.state.dataset} dataset with a start date of ${this.state.startDate} and an end date of ${this.state.endDate}. `// +  
				// `The lattitude of the first point is ${this.state.firstMarker.lat} and longitude is ${this.state.firstMarker.lng}. ` +
				// `The lattitude of the second point is ${this.state.secondMarker.lat} and longitude is ${this.state.secondMarker.lng}.`
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
						<span>Start Date:&nbsp;&nbsp;</span>
						<input
							id="startDate"
							type="date"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
					<div className="date-form col-xl-12">
						<span>End Date:&nbsp;&nbsp;</span>
						<input
							id="endDate"
							type="date"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
				</div>

			  <div className="loc-title pad">Top Left Corner</div>
				<div className="row">
				  <div id="lattitude" className="col-md-6">
					  Lattitude:&nbsp;&nbsp;
						<input id="lat" name="firstMarker" type="text" value={this.state.firstMarker.lat || ""} onInput={e => this.changeValue(e)} required />
					</div>
				  <div id="longitude" className="col-md-6">
					  Longitude:&nbsp;&nbsp;
						<input id="lng" name="firstMarker" type="text" value={this.state.firstMarker.lng || ""} onInput={e => this.changeValue(e)} required />
					</div>
			  	</div>

			  <div className="loc-title pad">Bottom Right Corner</div>
				<div className="row">
					
					<div id="lattitude" className="col-md-6">
					  Lattitude:&nbsp;&nbsp;
							<input id="lat" name="secondMarker" type="text" value={this.state.secondMarker.lat || ""} defaultValue={""} onChange={this.changeValue}  required />
					</div>
					<div id="longitude" className="col-md-6">
					  Longitude:&nbsp;&nbsp;
							<input id="lng" name="secondMarker" type="text" value={this.state.secondMarker.lng || ""} onChange={this.changeValue} required />
					</div>
				</div>

				<div className="space"></div>
				
				<button type="button" className="btn btn-outline-secondary" onClick={this.clearCoordinates}>Clear Coordinates</button>

			  	<div className="space"></div>
				  
				
				

				<div className="col-xl mapContainer">
					<div id="map">
						<MapContainer
							ref={this.mapContainerRef}
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