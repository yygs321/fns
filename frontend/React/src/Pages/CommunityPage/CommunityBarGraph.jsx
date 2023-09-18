import React from "react";
import { Box, Typography, LinearProgress, Grid } from "@mui/material";

const BarGraph = (props) => {
  const { nutrient, maxNutrient, name } = props;

  return (
    <Grid container item xs={10} justifyContent={"center"} sx={{ my: "0.5vh" }}>
      <Grid container item xs={11} justifyContent={"space-between"}>
        <Typography
          variant="body1"
          color="text.primary"
          fontSize={"0.7rem"}
          fontWeight={"bold"}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize={"0.7rem"}
        >{`${nutrient} / ${maxNutrient}`}</Typography>
      </Grid>
      <Box sx={{ width: "100%", mr: 1, pt: "0.5vh" }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: "1vh",
            borderRadius: "30px",
            backgroundColor: "#e7e7e7",
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
          value={
            (nutrient / maxNutrient) * 100 > 100
              ? 100
              : (nutrient / maxNutrient) * 100
          }
          {...nutrient}
        />
      </Box>
    </Grid>
  );
};

export default BarGraph;
