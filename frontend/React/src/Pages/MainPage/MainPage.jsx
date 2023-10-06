import React, { memo, useEffect, useState } from "react";

import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  Tooltip,
} from "@mui/material";
import BarGraph from "./BarGraph";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import FloatingInputButton from "../Common/Component/FloatingInputButton";
import axiosInstance from "../Common/Component/AxiosInstance";
import RecommendCarousel from "./RecommendCarousel";
import Loading from "../Common/Component/Loading";
import "../Common/CSS/BackgroundColor.css";
import "../Common/CSS/ContentBox.css";

const MainPage = () => {
  const [kcalories, setKcalories] = useState(0);
  const [orgKcal, setOrgKcal] = useState(0);
  const [baseKcalories, setBaseKcalories] = useState(9999);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [baseCarbohydrate, setBaseCarbohydrate] = useState(999);
  const [protein, setProtein] = useState(0);
  const [baseProtein, setBaseProtein] = useState(999);
  const [fat, setFat] = useState(0);
  const [baseFat, setBaseFat] = useState(999);

  const [isOverKcal, setIsOverKcal] = useState(false);
  const [overKcal, setOverKcal] = useState(0);

  const [isAccordionSelected, setIsAccordionSelected] = useState(false);
  const [recommendedFood, setRecommendedFood] = useState([]);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");
  const now = new Date();
  const before = new Date(now);
  before.setDate(before.getDate() - 1);

  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const today = now.toLocaleDateString("ko-KR", options).split(" ");

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const beforeDay = before.getDate().toString().padStart(2, "0");

  const formattedToday = `${year}-${month}-${day}`;
  const formattedYesterday = `${year}-${month}-${beforeDay}`;

  const getNeut = async () => {
    try {
      const [res, res2, res3] = await Promise.all([
        axiosInstance({
          method: "get",
          url: `${SERVER_API_URL}/base/current`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }),

        axiosInstance({
          method: "get",
          url: `${SERVER_API_URL}/intake/simple/${formattedToday}`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }),

        axiosInstance({
          method: "get",
          url: `${SERVER_API_URL}/intake/simple/${formattedYesterday}`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }),
      ]);

      const baseData = res.data.data;
      const nowData = res2.data.data;
      const beforeData = res3.data.data;

      const res4 = await axiosInstance({
        method: "post",
        url: `https://j9a403.p.ssafy.io/fastapi/recommend`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        data: {
          calorie: (baseData.kcal - beforeData.kcal).toFixed(0),
          carbohydrate: baseData.carbs - beforeData.carbs,
          protein: baseData.protein - beforeData.protein,
        },
      });

      setRecommendedFood(res4.data.recommended_foods);

      setBaseKcalories(baseData.kcal);
      setBaseCarbohydrate(baseData.carbs);
      setBaseProtein(baseData.protein);
      setBaseFat(baseData.fat);
      setKcalories(nowData.kcal);
      setOrgKcal(nowData.kcal);
      setCarbohydrate(nowData.carbs);
      setProtein(nowData.protein);
      setFat(nowData.fat);

      if (nowData.kcal > baseData.kcal) {
        setIsOverKcal(true);
        setOverKcal(nowData.kcal - baseData.kcal);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getNeut();

    let targetValue = 0;

    if (isOverKcal) {
      targetValue = 100;
    } else {
      targetValue = (orgKcal / baseKcalories) * 100;
    }
    let currentValue = 0;
    const animationDuration = 500;

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        if (targetValue - currentValue > 100) {
          currentValue += 100;
        } else if (targetValue - currentValue > 10) {
          currentValue += 10;
        } else {
          currentValue += 1;
        }
        setKcalories(Math.round((currentValue / 100) * baseKcalories));
      } else {
        clearInterval(interval);
      }
    }, animationDuration / (targetValue - currentValue));

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccordion = () => {
    setIsAccordionSelected(!isAccordionSelected);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="gray-pages">
        <Grid container justifyContent={"center"}>
          <Grid
            className=""
            item
            container
            xs={12}
            justifyContent={"center"}
            sx={{
              height: "8vh",
              backgroundColor: "#00E1AB",
            }}
          >
            <Grid
              container
              item
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="caption"
                component="div"
                color="white"
                fontSize={"1.5rem"}
                fontWeight={"bold"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`${today[0]}${today[1]}${today[2]}${today[3]}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            className="white-content-box"
            item
            container
            xs={11}
            justifyContent={"center"}
            sx={{ marginTop: "2vh", height: "60vh" }}
          >
            <Grid
              container
              item
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  sx={{ color: "#e7e7e7" }}
                  size={"17rem"}
                  thickness={5}
                />
                <CircularProgress
                  variant="determinate"
                  sx={{
                    position: "absolute",
                    zIndex: "10",
                    "svg circle": { stroke: "url(#my_gradient)" },
                  }}
                  value={
                    isOverKcal
                      ? 100
                      : Math.round((kcalories / baseKcalories) * 100)
                  }
                  size={"17rem"}
                  thickness={5}
                />

                {isOverKcal ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      zIndex: "20",
                    }}
                  >
                    <Tooltip
                      title={
                        <Grid container justifyContent={"center"}>
                          <Typography
                            color="warning.main"
                            fontWeight={"bolder"}
                            fontSize={"1.2rem"}
                          >{`${overKcal} Kcal `}</Typography>
                          &nbsp;
                          <Typography
                            fontWeight={"bolder"}
                            fontSize={"1.1rem"}
                          >{`만큼 초과했어요!`}</Typography>
                        </Grid>
                      }
                      placement="top-end"
                      open={isTooltipOpen}
                      onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                      onMouseEnter={() => setIsTooltipOpen(true)}
                      onMouseLeave={() => setIsTooltipOpen(false)}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: "rgba(50, 50, 50, 95%)",
                            boxShadow: "2px 2px 4px #a5a5a5",
                            border: "0.5px solid #a5a5a5",
                            borderRadius: "10px",
                            textShadow: "2px 2px 40px white",
                            padding: "1.1rem",
                          },
                        },
                      }}
                      arrow
                    >
                      <WarningRoundedIcon
                        color="error"
                        sx={{ fontSize: "2rem" }}
                      />
                    </Tooltip>
                  </Box>
                ) : null}
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color={
                          isOverKcal
                            ? "warning.main"
                            : kcalories / baseKcalories >= 0.75
                            ? "primary.main"
                            : "#506CFF"
                        }
                        fontSize={"1.2rem"}
                        fontWeight={"bold"}
                      >
                        {isOverKcal
                          ? "칼로리 초과!"
                          : kcalories / baseKcalories >= 0.75
                          ? "적정 수준이예요!"
                          : "더 먹어야해요!"}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid
                        container
                        item
                        xs={5}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                          fontSize={"1.8rem"}
                          fontWeight={"bold"}
                          sx={{ position: "absolute", top: "36%" }}
                        >
                          {kcalories > orgKcal || kcalories >= baseKcalories
                            ? `${orgKcal.toFixed(0)}`
                            : Number.isInteger(kcalories)
                            ? `${kcalories}`
                            : `${kcalories.toFixed(0)}`}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                          fontSize={"3rem"}
                        >
                          /
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={5}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                          fontSize={"1.8rem"}
                          fontWeight={"bold"}
                          sx={{ position: "absolute", bottom: "39%" }}
                        >
                          {`${baseKcalories}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={"2rem"}
                        fontWeight={"bold"}
                      >
                        kcal
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item container xs={4} justifyContent={"center"}>
                <BarGraph
                  maxNutrient={baseCarbohydrate}
                  nutrient={carbohydrate}
                  name={"탄수화물"}
                />
              </Grid>
              <Grid item container xs={4} justifyContent={"center"}>
                <BarGraph
                  maxNutrient={baseProtein}
                  nutrient={protein}
                  name={"단백질"}
                />
              </Grid>
              <Grid item container xs={4} justifyContent={"center"}>
                <BarGraph maxNutrient={baseFat} nutrient={fat} name={"지방"} />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ marginTop: "2vh", marginBottom: "5vh" }}
          >
            <Accordion
              expanded={isAccordionSelected}
              onClick={handleAccordion}
              style={{ borderRadius: "25px" }}
              sx={{
                height: "100%",
                width: "100%",
                boxShadow: "2px 2px 4px #a5a5a5",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Grid item container xs={12} justifyContent={"center"}>
                    <ExpandMoreRoundedIcon />
                  </Grid>
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid container>
                  <Grid item container justifyContent={"center"}>
                    <Typography>오늘의 메뉴</Typography>
                  </Grid>
                  <hr style={{ width: "80vw", maxWidth: "650px" }} />
                  <Grid item container xs={12} justifyContent={"center"}>
                    {!isAccordionSelected ? (
                      <Grid
                        item
                        container
                        xs={11}
                        justifyContent={"flex-start"}
                      >
                        {recommendedFood.map((f, index) => (
                          <React.Fragment key={`${f.name}-${index}-selected`}>
                            <Typography sx={{ color: "text.secondary" }}>
                              {f.name}
                            </Typography>
                            {index !== recommendedFood.length - 1 && (
                              <Typography sx={{ color: "text.secondary" }}>
                                {","}&nbsp;
                              </Typography>
                            )}
                          </React.Fragment>
                        ))}
                      </Grid>
                    ) : (
                      <RecommendCarousel recommendedFood={recommendedFood} />
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
            </Accordion>
          </Grid>
        </Grid>
        <FloatingInputButton />
        <div
          style={{
            height: "0px",
            width: "0px",
            position: "fixed",
            zIndex: "-10",
          }}
        >
          <svg>
            <defs>
              <linearGradient
                id="my_gradient"
                x1={isOverKcal ? "100%" : "75%"}
                y1={isOverKcal ? "100%" : "75%"}
                x2={
                  isOverKcal
                    ? "50%"
                    : kcalories / baseKcalories >= 0.5
                    ? "0%"
                    : "10%"
                }
                y2={
                  isOverKcal
                    ? "25%"
                    : kcalories / baseKcalories >= 0.5
                    ? "0%"
                    : "50%"
                }
              >
                <stop
                  offset="0%"
                  stopColor={
                    isOverKcal
                      ? "#ffd8d0"
                      : kcalories / baseKcalories >= 0.5
                      ? "#55ffd7"
                      : "#87d0f8"
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    isOverKcal
                      ? "#e05750"
                      : kcalories / baseKcalories >= 0.5
                      ? "#14caa0"
                      : "#4d66e2"
                  }
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
};

export default memo(MainPage);
