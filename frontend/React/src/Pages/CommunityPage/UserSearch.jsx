import React, { useState } from "react";

import { Grid, Typography, TextField, Button, Avatar } from "@mui/material";

import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

// import Cat from "../../assets/Image/cat.jpg";
import axiosInstance from "../Common/Component/AxiosInstance";
import { useSelector } from "react-redux";

const UserSearch = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [addedFollow, setAddedFollow] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  console.log(searchTerm);

  const navigate = useNavigate();

  // const searchResult = [
  //   { username: "짭냥이", profileImg: Cat, old: 10, BMI: 30 },
  //   { username: "콘냥이", profileImg: Cat, old: 9, BMI: 25 },
  //   { username: "얍냥이", profileImg: Cat, old: 8, BMI: 20 },
  //   { username: "쩝냥이", profileImg: Cat, old: 7, BMI: 15 },
  // ];
  const goBackPage = () => {
    navigate(-1);
  };

  const handleSearchFollow = async () => {
    // 여기다 검색 api
    try {
      const res = await axiosInstance({
        method: "get",
        url: `${SERVER_API_URL}/follow/member`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        params: {
          nickname: searchTerm,
        },
      });

      console.log(res);

      const result = res.data.data;

      setSearchResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleSearchFollow();
    }
  };

  const handleAddFollow = (one) => {
    setAddedFollow((prev) => [...prev, one.username]);
  };

  const handleCancleFollow = (one) => {
    setAddedFollow((prev) => prev.filter((follow) => follow !== one.username));
  };

  const handleSaveButton = () => {
    // 리덕스같은데에다 저장
    navigate(-1);
  };

  // 검색창 포커스되면 배경색 변하게 하기
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="white-pages">
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "7vh" }}
      >
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavigateBeforeRoundedIcon
            sx={{
              fontSize: "2rem",
              paddingBottom: "0.2rem",
              cursor: "pointer",
            }}
            onClick={goBackPage}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="caption"
            component="div"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            유저 검색
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        ></Grid>
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
              endAdornment: (
                <SearchIcon
                  color="text.secondary"
                  onClick={handleSearchFollow}
                />
              ),
              sx: {
                height: "6vh",
                borderRadius: "30px",
                backgroundColor: isFocused ? "white" : "#e7e7e7",
                cursor: "pointer",
              },
            }}
            sx={{
              cursor: "pointer",
              "& .MuiOutlinedInput-notchedOutline": {
                border: isFocused ? "" : "none",
                height: "6vh",
              },
            }}
            maxRows={1}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handlePressEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <Grid
        className="noscroll"
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ overflow: "scroll", height: "65vh" }}
      >
        {searchResult.map((one, index) => (
          <Grid
            key={`${one.name}-detail-${index}`}
            container
            item
            xs={10}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              borderBottom: "2px solid #e7e7e7",
              height: "20vh",
            }}
          >
            <Grid
              container
              item
              xs={4}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Grid
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar
                  alt="MyName"
                  // src={one.profileImg}
                  sx={{ width: "5rem", height: "5rem" }}
                />
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
                  {one.nickname}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={4}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
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
                나이 : {one.age}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                fontSize={"1rem"}
                fontWeight={"bold"}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                성별 : {one.gender === "MALE" ? "남자" : "여자"}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {!addedFollow.includes(one.username) ? (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    color: "white",
                    textShadow: "2px 2px 20px #8b8b8b",
                    fontSize: "1rem",
                  }}
                  onClick={() => handleAddFollow(one)}
                >
                  팔로우
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderRadius: "10px",
                    color: "white",
                    textShadow: "2px 2px 20px #8b8b8b",
                    fontSize: "1rem",
                  }}
                  onClick={() => handleCancleFollow(one)}
                >
                  &nbsp;취소&nbsp;
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
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
          xs={10}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "10px",
              color: "white",
              textShadow: "2px 2px 20px #8b8b8b",
              fontSize: "1.5rem",
            }}
            onClick={handleSaveButton}
          >
            저장
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserSearch;
