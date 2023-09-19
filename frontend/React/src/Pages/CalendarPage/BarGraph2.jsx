import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const BarGraph = ({ nutrient, name, maxNutrient }) => {
  const percentage = (nutrient / maxNutrient) * 100;

  return (
    <Box sx={{display : "flex", flexDirection : "column", alignItems : "center"}}>
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent:"space-between" }}>
      <Typography variant="body1">{name}</Typography>
      <Box sx={{ width: "80%", margin: "10px 0" }}>
        <LinearProgress variant="determinate" value={percentage} sx={{height : "1.5rem", borderRadius : "10px"}} />
      </Box>
    </Box>
    <Typography variant="body2">{`${nutrient} / ${maxNutrient}`}</Typography>
    </Box>
  );
};

export default BarGraph;
