import React, { useState } from "react";
import { Badge, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from "@mui/x-date-pickers";
import NutritionInfo from "./NutritionInfo";
import { WeightChart } from "./WeightChart";
import "./calendarcss.scss";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HikingIcon from "@mui/icons-material/Hiking";
import PoolIcon from "@mui/icons-material/Pool";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"; //줄넘기 이 아이콘으로 대체
import StairsIcon from "@mui/icons-material/Stairs";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";

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

const 운동한것들 = [
  {
    name: "사이클",
    time: "1",
    kcal : "500",
  },
  {
    name: "요가",
    time: "1",
    kcal : "500",
  },
  {
    name: "배구",
    time: "2",
    kcal : "500",
  },
];

const CalendarPage = () => {
  const [날짜, set날짜] = useState(dayjs());

  // 더미 데이터
  const data = {
    "2023-08-15": 45,
    "2023-08-20": 50,
    "2023-08-23": 60,
    "2023-08-30": 96,
    "2023-09-15": 20,
    "2023-09-16": 50,
    "2023-09-17": 70,
    "2023-09-18": 100,
    "2023-10-01": 15,
    "2023-10-03": 35,
    "2023-10-12": 50,
    "2023-10-14": 85,
    // ... 추가적인 날짜와 데이터
  };
  
  const getBackgroundColorByValue = (value) => {
    if (value === undefined) return "transparent"; // 데이터가 없는 경우 투명색
    if (value <= 20) return "#ebedf0"; // 깃허브 잔디의 가장 연한 색
    if (value <= 50) return "#c6e48b"; // 조금 더 진한 색
    if (value <= 70) return "#7bc96f"; // 더 진한 색
    return "#239a3b"; // 가장 진한 색
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDate = day.format("YYYY-MM-DD");
    const value = data[formattedDate];
    const backgroundColor = getBackgroundColorByValue(value);

    // 현재 날짜와 선택된 날짜를 비교하여 선택 여부 파악
    const isSelected = day.isSame(날짜, "day");

    const dayStyle = {
      backgroundColor: backgroundColor,
      // 선택된 날짜에 대한 스타일링
      border: isSelected ? "2px solid red" : "none", // 빨간 테두리
    };

    return (
      <Badge
        key={formattedDate}
        overlap="circular"
        badgeContent="" // 아이콘 대신 배경색만 변경하므로 badgeContent는 비워둡니다.
        style={{ backgroundColor }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          style={dayStyle}
        />
      </Badge>
    );
  };

  const 영양데이터 = {
    칼로리: {
      섭취량: 1500,
      권장량: 2000,
    },
    탄수화물: {
      섭취량: 200,
      권장량: 300,
    },
    단백질: {
      섭취량: 50,
      권장량: 80,
    },
    지방: {
      섭취량: 60,
      권장량: 90,
    },
  };

  return (
    <div
      className="gray-pages"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2% 0",
      }}
    >
      {/* box1 */}
      <div
        className="캘린더배경"
        style={{ width: "80%", padding: "20px", marginBottom: "20px" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={날짜}
            onChange={(newValue) => set날짜(newValue)}
            slots={{ day: CustomDay }}
          />
        </LocalizationProvider>
      </div>

      {/* box2 */}
      <NutritionInfo 날짜={날짜} 영양데이터={영양데이터} />
      {/* box3 */}
      <div className="운동배경">
      <Typography style={{textAlign : "center", marginTop : "2vh", fontSize : "2rem"}}>{날짜.format("MM월 DD일")} 운동 현황</Typography>
      

      {운동한것들.map((운동, index) => {
        // 운동 이름으로 해당 운동을 찾습니다.
    const 운동정보 = sportsData.find((item) => item.name === 운동.name);

        return (
        
            <div id="운동위치설정">      
            <Grid container style={{display : "flex", alignItems : "center"}}>
            <Grid xs = {6}><div style={{display : "flex", flexDirection : "column", alignItems : "center"}}>{운동정보.icon} {운동.name}</div></Grid>
            <Grid xs = {6}><div style={{display : "flex", flexDirection : "column", alignItems : "center"}}>
                <div>
                {운동.time}시간
                </div>
                <div>
                 {운동.kcal}kcal
                 </div>
                 </div></Grid>
            </Grid>
            </div>
        );
    })}
    
</div>
      {/* box4 */}
      <WeightChart 날짜={날짜} />
    </div>
  );
};

export default CalendarPage;
