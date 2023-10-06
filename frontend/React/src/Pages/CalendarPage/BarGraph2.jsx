import React from "react";

import { Box, Typography, LinearProgress, Grid } from "@mui/material";

const BarGraph = ({ nutrient, name, maxNutrient }) => {
  const percentage =
    nutrient > maxNutrient ? 100 : (nutrient / maxNutrient) * 100;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "95%" }}
      >
        <Grid
          item
          container
          xs={4}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          sx={{ height: "100%" }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={8}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ width: "90%", paddingY: "1vh" }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: "1.2rem",
                backgroundColor: "#e7e7e7",
                borderRadius: "20px",
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
            />

            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Typography variant="body2">{`${nutrient.toFixed(
                0
              )} / ${maxNutrient}`}</Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BarGraph;
