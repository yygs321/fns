import React, { useState } from "react";

import kakaoButton from "../../assets/Image/kakao_login_asset.svg";
import googleButton from "../../assets/Image/google_login_asset.svg";
// import kakaoButton from "../../assets/Image/kakao_login.svg";
// import googleButton from "../../assets/Image/google_login.svg";

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
import "./CSS/LoginPage.css";
import "../Common/CSS/BackgroundColor.css";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/actions/actions";

const LoginPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [비밀번호보이기, set비밀번호보이기] = useState(false);

  const 비밀번호보이기클릭 = () => set비밀번호보이기((show) => !show);

  const 비밀번호클릭 = (event) => {
    event.preventDefault();
  };

  const 카카오버튼활성화 = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const 구글버튼활성화 = () => {};

  const 버튼활성화 = () => {
    dispatch(userLogin());
    navigate("/main");
    // 임시
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100%" }}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl className="로고" fullWidth>
          Logo
        </FormControl>
        <FormControl
          variant="outlined"
          className="아이디박스"
          required
          sx={{ mt: 4 }}
        >
          <TextField
            className="아이디"
            fullWidth
            required
            color="primary"
            type="text"
            label="아이디"
            autoFocus
            InputProps={{
              sx: { borderRadius: "10px" },
            }}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          className="비번박스"
          required
          sx={{ mt: 3 }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            비밀번호
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={비밀번호보이기 ? "text" : "password"}
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
          />
        </FormControl>

        {/* <FormControl fullWidth className="로그인박스" sx={{ mt: 4 }}> */}
        <Button
          fullWidth
          variant="contained"
          onClick={버튼활성화}
          sx={{
            cursor: "pointer",
            color: "white",
            borderRadius: "10px",
            height: "8vh",
            mt: 4,
            fontSize: "1.4rem",
            textShadow: "2px 2px 20px #8b8b8b",
          }}
        >
          로그인
        </Button>
        {/* </FormControl> */}

        <Grid
          container
          justifyContent={"space-evenly"}
          sx={{
            mt: 3,
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

        <FormControl fullWidth className="카카오로그인" sx={{ mt: 3 }}>
          <img
            src={kakaoButton}
            alt=""
            onClick={카카오버튼활성화}
            style={{ cursor: "pointer" }}
          />
        </FormControl>
        <FormControl fullWidth className="구글로그인" sx={{ mt: 2 }}>
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
