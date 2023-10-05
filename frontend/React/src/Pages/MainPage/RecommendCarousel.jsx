import { Grid, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendCarousel = (props) => {
  const { recommendedFood } = props;

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
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {food.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {food.kcal}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {food.carbs}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {food.protein}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {food.accuracy.toFixed(0)}
                    </Typography>
                  </Grid>
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
