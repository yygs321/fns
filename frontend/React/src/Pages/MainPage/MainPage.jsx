import React, { useEffect, useState } from "react";
import "../Common/CSS/BackgroundColor.css";
import "../Common/CSS/ContentBox.css";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import BarGraph from "./BarGraph";

const MainPage = () => {
  const [kcalories, setKcalories] = useState(0); // 칼로리
  const [carbohydrate, setCarbohydrate] = useState(0); // 탄수화물
  const [protein, setProtein] = useState(0); // 단백질
  const [province, setProvince] = useState(0); // 지방

  const now = new Date();
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const today = now.toLocaleDateString("ko-KR", options).split(" ");

  useEffect(() => {
    const targetValue = 72; // ProgressBar가 도달해야 할 값
    let currentValue = 0;
    const animationDuration = 500; // 몇 초 동안 애니메이션 실행

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += 1;
        setKcalories(currentValue); // kcalories 값을 업데이트
      } else {
        clearInterval(interval); // 목표 값에 도달하면 애니메이션 중지
      }
    }, animationDuration / (targetValue - currentValue)); // 애니메이션 속도 계산

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
    };
  }, []);

  return (
    <div className="gray-pages">
      <Grid container justifyContent={"center"}>
        <Grid
          className="white-content-box"
          item
          container
          xs={11}
          justifyContent={"center"}
          sx={{ marginTop: "1vh", marginBottom: "1vh", height: "50vh" }}
        >
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              fontSize={"1.5rem"}
            >
              {`${today[0]}${today[1]}${today[2]}${today[3]}`}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={100}
                sx={{ color: "#e7e7e7" }}
                size={"13rem"}
                thickness={4}
              />
              <CircularProgress
                variant="determinate"
                sx={{ position: "absolute", zIndex: "10" }}
                value={kcalories}
                size={"13rem"}
                thickness={4}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={"1.1rem"}
                >
                  {kcalories}%
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item container xs={4} justifyContent={"center"}>
              <BarGraph nutrient={carbohydrate} setNutrient={setCarbohydrate} />
            </Grid>
            <Grid item container xs={4} justifyContent={"center"}>
              <BarGraph nutrient={protein} setNutrient={setProtein} />
            </Grid>
            <Grid item container xs={4} justifyContent={"center"}>
              <BarGraph nutrient={province} setNutrient={setProvince} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="white-content-box"
          item
          container
          xs={11}
          justifyContent={"center"}
          sx={{ marginTop: "1vh", marginBottom: "1vh", height: "50vh" }}
        >
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
          >
            야호호
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
