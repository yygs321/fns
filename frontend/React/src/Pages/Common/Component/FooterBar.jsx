import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import "../CSS/FooterBar.css";

const FooterBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("main");

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/main")) {
      setValue("main");
    } else if (currentPath.startsWith("/calendar")) {
      setValue("calendar");
    } else if (currentPath.startsWith("/search")) {
      setValue("search");
    } else if (currentPath.startsWith("/community")) {
      setValue("community");
    } else if (currentPath.startsWith("/mypage")) {
      setValue("mypage");
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`${newValue}`);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        width: "100%",
        maxWidth: "767px",
        height: "100%",
      }}
    >
      <BottomNavigationAction
        value="main"
        sx={{ scale: "1.1", minWidth: "25px" }}
        icon={
          <HomeRoundedIcon
            className={value === "main" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="calendar"
        sx={{ scale: "1.1", minWidth: "25px" }}
        icon={
          <CalendarMonthRoundedIcon
            className={value === "calendar" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="search"
        sx={{ scale: "1.1", minWidth: "25px" }}
        icon={
          <SearchRoundedIcon
            className={value === "search" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="community"
        sx={{ scale: "1.1", minWidth: "25px" }}
        icon={
          <GroupsRoundedIcon
            className={value === "community" ? "selected-navbar-action" : ""}
          />
        }
      />
      <BottomNavigationAction
        value="mypage"
        sx={{ scale: "1.1", minWidth: "25px" }}
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
