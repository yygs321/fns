import React, { useState } from 'react';
import { Typography, Button, Grid, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; 
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'; 
import HikingIcon from '@mui/icons-material/Hiking'; 
import PoolIcon from '@mui/icons-material/Pool';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'; //줄넘기 이 아이콘으로 대체
import StairsIcon from '@mui/icons-material/Stairs';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const sportsData = [
    { name: '조깅', kcal: 500, icon: <DirectionsRunIcon fontSize="large" /> },
    { name: '사이클', kcal: 500, icon: <DirectionsBikeIcon fontSize="large" /> },
    { name: '등산', kcal: 500, icon: <HikingIcon fontSize="large" /> },
    { name: '수영', kcal: 500, icon: <PoolIcon fontSize="large" /> },
    { name: '줄넘기', kcal: 500, icon: <AccessibilityNewIcon fontSize="large" /> },
    { name: '계단 오르기', kcal: 500, icon: <StairsIcon fontSize="large" /> },
    { name: '요가', kcal: 500, icon: <SelfImprovementIcon fontSize="large" /> },
    { name: '축구', kcal: 500, icon: <SportsSoccerIcon fontSize="large" /> },
    { name: '야구', kcal: 500, icon: <SportsBaseballIcon fontSize="large" /> },
    { name: '테니스', kcal: 500, icon: <SportsTennisIcon fontSize="large" /> },
    { name: '배구', kcal: 500, icon: <SportsVolleyballIcon fontSize="large" /> },
    { name: '골프', kcal: 500, icon: <SportsGolfIcon fontSize="large" /> }
];

const SportItem = ({ name, kcal, icon, onTimeChange }) => (
  <Grid container alignItems="center" spacing={3}>
    <Grid item xs={2}>
    {icon}
    </Grid>
    <Grid item xs={6}>
      <Typography>{name} 1시간 당 {kcal}cal소모</Typography>
    </Grid>
    <Grid item xs={4}>
      <TextField
        fullWidth
        type="number"
        label="시간"
        onChange={(e) => onTimeChange(name, parseInt(e.target.value))}
      />
    </Grid>
  </Grid>
);

const SportsPage = () => {
  const [times, setTimes] = useState({});

  const handleTimeChange = (name, time) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [name]: time,
    }));
  };

  const totalHours = Object.values(times).reduce((acc, val) => acc + val, 0);
  const totalCalories = Object.entries(times).reduce((acc, [name, time]) => {
    const kcal = sportsData.find(sport => sport.name === name)?.kcal || 0;
    return acc + kcal * time;
  }, 0);

    return  (
      <div style={{ 
        height: '100vh', 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        flexDirection: 'column', // 이 부분을 추가합니다.
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '20px' // 박스들 사이의 간격을 조절합니다.
      }}>
      
      {/* Box 1 */}
      <div style={{ 
          width: '80%', 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
          padding: '20px', 
          textAlign: 'center',
          boxSizing: 'border-box',
          maxHeight: '80vh',
          marginBottom: '20px',
          overflowY: 'auto'
      }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4">운동 시간</Typography>
              <SettingsIcon />
          </div>
          {sportsData.map((sport) => (
              <SportItem 
              key={sport.name} 
              name={sport.name} 
              kcal={sport.kcal} 
              icon={sport.icon}  
              onTimeChange={handleTimeChange} 
          />
          ))}
      </div>
      
      {/* Box 2 */}
      <div style={{ 
          width: '80%', 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
          padding: '20px', 
          textAlign: 'center',
          boxSizing: 'border-box',
          maxHeight: '80vh'
      }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <Typography variant="h6">
                  총 시간: {totalHours}시간
              </Typography>
              <Typography variant="h6">
                  총 소모 칼로리: {totalCalories}cal
              </Typography>
          </div>
      </div>
      
    </div>
        
    );
};

export default SportsPage;
