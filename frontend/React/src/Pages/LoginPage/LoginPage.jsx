import React from "react";
import kakaoButton from "../../assets/Image/kakao_login.svg";
import { Grid } from "@mui/material";

const LoginPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoButton = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Grid container justifyContent={"center"}>
      <div>
        <img
          src={kakaoButton}
          alt=""
          onClick={handleKakaoButton}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Grid>
  );
};

export default LoginPage;
