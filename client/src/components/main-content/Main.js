import React from "react";
import './main.css';
import DatasetForm from '../form/form.js'
// import { MapContainer } from "../maps/MapContainer";

function Main() {
  return (
    <div id="content">
      <div id="form">
        <DatasetForm />
        {/* <MapContainer /> */}
      </div>
    </div>
  );
}



export default Main;
