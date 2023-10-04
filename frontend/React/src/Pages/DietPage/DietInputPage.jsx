import React, { memo } from "react"; // { useState }

import { Grid, Typography, TextField, Button } from "@mui/material";

import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetDiet, deleteFromDiet } from "../../Redux/actions/actions";
import axiosInstance from "../Common/Component/AxiosInstance";

import FoodCount from "./FoodCount";

const DietInputPage = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  // 여기 추후에 리덕스쪽에서 데이터 관리할 것임
  // 식단 데이터 받아온거 저장해놓고, 새로 추가하는 음식 데이터도 쌓다가 저장 누르면 api로 보내버리는 식.

  const location = useLocation();
  const state = location.state;

  const today = state.today;
  const intakeTime = state.intakeTime;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowDietList = useSelector((state) => {
    return state.diet.nowDiet;
  });

  const addedDiet = useSelector((state) => {
    return state.diet.addedDiet;
  });

  const deletedDiet = useSelector((state) => {
    return state.diet.deletedDiet;
  });

  const fixedDiet = useSelector((state) => {
    return state.diet.fixedDiet;
  });

  const goBackPage = () => {
    navigate(-1);
    dispatch(resetDiet());
  };

  const goToSearch = () => {
    navigate("/diet/input/search", {
      state: { name: state.name, today: today, intakeTime: intakeTime },
    });
  };

  console.log(addedDiet);
  console.log(deletedDiet);
  console.log(fixedDiet);

  const handleSaveDietList = async () => {
    try {
      // 백으로 add, delete, fix 보내는 로직을 async 먼저 써서 그거 완료된 뒤에 reset하고 navigate 되도록
      if (deletedDiet.length > 0) {
        const delete_res = await axiosInstance({
          method: "delete",
          url: `${SERVER_API_URL}/intake`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
          data: deletedDiet,
        });

        console.log(delete_res);
      }

      if (addedDiet.length > 0) {
        const add_res = await axiosInstance({
          method: "post",
          url: `${SERVER_API_URL}/intake`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
          data: addedDiet,
        });

        console.log(add_res);
      }

      if (fixedDiet.length > 0) {
        const fix_res = await axiosInstance({
          method: "patch",
          url: `${SERVER_API_URL}/intake`,
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
          data: fixedDiet,
        });

        console.log(fix_res);
      }

      dispatch(resetDiet());
      navigate("/diet");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = (one) => {
    dispatch(deleteFromDiet(one));
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
        {nowDietList.map((one, index) => (
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
              <Grid
                container
                item
                xs={7}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Typography
                  variant="caption"
                  component="div"
                  fontSize={"1.4rem"}
                  fontWeight={"bold"}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {one.name}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={5}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                  >
                    칼로리
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {one.kcal} kcal
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    탄수화물
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {one.carbs} mg
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                  >
                    단백질
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {one.protein} mg
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                  >
                    지방
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"1rem"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {one.fat} mg
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  sx={{ borderTop: "1px solid #e7e7e7" }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    fontSize={"0.8rem"}
                  >
                    1인분 기준
                  </Typography>
                </Grid>
              </Grid>
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
                <FoodCount one={one} addedDiet={addedDiet} />
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
                onClick={() => handleDeleteFood(one)}
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
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={"1.3rem"}
              fontWeight={"bold"}
            >
              총 칼로리
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={"1.3rem"}
              fontWeight={"bold"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {nowDietList.reduce(
                (totalKcal, food) => totalKcal + food.kcal * food.rate,
                0
              )}{" "}
              kcal
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="caption" component="div" fontSize={"1rem"}>
              총 탄수화물
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={"1rem"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {nowDietList.reduce(
                (totalCarbs, food) => totalCarbs + food.carbs * food.rate,
                0
              )}{" "}
              mg
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="caption" component="div" fontSize={"1rem"}>
              총 단백질
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={"1rem"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {nowDietList.reduce(
                (totalProtein, food) => totalProtein + food.protein * food.rate,
                0
              )}{" "}
              mg
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="caption" component="div" fontSize={"1rem"}>
              총 지방
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={"1rem"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {nowDietList.reduce(
                (totalFat, food) => totalFat + food.fat * food.rate,
                0
              )}{" "}
              mg
            </Typography>
          </Grid>
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

export default memo(DietInputPage);
