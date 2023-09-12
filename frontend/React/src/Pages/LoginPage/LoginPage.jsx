import React from "react";
import kakaoButton from "../../assets/Image/kakao_login.svg";
import googleButton from "../../assets/Image/google_login.svg";
import { useCallback, useState } from "react";
import {
  Box, TextField, InputAdornment, Icon, Grid, IconButton, Container, FormControl, InputLabel, OutlinedInput, Link
} from "@mui/material";
import {
  VisibilityOff, Visibility 
} from "@mui/icons-material";
import "./Frame.css";
import "../Common/CSS/BackgroundColor.css";

const LoginPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [비밀번호보이기, set비밀번호보이기] = useState(false);

  const 비밀번호보이기클릭 = () => set비밀번호보이기(show => !show);

  const 비밀번호클릭 = (event) => {
    event.preventDefault();
  }

  const 카카오버튼활성화 = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const 구글버튼활성화 = () => {};

  const 버튼활성화 = () => {};

  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx = {{
        marginTop : 6,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
      }}
    >
    <FormControl className="로고" fullWidth >Logo</FormControl>
    <FormControl variant="outlined" className="아이디박스" required sx={{mt : 5}}>
      <TextField
        className="아이디"
        fullWidth
        required
        color="primary"
        type="text"
        label="아이디"
        autoFocus
      />
      </FormControl>
      <FormControl variant="outlined" className="비번박스" required sx={{mt : 5}}>
        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={비밀번호보이기 ? 'text' : 'password'}
          
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
        />
      </FormControl>

      <FormControl fullWidth className="로그인박스" sx={{mt : 5}}>
        <div
        onClick={버튼활성화}
        style={{ cursor: "pointer" }}
      >
        로그인
        </div>
      </FormControl>

      <Grid container sx={{mt : 3}}>
        <Grid item xs>
          <Link>회원가입</Link>
        </Grid>
        <Grid>
          <Link>비밀번호 찾기</Link>
        </Grid>
      </Grid>


      <FormControl fullWidth className="카카오로그인" sx={{mt : 5}}>
        <img
          src={kakaoButton}
          alt=""
          onClick={카카오버튼활성화}
          style={{ cursor: "pointer" }}
        />
      </FormControl>
      <FormControl fullWidth className="구글로그인" sx={{mt : 5}}>
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
