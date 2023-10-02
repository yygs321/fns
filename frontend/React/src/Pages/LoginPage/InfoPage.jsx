import React, { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import "./CSS/InfoPage.scss";
import ManRoundedIcon from "@mui/icons-material/ManRounded";
import WomanRoundedIcon from "@mui/icons-material/WomanRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function 닉네임확인함수(nickname) {
  const regex = /^[a-zA-Z0-9가-힣]{2,16}$/;
  return regex.test(nickname);
}

// 나중에 저장 버튼에서 모두 다 입력했는지 체크해야됨

const InfoPage = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  const [닉네임, set닉네임] = useState("");
  const [닉네임확인, set닉네임확인] = useState(false);
  const [닉네임오류, set닉네임오류] = useState(undefined);
  const [프로필공개여부, set프로필공개여부] = useState(true);
  const [성별, set성별] = useState("");

  const [나이, set나이] = useState("");
  const [키, set키] = useState("");
  const [체중, set체중] = useState("");

  const [저장실패, set저장실패] = useState("");
  const [저장실패창, set저장실패창] = useState(false);

  const 닉네임입력 = (e) => {
    set닉네임(e.target.value);
  };

  const 나이입력 = (e) => {
    if (e.target.value === "") {
      set나이("");
    }
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      set나이(value);
    }
  };

  const 키입력 = (e) => {
    if (e.target.value === "") {
      set키("");
    }
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      set키(value);
    }
  };

  const 체중입력 = (e) => {
    if (e.target.value === "") {
      set체중("");
    }
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      set체중(value);
    }
  };

  const navigate = useNavigate();

  const 저장버튼 = async () => {
    // 닉네임 입력 안 했음
    if (닉네임) {
      // 닉네임 확인 안 했음
      if (닉네임확인) {
        // 나이 입력 안 했음
        if (나이) {
          // 키 입력 안 했음
          if (키) {
            // 체중 입력 안 했음
            if (체중) {
              // 성별 안 고름
              if (성별) {
                try {
                  const res = await axios({
                    method: "post",
                    url: `${SERVER_API_URL}/members/profile`,
                    headers: {
                      Authorization: accessToken,
                    },
                    data: {
                      nickname: 닉네임,
                      age: 나이,
                      height: 키,
                      weight: 체중,
                      gender: 성별 === "남성" ? "MALE" : "FEMALE",
                      isPublished: 프로필공개여부,
                    },
                  });

                  console.log("정보 보내기");
                  console.log(res.data);

                  if (res.data.success) {
                    navigate("/main");
                  } else {
                    set저장실패("프로필 저장에 실패했습니다.");
                  }
                } catch (err) {
                  console.log(err);
                }
              } else {
                set저장실패("성별을 설정해주세요.");
              }
            } else {
              set저장실패("체중을 입력해주세요.");
            }
          } else {
            set저장실패("키를 입력해주세요.");
          }
        } else {
          set저장실패("나이를 입력해주세요.");
        }
      } else {
        set저장실패("닉네임 중복을 확인해주세요.");
      }
    } else {
      set저장실패("닉네임을 입력해주세요.");
    }
    set저장실패창(true);
    setTimeout(() => {
      set저장실패창(false);
      set저장실패("");
    }, 2000);
  };

  // 중복체크 확인에서 지금 axios network에러
  const 중복체크버튼 = async () => {
    const 닉네임확인결과 = 닉네임확인함수(닉네임);

    if (닉네임확인결과) {
      try {
        const 중복체크결과 = await axios({
          method: "get",
          url: `${SERVER_API_URL}/auth/check-nickname-duplicate`,
          headers: {
            Authorization: accessToken,
          },
          // get이라서 body는 아마 안 될거라 추후에 API 되면 확인
          data: {
            nickname: 닉네임,
          },
        });

        if (중복체크결과.success) {
          set닉네임확인(true);
          set닉네임오류(undefined);
        } else {
          set닉네임확인(false);
          set닉네임오류(중복체크결과.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // 닉네임 양식 맞춰주라는 이야기
      set닉네임오류("닉네임 형식이 잘못됐습니다.");
    }
  };

  const 남성버튼 = () => {
    set성별((name) => "남성");
  };
  const 여성버튼 = () => {
    set성별((name) => "여성");
  };
  const 체크박스 = (e) => {
    set프로필공개여부(e.target.value);
  };
  const labelStyle = {
    whiteSpace: "nowrap",
  };

  return (
    <Container maxWidth="xs" componenet="main" sx={{ height: "100vh" }}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        sx={{ height: "100%" }}
      >
        <div className="정보입력박스">
          <Typography sx={{ fontSize: "3rem" }}>정보 입력</Typography>
        </div>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="닉네임박스"
        >
          <Grid item container xs={11}>
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span className="닉네임글자">닉네임</span>
            </Grid>
            <Grid
              item
              container
              xs={7}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                type="text"
                value={닉네임}
                // label="닉네임"

                className="닉네임입력"
                onChange={닉네임입력}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
                error={닉네임오류 ? true : false}
                helperText={닉네임오류}
              />
            </Grid>

            <Grid
              item
              container
              justifyContent={"flex-end"}
              alignItems={"center"}
              xs={3}
            >
              <Grid
                item
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                xs={10}
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
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          xs={11}
          sx={{ pb: 2 }}
        >
          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            2~16자(영문, 숫자)
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="나이박스"
          sx={{ my: 2 }}
        >
          <Grid item container xs={11}>
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span className="나이글자">나이</span>
            </Grid>
            <Grid
              item
              container
              xs={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                type="number"
                // label="나이"
                value={나이}
                className="나이입력"
                onChange={나이입력}
                InputProps={{
                  endAdornment: (
                    <Typography color="text.secondary">(세)</Typography>
                  ),
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="키박스"
          sx={{ my: 2 }}
        >
          <Grid item container xs={11}>
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span className="키글자">키</span>
            </Grid>
            <Grid
              item
              container
              xs={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                type="number"
                value={키}
                // label="키"

                className="키입력"
                onChange={키입력}
                InputProps={{
                  endAdornment: (
                    <Typography color="text.secondary">(cm)</Typography>
                  ),
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="개인정보-체중박스"
          sx={{ my: 2 }}
        >
          <Grid item container xs={11}>
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span className="체중글자">체중</span>
            </Grid>
            <Grid
              item
              container
              xs={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                type="number"
                value={체중}
                // label="체중"

                className="체중입력"
                onChange={체중입력}
                InputProps={{
                  endAdornment: (
                    <Typography color="text.secondary">(kg)</Typography>
                  ),
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ mt: 2 }}
          //  sx={{ ml: 3, mr: 2 }}
          className="성별박스"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item container xs={11} className="성별박스">
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span className="성별글자">성별</span>
            </Grid>
            <Grid
              item
              container
              xs={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <ManRoundedIcon
                sx={{
                  fontSize: "4rem",
                  backgroundColor: 성별 === "남성" && "#00E1AB",
                  borderRadius: "10px",
                }}
                onClick={남성버튼}
              />
              <WomanRoundedIcon
                onClick={여성버튼}
                sx={{
                  fontSize: "4rem",
                  backgroundColor: 성별 === "여성" && "#00E1AB",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} sx={{ mt: 2, ml: 3 }}>
          &nbsp;{성별}&nbsp;
        </Grid>

        <Grid
          container
          sx={{ mt: 2 }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item container xs={11}>
            <Grid
              item
              container
              xs={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <span>프로필</span>
            </Grid>
            <Grid
              item
              container
              xs={10}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <RadioGroup row value={프로필공개여부} onChange={체크박스}>
                <Grid
                  item
                  container
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                >
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="공개"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="비공개"
                      sx={labelStyle}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={11}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            sx={{
              mt: 2,
              height: "6vh",
              color: "white",
              fontSize: "1.5rem",
              borderRadius: "10px",
            }}
            className="저장버튼"
            fullWidth
            variant="contained"
            onClick={저장버튼}
          >
            저장
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={저장실패창}
        aria-labelledby="failed-signup-modal"
        sx={{ zIndex: 1000 }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            maxWidth: "700px",
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            id="community-input"
            variant="h6"
            sx={{ paddingY: "1vh" }}
          >
            {저장실패}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default InfoPage;
