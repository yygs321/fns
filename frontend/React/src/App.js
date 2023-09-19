import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterBar from "./Pages/Common/Component/FooterBar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MyPage from "./Pages/MyPage/MyPage";
import MainPage from "./Pages/MainPage/MainPage";
import EditProfilePage from "./Pages/MyPage/EditProfilePage";
import MyCustom from "./Pages/MyPage/MyCustom";
import Signup from "./Pages/LoginPage/Signup";
import Info from "./Pages/LoginPage/InfoPage";
import DietPage from "./Pages/DietPage/DietPage";
import DietInputPage from "./Pages/DietPage/DietInputPage";
import SearchFoodPage from "./Pages/SearchFoodPage/SearchFoodPage";
import WeightInput from "./Pages/WeightInput/WeightInput";
import SearchFood from "./Pages/DietPage/SearchFood";
import FoodDetail from "./Pages/SearchFoodPage/FoodDetail";
import SportsPage from "./Pages/SportsPage/SportsPage";
import CommunityPage from "./Pages/CommunityPage/CommunityPage";
import CalendarPage from "./Pages/CalendarPage/CalendarPage";
import UserSearch from "./Pages/CommunityPage/UserSearch";
import { useSelector } from "react-redux";
import KakaoCallback from "./Pages/LoginPage/CallbackPage"

function App() {
  useEffect(() => {
    const setBodyHeight = () => {
      document.body.style.height = window.innerHeight + "px";
    };

    // 페이지 로드시와 화면 크기 변경시 높이를 설정
    window.addEventListener("load", setBodyHeight);
    window.addEventListener("resize", setBodyHeight);

    // 컴포넌트 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("load", setBodyHeight);
      window.removeEventListener("resize", setBodyHeight);
    };
  }, []);

  const isLogin = useSelector((state) => {
    return state.auth.isLogin;
  });

  // 추후에 로그인 기능 활성화되면 수정, 로그인 체크해서 로그인 안 돼있으면 로그인 페이지로 보내야됨.
  // 또 로그인이 안 돼있으면 FooterBar가 보이지 않도록 처리해야됨.

  return (
    <div
      className="service-display"
      style={{
        width: "100%",
        // height: "100%",
        minHeight: isLogin ? "92vh" : "100vh",
        maxWidth: "767px",
        margin: "0 auto",
        paddingBottom: isLogin ? "8vh" : "0",
        boxShadow:
          "0 4px 4px rgba(0,23,80,.01), 0 1px 6px rgba(0,23,80,.015), 0 8px 8px rgba(0,23,80,.012), 0 16px 16px rgba(0,23,80,.012), 8px 32px 32px rgba(0,23,80,.018), 8px 64px 64px rgba(0,23,80,.018)",
      }}
    >
      <Router>
        <div
          className="display-body"
          style={{ minHeight: isLogin ? "92vh" : "100vh" }}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/info" element={<Info />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/diet/input" element={<DietInputPage />} />
            <Route path="/diet/input/search" element={<SearchFood />} />
            <Route path="/weight" element={<WeightInput />} />
            <Route path="/fit" element={<SportsPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit-profile" element={<EditProfilePage />} />
            <Route path="/mypage/mycustom" element={<MyCustom />} />
            <Route path="/search" element={<SearchFoodPage />} />
            <Route path="/search/food/:name" element={<FoodDetail />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/search" element={<UserSearch />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          </Routes>
        </div>

        {isLogin && (
          <div
            className="footerbar"
            style={{
              height: "8vh",
              width: "100%",
              position: "fixed",
              bottom: "0",
              maxWidth: "767px",
              zIndex: "1000",
            }}
          >
            <FooterBar />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
