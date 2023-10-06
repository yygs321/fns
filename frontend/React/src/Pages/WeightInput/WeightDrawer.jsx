import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  SwipeableDrawer,
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

import axiosInstance from "../Common/Component/AxiosInstance";

export default function WeightDrawer(props) {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");
  const { drawerOpen, setDrawerOpen } = props;

  const [입력모달열기, set입력모달열기] = useState(false);
  const [목표모달열기, set목표모달열기] = useState(false);
  const [체중, set체중] = useState("");
  const [입력체중, set입력체중] = useState("");
  const [시작체중, set시작체중] = useState("");
  const [목표체중, set목표체중] = useState("");
  const [입력목표체중, set입력목표체중] = useState("");
  const [다이어트모드, set다이어트모드] = useState(false);
  const [기간, set기간] = useState("");
  const [입력기간, set입력기간] = useState("");

  const 체중데이터받기 = async () => {
    try {
      const res = await axiosInstance({
        method: "get",
        url: `${SERVER_API_URL}/weight/history`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      const targetData = res.data.data.targetWeightResponseDto;

      if (targetData.targetWeight) {
        set다이어트모드(true);
      }

      set시작체중(targetData.initialWeight || "");
      set체중(targetData.currentWeight || "");
      set목표체중(targetData.targetWeight || "");
      set기간(targetData.remainingDays || "");
      set입력목표체중(targetData.targetWeight || "");
      set입력기간(targetData.duration || "");
    } catch (err) {
      console.log(err);
    }
  };

  const 체중등록 = async () => {
    try {
      await axiosInstance({
        method: "post",
        url: `${SERVER_API_URL}/weight`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        data: {
          weight: 입력체중,
        },
      });

      set체중(입력체중);
      set입력체중("");
    } catch (err) {
      console.log(err);
    }
  };

  const 기준영양소등록 = async () => {
    try {
      await axiosInstance({
        method: "post",
        url: `${SERVER_API_URL}/base`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    체중데이터받기();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const 체중입력함수 = (e) => {
    const 입력값 = e.target.value;
    if (입력값 >= 0 && 입력값 <= 1000) {
      set입력체중(입력값);
    }
  };

  const 체중입력모달 = () => {
    set입력모달열기((data) => !data);
  };

  const 체중입력하기 = async () => {
    try {
      await Promise.all([체중등록(), 기준영양소등록()]);

      체중데이터받기();
      set입력모달열기((data) => !data);
    } catch (err) {
      console.log(err);
    }
  };

  const 목표설정모달 = () => {
    set목표모달열기((data) => !data);
  };

  const 목표설정모달닫기 = () => {
    set목표모달열기((data) => !data);
  };

  const 목표설정 = async () => {
    try {
      await axiosInstance({
        method: "post",
        url: `${SERVER_API_URL}/target-weight`,
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        data: {
          targetWeight: 입력목표체중,
          duration: 입력기간,
        },
      });

      set입력목표체중("");
      set입력기간("");
    } catch (err) {
      console.log(err);
    }
  };

  const 목표설정하기 = () => {
    set다이어트모드(true);

    목표설정();
    체중데이터받기();

    set목표모달열기((data) => !data);
  };

  const 목표체중입력함수 = (e) => {
    const 입력값 = e.target.value;
    if (입력값 >= 0 && 입력값 <= 1000) {
      set입력목표체중(입력값);
    }
  };

  const 목표기간입력함수 = (e) => {
    const 입력값 = e.target.value;
    if (입력값 >= 0) {
      set입력기간(입력값);
    }
  };

  const 목표값여부 = 입력목표체중 && 입력기간;

  const weightInput = () => (
    <Box
      sx={{
        height: "60vh",
        padding: "2vh",
      }}
      role="presentation"
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            borderBottom: "1px solid #e7e7e7",
            paddingBottom: "1vh",
            marginBottom: "2vh",
          }}
        >
          <Typography fontSize={"2.5rem"}>체중 입력</Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <Grid
            container
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div className="체중">
              {!다이어트모드 && (
                <span className={`fontSize ${체중 ? "체중" : "체중없음"}`}>
                  {목표체중 ? (
                    <>
                      <Typography
                        id="target-weight-setting-modal-description"
                        variant="h5"
                        sx={{ paddingY: "1vh" }}
                      >
                        현재 체중
                      </Typography>
                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          id="target-weight-setting-modal-description"
                          variant="h3"
                          sx={{ paddingY: "1vh" }}
                        >
                          {체중}&nbsp;
                        </Typography>
                        <Typography
                          id="target-weight-setting-modal-description"
                          variant="h5"
                          sx={{ paddingY: "1vh" }}
                        >
                          kg
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    "몸무게를 입력해주세요"
                  )}
                </span>
              )}
              {다이어트모드 && (
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography fontSize="1.2rem">시작</Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginTop: "1vh" }} fontSize="1.5rem">
                          {시작체중} kg
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{
                        borderLeft: "1px solid #e7e7e7",
                        borderRight: "1px solid #e7e7e7",
                      }}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography fontSize="1.2rem">현재</Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginTop: "1vh" }} fontSize="1.5rem">
                          {체중} kg
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography fontSize="1.2rem">목표</Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginTop: "1vh" }} fontSize="1.5rem">
                          {목표체중} kg
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "center",
                        marginTop: "2vh",
                      }}
                    >
                      남은 기간 : {기간} 일
                    </div>
                  </Grid>
                </Grid>
              )}
            </div>
          </Grid>

          <Button
            fullWidth
            color="primary"
            variant="contained"
            className="입력버튼"
            onClick={체중입력모달}
            sx={{
              color: "white",
              fontSize: "1.4rem",
              borderRadius: "10px",
              marginY: "2vh",
            }}
          >
            체중 입력
          </Button>

          <Button
            fullWidth
            color="primary"
            variant="contained"
            className="목표버튼"
            onClick={목표설정모달}
            sx={{
              color: "white",
              fontSize: "1.4rem",
              borderRadius: "10px",
              marginY: "2vh",
            }}
          >
            감량 목표 설정
          </Button>

          <Modal
            open={입력모달열기}
            onClose={체중입력모달}
            aria-labelledby="weight-modal"
            sx={{ zIndex: 1000 }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "80%",
                maxWidth: "700px",
                bgcolor: "background.paper",

                boxShadow: 24,
                p: 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <Typography
                id="weight-input"
                variant="h4"
                sx={{ paddingY: "1vh" }}
              >
                체중 입력
              </Typography>
              <TextField
                variant="outlined"
                color="primary"
                fullWidth
                onChange={(e) => {
                  e.stopPropagation();
                  체중입력함수(e);
                }}
                value={입력체중}
                type="number"
                InputProps={{
                  sx: { borderRadius: "10px", fontSize: "1.2rem" },
                  endAdornment: (
                    <Typography color="text.secondary">(kg)</Typography>
                  ),
                }}
              />

              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ paddingY: "2vh" }}
              >
                <Grid
                  container
                  item
                  xs={11}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid
                    container
                    item
                    xs={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={체중입력하기}
                      disabled={입력체중 === ""}
                      sx={{
                        color: "white",
                        fontSize: "1.1rem",
                        borderRadius: "10px",
                      }}
                    >
                      설정
                    </Button>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={체중입력모달}
                      sx={{
                        color: "white",
                        fontSize: "1.1rem",
                        borderRadius: "10px",
                      }}
                    >
                      취소
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Modal
            open={목표모달열기}
            onClose={목표설정모달닫기}
            aria-labelledby="target-weight-setting-modal"
          >
            <Box
              sx={{
                position: "absolute",
                width: "80%",
                maxWidth: "700px",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <Typography id="target-weight-setting-modal-title" variant="h4">
                감량 목표 설정
              </Typography>
              <Typography
                id="target-weight-setting-modal-description"
                variant="h5"
                sx={{ paddingY: "1vh" }}
              >
                현재 체중
              </Typography>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Typography
                  id="target-weight-setting-modal-description"
                  variant="h3"
                  sx={{ paddingY: "1vh" }}
                >
                  {체중}&nbsp;
                </Typography>
                <Typography
                  id="target-weight-setting-modal-description"
                  variant="h5"
                  sx={{ paddingY: "1vh" }}
                >
                  kg
                </Typography>
              </Grid>
              <Typography
                id="target-weight-setting-modal-description"
                sx={{ paddingY: "0.5vh" }}
              >
                목표 체중 입력
              </Typography>
              <TextField
                variant="outlined"
                color="primary"
                fullWidth
                onChange={(e) => {
                  e.stopPropagation();
                  목표체중입력함수(e);
                }}
                value={입력목표체중}
                type="number"
                InputProps={{
                  sx: { borderRadius: "10px", fontSize: "1.2rem" },
                  endAdornment: (
                    <Typography color="text.secondary">(kg)</Typography>
                  ),
                }}
              />
              <Typography
                id="target-weight-setting-modal-descript"
                sx={{ paddingY: "0.5vh" }}
              >
                목표 기간 입력
              </Typography>
              <TextField
                variant="outlined"
                color="primary"
                fullWidth
                onChange={(e) => {
                  e.stopPropagation();
                  목표기간입력함수(e);
                }}
                value={입력기간}
                type="number"
                InputProps={{
                  sx: { borderRadius: "10px", fontSize: "1.2rem" },
                  endAdornment: (
                    <Typography color="text.secondary">(일)</Typography>
                  ),
                }}
              />

              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ paddingY: "2vh" }}
              >
                <Grid
                  container
                  item
                  xs={11}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid
                    container
                    item
                    xs={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={목표설정하기}
                      disabled={목표값여부 === ""}
                      sx={{
                        color: "white",
                        fontSize: "1.1rem",
                        borderRadius: "10px",
                      }}
                    >
                      설정
                    </Button>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={목표설정모달닫기}
                      sx={{
                        color: "white",
                        fontSize: "1.1rem",
                        borderRadius: "10px",
                      }}
                    >
                      취소
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"bottom"}>
        <SwipeableDrawer
          anchor={"bottom"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
          sx={{
            zIndex: 500,
          }}
          PaperProps={{
            style: {
              borderRadius: "30px 30px 0 0",
              maxWidth: "767px",
              margin: "0 auto",
            },
          }}
        >
          {weightInput("bottom")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
