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
import SearchFood from "./Pages/DietPage/SearchFood";
import FoodDetail from "./Pages/SearchFoodPage/FoodDetail";
import SportsPage from "./Pages/SportsPage/SportsPage";
import CommunityPage from "./Pages/CommunityPage/CommunityPage";
import CalendarPage from "./Pages/CalendarPage/CalendarPage";
import UserSearch from "./Pages/CommunityPage/UserSearch";
import { useSelector } from "react-redux";
import KakaoCallback from "./Pages/LoginPage/KakaoCallbackPage";
import NotFound from "./Pages/Common/Component/NotFound";
import LoginCheck from "./Pages/Common/Component/LoginCheck";
import LoggedinCheck from "./Pages/Common/Component/LoggedinCheck";
import ChangePassword from "./Pages/MyPage/ChangePassword";

function App() {
  useEffect(() => {
    const setBodyHeight = () => {
      document.body.style.height = window.innerHeight + "px";
    };

    window.addEventListener("load", setBodyHeight);
    window.addEventListener("resize", setBodyHeight);

    return () => {
      window.removeEventListener("load", setBodyHeight);
      window.removeEventListener("resize", setBodyHeight);
    };
  }, []);

  const isLogin = useSelector((state) => {
    return state.auth.isLogin;
  });

  return (
    <div
      className="service-display"
      style={{
        width: "100%",
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
            <Route element={<LoggedinCheck />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/info" element={<Info />} />
            <Route element={<LoginCheck />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/diet" element={<DietPage />} />
              <Route path="/diet/input" element={<DietInputPage />} />
              <Route path="/diet/input/search" element={<SearchFood />} />
              <Route path="/fit" element={<SportsPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/mypage/edit-profile"
                element={<EditProfilePage />}
              />
              <Route path="/mypage/mycustom" element={<MyCustom />} />
              <Route
                path="/mypage/changepassword"
                element={<ChangePassword />}
              />
              <Route path="/search" element={<SearchFoodPage />} />
              <Route path="/search/food/:name" element={<FoodDetail />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/search" element={<UserSearch />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>

        {isLogin && !window.location.pathname.startsWith("/info") && (
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
