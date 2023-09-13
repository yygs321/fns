import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import "../CSS/FooterBar.css";
import { useNavigate, useLocation } from "react-router-dom";

const FooterBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("main");

  // 현재 url에서 시작하는 url 주소를 확인하고, 하단 네비게이션 바를 바꿔주는거.
  // 이제 뒤로가기로 이동해도 하단 네비게이션 바도 같이 이동합니다..

  useEffect(() => {
    const currentPath = location.pathname; // 현재 url

    // URL 경로에서 원하는 부분을 추출하고, 그에 따라 value를 설정합니다.
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
      // className="bottom-navbar"
      sx={{
        width: "100%",
        maxWidth: "767px",
        height: "100%",
      }}
    >
      <BottomNavigationAction
        value="main"
        sx={{ scale: "1.1", minWidth: "25px" }} // 기본 minWidth가 넓게 설정돼있어, 작은 화면에서도 안 줄어들다보니 minWidth 강제로 설정
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
