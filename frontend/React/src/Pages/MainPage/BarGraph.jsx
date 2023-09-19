import React, { useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const BarGraph = (props) => {
  const { nutrient, setnutrient, name } = props;

  const maxNutrient = 200; // 개인별 영양소 일일 권장 섭취량, 이것도 나중에 props로 받아와야됨

  useEffect(() => {
    let targetValue = 0;

    if (nutrient > maxNutrient) {
      targetValue = 100;
    } else {
      targetValue = (nutrient / maxNutrient) * 100;
    } // ProgressBar가 도달해야 할 값
    let currentValue = 0;
    const animationDuration = 500; // 몇 초 동안 애니메이션 실행

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += 1;
        setnutrient(Math.round((currentValue / 100) * maxNutrient)); // kcalories 값을 업데이트
      } else {
        clearInterval(interval); // 목표 값에 도달하면 애니메이션 중지
      }
    }, animationDuration / 100); // 애니메이션 속도 계산

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "relative",
        alignItems: "center",
        width: "80%",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ minWidth: 10, paddingY: "0.3rem" }}>
        <Typography
          variant="body1"
          color="text.primary"
          fontSize={"1.1rem"}
          fontWeight={"bold"}
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: "2.5vh",
            borderRadius: "20px",
            backgroundColor: "#e7e7e7",
            marginY: "0.3rem",
            "& .MuiLinearProgress-bar": {
              background:
                nutrient > maxNutrient
                  ? "linear-gradient(to right,#e05750, #ffd8d0)"
                  : nutrient / maxNutrient >= 0.5
                  ? "linear-gradient(to right, #14caa0, #55ffd7)"
                  : "linear-gradient(to right, #4d66e2, #87d0f8)", // 그라데이션 색상 설정
              borderRadius: "20px", // 바의 radius 설정
            },
          }}
          value={(nutrient / maxNutrient) * 100}
          {...nutrient}
        />
        <Box sx={{ minWidth: 10, paddingY: "0.3rem" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={"0.9rem"}
          >{`${nutrient} / ${maxNutrient}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BarGraph;
