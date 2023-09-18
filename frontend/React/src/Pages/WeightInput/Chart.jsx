import React from 'react';
import {Line} from "react-chartjs-2";
import "chart.js/auto";
import { UserData } from "./Data";
import "./CSS/WeightInput.scss";

export const data = {
  labels: UserData.map((data) => data.day),
  datasets: [
    {
      label: "체중",
      data: UserData.map((data) => data.weight),
      borderColor: "green",
    },
  ],
};

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      min: 40,
      max: 100,
      ticks:{
        stepSize:5,
      }
    },
    x : {
      ticks:{
        stepSize:7,
      }
    }
    
  }
};
const 차트스타일 = {
  // position : "relative",
  weight : "100%",
  margin : "3px",
  height : "40vh",
  marginTop : "3vh",
}

export function Chart () {
  return <Line data={data} options={options} style={차트스타일}/>;
}

export default Chart;