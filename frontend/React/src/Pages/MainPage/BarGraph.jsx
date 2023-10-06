import React, { useEffect, useState } from "react";

import { Box, Typography, LinearProgress } from "@mui/material";

const BarGraph = (props) => {
  const { maxNutrient, nutrient, name } = props;

  const [newValue, setNewValue] = useState(0);

  useEffect(() => {
    let targetValue = 0;

    if (nutrient > maxNutrient) {
      targetValue = 100;
    } else {
      targetValue = (nutrient / maxNutrient) * 100;
    }
    let currentValue = 0;
    const animationDuration = 500;

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        if (targetValue - currentValue > 10) {
          currentValue += 10;
        } else {
          currentValue += 1;
        }
        setNewValue(Math.round((currentValue / 100) * maxNutrient));
      } else {
        clearInterval(interval);
      }
    }, animationDuration / 100);

    return () => {
      clearInterval(interval);
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
                  : "linear-gradient(to right, #4d66e2, #87d0f8)",
              borderRadius: "20px",
            },
          }}
          value={
            (newValue / maxNutrient) * 100 > 100
              ? 100
              : (newValue / maxNutrient) * 100
          }
          {...nutrient}
        />
        <Box sx={{ minWidth: 10, paddingY: "0.3rem" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={"0.9rem"}
          >
            {Number.isInteger(nutrient)
              ? `${nutrient} / ${maxNutrient}`
              : `${nutrient.toFixed(1)} / ${maxNutrient}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BarGraph;
