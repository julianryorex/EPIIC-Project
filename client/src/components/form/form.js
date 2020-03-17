import React from 'react';
// import Moment from 'react-moment'; 
import "./form.css";
class DatasetForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
			dataset: "AMSR-E",
			startDate: "", // eventually use moment.js for dates.
			endDate: ""
		};
					
      this.commonChange = this.commonChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
    }

    commonChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit(event) {
		event.preventDefault(); // prevents page from reloading
		this.callAPI();
	}
	
	callAPI() {
		fetch(
			`http://localhost:8080/api/google-test?startDate=${this.state.startDate}&endDate=${this.state.endDate}`,
			{ method: "GET" }
		)
			.then(res => res.json())
			.then(data => {
				console.log(`Setting new states...`);
				this.setState({
					startDate: data.startDate,
					endDate: data.endDate
				});
				console.log(
					`New changes: '${this.state.startDate}' and '${this.state.endDate}'`
				);
			})
			.then(() => {
				alert(
					`You chose the ${this.state.dataset} dataset with a start date of ${this.state.startDate} and an end date of ${this.state.endDate}`
				);
			});
	}


    componentDidMount() {

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
						<option disabled selected>
							Dataset
						</option>
						<option value="AMSR">AMSR-E</option>
						<option value="CASA-1">CASA_1km</option>
						<option value="CASA-10">CASA_10km</option>
						<option value="CASA-500">CASA_500km</option>
					</select>
				</label>

				<div className="row">
					<div className="date-form col-xl-12">
						<span>Date 1:&nbsp;&nbsp;</span>
						<input
							type="date"
							id="startDate"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
					<div className="date-form col-xl-12">
						<span>Date 2:&nbsp;&nbsp;</span>
						<input
							type="date"
							id="endDate"
							data-parse="date"
							onChange={this.commonChange}
							required
						/>
					</div>
				</div>
				<button type="submit" value="Submit" className="btn btn-outline-secondary">Submit</button>
				{/* <input type="submit"  /> */}
			</form>
		);
    }
  }

export default DatasetForm;