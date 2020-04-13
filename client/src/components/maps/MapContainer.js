import React from "react";
import {
	Map,
	GoogleApiWrapper,
	Marker
	}
 from "google-maps-react";
// import { Rectangle } from "react-google-maps";


export class MapContainer extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			// set to bozeman for now. (change to yellowstone later)
			startLocation : { lattitude: "45.676998", longitude: "-111.042931" },
			firstMarker : null,
			secondMarker: null,
			activeMarker: {},
			showingInfoWindow: false
		};
		

		this.mapClicked = this.mapClicked.bind(this);
		this.handleMapReady = this.handleMapReady.bind(this);
		this.clearMarkers = this.clearMarkers.bind(this);
	}

	handleMapReady(mapProps, map) {
		map.setOptions({
			draggableCursor: "pointer",
		});
	}



	mapClicked(mapProps, map, clickEvent) {

		let coordindates = JSON.stringify(clickEvent.latLng);
		if (this.state.firstMarker == null) { 
			this.handleLocation(coordindates, 1);
		}
		else if (this.state.secondMarker == null) {
			this.handleLocation(coordindates, 2);
		}

		// if both coordinates are set, we send the data to the parent class form.js for form submission to API.
		if(this.state.firstMarker != null && this.state.secondMarker != null) {
			this.props.parentCallback(this.state.firstMarker, this.state.secondMarker);
		}
		
	}



	handleLocation(coordinates, markerNum) {
		let conversion = JSON.parse(coordinates);
		if(markerNum === 1) {
			this.setState({
				firstMarker: {
					lat: conversion.lat,
					lng: conversion.lng
				}
			});
		}
		else if(markerNum === 2) {
			this.setState({
				secondMarker: {
					lat: conversion.lat,
					lng: conversion.lng
				}
			});
		}
	}


	drawMarker() {
		const coordinates_arr = [this.state.firstMarker, this.state.secondMarker];
		let marker_arr = [];
		for (let index = 0; index < coordinates_arr.length; index++) {
			if(coordinates_arr[index] != null) {
				marker_arr.push(
				<Marker
					label={(index+1).toString()}
					onClick={this.onMarkerClick}
					key={index}
					position={coordinates_arr[index]}
				/>
				);
			}
		}
		return(marker_arr);
	}

	clearMarkers = (mapProps, map, clickEvent) => {
		this.setState({
			firstMarker: null,
			secondMarker: null
		});
		console.log("clear markers...");
		this.props.parentCallback();
		// console.log(this.props);
	};


	render() {
		return (
			<div>
				
				<Map
					google={this.props.google}
					zoom={9}
					initialCenter={{ lat: this.state.startLocation.lattitude, lng: this.state.startLocation.longitude }}
					onRightclick={this.clearMarkers}
					// onRightclick={() => console.log(this.props)}
					onClick={this.mapClicked}
					onReady={this.handleMapReady}
					// onIdle={console.log}
				>
					{this.drawMarker()}
					
				</Map>
			</div>
		);
	}
}

MapContainer = GoogleApiWrapper({
	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
})(MapContainer);
