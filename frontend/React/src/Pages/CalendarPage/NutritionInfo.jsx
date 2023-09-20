import React from 'react';
import { Typography } from '@mui/material';
// import dayjs from 'dayjs';
import BarGraph2 from './BarGraph2';

const NutritionInfo = ({ 날짜, 영양데이터 }) => {
  return (
      <div className="white-content-box" style={{ width: '80%', padding: '20px'}}>
          <Typography variant="h6" textAlign="center">{날짜.format('MM월 DD일')}</Typography>
          <Typography variant="body2" textAlign="center" style={{ marginTop: 10 }}>오늘의 영양소 정보</Typography>
          
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
