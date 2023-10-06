import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Grid, Typography } from "@mui/material";

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log("잘못된 주소입니다. 메인 화면으로 돌아갑니다.");
      setIsLoading(true);
    }, "3000");
  }, []);

  useEffect(() => {
    if (isLoading) {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Grid
      className="white-pages"
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
        잘못된 요청 주소입니다.
        <br />
        메인 화면으로 돌아갑니다.
      </Typography>
    </Grid>
  );
};

export default NotFound;
