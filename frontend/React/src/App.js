import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterBar from "./Pages/Common/Component/FooterBar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MyPage from "./Pages/MyPage/MyPage";
import MainPage from "./Pages/MainPage/MainPage";
import EditProfilePage from "./Pages/MyPage/EditProfilePage";
import MyCustom from "./Pages/MyPage/MyCustom";
import DietPage from "./Pages/DietPage/DietPage";
import DietInputPage from "./Pages/DietPage/DietInputPage";
import SearchFoodPage from "./Pages/SearchFoodPage/SearchFoodPage";
import SearchFood from "./Pages/DietPage/SearchFood";

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

  const isLogin = true; // 추후에 로그인 기능 활성화되면 수정

  return (
    <div
      className="service-display"
      style={{
        width: "100%",
        // height: "100%",
        minHeight: "92vh",
        maxWidth: "767px",
        margin: "0 auto",
        paddingBottom: "8vh",
        boxShadow:
          "0 4px 4px rgba(0,23,80,.01), 0 1px 6px rgba(0,23,80,.015), 0 8px 8px rgba(0,23,80,.012), 0 16px 16px rgba(0,23,80,.012), 8px 32px 32px rgba(0,23,80,.018), 8px 64px 64px rgba(0,23,80,.018)",
      }}
    >
      <Router>
        <div className="display-body" style={{ minHeight: "92vh" }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/diet/input" element={<DietInputPage />} />
            <Route path="/diet/input/search" element={<SearchFood />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit-profile" element={<EditProfilePage />} />
            <Route path="/mypage/mycustom" element={<MyCustom />} />
            <Route path="/search" element={<SearchFoodPage />} />
          </Routes>
        </div>

        <div
          className="footerbar"
          style={{
            height: "8vh",
            width: "100%",
            position: "fixed",
            bottom: "0",
            maxWidth: "767px",
          }}
        >
          {isLogin && <FooterBar />}
        </div>
      </Router>
    </div>
  );
}

export default App;
