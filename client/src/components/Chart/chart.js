import React, { Component, createContext } from 'react';
import ReactDOM, { render } from 'react-dom';
import * as JSC from "jscharting";
import '../main-content/main.css';
import '../../App.css';


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
			console.log(dataAsJson);
			dataAsJson.forEach(function (row) {
				dataPoints.push({x: row[date], y: row.NDVI});
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
	render(){
		return (
			<div id="chart" style={{ position: "relative", width: 800, height: 500 }}>
			</div>
		)
	}

}
