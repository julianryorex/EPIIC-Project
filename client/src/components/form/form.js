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
		this.getLocationData = this.getLocationData.bind(this);	
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
		this.setState( {
			[updateState]: event.target.value
		});
		event.target.value = 0;
	}
  
    handleSubmit(event) {
		event.preventDefault(); // prevents page from reloading
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
			alert("Please select a set of coordinates.");
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

		let url;
		if (process.env.NODE_ENV === "development") url = "http://localhost:8080/";
		else if (process.env.NODE_ENV === "production") url = window.location.href;

		fetch(`${url}api/get-precipitation`, requestOptions)
			.then((res) => res.json()) // error handling here
			.then((data) => {
				console.log("Data in response:");
				console.log(data);
				if(data.success === false) {
					alert(`Failed request. ${data.msg}`);
				}
				else {
					console.log(data);
					alert(
						`The request has been successfully processed.`
					);
				}
			})
			.catch((err) => {
				console.error(err);
				alert("There is a problem connecting to the server.");
			});
	}


	getLocationData = (marker1, marker2) => { // callback function from MapContainer
		marker1 = (typeof marker1 === 'undefined') ? "" : marker1;
		marker2 = (typeof marker2 === 'undefined') ? "" : marker2;
		
		this.setState({
			firstMarker: marker1,
			secondMarker: marker2
		});
	}
	
  
    render() {
		const firstLat = typeof this.state.firstMarker === 'undefined' ? "" : this.state.firstMarker.lat;
		const firstLng = typeof this.state.firstMarker === 'undefined' ? "" : this.state.firstMarker.lng;
		const secondLat = typeof this.state.secondMarker === 'undefined' ? "" : this.state.secondMarker.lat;
		const secondLng = typeof this.state.secondMarker === 'undefined' ? "" : this.state.secondMarker.lng;

      return (
			<form onSubmit={this.handleSubmit}>
				<div className="formInputs">
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
				
				<div className="container">
					<div className="row">
					
						<div id="left-corner" className="col-md-6">
							<div className="loc-title pad">Top Left Corner</div>
							<div className="coordinate">Latitude:&nbsp;&nbsp;<span className="coor" id="left-lat">{firstLat}</span></div>
							<div className="coordinate">Longitude:&nbsp;&nbsp;<span className="coor"id="left-lng">{firstLng}</span></div>
						</div>
						<div id="right-corner" className="col-md-6">
							<div className="loc-title pad">Bottom Right Corner</div>
							<div className="coordinate">Latitude:&nbsp;&nbsp;<span className="coor" id="right-lat">{secondLat}</span></div>
							<div className="coordinate">Longitude:&nbsp;&nbsp;<span className="coor" id="right-lng">{secondLng}</span></div>
						</div>
					</div>
				</div>

				
				<div className="space"></div>
				Select latitude and longitude coordinates by clicking on the map.
				<br></br>
				(Right click on the map to clear coordinates.)
				
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
				</div>
				<div className="col-xl mapContainer">
					<div id="map">
						<MapContainer
							ref={this.mapContainerRef}
							parentCallback={this.getLocationData}
						/>
					</div>
				</div>
			</form>
		);
    }
  }

export default DatasetForm;