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
// 페이지 들어올 때 서버에 요청해서 저장된 내용 불러옴
const handleSaveData = () => {
  // 여기에 나중에 API 연결 코드를 작성하면 됩니다.
  console.log("데이터가 저장되었습니다."); // 임시 메시지
};
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
    alignItems="center"
    spacing={3}
    style={{ marginBottom: "20px" }}
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

  const filteredSports = sportsData.filter(
    (sport) => checkedSports[sport.name]
  );
  const renderSports = isEditMode ? sportsData : filteredSports;
  const totalHours = Object.values(times).reduce((acc, val) => acc + val, 0);
  const totalCalories = Object.entries(times).reduce((acc, [name, time]) => {
    const kcal = sportsData.find((sport) => sport.name === name)?.kcal || 0;
    return acc + kcal * time;
  }, 0);

  return (
    <div
      className="gray-pages"
      style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* Box 1 */}
      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "2px 2px 4px #a5a5a5",
          padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
          marginBottom: "20px",
          overflowY: "auto",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            운동 시간
          </Typography>

          <SettingsIcon
            onClick={() => setEditMode(!isEditMode)}
            sx={{
              position: "absolute",
              right: 15,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.6rem",
            }}
          />
        </div>
        {!isEditMode && filteredSports.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative",
              marginBottom: "10px",
            }}
            onClick={() => setEditMode(!isEditMode)}
          >
            <Typography color="text.secondary" fontWeight={"bold"}>
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

        {isEditMode && (
          <Button
            onClick={handleSave}
            variant="contained"
            fullWidth
            sx={{ color: "white", fontSize: "1.2rem", borderRadius: "10px" }}
          >
            저장
          </Button>
        )}
      </div>

      {/* Box 2 */}
      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "2px 2px 4px #a5a5a5",
          padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <Typography variant="h6">총 운동 시간:</Typography>
            <Typography variant="h6">{totalHours}시간</Typography>
          </div>

          <div>
            <Typography variant="h6">총 소모 칼로리:</Typography>
            <Typography variant="h6">{totalCalories}cal</Typography>
          </div>
        </div>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSaveData}
          sx={{
            marginTop: "20px",
            fontSize: "1.5rem",
            padding: "5px 100px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default SportsPage;
