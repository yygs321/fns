import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Grid, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import axiosInstance from "../Common/Component/AxiosInstance";
import CommunityBarGraph from "./CommunityBarGraph";
import UsersTabs from "./UsersTabs";
import Loading from "../Common/Component/Loading";

const CommunityPage = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");

  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  const formattedToday = `${year}-${month}-${day}`;

  const navigate = useNavigate();

  const [kcalories, setKcalories] = useState(0);
  const [baseKcalories, setBaseKcalories] = useState(9999);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [baseCarbohydrate, setBaseCarbohydrate] = useState(999);
  const [protein, setProtein] = useState(0);
  const [baseProtein, setBaseProtein] = useState(999);
  const [fat, setFat] = useState(0);
  const [baseFat, setBaseFat] = useState(999);
  const [myProfile, setMyProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [followees, setFollowees] = useState([]);

  const getMyData = async () => {
    try {
      const [res, res2, res3, res4] = await Promise.all([
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
          url: `${SERVER_API_URL}/members`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }),

        axiosInstance({
          method: "get",
          url: `${SERVER_API_URL}/follow`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }),
      ]);

      const result = res4.data.data;

      setFollowees(result);

      const baseData = res.data.data;
      const nowData = res2.data.data;

      setMyProfile(res3.data.data);
      setBaseKcalories(baseData.kcal);
      setBaseCarbohydrate(baseData.carbs);
      setBaseProtein(baseData.protein);
      setBaseFat(baseData.fat);
      setKcalories(nowData.kcal);
      setCarbohydrate(nowData.carbs);
      setProtein(nowData.protein);
      setFat(nowData.fat);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getMyData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSearch = () => {
    navigate("/community/search");
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="white-pages">
        <Grid container justifyContent={"center"}>
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "22vh",
              borderBottom: "1px solid #e7e7e7",
              pt: "1vh",
              pb: "2vh",
            }}
          >
            <Grid
              container
              item
              xs={4}
              sx={{ height: "100%" }}
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
                <Avatar alt="MyName" sx={{ width: "5rem", height: "5rem" }} />
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontSize={"1rem"}
                  fontWeight={"bold"}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {myProfile ? myProfile.nickname : "닉네임이 없습니다."}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
            >
              <Grid item container xs={3} justifyContent={"center"}>
                <CommunityBarGraph
                  nutrient={kcalories}
                  maxNutrient={baseKcalories}
                  name={"칼로리"}
                />
              </Grid>
              <Grid item container xs={3} justifyContent={"center"}>
                <CommunityBarGraph
                  nutrient={carbohydrate}
                  maxNutrient={baseCarbohydrate}
                  name={"탄수화물"}
                />
              </Grid>
              <Grid item container xs={3} justifyContent={"center"}>
                <CommunityBarGraph
                  nutrient={protein}
                  maxNutrient={baseProtein}
                  name={"단백질"}
                />
              </Grid>
              <Grid item container xs={3} justifyContent={"center"}>
                <CommunityBarGraph
                  nutrient={fat}
                  maxNutrient={baseFat}
                  name={"지방"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "10vh" }}
          >
            <Grid
              container
              item
              xs={9}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="유저 검색"
                InputProps={{
                  endAdornment: <SearchIcon color="text.secondary" />,
                  sx: {
                    height: "6vh",
                    borderRadius: "30px",
                    backgroundColor: "#e7e7e7",
                    cursor: "pointer",
                  },
                }}
                inputProps={{
                  readOnly: true,
                  style: { cursor: "pointer" },
                }}
                sx={{
                  cursor: "pointer",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    height: "6vh",
                  },
                }}
                maxRows={1}
                onClick={goToSearch}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "60vh",
            }}
          >
            <UsersTabs followees={followees} />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default CommunityPage;
