import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function FoodDetail() {
  const { name } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/foods`, {
          params: { name },
          headers: {
            'X-FNS-ACCESSTOKEN': accessToken,
          }
        });

        if (response.data.success) {
          setFoodItem(response.data.data[0]); // 첫 번째 항목을 선택합니다.
        } else {
          console.error("Failed to fetch food detail:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching food detail:", error);
      }
    };

    fetchFoodDetail();
  }, [name, accessToken, SERVER_API_URL]);

  if (!foodItem) {
    return <div>음식을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {foodItem.name}
      </Typography>
      <Typography variant="body1">{`kcal: ${foodItem.kcal}`}</Typography>
      <Typography variant="body1">{`탄수화물: ${foodItem.carbs}`}</Typography>
      <Typography variant="body1">{`단백질: ${foodItem.protein}`}</Typography>
      <Typography variant="body1">{`지방: ${foodItem.fat}`}</Typography>
      <Typography variant="body1">{`수분: ${foodItem.pollination}`}</Typography>
      <Typography variant="body1">{`당: ${foodItem.sugar}`}</Typography>
      <Typography variant="body1">{`식이섬유: ${foodItem.dietaryFiber}`}</Typography>
      <Typography variant="body1">{`칼슘: ${foodItem.calcium}`}</Typography>
      <Typography variant="body1">{`칼륨: ${foodItem.potassium}`}</Typography>
      <Typography variant="body1">{`철: ${foodItem.iron}`}</Typography>
      <Typography variant="body1">{`인: ${foodItem.phosphorus}`}</Typography>
      <Typography variant="body1">{`나트륨: ${foodItem.sodium}`}</Typography>
      <Typography variant="body1">{`비타민A: ${foodItem.vitaminA}`}</Typography>
      <Typography variant="body1">{`비타민C: ${foodItem.vitaminC}`}</Typography>
      <Typography variant="body1">{`비타민D: ${foodItem.vitaminD}`}</Typography>
      <Typography variant="body1">{`콜레스테롤: ${foodItem.cholesterol}`}</Typography>
      <Typography variant="body1">{`포화지방산: ${foodItem.acid}`}</Typography>
      <Typography variant="body1">{`트랜스지방산: ${foodItem.transFat}`}</Typography>
    </div>
  );
}

export default FoodDetail;
