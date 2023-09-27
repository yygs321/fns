import React, {
  memo,
  //  useState
} from "react";

import { Grid, Typography } from "@mui/material";

// import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import DietAccordion from "./DietAccordion";

const DietPage = () => {
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
  // const yesterday = before.toLocaleDateString("ko-KR", options).split(" ");

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅합니다.
  const day = now.getDate().toString().padStart(2, "0"); // 일자를 두 자리로 포맷팅합니다.
  const formattedToday = `${year}-${month}-${day}`;

  // const [isToday, setIsToday] = useState(true);

  // 임시로 일자 바꾸기랑 더미데이터..
  // 나중에 일자 바뀌면 떠있는 식단 데이터도 바뀌어야함.

  const meals = [
    {
      name: "아침",
      intakeTime: "MORNING",
      // food: [],
      food: [
        {
          name: "참",
          kcal: 100,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 1,
          foodId: 1,
        },
        {
          name: "치",
          kcal: 100,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 2,
          foodId: 2,
        },
      ],
    },
    {
      name: "점심",
      intakeTime: "LUNCH",
      // food: [],
      food: [
        {
          name: "참치",
          kcal: 155,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 4,
          foodId: 3,
        },
        {
          name: "통",
          kcal: 100,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 2,
          foodId: 4,
        },
        {
          name: "조림",
          kcal: 100,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 5,
          foodId: 5,
        },
      ],
    },
    {
      name: "저녁",
      intakeTime: "DINNER",
      food: [],
      // food: [
      //   { name: "참치", kcal: 111 },
      //   { name: "마요네즈", kcal: 100 },
      // ],
    },
    {
      name: "간식",
      intakeTime: "ETC",
      // food: [],
      food: [
        {
          name: "참치맛 크래커",
          kcal: 5,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 1,
          foodId: 6,
        },
        {
          name: "참치맛 감자칩",
          kcal: 10,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 3,
          foodId: 7,
        },
        {
          name: "참치",
          kcal: 15,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 5,
          foodId: 15,
        },
        {
          name: "참치맛 롱소드",
          kcal: 20,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 7,
          foodId: 8,
        },
        {
          name: "참치맛 머신건",
          kcal: 5,
          carb: 20,
          prot: 20,
          prov: 20,
          count: 9,
          foodId: 89,
        },
      ],
    },
  ];

  const totalMealsKcal = meals.reduce((total, meal) => {
    const mealTotalKcal = meal.food
      ? meal.food.reduce((mealTotal, foodItem) => {
          return mealTotal + foodItem.kcal;
        }, 0)
      : 0;
    return total + mealTotalKcal;
  }, 0);

  // const changeDay = () => {
  //   setIsToday(!isToday);
  // };

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
            {/* <Grid
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
            </Grid> */}
            <Grid
              container
              item
              xs={12}
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {/* {isToday ? */}
                {`${today[0]}${today[1]}${today[2]}${today[3]}`}
                {/* // : `${yesterday[0]}${yesterday[1]}${yesterday[2]}${yesterday[3]}`} */}
              </Typography>
            </Grid>
            {/* <Grid
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
            </Grid> */}
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
              {totalMealsKcal} kcal
            </Typography>
          </Grid>
        </Grid>
        {meals.map((meal) => (
          <DietAccordion
            key={`diet-${meal.name}`}
            name={meal.name}
            food={meal.food}
            today={formattedToday}
            intakeTime={meal.intakeTime}
          />
        ))}
      </Grid>
    </div>
  );
};

export default memo(DietPage);
