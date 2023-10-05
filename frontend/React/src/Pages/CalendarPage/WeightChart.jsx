import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Typography, Divider, Grid, LinearProgress, Box } from "@mui/material";
import axios from "axios";
// import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

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

  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });
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
        console.log("성공여부 : ", response.data.success);
        if (response.data.success) {
          console.log("Response Data_1 : ", response.data.success);
          console.log("Response Data_2 : ", response.data.message);
          
          set현재체중(() => targetData.targetWeightResponseDto.currentWeight);
          set목표체중(() => targetData.targetWeightResponseDto.targetWeight);
          if (targetData.weightList) {
            setUserData(() => targetData.weightList);
          }
          set기간(() => targetData.remainingDays);
          setPercentage(() => targetData.progressRatio);
          console.log("Response Data_체중 : ", targetData.currentWeight);
          console.log("Response Data_체중 : ", targetData.targetWeight);
          console.log("Response Data_체중 : ", targetData.weightList);
          console.log("Response Data_체중 : ", targetData.remainingDays);
          console.log("Response Data_체중 : ", targetData.progressRatio);
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
              // 그라데이션 색상 설정
              borderRadius: "20px", // 바의 radius 설정
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
