import React from "react";
import './main.css';

function Main() {
  return (
    <div id="content">
      <div id="form">
        <DatasetForm />
      </div>
    </div>
  );
}

class DatasetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

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
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
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
            <option value="oranges">Oranges</option>
            <option value="peaches">Peaches</option>
            <option value="bananas">Bananas</option>
          </select>
          <label for="summarystat">Summary Statistic</label>
          <select id="summarystat" className ="k-form-field">
            <option value="oranges">Oranges</option>
            <option value="peaches">Peaches</option>
            <option value="bananas">Bananas</option>
          </select>
          <label for="summby">Summarize By</label>
          <select id="summby" className ="k-form-field">
            <option value="oranges">Oranges</option>
            <option value="peaches">Peaches</option>
            <option value="bananas">Bananas</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Main;
