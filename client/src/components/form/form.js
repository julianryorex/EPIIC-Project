import React from 'react';
import '../main-content/main.css';

class DatasetForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {dataset: 'AMSR-E',
                    startDate : '',
                    endDate : ''};
      this.commonChange = this.commonChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    commonChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
	// the setState is not working for some reason....
	// will look into it
    handleSubmit(event) {
		event.preventDefault();

		fetch(
			`/api/google-earth-data-test?startDate=${this.state.startDate}&endDate=${this.state.endDate}`,
			{method: 'GET'}
		).then(res => res.json())
		.then(data => {
			console.log(`Data: ${data}`);
			this.setState( { 
				startDate : data.startDate,
				endDate : data.endDate
			});
			console.log(`New changes: ${this.state.startDate} and ${this.state.endDate}`);
		});
		
    	alert(`Upon submission, startDate is ${this.state.startDate} and endDate is ${this.state.endDate}`);
    	
	}
	
	// callAPI() {
	// 	fetch(
	// 		`/api/google-earth-data-test?startDate=${this.startDate}&endDate=${this.endDate}`,
	// 		{ method: "GET" }
	// 	).then(res => res.json())
	// 			.then(data => {
	// 				this.setState({
	// 					startDate: data.startDate,
	// 					endDate: data.endDate
	// 				});
	// 				console.log("Done");
	// 			}
	// 				)	
	// }


    componentDidMount() {
    //   fetch(`/api/google-earth-data-test?startDate=${this.startDate}&endDate=${this.endDate}`, 
    //     {method: "GET"})
    //   .then(res => res.json()
    //   .then(data => this.setState({startDate : data.startDate,
    //                             endDate : data.endDate}
    //   )));

    }
  
    render() {
      return (
			<form onSubmit={this.handleSubmit}>
				<label className="datasetdropdown">
					<span>Choose Dataset: </span>
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
				<div id="topform">
					<input
						type="text"
						className="k-textbox"
						id="startDate"
						placeholder="Date 1"
						onChange={this.commonChange}
					/>
					<input
						type="text"
						className="k-textbox"
						id="endDate"
						placeholder="Date 2"
						onChange={this.commonChange}
					/>
				</div>
				{/* <div id="formleft">
					<label className="k-form-field">
						<span>Upper Left Corner</span>
						<input className="k-textbox" placeholder="Latitude" />
						<input className="k-textbox" placeholder="Longitude" />
					</label>
					<label className="k-form-field">
						<span>Lower Right Corner</span>
						<input className="k-textbox" placeholder="Latitude" />
						<input className="k-textbox" placeholder="Longitude" />
					</label>
				</div>
				<div id="formright">
					<label for="Variables">Variables</label>
					<select id="Variables" className="k-form-field">
						<option value="oranges">Atmospheric Water Vapor</option>
						<option value="peaches">Open Water Fraction</option>
						<option value="bananas">Vegetation Opacity</option>
					</select>
					<label for="summarystat">Summary Statistic</label>
					<select id="summarystat" className="k-form-field">
						<option value="oranges">Mean</option>
						<option value="peaches">Std Dev</option>
						<option value="bananas">Range</option>
					</select>
					<label for="summby">Summarize By</label>
					<select id="summby" className="k-form-field">
						<option value="oranges">All Years</option>
						<option value="peaches">Per Year</option>
					</select>
				</div> */}
				<input type="submit" value="Submit" />
			</form>
		);
    }
  }

export default DatasetForm;