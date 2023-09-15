import React, { useState } from "react";

import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Grid, Avatar } from "@mui/material";

import CommunityBarGraph from "./CommunityBarGraph";
import Cat from "../../assets/Image/cat.jpg";

const UsersTabs = () => {
  const users = [
    {
      username: "댕냥이",
      profileImg: Cat,
      maxKcal: 2200,
      nowKcal: 2200,
      maxcarb: 200,
      nowcarb: 200,
      maxprot: 200,
      nowprot: 200,
      maxprov: 200,
      nowprov: 200,
    },
    {
      username: "콩냥이",
      profileImg: Cat,
      maxKcal: 2000,
      nowKcal: 2500,
      maxcarb: 200,
      nowcarb: 250,
      maxprot: 200,
      nowprot: 250,
      maxprov: 200,
      nowprov: 250,
    },
    {
      username: "활냥이",
      profileImg: Cat,
      maxKcal: 5000,
      nowKcal: 2000,
      maxcarb: 500,
      nowcarb: 200,
      maxprot: 500,
      nowprot: 200,
      maxprov: 500,
      nowprov: 200,
    },
    {
      username: "물냥이",
      profileImg: Cat,
      maxKcal: 2000,
      nowKcal: 1800,
      maxcarb: 200,
      nowcarb: 180,
      maxprot: 200,
      nowprot: 180,
      maxprov: 200,
      nowprov: 180,
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="community"
          variant="fullWidth"
        >
          <Tab label="팔로우" {...a11yProps(0)} />
          <Tab label="추천" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {users.map((user, index) => (
          <Grid
            key={`${user.username}-${index}`}
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
              xs={5}
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
              xs={7}
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
          </Grid>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {users.map((user, index) => (
          <Grid
            key={`${user.username}-${index}`}
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
              xs={5}
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
              xs={7}
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
          </Grid>

          // 여기 재활용하는 부분 컴포넌트로 따로 빼서, 작성할 것. 코드 너무 길어짐.
        ))}
      </CustomTabPanel>
    </Box>
  );
};

export default UsersTabs;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
