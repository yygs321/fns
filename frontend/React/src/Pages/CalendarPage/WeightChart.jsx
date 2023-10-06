import { React, useState, useEffect } from "react";
import { Typography, Divider, Grid, LinearProgress, Box } from "@mui/material";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

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
  marginTop: "1vh",
  height: "35vh",
};

export function WeightChart() {
  const [현재체중, set현재체중] = useState("");
  const [목표체중, set목표체중] = useState("");
  const [userData, setUserData] = useState([
    {
      weight: "80",
      createdAt: "2023-09-20T02:58:28.707111",
    },
  ]);
  const [기간, set기간] = useState("");
  const [percentage, setPercentage] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  useEffect(() => {
    const 체중감량그래프API = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/weight/history`, {
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        });

        const targetData = response.data.data;
        if (response.data.success) {
          set현재체중(() => targetData.targetWeightResponseDto.currentWeight);
          set목표체중(() => targetData.targetWeightResponseDto.targetWeight);
          if (targetData.weightList) {
            setUserData(() => targetData.weightList);
          }

          set기간(() => targetData.targetWeightResponseDto.remainingDays);
          setPercentage(() => targetData.targetWeightResponseDto.progressRatio);
        }
      } catch (error) {
        console.error("Error while searching:", error);
      }
    };
    체중감량그래프API();
  }, [accessToken, SERVER_API_URL]);

  const data = {
    labels: userData.map((data) => data.createdAt),
    datasets: [
      {
        label: "체중",
        data: userData.map((data) => (data ? data.weight : null)),
        borderColor: "green",
        spanGaps: true,
      },
    ],
  };
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
        sx={{
          borderBottom: "1px solid #e7e7e7",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            textAlign="center"
            sx={{ fontSize: "2rem", mt: 1, mb: 1 }}
          >
            다이어트 체중 그래프
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        ></Grid>
      </Grid>

      <div style={차트스타일}>
        <Line data={data} options={options} />
      </div>
      <Divider />
      <div style={{ marginTop: "2vh" }}>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Typography sx={{ fontSize: "1.4rem" }}>남은 기간</Typography>
          <Typography sx={{ fontSize: "1.8rem", marginTop: "1vh" }}>
            {기간} 일
          </Typography>
        </Grid>
      </div>
      <Grid container sx={{ mt: "1vh" }}>
        <Grid
          container
          item
          xs={6}
          sx={{ borderRight: "1px solid #e7e7e7" }}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            현재
          </Typography>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "1.7rem",
              }}
            >
              {현재체중}&nbsp;
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              kg
            </Typography>
          </Grid>
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
            }}
          >
            목표
          </Typography>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "1.7rem",
              }}
            >
              {목표체중}&nbsp;
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              kg
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "10px" }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: "1.5rem",
            borderRadius: "20px",
            marginY: "1vh",
            backgroundColor: "#e7e7e7",
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(to right, #14caa0, #55ffd7)",
              borderRadius: "20px",
            },
          }}
        />
        <Typography
          style={{ textAlign: "center", paddingTop: "1vh", fontSize: "1.3rem" }}
        >
          달성률
        </Typography>
        <Typography style={{ textAlign: "center", fontSize: "1.7rem" }}>
          {Math.round(percentage)} %
        </Typography>
      </Box>
    </div>
  );
}
