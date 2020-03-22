import React from "react";
import {
	Map,
	GoogleApiWrapper,
	Marker,
	// DrawingManager
} from "google-maps-react";



export class MapContainer extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			stores: [],
			// set to bozeman for now. (change to yellowstone later)
			startLocation : { lattitude: "45.676998", longitude: "-111.042931" }
		};
		 
		
	}



	displayMarkers = () => {
		return this.state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.latitude,
						lng: store.longitude
					}}
					onClick={() => console.log("You clicked me!")}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<Map
					google={this.props.google}
					zoom={9}
					initialCenter={{ lat: this.state.startLocation.lattitude, lng: this.state.startLocation.longitude }}
				>
					{this.displayMarkers()}
				</Map>
			</div>
		);
	}
}

MapContainer = GoogleApiWrapper({
	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
})(MapContainer);



// export default GoogleApiWrapper({
// 	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
// })(MapContainer);
