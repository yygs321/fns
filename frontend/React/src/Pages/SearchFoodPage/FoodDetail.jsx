import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import axiosInstance from "../Common/Component/AxiosInstance";

function FoodDetail() {
  const { name } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  const accessToken = sessionStorage.getItem("accessToken");
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await axiosInstance.get(`${SERVER_API_URL}/foods`, {
          params: { name },
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        });

        if (response.data.success) {
          setFoodItem(response.data.data[0]);
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
      <Typography variant="body1">{`탄수화물(g): ${foodItem.carbs}`}</Typography>
      <Typography variant="body1">{`단백질(g): ${foodItem.protein}`}</Typography>
      <Typography variant="body1">{`지방(g): ${foodItem.fat}`}</Typography>
      <Typography variant="body1">{`수분(g): ${foodItem.pollination}`}</Typography>
      <Typography variant="body1">{`당(g): ${foodItem.sugar}`}</Typography>
      <Typography variant="body1">{`식이섬유(g): ${foodItem.dietaryFiber}`}</Typography>
      <Typography variant="body1">{`칼슘(mg): ${foodItem.calcium}`}</Typography>
      <Typography variant="body1">{`칼륨(mg): ${foodItem.potassium}`}</Typography>
      <Typography variant="body1">{`철(mg): ${foodItem.iron}`}</Typography>
      <Typography variant="body1">{`인(mg): ${foodItem.phosphorus}`}</Typography>
      <Typography variant="body1">{`나트륨(mg): ${foodItem.sodium}`}</Typography>
      <Typography variant="body1">{`비타민A(μg): ${foodItem.vitaminA}`}</Typography>
      <Typography variant="body1">{`비타민C(μg): ${foodItem.vitaminC}`}</Typography>
      <Typography variant="body1">{`비타민D(μg): ${foodItem.vitaminD}`}</Typography>
      <Typography variant="body1">{`콜레스테롤(mg): ${foodItem.cholesterol}`}</Typography>
      <Typography variant="body1">{`포화지방산(g): ${foodItem.acid}`}</Typography>
      <Typography variant="body1">{`트랜스지방산(g): ${foodItem.transFat}`}</Typography>
    </div>
  );
}

export default FoodDetail;
