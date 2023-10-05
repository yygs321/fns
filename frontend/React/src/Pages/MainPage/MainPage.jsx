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
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import "../Common/CSS/BackgroundColor.css";
import "../Common/CSS/ContentBox.css";

import FloatingInputButton from "../Common/Component/FloatingInputButton";
import { useSelector } from "react-redux";
import axiosInstance from "../Common/Component/AxiosInstance";
import RecommendCarousel from "./RecommendCarousel";
import Loading from "../Common/Component/Loading";

const MainPage = () => {
  const [kcalories, setKcalories] = useState(0); // 칼로리
  const [orgKcal, setOrgKcal] = useState(0); // 칼로리
  const [baseKcalories, setBaseKcalories] = useState(9999); // 칼로리
  const [carbohydrate, setCarbohydrate] = useState(0); // 탄수화물
  const [baseCarbohydrate, setBaseCarbohydrate] = useState(999); // 탄수화물
  const [protein, setProtein] = useState(0); // 단백질
  const [baseProtein, setBaseProtein] = useState(999); // 단백질
  const [fat, setFat] = useState(0); // 지방
  const [baseFat, setBaseFat] = useState(999); // 지방

  const [isOverKcal, setIsOverKcal] = useState(false); // 칼로리 초과
  const [overKcal, setOverKcal] = useState(0);

  const [isAccordionSelected, setIsAccordionSelected] = useState(false); // 메뉴 추천

  const [isTooltipOpen, setIsTooltipOpen] = useState(false); // 칼로리 초과 시 툴팁 오픈

  const [isLoading, setIsLoading] = useState(false); // 로딩

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  const now = new Date();
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const today = now.toLocaleDateString("ko-KR", options).split(" ");

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅합니다.
  const day = now.getDate().toString().padStart(2, "0"); // 일자를 두 자리로 포맷팅합니다.

  const formattedToday = `${year}-${month}-${day}`;

  // 영양소 받아온 후, 출력용 요청

  // eslint-disable-next-line no-unused-vars
  const getNeut = async () => {
    try {
      const [res, res2] = await Promise.all([
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
      ]);
      console.log(res);
      console.log(res2);

      const baseData = res.data.data;
      const nowData = res2.data.data;

      setBaseKcalories(baseData.kcal);
      setBaseCarbohydrate(baseData.carbs);
      setBaseProtein(baseData.protein);
      setBaseFat(baseData.fat);
      setKcalories(nowData.kcal);
      setOrgKcal(nowData.kcal);
      setCarbohydrate(nowData.carbs);
      setProtein(nowData.protein);
      setFat(nowData.fat);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 영양소 문제 해결되면 이 쪽 수정
  // const org_kcal = 2000;

  useEffect(() => {
    setIsLoading(true);

    getNeut();

    let targetValue = 0;

    if (kcalories > baseKcalories) {
      setIsOverKcal(true);
      setOverKcal(kcalories - baseKcalories);
      targetValue = 100;
    } else {
      targetValue = (kcalories / baseKcalories) * 100;
    } // ProgressBar가 도달해야 할 값
    let currentValue = 0;
    const animationDuration = 500; // 몇 초 동안 애니메이션 실행

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        if (targetValue - currentValue > 100) {
          currentValue += 100;
        } else if (targetValue - currentValue > 10) {
          currentValue += 10;
        } else {
          currentValue += 1;
        }
        setKcalories(Math.round((currentValue / 100) * baseKcalories)); // kcalories 값을 업데이트
      } else {
        clearInterval(interval); // 목표 값에 도달하면 애니메이션 중지
      }
    }, animationDuration / (targetValue - currentValue)); // 애니메이션 속도 계산

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
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
              <NavigateBeforeRoundedIcon
                sx={{ color: "white", fontSize: "2rem" }}
              />
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
                  // color={isOverKcal ? "warning" : "primary"}
                  sx={{
                    position: "absolute",
                    zIndex: "10",
                    "svg circle": { stroke: "url(#my_gradient)" },
                  }}
                  value={Math.round((kcalories / baseKcalories) * 100)}
                  size={"17rem"}
                  thickness={5}
                />

                {isOverKcal ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0", // 원하는 위치로 조절
                      right: "0", // 원하는 위치로 조절
                      zIndex: "20",
                    }}
                  >
                    <Tooltip
                      title={
                        <Grid
                          container
                          justifyContent={"center"}
                          // alignItems={"center"}
                        >
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
                            ? `${orgKcal}`
                            : Number.isInteger(kcalories)
                            ? `${kcalories}`
                            : `${kcalories.toFixed(1)}`}
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
                          // fontWeight={"bold"}
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
                  setnutrient={setCarbohydrate}
                  name={"탄수화물"}
                />
              </Grid>
              <Grid item container xs={4} justifyContent={"center"}>
                <BarGraph
                  maxNutrient={baseProtein}
                  nutrient={protein}
                  setnutrient={setProtein}
                  name={"단백질"}
                />
              </Grid>
              <Grid item container xs={4} justifyContent={"center"}>
                <BarGraph
                  maxNutrient={baseFat}
                  nutrient={fat}
                  setnutrient={setFat}
                  name={"지방"}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ marginTop: "2vh" }}
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
                  flexDirection: "column", // 아이콘을 아래로 이동하기 위해 컨테이너 방향을 column으로 변경
                  alignItems: "center", // 가운데 정렬
                }}
              >
                <Grid container>
                  <Grid item container justifyContent={"center"}>
                    <Typography>오늘의 메뉴</Typography>
                  </Grid>
                  <hr style={{ width: "80vw", maxWidth: "650px" }} />
                  <Grid item container xs={12} justifyContent={"center"}>
                    {!isAccordionSelected ? (
                      <Typography sx={{ color: "text.secondary" }}>
                        여기다 메뉴 요약
                      </Typography>
                    ) : (
                      <RecommendCarousel />
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
              {/* <AccordionDetails>
              <Grid item container justifyContent={"center"}>
                <Typography>참치 캔</Typography>
              </Grid>
            </AccordionDetails> */}
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
