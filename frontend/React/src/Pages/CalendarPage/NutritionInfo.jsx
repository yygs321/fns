import React from 'react';
import { Typography } from '@mui/material';
// import dayjs from 'dayjs';
import BarGraph2 from './BarGraph2';

const NutritionInfo = ({ selectedDate, nutritionData }) => {
  return (
      <div className="white-content-box" style={{ width: '80%', padding: '20px' }}>
          <Typography variant="h6">{selectedDate.format('YYYY-MM-DD')}</Typography>
          <Typography variant="body2" style={{ marginTop: 15 }}>오늘의 영양소 정보</Typography>
          
          {Object.entries(nutritionData).map(([key, value], index) => (
              <BarGraph2
                key={index}
                name={key}
                nutrient={value.intake}
                maxNutrient={value.recommended}
              />
          ))}
      </div>
  );
};

export default NutritionInfo;
