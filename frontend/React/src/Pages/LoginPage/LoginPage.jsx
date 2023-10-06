import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/actions/actions";

import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Link,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import axios from "axios";
import { RefreshToken } from "../Common/Component/RefreshToken";
import kakaoButton from "../../assets/Image/Login/kakao_login_asset.svg";
import googleButton from "../../assets/Image/Login/google_login_asset.svg";
import FNS_logo from "../../assets/Image/Logo/FNS_512.png";
import "./CSS/LoginPage.css";
import "../Common/CSS/BackgroundColor.css";

const LoginPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [유저아이디, set유저아이디] = useState("");
  const [유저패스워드, set유저패스워드] = useState("");
  const [로그인실패, set로그인실패] = useState(false);

  const [비밀번호보이기, set비밀번호보이기] = useState(false);

  const 비밀번호보이기클릭 = () => set비밀번호보이기((show) => !show);

  const 비밀번호클릭 = (event) => {
    event.preventDefault();
  };

  const 카카오버튼활성화 = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const 구글버튼활성화 = () => {};

  const 버튼활성화 = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${SERVER_API_URL}/auth/sign-in`,
        data: {
          email: 유저아이디,
          password: 유저패스워드,
        },
      });

      const tokenData = res.data.data.tokenDto;

      sessionStorage.setItem("accessToken", tokenData.accessToken);
      sessionStorage.setItem("refreshToken", tokenData.refreshToken);
      sessionStorage.setItem("expirationTime", tokenData.expirationTime);

      if (tokenData.expirationTime < 500000) {
        await RefreshToken();
      }

      if (res.data.data.hasProfile === false) {
        navigate(`/info`);
      } else {
        dispatch(userLogin());
        navigate(`/main`);
      }
    } catch (err) {
      console.log(err);
      set로그인실패(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100%" }}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="로고">
          <img className="로고-이미지" src={FNS_logo} alt="로고" />
        </Box>
        <FormControl
          variant="outlined"
          className="아이디박스"
          sx={{ mt: "3vh" }}
        >
          <TextField
            className="아이디"
            fullWidth
            error={로그인실패}
            color="primary"
            type="text"
            label="아이디(이메일)"
            InputProps={{
              sx: { borderRadius: "10px" },
            }}
            value={유저아이디}
            onChange={(e) => set유저아이디(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" className="비번박스" sx={{ mt: "2vh" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            비밀번호
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={비밀번호보이기 ? "text" : "password"}
            error={로그인실패}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={비밀번호보이기클릭}
                  onMouseDown={비밀번호클릭}
                  edge="end"
                >
                  {비밀번호보이기 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{ borderRadius: "10px" }}
            value={유저패스워드}
            onChange={(e) => set유저패스워드(e.target.value)}
          />
        </FormControl>

        <FormControl className="로그인박스">
          <Button
            fullWidth
            variant="contained"
            onClick={버튼활성화}
            sx={{
              cursor: "pointer",
              color: "white",
              borderRadius: "10px",
              height: "7vh",
              mt: "3vh",
              fontSize: "1.4rem",
              textShadow: "2px 2px 20px #8b8b8b",
            }}
          >
            로그인
          </Button>
        </FormControl>

        <Grid
          container
          justifyContent={"space-evenly"}
          sx={{
            mt: "3vh",
            py: 2,
            borderTop: "1px solid #C5C5C5",
            borderBottom: "1px solid #C5C5C5",
          }}
        >
          <Grid
            item
            container
            xs={6}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ borderRight: "1px solid #C5C5C5" }}
          >
            <Link href="/signup" underline="hover">
              회원가입
            </Link>
          </Grid>

          <Grid
            item
            container
            xs={6}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link href="#" underline="hover">
              비밀번호 찾기
            </Link>
          </Grid>
        </Grid>

        <FormControl className="카카오로그인" sx={{ mt: "2vh" }}>
          <img
            src={kakaoButton}
            alt=""
            onClick={카카오버튼활성화}
            style={{ cursor: "pointer" }}
          />
        </FormControl>
        <FormControl className="구글로그인" sx={{ my: "2vh" }}>
          <img
            alt=""
            src={googleButton}
            onClick={구글버튼활성화}
            style={{ cursor: "pointer" }}
          />
        </FormControl>
      </Box>
    </Container>
  );
};
export default LoginPage;
