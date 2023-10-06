import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from "@mui/x-date-pickers";
import FloatingInputButton from "../Common/Component/FloatingInputButton";
import "./calendarcss.scss";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HikingIcon from "@mui/icons-material/Hiking";
import PoolIcon from "@mui/icons-material/Pool";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import StairsIcon from "@mui/icons-material/Stairs";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";

import axiosInstance from "../Common/Component/AxiosInstance";
import NutritionInfo from "./NutritionInfo";
import { WeightChart } from "./WeightChart";

const sportsData = [
  { name: "조깅", kcal: 500, icon: <DirectionsRunIcon fontSize="large" /> },
  { name: "사이클", kcal: 500, icon: <DirectionsBikeIcon fontSize="large" /> },
  { name: "등산", kcal: 500, icon: <HikingIcon fontSize="large" /> },
  { name: "수영", kcal: 500, icon: <PoolIcon fontSize="large" /> },
  {
    name: "줄넘기",
    kcal: 500,
    icon: <AccessibilityNewIcon fontSize="large" />,
  },
  { name: "계단 오르기", kcal: 500, icon: <StairsIcon fontSize="large" /> },
  { name: "요가", kcal: 500, icon: <SelfImprovementIcon fontSize="large" /> },
  { name: "축구", kcal: 500, icon: <SportsSoccerIcon fontSize="large" /> },
  { name: "야구", kcal: 500, icon: <SportsBaseballIcon fontSize="large" /> },
  { name: "테니스", kcal: 500, icon: <SportsTennisIcon fontSize="large" /> },
  { name: "배구", kcal: 500, icon: <SportsVolleyballIcon fontSize="large" /> },
  { name: "골프", kcal: 500, icon: <SportsGolfIcon fontSize="large" /> },
];

const met = [0, 2, 3.5, 5, 6, 7, 8, 4, 5.5, 4.5, 6.5, 5, 5.5];

dayjs.locale("ko");
const accessToken = sessionStorage.getItem("accessToken");
const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

const CalendarPage = () => {
  const [운동북마크, set운동북마크] = useState([]);
  const [운동시간, set운동시간] = useState([]);
  const [몸무게, set몸무게] = useState("");
  const [날짜, set날짜] = useState(dayjs());

  const [영양데이터, set영양데이터] = useState([]);
  const 오늘 = dayjs();

  useEffect(() => {
    const getAPI = async () => {
      try {
        const nowday = new Date(날짜);
        const year = nowday.getFullYear();
        const month = (nowday.getMonth() + 1).toString().padStart(2, "0");
        const day = nowday.getDate().toString().padStart(2, "0");
        const formattedDay = `${year}-${month}-${day}`;

        const [res1, res2, res3] = await Promise.all([
          axiosInstance.get(`${SERVER_API_URL}/exercise`, {
            params: {
              date: formattedDay,
            },
            headers: {
              "X-FNS-ACCESSTOKEN": accessToken,
            },
          }),

          axiosInstance.get(`${SERVER_API_URL}/base`, {
            params: {
              date: formattedDay,
            },
            headers: {
              "X-FNS-ACCESSTOKEN": accessToken,
            },
          }),

          axiosInstance.get(`${SERVER_API_URL}/intake/simple/${formattedDay}`, {
            headers: {
              "X-FNS-ACCESSTOKEN": accessToken,
            },
          }),
        ]);

        set몸무게(res1.data.data.weight);
        set운동북마크(res1.data.data.sportsBookmarkList);
        set운동시간(res1.data.data.exerciseTimeList);
        console.log('#1');
        console.log(res1);
        
        set영양데이터({
          칼로리: {
            섭취량: res3.data.data.kcal,
            권장량: res2.data.data.kcal,
          },
          탄수화물: {
            섭취량: res3.data.data.carbs,
            권장량: res2.data.data.carbs,
          },
          단백질: {
            항목: "단백질",
            섭취량: res3.data.data.protein,
            권장량: res2.data.data.protein,
          },
          지방: {
            항목: "지방",
            섭취량: res3.data.data.fat,
            권장량: res2.data.data.fat,
          },
        });
      } catch (error) {
        console.error("요청 실패:", error);
      }
    };
    getAPI();
  }, [날짜]);

  const 운동한것들 = 운동북마크.reduce((acc, mark, index) => {
    if (mark === 1 && sportsData[index] && 운동시간[index] !== 0) {
      const 운동 = sportsData[index];
      const 운동한것 = {
        name: 운동.name,
        time: 운동시간[index],
        kcal: 운동시간[index] * (((3.5 * met * 몸무게 * 60) / 1000) * 5),
      };
      acc.push(운동한것);
    }
    return acc;
  }, []);

  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    const months = ["2023-08", "2023-09", "2023-10"];
    Promise.all(
      months.map((month) =>
        axiosInstance.get(`${SERVER_API_URL}/members/calendar`, {
          params: { date: month },
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        })
      )
    )
      .then((responses) => {
        let newCalendarData = {};
        responses.forEach((response, index) => {
          if (response.data.success) {
            const month = months[index];
            newCalendarData = {
              ...newCalendarData,
              ...response.data.data.recordedDates.reduce((obj, date) => {
                if (date.startsWith(month)) {
                  obj[date] = Math.floor(Math.random() * 99) + 1;
                }
                return obj;
              }, {}),
            };
          }
        });
        setCalendarData(newCalendarData);
      })
      .catch((error) => {
        console.error("Data fetching error:", error);
      });
  }, []);

  const holiday = [
    "2023-01-01",
    "2023-01-21",
    "2023-01-22",
    "2023-01-23",
    "2023-01-24",
    "2023-03-01",
    "2023-05-05",
    "2023-05-27",
    "2023-05-29",
    "2023-06-06",
    "2023-08-15",
    "2023-09-28",
    "2023-09-29",
    "2023-09-30",
    "2023-10-02",
    "2023-10-03",
    "2023-10-09",
    "2023-12-25",
  ];

  const getBackgroundColorByValue = (value) => {
    if (value === undefined) return "transparent";
    if (value <= 20) return "#ebedf0";
    if (value <= 50) return "#c6e48b";
    if (value <= 70) return "#7bc96f";
    return "#239a3b";
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    const formattedDate = day.format("YYYY-MM-DD");
    const value = calendarData[formattedDate];
    const backgroundColor = getBackgroundColorByValue(value);

    const isSelected = day.isSame(날짜, "day");
    const isholiday = holiday.includes(formattedDate);

    const dayStyle = {
      backgroundColor: backgroundColor,

      border: day.isSame(오늘, "day")
        ? "2px solid blue"
        : isSelected
        ? "2px solid red"
        : "none",
      color:
        (outsideCurrentMonth && day.day() === 0) ||
        (outsideCurrentMonth && isholiday)
          ? "#ffa3a3"
          : outsideCurrentMonth
          ? "#b6b6b6"
          : day.day() === 0 || isholiday
          ? "red"
          : "black",
    };

    return (
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          borderRadius: "10px",
          width: "100%",
          height: "100%",
        }}
      >
        <PickersDay
          {...other}
          day={day}
          style={dayStyle}
          disableMargin={true}
          sx={{
            borderRadius: "10px",
            width: "80%",
            fontSize: "0.9rem",
          }}
          today={true}
          outsideCurrentMonth={outsideCurrentMonth}
        />
      </Grid>
    );
  };

  const [scrollDownInfo, setScrollDownInfo] = useState(false);

  const resizeCalendar = (e) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop === 0 && scrollDownInfo) {
      setScrollDownInfo(false);
    } else if (scrollTop > 0 && !scrollDownInfo) {
      setScrollDownInfo(true);
    }
  };

  const [캘린더고정Height, set캘린더고정Height] = useState(0);

  useEffect(() => {
    const 캘린더고정 = document.querySelector(".캘린더-고정");
    if (캘린더고정) {
      const height = 캘린더고정.clientHeight;
      set캘린더고정Height(height);
    }
  }, [scrollDownInfo]);

  const changeDayBefore = () => {
    const 어제 = 날짜.subtract(1, "day");
    if (!어제.isSame("1999-12-31", "day")) {
      set날짜(어제);
    }
  };
  const changeDayAfter = () => {
    const 내일 = 날짜.add(1, "day");
    if (내일 <= 오늘) {
      set날짜(내일);
    }
  };

  return (
    <div className="gray-pages">
      <div className="캘린더-고정">
        <div className="캘린더배경">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                height: "100%",
                border: "1px solid #e7e7e7",
                borderRadius: "15px",
              }}
            >
              <DateCalendar
                value={날짜}
                onChange={(newValue) => set날짜(newValue)}
                slots={{ day: CustomDay }}
                sx={{
                  height: "100%",
                  width: "100%",

                  ".MuiDayCalendar-weekDayLabel": {
                    width: "100%",
                    height: "80%",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    "&[aria-label='일요일']": {
                      color: "red",
                    },
                  },
                  ".MuiPickersCalendarHeader-label": {
                    fontSize: "1.2rem",
                    whiteSpace: "nowrap",

                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  },
                  ".MuiYearCalendar-root": {
                    width: "96%",
                  },
                  ".MuiMonthCalendar-root": {
                    width: "96%",
                  },
                  ".MuiPickersYear-yearButton": {
                    fontSize: "0.9rem",
                    width: "100%",
                  },
                  ".MuiPickersMonth-monthButton": {
                    fontSize: "0.9rem",
                    width: "100%",
                  },

                  display: scrollDownInfo ? "none" : "relative",
                }}
                views={["year", "month", "day"]}
                monthsPerRow={4}
                yearsPerRow={4}
                disableFuture={true}
                minDate={dayjs("2000-01-01")}
                maxDate={dayjs()}
                showDaysOutsideCurrentMonth={true}
                fixedWeekNumber={6}
              />
              {scrollDownInfo && (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid
                    container
                    item
                    xs={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <NavigateBeforeRoundedIcon
                      sx={{
                        color: "#a5a5a5",
                        fontSize: "2rem",
                        paddingBottom: "0.2rem",
                        cursor: "pointer",
                      }}
                      onClick={changeDayBefore}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={8}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      {날짜.format("M월 D일 (ddd)")}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <NavigateNextRoundedIcon
                      sx={{
                        color: "#a5a5a5",
                        fontSize: "2rem",
                        paddingBottom: "0.2rem",
                        cursor: "pointer",
                      }}
                      onClick={changeDayAfter}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </LocalizationProvider>
        </div>
      </div>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          paddingTop: `${캘린더고정Height}px`,
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="정보란"
          sx={{
            height: `calc(92vh - ${캘린더고정Height}px)`,
          }}
          onScroll={resizeCalendar}
        >
          <NutritionInfo
            날짜={날짜}
            set날짜={set날짜}
            오늘={오늘}
            영양데이터={영양데이터}
            scrollDownInfo={scrollDownInfo}
          />

          <div className="운동배경">
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <Grid
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography textAlign="center" sx={{ fontSize: "1rem" }}>
                  {날짜.format("M월 D일 (ddd)")}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography textAlign="center" sx={{ fontSize: "1.4rem" }}>
                  오늘의 운동
                </Typography>
              </Grid>
            </Grid>
            {운동한것들.map((운동, index) => {
              const 운동정보 = sportsData.find(
                (item) => item.name === 운동.name
              );

              return (
                <div id="운동위치설정" key={`${운동}-${index}`}>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {운동정보.icon} {운동.name}
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div>{isNaN(운동.time) ? 0 : 운동.time}시간</div>
                        <div>{isNaN(운동.kcal) ? 0 : 운동.kcal}kcal</div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </div>

          <WeightChart />
        </Grid>
      </Grid>
      <FloatingInputButton />
    </div>
  );
};

export default CalendarPage;
