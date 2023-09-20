import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSaveUserNo } from "../actions/actions"; 필요하다면 member-id로 변경 

const KakaoCallback = () => {
  // const dispatch = useDispatch();
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
  });

  const kakaoLogin = (code) => {
    axios
      .post(`${SERVER_API_URL}/auth/kakao`, { code: code })
      .then((res) => {
        console.log(res.data.message)
        console.log(res.data.data.name)
        // userNo를 비교용으로 사용하기 위해 리덕스 저장
        // dispatch(loginSaveUserNo(userNo));

        if (res.data.message === "signup") {
          // 메시지에 따라서 회원가입이면 정보입력 페이지로 이동. 
          navigate(`/Info`);
        } else if (res.data.message === "login") {
          // 메시지에 따라서 로그인이면 메인 페이지로 이동. 
          localStorage.setItem(
            "access-token",
            res.data.accessToken
          );
          localStorage.setItem(
            "refresh-token",
            res.data.refreshToken
          );
          navigate(`/main`);
        } 
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <p>로그인 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};
export default KakaoCallback;
