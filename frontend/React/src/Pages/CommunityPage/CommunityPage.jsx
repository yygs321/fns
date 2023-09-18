import React from "react";

import { Avatar, Grid, Typography, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import CommunityBarGraph from "./CommunityBarGraph";
import UsersTabs from "./UsersTabs";
import Cat from "../../assets/Image/cat.jpg";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const navigate = useNavigate();

  const maxKcal = 2400;
  const nowKcal = 2000;
  const maxcarb = 200;
  const nowcarb = 120;
  const maxprot = 200;
  const nowprot = 100;
  const maxprov = 200;
  const nowprov = 50;

  const username = "귀여운 멍멍이";

  const goToSearch = () => {
    navigate("/community/search");
  };

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
                src={Cat}
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
                {username}
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
                nutrient={nowKcal}
                maxNutrient={maxKcal}
                name={"칼로리"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={nowcarb}
                maxNutrient={maxcarb}
                name={"탄수화물"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={nowprot}
                maxNutrient={maxprot}
                name={"단백질"}
              />
            </Grid>
            <Grid item container xs={3} justifyContent={"center"}>
              <CommunityBarGraph
                nutrient={nowprov}
                maxNutrient={maxprov}
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
                style: { cursor: "pointer" },
                readOnly: true,
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
          <UsersTabs />
        </Grid>
      </Grid>
    </div>
  );
};

export default CommunityPage;
