import React from 'react';
import '../main-content/main.css';

class DatasetForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'AMSR-E'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('You chose dataset ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label className="datasetdropdown">
            <span>Choose Dataset: </span>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="AMSR">AMSR-E</option>
              <option value="CASA">CASA_10km</option>
              <option value="CASA">CASA_1km</option>
              <option value="CASA">CASA_500km</option>
            </select>
          </label>
          <div id="topform">
              <input className="k-textbox" placeholder="Date 1" />
              <input className="k-textbox" placeholder="Date 2" />
          </div>
          <div id="formleft">
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
            <select id="Variables" className ="k-form-field">
              <option value="oranges">Atmospheric Water Vapor</option>
              <option value="peaches">Open Water Fraction</option>
              <option value="bananas">Vegetation Opacity</option>
            </select>
            <label for="summarystat">Summary Statistic</label>
            <select id="summarystat" className ="k-form-field">
              <option value="oranges">Mean</option>
              <option value="peaches">Std Dev</option>
              <option value="bananas">Range</option>
            </select>
            <label for="summby">Summarize By</label>
            <select id="summby" className ="k-form-field">
              <option value="oranges">All Years</option>
              <option value="peaches">Per Year</option>
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default DatasetForm;