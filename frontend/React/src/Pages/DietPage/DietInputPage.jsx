import React from "react"; // { useState }

import { Grid, Typography, TextField, Button } from "@mui/material";

import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation, useNavigate } from "react-router-dom";
import FoodCount from "./FoodCount";

const DietInputPage = () => {
  // 여기 추후에 리덕스쪽에서 데이터 관리할 것임
  // 식단 데이터 받아온거 저장해놓고, 새로 추가하는 음식 데이터도 쌓다가 저장 누르면 api로 보내버리는 식.

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const goBackPage = () => {
    navigate(-1);
  };

  const goToSearch = () => {
    navigate("/diet/input/search", { state: { name: state.name } });
  };

  const handleSaveDietList = () => {
    navigate("/diet");
  };

  return (
    <div className="white-pages">
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "7vh" }}
      >
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavigateBeforeRoundedIcon
            sx={{
              fontSize: "2rem",
              paddingBottom: "0.2rem",
              cursor: "pointer",
            }}
            onClick={goBackPage}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="caption"
            component="div"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            {state.name}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        ></Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "10vh" }}
      >
        <Grid
          container
          item
          xs={9}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="음식 검색"
            InputProps={{
              endAdornment: <SearchIcon color="text.secondary" />,
              sx: {
                height: "6vh",
                borderRadius: "30px",
                backgroundColor: "#e7e7e7",
                cursor: "pointer",
              },
            }}
            inputProps={{
              style: { cursor: "pointer" },
              readOnly: true,
            }}
            sx={{
              cursor: "pointer",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
                height: "6vh",
              },
            }}
            maxRows={1}
            onClick={goToSearch}
          />
        </Grid>
      </Grid>
      <Grid
        className="noscroll"
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "50vh", overflow: "scroll" }}
      >
        {state.food.map((one, index) => (
          <Grid
            key={`${one.name}-detail-${index}`}
            container
            item
            xs={11}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              borderBottom: "2px solid #e7e7e7",
              height: "40vh",
            }}
          >
            <Grid
              container
              item
              xs={12}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                variant="caption"
                component="div"
                fontSize={"1.4rem"}
                fontWeight={"bold"}
              >
                {one.name}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                fontSize={"1.2rem"}
                // fontWeight={"bold"}
              >
                {one.kcal} kcal
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              // textAlign={"center"}
            >
              <Grid
                container
                item
                xs={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  variant="caption"
                  component="div"
                  fontSize={"1.1rem"}
                  fontWeight={"bold"}
                >
                  음식량
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={9}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FoodCount one={one} index={index} />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                fullWidth
                variant="contained"
                color="warning"
                sx={{
                  borderRadius: "10px",
                  color: "white",
                  textShadow: "2px 2px 20px #8b8b8b",
                  fontSize: "1.5rem",
                }}
              >
                삭제
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "25vh", borderTop: "2px solid #e7e7e7" }}
      >
        <Grid
          container
          item
          xs={11}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="caption"
            component="div"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            총 칼로리
          </Typography>
          <Typography
            variant="caption"
            component="div"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            10 kcal
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={10}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "10px",
              color: "white",
              textShadow: "2px 2px 20px #8b8b8b",
              fontSize: "1.5rem",
            }}
            onClick={handleSaveDietList}
          >
            저장
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DietInputPage;
