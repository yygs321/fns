import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const BarGraph = ({ nutrient, name, maxNutrient }) => {
  const percentage = (nutrient / maxNutrient) * 100;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body1">{name}</Typography>
      <Box sx={{ width: "100%", margin: "10px 0" }}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Typography variant="body2">{`${nutrient} / ${maxNutrient}`}</Typography>
    </Box>
  );
};

export default BarGraph;
