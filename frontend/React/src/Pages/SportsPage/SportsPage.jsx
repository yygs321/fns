import React, { useState } from "react";
import { Typography, Button, Grid, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
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
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

// 페이지 들어올 때 서버에 요청해서 저장된 내용 불러옴
const handleSaveData = () => {
  // 여기에 나중에 API 연결 코드를 작성하면 됩니다.
  console.log("데이터가 저장되었습니다."); // 임시 메시지
};

const exerciseResponseDto = {
  sportsBookmarkList: [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  weight: 60,
  sportsDtoList: [
    { sportsId: 1, met: 3, exerciseTime: 1.5 },
    { sportsId: 2, met: 4, exerciseTime: 0.5 },
    { sportsId: 3, met: 3.5, exerciseTime: 1.5 },
    { sportsId: 4, met: 4, exerciseTime: 2 },
    { sportsId: 5, met: 2, exerciseTime: 1.5 },
    { sportsId: 6, met: 3, exerciseTime: 0.5 },
    { sportsId: 7, met: 1, exerciseTime: 1.5 },
    { sportsId: 8, met: 4.2, exerciseTime: 0.5 },
    { sportsId: 9, met: 5, exerciseTime: 1.5 },
    { sportsId: 10, met: 2, exerciseTime: 0.5 },
    { sportsId: 11, met: 3, exerciseTime: 1.5 },
    { sportsId: 12, met: 4.3, exerciseTime: 0.5 },
  ]
};

const sportNames = {
  1: "조깅", 2: "사이클", 3: "등산", 4: "수영",  5: "줄넘기", 6: "계단 오르기", 7: "요가", 8: "축구", 9: "야구",
  10: "테니스", 11: "배구", 12: "골프" };

const sportIcons = {
  1: <DirectionsRunIcon fontSize="large" />,
  2: <DirectionsBikeIcon fontSize="large" />,
  3: <HikingIcon fontSize="large" />,
  4: <PoolIcon fontSize="large" />,
  5: <AccessibilityNewIcon fontSize="large" />,
  6: <StairsIcon fontSize="large" />,
  7: <SelfImprovementIcon fontSize="large" />,
  8: <SportsSoccerIcon fontSize="large" />,
  9: <SportsBaseballIcon fontSize="large" />,
  10: <SportsTennisIcon fontSize="large" />,
  11: <SportsVolleyballIcon fontSize="large" />,
  12: <SportsGolfIcon fontSize="large" />
};

const sportMETs = {
  1: 5, 2: 8, 3: 7.5, 4: 7, 5: 10, 6: 8, 7: 2.5, 8: 7, 
  9: 6.9, 10: 6.5, 11: 6, 12: 5
};

const baseSportsData = Object.keys(sportNames).map(sportsId => ({
  sportsId: parseInt(sportsId),
  name: sportNames[sportsId],
  icon: sportIcons[sportsId],
}));

export const sportsData = baseSportsData.map(sport => {
  // 서버에서 제공하는 정보 찾기
  const serverData = exerciseResponseDto.sportsDtoList.find(s => s.sportsId === sport.sportsId);
  
  const kcalPerHour = (3.5 * sportMETs[sport.sportsId] * exerciseResponseDto.weight * 60) / 1000 * 5;
  
  if (serverData) {
    return {
      ...sport,
      met: sportMETs[sport.sportsId],
      exerciseTime: serverData.exerciseTime,
      kcal: kcalPerHour
    };
  } else {
    return {
      ...sport,
      met: sportMETs[sport.sportsId],
      kcal: kcalPerHour
    };  // 서버에서 정보가 제공되지 않는 경우 기본 데이터 사용
  }
});

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
    sportsData.reduce(
      (acc, sport) => ({
        ...acc,
        [sport.name]: false,
      }),
      {}
    )
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

  // const [currentDate, setCurrentDate] = useState(new Date()); // 현재 화면에 표시되는 날짜
  // const today = new Date(); // 실제 오늘 날짜

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

  // function formatDateToCustomString(date) {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하기 때문에 +1 해줍니다.
  //   const day = String(date.getDate()).padStart(2, '0');
  
  //   return `${year}.${month}.${day}`;
  // }
  
  // console.log(formatDateToCustomString(now));       // 오늘 날짜
  // console.log(formatDateToCustomString(before));    // 어제 날짜
  

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
            // sx={{ paddingRight: "1rem" }}
          ></Grid>
        </Grid>
      </Grid>

      {/* Box 1 */}
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
                  // marginBottom: "10px",
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

      {/* Box 2 */}
      <div
        style={{
          width: "100%",
          height: "20vh",
          backgroundColor: "white",
          // borderRadius: "30px",
          // boxShadow: "2px 2px 4px #a5a5a5",
          // padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
          // marginBottom: "10px",
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
                // marginTop: "20px",
                fontSize: "1.3rem",
                // padding: "5px 100px",
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
