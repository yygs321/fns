import React, { useState } from "react";

import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";

import UserGraph from "./UserGraph";
import UserRecommend from "./UserRecommend";
import default_profile from "../../assets/Image/Profile/deafult_profile.jpg";

// import Cat from "../../assets/Image/cat.jpg";

const UsersTabs = (props) => {
  const { followees } = props;

  // const [recommendedUsers, setRecommendedUsers] = useState([]);
  // const followees = [
  //   {
  //     username: "댕냥이",
  //     profileImg: default_profile,
  //     maxKcal: 2200,
  //     nowKcal: 2200,
  //     maxcarb: 200,
  //     nowcarb: 200,
  //     maxprot: 200,
  //     nowprot: 200,
  //     maxprov: 200,
  //     nowprov: 200,
  //   },
  //   {
  //     username: "콩냥이",
  //     profileImg: default_profile,
  //     maxKcal: 2000,
  //     nowKcal: 2500,
  //     maxcarb: 200,
  //     nowcarb: 250,
  //     maxprot: 200,
  //     nowprot: 250,
  //     maxprov: 200,
  //     nowprov: 250,
  //   },
  //   {
  //     username: "활냥이",
  //     profileImg: default_profile,
  //     maxKcal: 5000,
  //     nowKcal: 2000,
  //     maxcarb: 500,
  //     nowcarb: 200,
  //     maxprot: 500,
  //     nowprot: 200,
  //     maxprov: 500,
  //     nowprov: 200,
  //   },
  //   {
  //     username: "물냥이",
  //     profileImg: default_profile,
  //     maxKcal: 2000,
  //     nowKcal: 1800,
  //     maxcarb: 200,
  //     nowcarb: 180,
  //     maxprot: 200,
  //     nowprot: 180,
  //     maxprov: 200,
  //     nowprov: 180,
  //   },
  // ];

  const recommendedUsers = [
    { username: "짭냥이", profileImg: default_profile, old: 10, BMI: 30 },
    { username: "콘냥이", profileImg: default_profile, old: 9, BMI: 25 },
    { username: "얍냥이", profileImg: default_profile, old: 8, BMI: 20 },
    { username: "쩝냥이", profileImg: default_profile, old: 7, BMI: 15 },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
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
          sx={{ height: "6vh" }}
        >
          <Tab label="팔로우" {...a11yProps(0)} />
          <Tab label="추천" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        className="noscroll"
        sx={{ overflow: "scroll" }}
      >
        {followees.map((user, index) => (
          <UserGraph
            user={user}
            index={index}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            key={`follow-${user.username}-${index}`}
          />
        ))}
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
        className="noscroll"
        sx={{ overflow: "scroll" }}
      >
        {recommendedUsers.map((user, index) => (
          <UserRecommend
            user={user}
            key={`recommend-${user.username}-${index}`}
          />
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
      {value === index && (
        <Box className="noscroll" sx={{ overflow: "scroll", height: "54vh" }}>
          {children}
        </Box>
      )}
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
