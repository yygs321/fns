import React from "react";
// import {Grid, Container, FormControl, Box, TextField, Button} from '@mui/material';
import {
  Grid,
  Container,
  // FormControl,
  TextField,
  Button,
  Box,
  Typography,
  // Typography,
} from "@mui/material";
import "./CSS/Signup.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [유효한닉네임, set유효한닉네임] = useState(false);
  const [중복체크, set중복체크] = useState(false);
  const [인증, set인증] = useState(false);
  const 중복체크버튼 = () => {
    set중복체크((중복체크) => !중복체크);
  };
  const 인증확인버튼 = () => {};
  console.log(유효한닉네임); // 임시코드입니다. 나중에 지워주세요!
  console.log(set유효한닉네임); // 임시코드입니다. 나중에 지워주세요!
  console.log(인증); // 임시코드입니다. 나중에 지워주세요!
  console.log(set인증); // 임시코드입니다. 나중에 지워주세요!
  const [비밀번호, set비밀번호] = useState("");
  const [비밀번호확인, set비밀번호확인] = useState("");
  const [일치여부확인, set일치여부확인] = useState(false);
  const [비번양식확인, set비번양식확인] = useState(true);

  const navigate = useNavigate();

  const 가입버튼 = () => {
    // 비밀번호 양식 확인
    if (유효한닉네임) {
      if (일치여부확인 && 비번양식확인) {
        navigate("/info");
      }
    }
  };

  function 비번체크(password) {
    const 비번조건 = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;
    return 비번조건.test(password);
  }

  const 비밀번호입력 = (e) => {
    set비밀번호(e.target.value);

    const 비번체크결과 = 비번체크(e.target.value);
    set비번양식확인(비번체크결과);
  };

  const 비밀번호확인입력 = (e) => {
    set비밀번호확인(e.target.value);
    set일치여부확인(e.target.value === 비밀번호 ? true : false);
  };

  // const 최종확인 = 일치여부확인 && 비번양식확인;

  return (
    <Container maxWidth="xs" component="main" sx={{ height: "100%" }}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className="회원가입박스">회원가입</div>
        {/* <Grid sx={{ mt: 6, ml: 4 }} className="글자">
          <span>ID</span>
          <span id="이메일글씨크기">(이메일)</span>
        </Grid> */}
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              pb: 4,
              // ml: 4, mt: 1, mr: 2
            }}
            className="아이디입력컨테이너"
          >
            {/* <Grid
            item
            container
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ pb: 1 }}
          >
            <Typography>아이디(이메일)</Typography>
          </Grid> */}
            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"center"}
              xs={8}
            >
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                type="text"
                label="아이디(이메일)"
                autoFocus
                required
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"center"}
              xs={3}
            >
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  textShadow: "2px 2px 20px #8b8b8b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  borderRadius: "10px",
                }}
                onClick={중복체크버튼}
              >
                중복체크
              </Button>
            </Grid>
          </Grid>

          {/* <FormControl className="글자" sx={{ ml: 4, mt: 4 }}>
          인증번호 입력
        </FormControl> */}
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            // sx={{ ml: 4, mt: 1, mr: 2 }}
          >
            {/* <Grid
            item
            container
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography>이메일 인증</Typography>
          </Grid> */}
            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"center"}
              xs={8}
            >
              <TextField
                disabled={!중복체크 ? true : false}
                fullWidth
                variant="outlined"
                color="primary"
                type="text"
                label="인증번호"
                sx={{
                  backgroundColor: !중복체크 ? "#e7e7e7" : "white",
                  borderRadius: "10px",
                }}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid
              item
              container
              xs={3}
              justifyContent={"center"}
              alignItems={"center"}
              // sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  textShadow: "2px 2px 20px #8b8b8b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  borderRadius: "10px",
                }}
                onClick={인증확인버튼}
                disabled={!중복체크 ? true : false}
              >
                인증확인
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <FormControl className="글자" sx={{ ml: 4, mt: 4 }}>
          비밀번호
        </FormControl> */}
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid
            item
            container
            justifyContent={"flex-end"}
            alignItems={"center"}
            xs={12}
          >
            <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              8~16자(영문, 숫자, 특수문자 모두 포함)
            </Typography>
          </Grid>
          <Grid
            // sx={{ ml: 4, mt: 1, mr: 4 }}
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
            sx={{ mb: 2 }}
          >
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              label="비밀번호"
              onChange={비밀번호입력}
              value={비밀번호}
              type="password"
              error={!!비밀번호 && !비번양식확인}
              helperText={
                !!비밀번호 &&
                (!비번양식확인 ? "비밀번호가 양식이 맞지 않습니다!" : "")
              }
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>

          {/* <FormControl className="글자" sx={{ ml: 4, mt: 4 }}>
          비밀번호 확인
        </FormControl> */}
          <Grid
            // sx={{ ml: 4, mt: 1, mr: 4 }}
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
            sx={{ mb: 2 }}
          >
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              label="비밀번호 확인"
              onChange={비밀번호확인입력}
              value={비밀번호확인}
              type="password"
              error={!!비밀번호확인 && !일치여부확인}
              helperText={
                !!비밀번호확인 &&
                !일치여부확인 &&
                "비밀번호가 일치하지 않습니다"
              }
              disabled={!비밀번호 ? true : false}
              sx={{
                backgroundColor: !비밀번호 ? "#e7e7e7" : "white",
                borderRadius: "10px",
              }}
              InputProps={{
                sx: { borderRadius: "10px" },
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={가입버튼}
            variant="contained"
            className="가입버튼"
            fullWidth
            sx={{ color: "white", fontSize: "1.5rem", borderRadius: "10px" }}
          >
            가입
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
