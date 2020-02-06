import React, { Component } from 'react';
import logo from './logo.svg';
import Clock from './Clock';
import './App.css';
import MainContainer from './MainContainer';
import Nav from './Nav';


class App extends Component {
  render() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>EPIIC</h2>
        <p>
          Link Here.
        </p>
      </div>
        <p className="App-intro">
          Work in Progress By {this.props.name}.
        </p>
        <Clock ></Clock>
      </div>
  );
}
}
export default App;
