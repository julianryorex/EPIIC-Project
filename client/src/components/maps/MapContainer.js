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
        // const mapStyles = {
		// 	width: "10%",
		// 	height: "30%"
		// };

		this.state = {
			stores: [
				{ lat: 47.49855629475769, lng: -122.14184416996333 },
				{ latitude: 47.359423, longitude: -122.021071 },
				{ latitude: 47.2052192687988, longitude: -121.988426208496 },
				{ latitude: 47.6307081, longitude: -122.1434325 },
				{ latitude: 47.3084488, longitude: -122.2140121 },
				{ latitude: 47.5524695, longitude: -122.0425407 }
			]
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
			<Map
				google={this.props.google}
				zoom={8}
				style={this.mapStyles}
				initialCenter={{ lat: 47.444, lng: -122.176 }}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}

MapContainer = GoogleApiWrapper({
	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
})(MapContainer);



// export default GoogleApiWrapper({
// 	apiKey: "AIzaSyDEZvbIV9rDUxIxtsnsq_xQ5UjnMo0P4-s"
// })(MapContainer);
