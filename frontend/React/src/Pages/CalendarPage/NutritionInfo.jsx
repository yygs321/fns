import React from "react";
import { Typography, Grid } from "@mui/material";
// import {dayjs} from 'dayjs';
import BarGraph2 from "./BarGraph2";
// import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const NutritionInfo = ({ 날짜, set날짜, 오늘, 영양데이터 }) => {
  // const changeDayBefore = () => {
  //   const 어제 = 날짜.subtract(1, "day");
  //   if (!어제.isSame("1999-12-31", "day")) {
  //     set날짜(어제);
  //   }
  // };
  // const changeDayAfter = () => {
  //   const 내일 = 날짜.add(1, "day");
  //   if (내일 <= 오늘) {
  //     set날짜(내일);
  //   }
  // };

  return (
    <div
      className="white-content-box"
      style={{ width: "80%", padding: "20px" }}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ borderBottom: "1px solid #e7e7e7", paddingBottom: "10px" }}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* <Grid
            container
            item
            xs={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <NavigateBeforeRoundedIcon
              sx={{
                color: "#a5a5a5",
                fontSize: "1.5rem",
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
              onClick={changeDayBefore}
            />
          </Grid> */}
          {/* <Grid
            container
            item
            xs={8}
            justifyContent={"center"}
            alignItems={"center"}
          > */}
          <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            {날짜.format("M월 D일 (ddd)")}
          </Typography>
          {/* </Grid> */}
          {/* <Grid
            container
            item
            xs={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: "#a5a5a5",
                fontSize: "1.5rem",
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
              onClick={changeDayAfter}
            />
          </Grid> */}
        </Grid>
      </Grid>
      <Typography
        textAlign="center"
        sx={{
          paddingTop: "15px",
          paddingBottom: "15px",
          fontSize: "1.3rem",
        }}
      >
        오늘의 영양소 정보
      </Typography>
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
