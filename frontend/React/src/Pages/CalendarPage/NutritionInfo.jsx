import React from "react";

import { Typography, Grid } from "@mui/material";

import BarGraph2 from "./BarGraph2";

const NutritionInfo = ({ 날짜, 영양데이터, scrollDownInfo }) => {
  return (
    <div
      className="white-content-box"
      style={{
        width: "80%",
        padding: "20px",
        marginTop: scrollDownInfo ? "7vh" : 0,
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
          <Typography textAlign="center" sx={{ fontSize: "1rem" }}>
            {날짜.format("M월 D일 (ddd)")}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography textAlign="center" sx={{ fontSize: "1.4rem" }}>
            오늘의 영양소
          </Typography>
        </Grid>
      </Grid>

      {Object.entries(영양데이터).map(([key, value], index) => (
        <BarGraph2
          key={index}
          name={key}
          nutrient={value.섭취량}
          maxNutrient={value.권장량}
        />
      ))}
    </div>
  );
};

export default NutritionInfo;
