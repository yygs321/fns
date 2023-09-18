import React from "react";

import {
  Typography,
  Grid,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import CommunityBarGraph from "./CommunityBarGraph";

// 아침, 점심, 저녁, 간식이 같은 형식으로 반복하니까 API 연결하면서 중복 코드 줄이기?

const UserGraph = (props) => {
  const { user, index, selectedUser, handleUserChange } = props;

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #e7e7e7",
        py: "1vh",
      }}
      onClick={handleUserChange(index)}
    >
      <Accordion
        expanded={index === selectedUser ? true : false}
        style={{ borderRadius: "25px" }}
        sx={{
          height: "100%",
          width: "100%",
          border: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            alignItems: "center", // 가운데 정렬
            paddingBottom: "0.5rem",
            px: "0px",
          }}
        >
          <Grid
            container
            item
            xs={4}
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
            xs={8}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
          >
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={user.nowKcal}
                maxNutrient={user.maxKcal}
                name={"칼로리"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={user.nowcarb}
                maxNutrient={user.maxcarb}
                name={"탄수화물"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={user.nowprot}
                maxNutrient={user.maxprot}
                name={"단백질"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={user.nowprov}
                maxNutrient={user.maxprov}
                name={"지방"}
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ backgroundColor: "#e7e7e7", borderRadius: "10px" }}
          >
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ py: "1vh", borderBottom: "1px solid #a7a7a7" }}
            >
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>시간</Typography>
              </Grid>
              <Grid
                item
                container
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>음식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>분량</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>kcal</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ py: "1vh", borderBottom: "1px solid #a7a7a7" }}
            >
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>아침</Typography>
              </Grid>
              <Grid
                item
                container
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>음식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>분량</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>kcal</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ py: "1vh", borderBottom: "1px solid #a7a7a7" }}
            >
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>점심</Typography>
              </Grid>
              <Grid
                item
                container
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>음식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>분량</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>kcal</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ py: "1vh", borderBottom: "1px solid #a7a7a7" }}
            >
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>저녁</Typography>
              </Grid>
              <Grid
                item
                container
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>음식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>분량</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>kcal</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ py: "1vh" }}
            >
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>간식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>음식</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>분량</Typography>
              </Grid>
              <Grid
                item
                container
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography>kcal</Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default UserGraph;
