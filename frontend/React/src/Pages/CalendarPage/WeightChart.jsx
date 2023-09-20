import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserData } from "./Data";
import { Typography, Divider, Grid, LinearProgress, Box } from "@mui/material";
import { 목표체중, 기간, 현재체중, 시작체중 } from "../WeightInput/WeightInput";

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
      ticks: {
        stepSize: 5,
      },
    },
    x: {
      ticks: {
        stepSize: 7,
      },
    },
  },
};
const 차트스타일 = {
  display: "flex",

  width: "100%",
  marginTop: "3vh",
  height: "35vh",
};

export function WeightChart({ 날짜 }) {
  const percentage = (1- ((시작체중 - 목표체중) - (현재체중 - 목표체중)) / (시작체중 - 목표체중)) * 100;

  return (
    <div
      className="white-content-box"
      style={{
        marginTop: "2vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography style={{ textAlign: "center", fontSize: "2rem" }}>
        {날짜.format("MM월 DD일")}
      </Typography>
      <Divider />
      <div style={차트스타일}>
        <Line data={data} options={options} />
      </div>
      <Divider />
      <div style={{marginTop : "3vh"}}>
        <span style={{fontSize : "1.5rem"}}>현재 체중 : {현재체중}</span>
      </div>
      <Grid container sx={{mt : 3}}>
        <Grid xs={6}>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              whiteSpace: "nowrap",
            }}
          >
            목표체중 : {목표체중}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              whiteSpace: "nowrap",
            }}
          >
            남은기간 : {기간}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", margin: "10px 0" }}>
        <LinearProgress variant="determinate" value={percentage} sx={{height : "1.5rem", borderRadius : "10px"}} />
        <Typography style={{textAlign : "center", marginTop : "10px", fontSize : "1rem"}}>달성률 : {Math.round(percentage)}%</Typography>
      </Box>
    </div>
  );
}

export default WeightChart;
