import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const DUMMY_DATA = [
  { name: '식품1', kcal: 80, carbs: 9, protein: 53, fat: 3 },
  { name: '식품2', kcal: 150, carbs: 60, protein: 90, fat: 66 },
  { name: '식품3', kcal: 300, carbs: 36, protein: 105, fat: 19 },
  { name: '식품4', kcal: 400, carbs: 100, protein: 56, fat: 96 },
  { name: '식품5', kcal: 200, carbs: 15, protein: 60, fat: 60 },
  { name: '식품6', kcal: 300, carbs: 90, protein: 150, fat: 30 },
  { name: '식품7', kcal: 720, carbs: 375, protein: 100, fat: 15 },
  { name: '식품8', kcal: 500, carbs: 290, protein: 65, fat: 30 },
];

function FoodDetail() {
  const { name } = useParams(); // URL 파라미터에서 'name' 값을 가져옵니다.
  
  // 이름을 기준으로 더미 데이터에서 항목을 찾습니다.
  const foodItem = DUMMY_DATA.find(item => item.name === name);

  if (!foodItem) {
    return <div>음식을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>{foodItem.name}</Typography>
      <Typography variant="body1">{`KCAL: ${foodItem.kcal}`}</Typography>
      <Typography variant="body1">{`탄수화물: ${foodItem.carbs}`}</Typography>
      <Typography variant="body1">{`단백질: ${foodItem.protein}`}</Typography>
      <Typography variant="body1">{`지방: ${foodItem.fat}`}</Typography>
    </div>
  );
}

export default FoodDetail;
