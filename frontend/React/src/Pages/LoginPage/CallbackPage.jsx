import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { loginSaveUserNo } from "../actions/actions"; 필요하다면 userID로 변경 

const KakaoCallback = () => {
  const dispatch = useDispatch();
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
        // const userNo = res.data.data;
          console.log(res)
          console.log(res.data)
        // userNo를 비교용으로 사용하기 위해 리덕스 저장
        // dispatch(loginSaveUserNo(userNo));

        if (res.message === "signup") {
          // 정보입력 페이지로 이동. 코드는 메시지로 변경
          navigate(`/Info`);
        } else if (res.message === "login") {
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
