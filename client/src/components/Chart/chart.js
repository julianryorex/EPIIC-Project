import React, { Component } from 'react'; 
// import { render } from 'react-dom';
import { Line } from 'react-chartjs-2'; 
import '../main-content/main.css';


export default class Chart extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7"],
                datasets: [
                    {
                        label: "Data 1",
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data: [4, 5, 1, 10, 32, 2, 12]
                    },
                    {
                        label: "Data 2", 
                        backgroundColor: "rgba(0, 255, 0, 0.75)",
                        data: [14, 15, 21, 0, 12, 44, 32]
                    }
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
                set.borderColor = "white";
                set.borderWidth = 2; 
            });
        }
        return data; 
    }

    render(){
        return (
            <div id="chart" style={{ position: "relative", width: 800, height: 550 }}>
                <h3> Chart Samples</h3>
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