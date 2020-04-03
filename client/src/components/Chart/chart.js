import React, { Component } from 'react'; 
// import { render } from 'react-dom';
// import { Line } from 'react-chartjs-2'; 
import '../main-content/main.css';
import '../../App.css';
import * as JSC from "jscharting"; 


export default class Chart extends Component {
	constructor(props) {
		super(props);
	
		

		fetch('https://raw.githubusercontent.com/julianryorex/EPIIC-Project/dev/docs/ee-chart.csv')
			.then(function (response) {
				return response.text();
			})
			.then(function (text) {
				let series = csvToSeries(text); 
				renderChart(series);
			})
			.catch(function (error){
				console.log(error);
			});
			
			
		function csvToSeries(text){
			const date = "system:time_start";
			let dataAsJson = JSC.csv2Json(text);
			let dataPoints = []; 
			console.log("Array?");
			console.log(dataAsJson);
			dataAsJson.forEach(function (row) {
				console.log(new Date(row[date]).getDate());
				const newDate = new Date(row[date]);
				const d = newDate.getDate();
				const month = newDate.getMonth();
				const year = newDate.getFullYear();
				const dateStr = d + "/" + month + "/" + year;
				dataPoints.push({x: dateStr, y: row.NDVI});
			});
			return [
				{name: 'NDVI', points: dataPoints}
			];
		}

		function renderChart(series) {
			JSC.Chart('chart', {
				title_label_text: 'Time Series Data',
				legend_visible: false,
				defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
				xAxis_crosshair_enabled: true, 
				series: series
			});
		}
	}
	
	render() {
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
