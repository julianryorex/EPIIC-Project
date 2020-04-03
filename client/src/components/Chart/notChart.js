import React, { Component } from 'react'; 
import { render } from 'react-dom';
import { Line } from 'react-chartjs-2'; 
import '../main-content/main.css';
import * as JSC from "jscharting"; 


export default class Chart extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                labels: ["Mar 24, 2013", "Mar 29, 2013", "Apr 3", "Apr 13", "Apr 22", "Apr 29", "May 15", "May 24", "May 31", "Jun 9", "Jun 16", "Jun 25", "Jul 2", "Jul 11", "Jul 18", "Jul 27"],
                datasets: [
                    {
                        label: "NDVI",
                        fill: false, 
                        borderColor: "black",
                        borderwidth: 1,
                        lineTension: 0, 
                        data: [, 0.126, , 0.127, 0.13, 0.146, 0.146, 0.15, 0.151, , , 0.149, , 0.149, ]
                    },
                    // {
                    //     label: "Data 2", 
                    //     backgroundColor: "rgba(0, 255, 0, 0.75)",
                    //     data: [14, 15, 21, 0, 12, 44, 32]
                    // }
                ]
            }
        }
    }

    setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d'); 
        const gradient = ctx.createLinearGradient(0, 0, 600, 550);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, "rgba(133, 255, 144, 0.5)");
        return gradient; 
    }

    getChartData = canvas => {
        const data = this.state.data;
        if (data.datasets) {
            let colors = ["rgba(255, 0, 255, 0.75)", "rgba(25, 20, 255, 0.75)", "rgba(255, 50, 25, 0.75)"]
            data.datasets.forEach((set, i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                //set.borderColor = "blue";
                set.borderWidth = 2; 
            });
        }
        return data;
    }

    render(){
        return (
            <div id="chart" style={{ position: "relative", width: 800, height: 550 }}>
                <h3>Time Series Data</h3>
                <Line
                    options={{
                        responsive: true
                    }}
                    data={this.getChartData}
                />
            </div>
        )
    }
}

