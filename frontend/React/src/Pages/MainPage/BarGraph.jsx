import React, { useEffect } from "react";
import { Box, Grid, Typography, LinearProgress } from "@mui/material";

const BarGraph = (props) => {
  useEffect(() => {
    // 이 쪽 나중에 10/200 과 같은 분수식으로 표현해야됨.
    const targetValue = 79; // ProgressBar가 도달해야 할 값
    let currentValue = 0;
    const animationDuration = 500; // 몇 초 동안 애니메이션 실행

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += 1;
        props.setNutrient(currentValue); // 영양소 값을 업데이트
      } else {
        clearInterval(interval); // 목표 값에 도달하면 애니메이션 중지
      }
    }, animationDuration / (targetValue - currentValue)); // 애니메이션 속도 계산

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
    };
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
      <Box>
        <Typography variant="body1" color="text.primary">
          탄단지
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={props.nutrient}
          {...props}
        />
        <Box sx={{ minWidth: 10 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.nutrient
          )}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BarGraph;
