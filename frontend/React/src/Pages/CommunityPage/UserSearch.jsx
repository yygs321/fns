import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, TextField, Button, Avatar } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SearchIcon from "@mui/icons-material/Search";

import axiosInstance from "../Common/Component/AxiosInstance";

const UserSearch = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedFollow, setAddedFollow] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();
  const goBackPage = () => {
    navigate(-1);
  };

  const getFollowee = async () => {
    try {
      const res = await axiosInstance({
        method: "get",
        url: `${SERVER_API_URL}/follow`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      const result = res.data.data;

      setAddedFollow(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFollowee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchFollow = async () => {
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

  const handleAddFollow = async (one) => {
    try {
      await axiosInstance({
        method: "post",
        url: `${SERVER_API_URL}/follow/${one.id}`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      const newFollow = { ...one, memberId: one.id };

      setAddedFollow([...addedFollow, newFollow]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancleFollow = async (one) => {
    try {
      await axiosInstance({
        method: "delete",
        url: `${SERVER_API_URL}/follow/${one.id}`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      const updatedFollow = addedFollow.filter(
        (follow) => follow.memberId !== one.id
      );

      setAddedFollow(updatedFollow);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveButton = () => {
    navigate(-1);
  };

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
        alignItems={"flex-start"}
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
              {!addedFollow.some((followee) => followee.memberId === one.id) ? (
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
