import * as JSC from "jscharting";
import React, { Component } from 'react'; 
// import { render } from 'react-dom';
// import { Line } from 'react-chartjs-2'; 
import '../main-content/main.css';
import '../../App.css';
import Skeleton from "@yisheng90/react-loading";


export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true};
		
	}


	componentDidMount() {
		let thisChart = this;
		// let url;
		// if (process.env.NODE_ENV === "development") url = "http://localhost:8080/";
		// else if (process.env.NODE_ENV === "production") url = window.location.href;
		// console.log(url);

		fetch('https://raw.githubusercontent.com/julianryorex/EPIIC-Project/master/docs/ee-chart.csv')
		
			.then(function (response) {
				return response.text();
			})
			.then(function (text) {
				let series = csvToSeries(text); 
				
				thisChart.setState({ loading: false });
				renderChart(series);
				
			})
			.catch(function (error){
				console.log(error);
			});
		
			
		function csvToSeries(text){
			const date = "system:time_start";
			let dataAsJson = JSC.csv2Json(text);
			let dataPoints = []; 
			dataAsJson.forEach(function (row) {
				const newDate = new Date(row[date]);
				const d = newDate.getDate();
				const month = newDate.getMonth();
				const adjMonth = month + 1; 
				const year = newDate.getFullYear();
				const dateStr = adjMonth + "/" + d + "/" + year;
				dataPoints.push({x: dateStr, y: row.NDVI});
			});
			return [
				{name: 'NDVI', points: dataPoints}
			];
		}

		function renderChart(series) {
			JSC.Chart('chart', {
				type: 'line',
				title:{
					label:{
						text: 'Time Series Data',
						style_fontSize: 16
					},
					position: 'center'
				},
				legend_visible: false,
				yAxis: {
					label_text: 'Normalized Difference Vegetation Index'
				},
				xAxis:{
					label_text: 'Collected Date',
					scale: {
						type: 'time', 
						interval: { unit: 'year'},
						range_padding: 0
					}
				},
				xAxis_crosshair_enabled: true, 
				defaultPoint_tooltip: 'NDVI: <b>%yValue</b>',
				series: series
			});
		}
	} 
	
	render() {
		if(this.state.loading) {
			console.log("inside loading!");	
			return (
			<div style={{padding: "5%"}}>
				<Skeleton width={window.innerWidth - window.innerWidth * (10/100)} height="3rem" />
				<Skeleton width={window.innerWidth - window.innerWidth * (20/100)} height="3rem" />
				<Skeleton width={window.innerWidth - window.innerWidth * (30/100)} height="3rem" />
			</div>
		);

		}
		else {
			console.log("inside not loading!!");
			return (
				<div>
					<div
						id="chart"
						style={{ position: "relative", width: 800, height: 500 }}
					></div>
					<div className="space"></div>
				</div>
			);
		}
		
	}

}
