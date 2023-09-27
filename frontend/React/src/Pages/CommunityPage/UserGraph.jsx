import React, { useState } from "react";

import {
  Typography,
  Grid,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  Box,
} from "@mui/material";

import CommunityBarGraph from "./CommunityBarGraph";

// 아침, 점심, 저녁, 간식이 같은 형식으로 반복하니까 API 연결하면서 중복 코드 줄이기?

const UserGraph = (props) => {
  const { user, index, selectedUser, setSelectedUser } = props;

  const [cancelFollowModal, setCancelFollowModal] = useState(false);

  const handleUserChange = (e, newUserIndex) => {
    if (selectedUser !== newUserIndex) {
      setSelectedUser(newUserIndex);
    } else {
      setSelectedUser(null);
    }
  };

  const openCancelFollowModal = (e) => {
    e.stopPropagation();
    setCancelFollowModal(true);
  };

  const closeCancelFollowModal = (e) => {
    e.stopPropagation();
    setCancelFollowModal(false);
  };

  const handleCancelFollow = (e) => {
    e.stopPropagation();
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
        py: "1vh",
      }}
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
        onClick={(e) => handleUserChange(e, index)}
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
          <Grid item container justifyContent={"center"} alignItems={"center"}>
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
            <Grid
              item
              container
              xs={11}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ pt: "2vh" }}
            >
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{
                  borderRadius: "10px",
                  color: "white",
                  textShadow: "2px 2px 20px #8b8b8b",
                  fontSize: "1rem",
                }}
                onClick={(e) => openCancelFollowModal(e)}
              >
                팔로우 취소
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={cancelFollowModal}
        onClose={(e) => closeCancelFollowModal(e)}
        aria-labelledby="community-modal"
        sx={{ zIndex: 1000 }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            maxWidth: "700px",
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            id="community-input"
            variant="h5"
            sx={{ paddingY: "1vh" }}
          >
            정말로 팔로우를 취소하시겠습니까?
          </Typography>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ paddingY: "2vh" }}
          >
            <Grid
              container
              item
              xs={11}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid
                container
                item
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  fullWidth
                  color="warning"
                  variant="contained"
                  onClick={(e) => handleCancelFollow(e)}
                  sx={{
                    color: "white",
                    fontSize: "1.1rem",
                    borderRadius: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  팔로우 취소
                </Button>
              </Grid>
              <Grid
                container
                item
                xs={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={closeCancelFollowModal}
                  sx={{
                    color: "white",
                    fontSize: "1.1rem",
                    borderRadius: "10px",
                  }}
                >
                  닫기
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default UserGraph;