import React from "react";

import { Grid, Typography, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="green-pages">
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "92vh" }}
      >
        <Grid
          container
          item
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <CircularProgress sx={{ color: "white" }} />
          <Typography
            fontSize={"1.4rem"}
            sx={{ color: "white", marginTop: "1rem" }}
            fontWeight={"bold"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Now Loading
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Loading;
