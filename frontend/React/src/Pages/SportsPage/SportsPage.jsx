import React, { useState } from "react";

import { Typography, Button, Grid, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
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
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const handleSaveData = () => {
  console.log("데이터가 저장되었습니다.");
};

const exerciseResponseDto = {
  sportsBookmarkList: [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  sportsMetValue: [0, 2, 3.5, 5, 6, 7, 8, 4, 5.5, 4.5, 6.5, 5, 5.5],
  exerciseTimeList: [0, 0, 1, 1.5, 0, 0, 2, 1, 1.5, 2, 0, 0, 1.5],
  weight: 60,
};

const sportNames = [
  null,
  "조깅",
  "사이클",
  "등산",
  "수영",
  "줄넘기",
  "계단 오르기",
  "요가",
  "축구",
  "야구",
  "테니스",
  "배구",
  "골프",
];
const sportIcons = [
  null,
  <DirectionsRunIcon fontSize="large" />,
  <DirectionsBikeIcon fontSize="large" />,
  <HikingIcon fontSize="large" />,
  <PoolIcon fontSize="large" />,
  <AccessibilityNewIcon fontSize="large" />,
  <StairsIcon fontSize="large" />,
  <SelfImprovementIcon fontSize="large" />,
  <SportsSoccerIcon fontSize="large" />,
  <SportsBaseballIcon fontSize="large" />,
  <SportsTennisIcon fontSize="large" />,
  <SportsVolleyballIcon fontSize="large" />,
  <SportsGolfIcon fontSize="large" />,
];

export const sportsData = exerciseResponseDto.sportsMetValue
  .map((met, index) => {
    if (index === 0) return null;

    const kcalPerHour =
      ((3.5 * met * exerciseResponseDto.weight * 60) / 1000) * 5;
    return {
      name: sportNames[index],
      kcal: kcalPerHour,
      icon: sportIcons[index],
    };
  })
  .filter(Boolean);

const SportItem = ({
  name,
  kcal,
  icon,
  onTimeChange,
  isEditMode,
  isChecked,
  onCheckChange,
}) => (
  <Grid
    container
    justifyContent={"space-between"}
    alignItems={"center"}
    spacing={3}
    sx={{ paddingY: "1vh" }}
  >
    {isEditMode && (
      <Grid item xs={1} style={{ position: "relative", zIndex: 2 }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckChange(name)}
        />
      </Grid>
    )}
    <Grid
      item
      xs={isEditMode ? 1 : 2}
      style={{
        cursor: isEditMode ? "pointer" : "default",
        marginRight: isEditMode ? "30px" : "0",
      }}
      onClick={isEditMode ? () => onCheckChange(name) : undefined}
    >
      {icon}
    </Grid>
    <Grid
      item
      xs={6}
      style={{ cursor: isEditMode ? "pointer" : "default" }}
      onClick={isEditMode ? () => onCheckChange(name) : undefined}
    >
      <Typography>
        {name} 1시간 <br /> {kcal} kcal 소모
      </Typography>
    </Grid>
    {!isEditMode && (
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="number"
          label="시간"
          InputProps={{
            sx: { borderRadius: "10px" },
          }}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            onTimeChange(name, isNaN(value) ? 0 : value);
          }}
        />
      </Grid>
    )}
  </Grid>
);

const SportsPage = () => {
  const [times, setTimes] = useState({});
  const [isEditMode, setEditMode] = useState(false);

  const [checkedSports, setCheckedSports] = useState(
    sportsData.reduce((acc, sport, index) => {
      return {
        ...acc,
        [sport.name]: exerciseResponseDto.sportsBookmarkList[index + 1] === 1,
      };
    }, {})
  );

  const filteredSports = sportsData.filter(
    (sport) => checkedSports[sport.name]
  );
  const renderSports = isEditMode ? sportsData : filteredSports;
  const totalHours = Object.values(times).reduce((acc, val) => acc + val, 0);
  const totalCalories = Object.entries(times).reduce((acc, [name, time]) => {
    const kcal = sportsData.find((sport) => sport.name === name)?.kcal || 0;
    return acc + kcal * time;
  }, 0);

  const handleTimeChange = (name, time) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [name]: time,
    }));
  };

  const handleCheckChange = (name) => {
    setCheckedSports((prevChecked) => ({
      ...prevChecked,
      [name]: !prevChecked[name],
    }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

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

  const [isToday, setIsToday] = useState(true);

  const changeDay = () => {
    setIsToday(!isToday);
  };

  return (
    <div
      className="gray-pages"
      style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
            xs={2}
            justifyContent={"center"}
            alignItems={"center"}
          ></Grid>
          <Grid
            container
            item
            xs={8}
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
                fontSize={"1.5rem"}
                fontWeight={"bold"}
                sx={{
                  textShadow: "2px 2px 20px #c8c8c8",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
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
            xs={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          ></Grid>
        </Grid>
      </Grid>

      <div
        style={{
          width: "90%",
          height: "60vh",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "2px 2px 4px #a5a5a5",
          padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
          marginBottom: "2vh",
          marginTop: "2vh",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              paddingBottom: "1vh",
              borderBottom: "1px solid #e7e7e7",
              height: "8vh",
            }}
          >
            <Grid item xs={2}></Grid>
            <Grid
              container
              item
              xs={8}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                운동 시간
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SettingsIcon
                onClick={() => setEditMode(!isEditMode)}
                sx={{
                  fontSize: "2.5rem",
                  color: isEditMode ? "#00E1AB" : "black",
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>
          <Grid
            className="noscroll"
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: isEditMode ? "38vh" : "46vh", overflowY: "scroll" }}
          >
            {!isEditMode && filteredSports.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "80%",
                  cursor: "pointer",
                }}
                onClick={() => setEditMode(!isEditMode)}
              >
                <Typography
                  color="text.secondary"
                  fontSize={"1.2rem"}
                  fontWeight={"bold"}
                >
                  운동 설정하기
                </Typography>
              </div>
            )}
            {renderSports.map((sport) => (
              <SportItem
                key={sport.name}
                name={sport.name}
                kcal={sport.kcal}
                icon={sport.icon}
                onTimeChange={handleTimeChange}
                isEditMode={isEditMode}
                isChecked={checkedSports[sport.name]}
                onCheckChange={handleCheckChange}
              />
            ))}
          </Grid>
          {isEditMode && (
            <Grid
              container
              item
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ borderTop: "1px solid #e7e7e7" }}
            >
              <Button
                onClick={handleSave}
                variant="contained"
                fullWidth
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  borderRadius: "10px",
                  marginTop: "1vh",
                }}
              >
                추가
              </Button>
            </Grid>
          )}
        </Grid>
      </div>

      <div
        style={{
          width: "100%",
          height: "20vh",
          backgroundColor: "white",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "12vh" }}
        >
          {totalHours < 24 ? (
            <>
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
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography fontSize={"1.1rem"} nowrap="true">
                    총 운동 시간
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography fontSize={"1.6rem"} nowrap="true">
                    {totalHours}&nbsp;
                  </Typography>
                  <Typography fontSize={"1rem"}>시간</Typography>
                </Grid>
              </Grid>
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
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"1.1rem"}>총 소모 칼로리</Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"1.6rem"}>
                    {totalCalories}&nbsp;
                  </Typography>
                  <Typography fontSize={"1rem"}>kcal</Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography fontSize={"1.4rem"} nowrap="true">
              24시간 이내로
              <br />
              설정해주세요!
            </Typography>
          )}
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "8vh" }}
        >
          <Grid
            container
            item
            xs={10}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleSaveData}
              disabled={totalHours > 24}
              sx={{
                fontSize: "1.3rem",
                borderRadius: "10px",
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              저장
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SportsPage;
