import React from "react";
import {
	Map,
	GoogleApiWrapper,
	Marker,
	InfoWindow

	} from "google-maps-react";
import { Polyline } from "react-google-maps";


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
		this.onMarkerClick = this.onMarkerClick.bind(this);
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
		console.log("Current state:");
		console.log(this.state);
		const coordinates_arr = [this.state.firstMarker, this.state.secondMarker];
		let marker_arr = [];
		for (let index = 0; index < coordinates_arr.length; index++) {
			// console.log("coordinates_arr[index]");
			// console.log(coordinates_arr[index] != null);
			if(coordinates_arr[index] != null) {
				// console.log("Inside if stmt drawMarker");
				marker_arr.push(
				<Marker
					label={(index+1).toString()}
					onClick={this.onMarkerClick}
					key={index}
					position={coordinates_arr[index]}
				>
						<InfoWindow
							key={index}
							visible={true}>
							<div>{"INFOWINDOW!"}</div>
						</InfoWindow>
				</Marker>
				);
			}
		}
		return(marker_arr);
	}

	onMarkerClick() {

	}

	drawArea() {
		if(this.state.firstMarker != null && this.state.secondMarker != null) {
			console.log("Right before rectangle");
			console.log(`${this.state.firstMarker.lat} and ${this.state.firstMarker.lng}`);
			console.log(typeof this.state.firstMarker.lat + " " +  typeof this.state.firstMarker.lng);
			console.log(this.state.firstMarker);
			

			let triangleCoords = [
				{ lat: this.state.firstMarker.lat , lng: this.state.firstMarker.lng },
				{ lat: this.state.secondMarker.lat , lng: this.state.secondMarker.lng }
				
			];
			console.log("triangleCoords is set.");
			console.log(triangleCoords);
			
			return (
				<Polyline
					path={triangleCoords}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#0000FF"
					fillOpacity={0.35}
				/>
				
			);
		}
	}

	clearMarkers = (mapProps, map, clickEvent) => {
		this.setState({
			firstMarker: null,
			secondMarker: null
		});
	};




	render() {
		return (
			<div>
				
				<Map
					google={this.props.google}
					zoom={9}
					initialCenter={{ lat: this.state.startLocation.lattitude, lng: this.state.startLocation.longitude }}
					onRightclick={this.clearMarkers}
					onClick={this.mapClicked}
					onReady={this.handleMapReady}
				>
					{this.drawMarker()}
					{/* {this.drawArea()} */}
					
				</Map>
			</div>
		);
	}
}

MapContainer = GoogleApiWrapper({
	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
})(MapContainer);
