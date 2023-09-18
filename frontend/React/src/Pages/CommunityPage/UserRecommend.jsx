import React, { useState } from "react";

import { Typography, Grid, Avatar, Button } from "@mui/material";

const UserRecommend = (props) => {
  const { user } = props;

  const [addedFollow, setAddedFollow] = useState([]);

  const handleAddFollow = (user) => {
    setAddedFollow((prev) => [...prev, user.username]);
  };

  const handleCancleFollow = (user) => {
    setAddedFollow((prev) => prev.filter((follow) => follow !== user.username));
  };

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #e7e7e7",
        height: "20vh",
        py: "1vh",
      }}
    >
      <Grid
        container
        item
        xs={4}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "100%" }}
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
            src={user.profileImg}
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
            {user.username}
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
          나이 : {user.old}
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
          BMI : {user.BMI}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {!addedFollow.includes(user.username) ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              color: "white",
              textShadow: "2px 2px 20px #8b8b8b",
              fontSize: "1rem",
            }}
            onClick={() => handleAddFollow(user)}
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
            onClick={() => handleCancleFollow(user)}
          >
            &nbsp;취소&nbsp;
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default UserRecommend;
