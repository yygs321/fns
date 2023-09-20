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
} from "@mui/material";
import "./CSS/InfoPage.scss";
import ManRoundedIcon from "@mui/icons-material/ManRounded";
import WomanRoundedIcon from "@mui/icons-material/WomanRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/actions/actions";

function 닉네임확인함수(nickname) {
  const regex = /^[a-zA-Z0-9가-힣]{2,16}$/;
  return regex.test(nickname);
}

// 나중에 저장 버튼에서 모두 다 입력했는지 체크해야됨

const InfoPage = () => {
  const [닉네임, set닉네임] = useState("");
  const [닉네임확인, set닉네임확인] = useState(true);
  const [프로필공개여부, set프로필공개여부] = useState(true);
  const [성별, set성별] = useState("");

  const [나이, set나이] = useState("");
  const [키, set키] = useState("");
  const [체중, set체중] = useState("");

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
  console.log(닉네임확인); // 임시로 닉네임확인 사용. 나중에 지워주세요!
  console.log(닉네임입력); // 임시로 닉네임입력 사용. 나중에 지워주세요!

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const 저장버튼 = () => {
    navigate("/main");
    dispatch(userLogin());
  };

  const 중복체크버튼 = () => {
    const 닉네임확인결과 = 닉네임확인함수(닉네임);
    set닉네임확인(닉네임확인결과);
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

                required
                className="닉네임입력"
                onChange={닉네임입력}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
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
                required
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

                required
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

                required
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
                      label="프로필공개"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="프로필비공개"
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
    </Container>
  );
};

export default InfoPage;
