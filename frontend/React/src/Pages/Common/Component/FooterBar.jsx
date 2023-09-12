import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
<<<<<<< HEAD:frontend/React/src/Pages/Common/Component/FooterBar.jsx
import "../CSS/FooterBar.css";
=======
import "./CSS/FooterBar.css";
>>>>>>> f4ffa5dd6c06dba9f8091e069b3c2cf862722452:frontend/React/src/Pages/Common/FooterBar.jsx

const FooterBar = () => {
  const [value, setValue] = useState("main");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      // className="bottom-navbar"
      sx={{
        width: "100%",
        maxWidth: "767px",
        height: "100%",
      }}
    >
      <BottomNavigationAction
        value="main"
        sx={{ scale: "1.1" }}
        icon={
          <HomeRoundedIcon
            className={value === "main" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="calendar"
        sx={{ scale: "1.1" }}
        icon={
          <CalendarMonthRoundedIcon
            className={value === "calendar" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="search"
        sx={{ scale: "1.1" }}
        icon={
          <SearchRoundedIcon
            className={value === "search" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="community"
        sx={{ scale: "1.1" }}
        icon={
          <GroupsRoundedIcon
            className={value === "community" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="mypage"
        sx={{ scale: "1.1" }}
        icon={
          <PersonRoundedIcon
            className={value === "mypage" ? "selected-navbar-action" : ""}
          />
        }
      />
    </BottomNavigation>
  );
};

export default FooterBar;
