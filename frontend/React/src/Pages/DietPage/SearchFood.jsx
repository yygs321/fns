import React, { useEffect, useState } from "react";

import { Grid, Typography, TextField, Button } from "@mui/material";

import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToDiet, deleteFromDiet } from "../../Redux/actions/actions";

const SearchFood = () => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);

  const existingDiet = useSelector((state) => {
    return state.diet.nowDiet;
  });

  const addedDiet = useSelector((state) => {
    return state.diet.addedDiet;
  });

  const deletedDiet = useSelector((state) => {
    return state.diet.deletedDiet;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = location.state;

  const [addedFoodList, setAddedFoodList] = useState([]);

  useEffect(() => {
    const updatedAddedFoodList = [
      ...existingDiet.filter(
        (food) =>
          !deletedDiet.some((deletedFood) => food.name === deletedFood.name)
      ),
      ...addedDiet,
    ];
    setAddedFoodList(updatedAddedFoodList);
  }, [existingDiet, addedDiet, deletedDiet]);

  const searchResult = [
    { name: "치킨버거", kcal: 10 },
    { name: "새우버거", kcal: 11 },
    { name: "야옹이", kcal: 15 },
    { name: "버거킹", kcal: 5 },
    { name: "치킨", kcal: 10 },
    { name: "새우", kcal: 11 },
    { name: "야옹", kcal: 15 },
    { name: "버거", kcal: 5 },
    { name: "치거", kcal: 10 },
    { name: "새거", kcal: 11 },
    { name: "야이", kcal: 15 },
    { name: "버킹", kcal: 5 },
    { name: "킨거", kcal: 10 },
    { name: "우버", kcal: 11 },
    { name: "이", kcal: 15 },
    { name: "거", kcal: 5 },
  ];

  const goBackPage = () => {
    navigate(-1);
  };

  const handleSearchFood = () => {
    // 여기다 검색 api
  };

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleSearchFood();
    }
  };

  const handleAddFood = (one) => {
    dispatch(addToDiet({ ...one, count: 1 }));
  };

  const handleCancleFood = (one) => {
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
            {`${state.name} 검색` || ""}
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
              endAdornment: (
                <SearchIcon color="text.secondary" onClick={handleSearchFood} />
              ),
              sx: {
                height: "6vh",
                borderRadius: "30px",
                backgroundColor: "#e7e7e7",
                cursor: "pointer",
              },
            }}
            sx={{
              cursor: "pointer",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
                height: "6vh",
              },
            }}
            maxRows={1}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handlePressEnter}
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
        sx={{ overflow: "scroll", height: "65vh" }}
      >
        {searchResult.map((one, index) => (
          <Grid
            key={`${one.name}-detail-${index}`}
            container
            item
            xs={10}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              borderBottom: "2px solid #e7e7e7",
              height: "10vh",
            }}
          >
            <Grid
              container
              item
              xs={5}
              justifyContent={"flex-start"}
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
            </Grid>
            <Grid
              container
              item
              xs={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="caption"
                component="div"
                fontSize={"1.1rem"}
                // fontWeight={"bold"}
              >
                {one.kcal} kcal
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={3}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              {!addedFoodList.some((food) => food.name === one.name) ? (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    color: "white",
                    textShadow: "2px 2px 20px #8b8b8b",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => handleAddFood(one)}
                >
                  추가
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderRadius: "10px",
                    color: "white",
                    textShadow: "2px 2px 20px #8b8b8b",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => handleCancleFood(one)}
                >
                  취소
                </Button>
              )}
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
        sx={{ height: "10vh" }}
      >
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
            onClick={goBackPage}
          >
            돌아가기
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchFood;
