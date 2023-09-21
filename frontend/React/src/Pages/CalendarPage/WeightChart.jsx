import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserData } from "./Data";
import { Typography, Divider, Grid, LinearProgress, Box } from "@mui/material";
import { 목표체중, 기간, 현재체중, 시작체중 } from "../WeightInput/WeightInput";
// import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

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

export function WeightChart({ 날짜, set날짜, 오늘 }) {
  const percentage =
    (1 -
      (시작체중 - 목표체중 - (현재체중 - 목표체중)) / (시작체중 - 목표체중)) *
    100;

  // const changeDayBefore = () => {
  //   const 어제 = 날짜.subtract(1, "day");
  //   if (!어제.isSame("1999-12-31", "day")) {
  //     set날짜(어제);
  //   }
  // };
  // const changeDayAfter = () => {
  //   const 내일 = 날짜.add(1, "day");
  //   if (내일 <= 오늘) {
  //     set날짜(내일);
  //   }
  // };

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
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ borderBottom: "1px solid #e7e7e7", paddingBottom: "10px" }}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* <Grid
            container
            item
            xs={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <NavigateBeforeRoundedIcon
              sx={{
                color: "#a5a5a5",
                fontSize: "1.5rem",
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
              onClick={changeDayBefore}
            />
          </Grid> */}
          {/* <Grid
            container
            item
            xs={8}
            justifyContent={"center"}
            alignItems={"center"}
          > */}
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {날짜.format("M월 D일 (ddd)")}
          </Typography>
          {/* </Grid> */}
          {/* <Grid
            container
            item
            xs={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: "#a5a5a5",
                fontSize: "1.5rem",
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
              onClick={changeDayAfter}
            />
          </Grid> */}
        </Grid>
      </Grid>
      <Divider />
      <div style={차트스타일}>
        <Line data={data} options={options} />
      </div>
      <Divider />
      <div style={{ marginTop: "3vh" }}>
        <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
          남은 기간 : {기간} 일
        </Typography>
      </div>
      <Grid container sx={{ mt: 3 }}>
        <Grid
          container
          item
          xs={6}
          sx={{ borderRight: "1px solid #e7e7e7" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            현재 :&nbsp;
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            {현재체중} kg
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            목표 :&nbsp;
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            {목표체중} kg
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "10px" }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: "1.5rem",
            borderRadius: "20px",
            backgroundColor: "#e7e7e7",
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(to right, #14caa0, #55ffd7)",
              // 그라데이션 색상 설정
              borderRadius: "20px", // 바의 radius 설정
            },
          }}
        />
        <Typography
          style={{ textAlign: "center", marginTop: "10px", fontSize: "1.1rem" }}
        >
          달성률 : {Math.round(percentage)}%
        </Typography>
      </Box>
    </div>
  );
}

export default WeightChart;
