import React from "react";
import Slider from "react-slick";

import { Grid, Typography } from "@mui/material";

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
    arrows: false,
  };

  const bodyWidth = document.body.offsetWidth;

  return (
    <Grid
      item
      container
      sx={{ maxWidth: bodyWidth, height: "100%", zIndex: 999 }}
      justifyContent={"center"}
      alignItems={"center"}
    >
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
                    xs={11}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ py: "2vh" }}
                    textAlign={"center"}
                  >
                    <Typography fontSize={"1.4rem"}>{food.name}</Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      xs={4}
                      item
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      칼로리
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                    >
                      <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {food.kcal} kcal
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      xs={4}
                      item
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      탄수화물
                    </Grid>
                    <Grid
                      container
                      xs={4}
                      item
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                    >
                      <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {food.carbs} mg
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      xs={4}
                      item
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      단백질
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                    >
                      <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {food.protein} mg
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      xs={4}
                      item
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      적합도
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                    >
                      <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {food.accuracy.toFixed(2)} %
                      </Typography>
                    </Grid>
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
