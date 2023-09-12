import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import "./CSS/FooterBar.css";

const FooterBar = () => {
  const [value, setValue] = React.useState("home");

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
        position: "fixed",
        bottom: "0",
        maxWidth: "767px",
      }}
    >
      <BottomNavigationAction
        label=""
        value="home"
        icon={
          <HomeRoundedIcon
            className={value === "home" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        label=""
        value="calendar"
        icon={
          <CalendarMonthRoundedIcon
            className={value === "calendar" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        label=""
        value="search"
        icon={
          <SearchRoundedIcon
            className={value === "search" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        label=""
        value="community"
        icon={
          <GroupsRoundedIcon
            className={value === "community" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        label=""
        value="mypage"
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
