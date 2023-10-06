import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/actions/actions";

import { Grid, Typography } from "@mui/material";

import axios from "axios";
import { RefreshToken } from "../Common/Component/RefreshToken";

const KakaoCallback = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kakaoLogin = async (code) => {
    try {
      const res = await axios({
        method: "post",
        url: `${SERVER_API_URL}/auth/kakao`,
        data: {
          code: code,
        },
      });

      const tokenData = res.data.data.tokenDto;

      sessionStorage.setItem("accessToken", tokenData.accessToken);
      sessionStorage.setItem("refreshToken", tokenData.refreshToken);
      sessionStorage.setItem("expirationTime", tokenData.expirationTime);

      dispatch(userLogin());

      if (tokenData.expirationTime < 200000) {
        await RefreshToken();
      }

      if (!res.data.data.hasProfile) {
        navigate(`/info`);
      } else {
        navigate(`/main`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="white-pages" style={{ height: "100vh" }}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        sx={{ height: "100%" }}
      >
        <Typography
          variant="body1"
          color="text.primary"
          fontSize={"1rem"}
          fontWeight={"bold"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          로그인 중 입니다.
          <br />
          잠시만 기다려주세요.
        </Typography>
      </Grid>
    </div>
  );
};
export default KakaoCallback;
