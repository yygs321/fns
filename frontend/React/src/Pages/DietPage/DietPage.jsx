import React, { memo, useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

import axiosInstance from "../Common/Component/AxiosInstance";
import DietAccordion from "./DietAccordion";
import Loading from "../Common/Component/Loading";

const DietPage = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");

  const now = new Date();
  const before = new Date(now);
  before.setDate(before.getDate() - 1);

  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const today = now.toLocaleDateString("ko-KR", options).split(" ");
  const yesterday = before.toLocaleDateString("ko-KR", options).split(" ");

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const beforeDay = before.getDate().toString().padStart(2, "0");

  const formattedToday = `${year}-${month}-${day}`;
  const formattedYesterday = `${year}-${month}-${beforeDay}`;

  const [isToday, setIsToday] = useState(true);

  const [totalMealsKcal, setTotalMealsKcal] = useState(0);
  const [morningData, setMorningData] = useState([]);
  const [lunchData, setLunchData] = useState([]);
  const [dinnerData, setDinnerData] = useState([]);
  const [ETCData, setETCData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getIntakeData = async () => {
    try {
      const date = isToday ? formattedToday : formattedYesterday;
      const res = await axiosInstance({
        method: "get",

        url: `${SERVER_API_URL}/intake/total/${
          date
        }`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      const meals = res.data.data;

      const totalKcal = meals.reduce((total, meal) => {
        return total + meal.kcal;
      }, 0);

      const morningMeals = meals.filter(
        (meal) => meal.intakeTime === "MORNING"
      );
      const lunchMeals = meals.filter((meal) => meal.intakeTime === "LUNCH");
      const dinnerMeals = meals.filter((meal) => meal.intakeTime === "DINNER");
      const ETCMeals = meals.filter((meal) => meal.intakeTime === "ETC");

      setTotalMealsKcal(totalKcal);
      setMorningData(morningMeals);
      setLunchData(lunchMeals);
      setDinnerData(dinnerMeals);
      setETCData(ETCMeals);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getIntakeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToday]);

  const changeDay = () => {
    setIsToday(!isToday);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="gray-pages">
        <Grid container justifyContent={"center"}>
          <Grid
            container
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "8vh", backgroundColor: "#00E1AB" }}
          >
            <Grid
              container
              item
              xs={3}
              justifyContent={"center"}
              alignItems={"center"}
            ></Grid>
            <Grid
              container
              item
              xs={6}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid
                container
                item
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {isToday && (
                  <NavigateBeforeRoundedIcon
                    sx={{
                      color: "white",
                      fontSize: "1.8rem",
                      paddingBottom: "0.2rem",
                      cursor: "pointer",
                    }}
                    onClick={changeDay}
                  />
                )}
              </Grid>
              <Grid
                container
                item
                xs={8}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="white"
                  fontSize={"1.3rem"}
                  fontWeight={"bold"}
                  sx={{
                    textShadow: "2px 2px 20px #c8c8c8",
                  }}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {isToday
                    ? `${today[0]}${today[1]}${today[2]}${today[3]}`
                    : `${yesterday[0]}${yesterday[1]}${yesterday[2]}${yesterday[3]}`}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {!isToday && (
                  <NavigateNextRoundedIcon
                    sx={{
                      color: "white",
                      fontSize: "1.8rem",
                      paddingBottom: "0.2rem",
                      cursor: "pointer",
                    }}
                    onClick={changeDay}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={3}
              justifyContent={"flex-end"}
              alignItems={"center"}
              sx={{ paddingRight: "1rem" }}
            >
              <Typography
                variant="caption"
                component="div"
                color="white"
                fontSize={"0.9rem"}
                fontWeight={"bold"}
                sx={{ textShadow: "2px 2px 20px #8b8b8b" }}
              >
                {totalMealsKcal.toFixed(0)} kcal
              </Typography>
            </Grid>
          </Grid>

          <DietAccordion
            name={"아침"}
            food={morningData}
            today={formattedToday}
            intakeTime={"MORNING"}
          />
          <DietAccordion
            name={"점심"}
            food={lunchData}
            today={formattedToday}
            intakeTime={"LUNCH"}
          />
          <DietAccordion
            name={"저녁"}
            food={dinnerData}
            today={formattedToday}
            intakeTime={"DINNER"}
          />
          <DietAccordion
            name={"간식"}
            food={ETCData}
            today={formattedToday}
            intakeTime={"ETC"}
          />
        </Grid>
      </div>
    );
  }
};

export default memo(DietPage);
