import { React, useState } from "react";
import "../Common/CSS/BackgroundColor.css";
import "./CSS/WeightInput.scss";
import {
  Container,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";

export const 목표체중 = "80";
export const 기간 = "50";
export const 현재체중 = "88";
export const 시작체중 = "92";

const WeightInput = () => {
  const 월 = 9;
  const 일 = 15;

  const [수정모달열기, set수정모달열기] = useState(false);
  const [목표모달열기, set목표모달열기] = useState(false);
  const [체중, set체중] = useState("");
  const [목표체중, set목표체중] = useState("80");
  const [다이어트모드, set다이어트모드] = useState(false);
  const [기간, set기간] = useState("50");
  const 일자 = ({
    month: 월,
    day: 일,
  });

  const 체중입력함수 = (e) => {
    set체중((data) => e.target.value);
  };

  const 체중수정모달 = () => {
    set수정모달열기((data) => !data);
  };

  const 목표설정모달 = () => {
    set목표모달열기((data) => !data);
  };

  const 목표설정모달닫기 = () => {
    set다이어트모드(true);
    set목표모달열기((data) => !data);
  };

  const 목표체중입력함수 = (e) => {
    set목표체중((data) => e.target.value);
  };

  const 목표기간입력함수 = (e) => {
    set기간((data) => e.target.value);
  };

  const 목표값여부 = 목표체중 && 기간;

  return (
    <Container component="main" maxWidth="sx" className="회색배경">

      <div className="체중박스">
        <div className="일자">
          {일자.month}월 {일자.day}일
        </div>
        <div className="체중">
          {!다이어트모드 && (
            <span>
              {체중}
              {체중 ? "kg" : ""}
            </span>
          )}
          {다이어트모드 && (
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    paddingRight: "4vw",
                    fontSize: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>시작</span>
                  <span style={{ marginTop: "1vh" }}>{체중}kg</span>
                </div>
                <div
                  style={{
                    borderRight: "1px solid grey",
                    borderLeft: "1px solid grey",
                    paddingLeft: "4vw",
                    paddingRight: "4vw",
                    fontSize: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>현재</span>
                  <span style={{ marginTop: "1vh" }}>{체중}kg</span>
                </div>
                <div
                  style={{
                    paddingLeft: "4vw",
                    fontSize: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>목표</span>
                  <span style={{ marginTop: "1vh" }}>{목표체중}kg</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginTop: "1vh",
                }}
              >
                남은 기간 : {기간}일
              </div>
            </div>
          )}
        </div>

        <Button
          color="primary"
          variant="contained"
          className="수정버튼"
          onClick={체중수정모달}
          sx={{ mt: 2, color: "white", fontSize: "1.4rem" }}
        >
          체중 수정
        </Button>

        <Button
          color="primary"
          variant="contained"
          className="목표버튼"
          onClick={목표설정모달}
          sx={{ mt: 2, color: "white", fontSize: "1.4rem" }}
        >
          강량 목표 설정
        </Button>

        <Modal
          open={수정모달열기}
          onClose={체중수정모달}
          aria-labelledby="modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              체중 입력
            </Typography>
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              onChange={체중입력함수}
              value={체중}
              type="number"
            />
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={체중수정모달}
                disabled={체중 === ""}
              >
                설정하기
              </Button>
              <Button variant="contained" onClick={체중수정모달}>
                닫기
              </Button>
            </div>
          </Box>
        </Modal>
        {/* 경계선 */}
        <Modal
          open={목표모달열기}
          onClose={목표설정모달닫기}
          aria-labelledby="modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography id="modal-title" variant="h4" component="h2">
              모달 내용
            </Typography>
            <Typography id="modal-description" variant="h5" sx={{ mt: 2 }}>
              현재 체중 : {체중}kg
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              목표 체중 입력
            </Typography>
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              onChange={목표체중입력함수}
              value={목표체중}
              type="number"
            />
            <Typography id="modal-description" sx={{ mt: 2 }}>
              목표 기간 입력
            </Typography>
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              onChange={목표기간입력함수}
              value={기간}
              type="number"
            />
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={목표설정모달닫기}
                disabled={목표값여부 === ""}
              >
                설정하기
              </Button>
              <Button variant="contained" onClick={목표설정모달닫기}>
                닫기
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default WeightInput;

