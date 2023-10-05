import React, { memo, useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import DietAccordion from "./DietAccordion";
import axiosInstance from "../Common/Component/AxiosInstance";
import { useSelector } from "react-redux";
import Loading from "../Common/Component/Loading";

const DietPage = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

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
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅합니다.
  const day = now.getDate().toString().padStart(2, "0"); // 일자를 두 자리로 포맷팅합니다.
  const beforeDay = before.getDate().toString().padStart(2, "0");

  const formattedToday = `${year}-${month}-${day}`;
  const formattedYesterday = `${year}-${month}-${beforeDay}`;

  const [isToday, setIsToday] = useState(true);

  const [totalMealsKcal, setTotalMealsKcal] = useState(0);
  const [morningData, setMorningData] = useState([]);
  const [lunchData, setLunchData] = useState([]);
  const [dinnerData, setDinnerData] = useState([]);
  const [ETCData, setETCData] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // 로딩

  // 임시로 일자 바꾸기랑 더미데이터..
  // 나중에 일자 바뀌면 떠있는 식단 데이터도 바뀌어야함.

  // 500 에러로 일단 주석

  // eslint-disable-next-line no-unused-vars
  const getIntakeData = async () => {
    console.log(formattedToday);
    console.log(formattedYesterday);

    try {
      const res = await axiosInstance({
        method: "get",

        url: `${SERVER_API_URL}/intake/total/${
          isToday ? formattedToday : formattedYesterday
        }`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      console.log(res);

      const meals = res.data.data;

      console.log(meals);

      const totalKcal = meals.reduce((total, meal) => {
        return total + meal.kcal * meal.rate;
      }, 0);

      const morningMeals = meals.filter(
        (meal) => meal.intakeTime === "MORNING"
      );
      const lunchMeals = meals.filter((meal) => meal.intakeTime === "LUNCH");
      const dinnerMeals = meals.filter((meal) => meal.intakeTime === "DINNER");
      const ETCMeals = meals.filter((meal) => meal.intakeTime === "ETC");

      console.log(morningMeals);
      console.log(lunchMeals);
      console.log(dinnerMeals);
      console.log(ETCMeals);

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
  }, []);

  // const meals = [
  //   {
  //     name: "아침",
  //     intakeTime: "MORNING",
  //     // food: [],
  //     food: [
  //       {
  //         name: "우유",
  //         kcal: 100,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 1,
  //         foodId: 1,
  //       },
  //       {
  //         name: "씨리얼",
  //         kcal: 100,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 2,
  //         foodId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     name: "점심",
  //     intakeTime: "LUNCH",
  //     // food: [],
  //     food: [
  //       {
  //         name: "제육볶음",
  //         kcal: 155,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 4,
  //         foodId: 3,
  //       },
  //       {
  //         name: "배추김치",
  //         kcal: 100,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 2,
  //         foodId: 4,
  //       },
  //       {
  //         name: "쌀밥",
  //         kcal: 100,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 5,
  //         foodId: 5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "저녁",
  //     intakeTime: "DINNER",
  //     food: [],
  //     // food: [
  //     //   { name: "참치", kcal: 111 },
  //     //   { name: "마요네즈", kcal: 100 },
  //     // ],
  //   },
  //   {
  //     name: "간식",
  //     intakeTime: "ETC",
  //     // food: [],
  //     food: [
  //       {
  //         name: "참치맛 크래커",
  //         kcal: 5,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 1,
  //         foodId: 6,
  //       },
  //       {
  //         name: "참치맛 감자칩",
  //         kcal: 10,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 3,
  //         foodId: 7,
  //       },
  //       {
  //         name: "참치맛 껌",
  //         kcal: 15,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 5,
  //         foodId: 15,
  //       },
  //       {
  //         name: "참치맛 젤리",
  //         kcal: 20,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 7,
  //         foodId: 8,
  //       },
  //       {
  //         name: "참치맛 아이스크림",
  //         kcal: 5,
  //         carbs: 20,
  //         protein: 20,
  //         fat: 20,
  //         rate: 9,
  //         foodId: 89,
  //       },
  //     ],
  //   },
  // ];

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
