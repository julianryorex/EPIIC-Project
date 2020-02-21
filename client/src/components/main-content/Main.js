import React from "react";
import './main.css';

function Main() {
  return (
<<<<<<< HEAD
    <div id="content">
      <div id="form">
        <DatasetForm />
      </div>
=======
    <div id="construction">
      <h1>
        Webpage Under Construction!
      </h1>
      <h3>
        More info here at our <a href="https://github.com/julianryorex/EPIIC-Project">GitHub!</a>
      </h3>
>>>>>>> 2c0137d32c57e83878c7f1ca24aa74cee81942d2
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
