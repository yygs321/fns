import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../Common/Component/AxiosInstance";
import { useSelector } from "react-redux";

const RecommendCarousel = (props) => {
  // const { nutrient } = props;

  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  // eslint-disable-next-line no-unused-vars
  const [recommendedFood, setRecommendedFood] = useState([
    "치킨",
    "햄버거",
    "피자",
    "돈까스",
  ]);

  const getRecommendFood = async () => {
    try {
      const res = axiosInstance({
        method: "post",
        url: `https://j9a403.p.ssafy.io/fastapi/recommend`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        // data: nutrient,
        data: {
          calorie: 200,
          carbohydrate: 15.5,
          protein: 24.0,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecommendFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Grid
      container
      sx={{ maxWidth: "767px", height: "100%", zIndex: 999 }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* 세로 중앙 정렬 하려면 아래 div */}
      <Grid
        container
        item
        xs={11}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Slider {...settings}>
            {recommendedFood.map((food) => (
              <div
                key={`RecommendCarousel-${food}`}
                style={{ width: "100%", height: "100%" }}
              >
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Typography>{food}</Typography>
                </Grid>
              </div>
            ))}
          </Slider>
        </div>
      </Grid>
    </Grid>
  );
};

export default RecommendCarousel;
