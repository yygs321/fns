import React, { useState } from "react";

import { Typography, TextField, Grid, Chip, Divider, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilteredSearchResults from "./FilteredSearchResults";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import axiosInstance from "../Common/Component/AxiosInstance";

const SearchFoodPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [kcal, setKcal] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const filterKeyToLabel = {
    kcal: "kcal",
    carbs: "탄수화물",
    protein: "단백질",
    fat: "지방",
  };

  const accessToken = sessionStorage.getItem("accessToken");
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/foods`, {
        params: { name: searchTerm },
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
      });

      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        console.error("Failed to fetch search results:", response.data.message);
      }
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  const filters = { kcal, carbs, protein, fat };
  const activeFilters = Object.keys(filters).filter((key) => filters[key]);

  const handleBackClick = () => {
    setSearchTerm("");
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div style={{ padding: "2vh" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "7vh" }}
      >
        {searchTerm ? (
          <Grid
            container
            item
            xs={2}
            justifyContent="center"
            alignItems="center"
          >
            <ArrowBackIosIcon
              onClick={() => handleBackClick()}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={2}
            justifyContent="center"
            alignItems="center"
          ></Grid>
        )}
        <Grid container item xs={8} justifyContent="center" alignItems="center">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight={"bold"}
            style={{ flex: 1 }}
          >
            음식 정보
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent="center"
          alignItems="center"
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
                <SearchIcon color="text.secondary" onClick={handleSearch} />
              ),
              sx: {
                height: "6vh",
                borderRadius: "30px",
                backgroundColor: isFocused ? "white" : "#e7e7e7",
                cursor: "pointer",
              },
            }}
            sx={{
              cursor: "pointer",
              "& .MuiOutlinedInput-notchedOutline": {
                border: isFocused ? "" : "none",
                height: "6vh",
              },
            }}
            maxRows={1}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>

      {searchTerm ? (
        <div style={{ height: "71vh" }}>
          <Box
            className="noscroll"
            spacing={1}
            style={{
              overflowX: "scroll",
              width: "100%",
              whiteSpace: "nowrap",
              height: "5vh",
              marginBottom: "1vh",
            }}
          >
            {activeFilters.length > 0 ? (
              <>
                {activeFilters.map((filterKey) => (
                  <Chip
                    sx={{ marginRight: "1vh", height: "4vh" }}
                    key={filterKey}
                    label={`${filterKeyToLabel[filterKey]} : ${filters[filterKey]}`}
                    onDelete={() => {
                      switch (filterKey) {
                        case "kcal":
                          setKcal("");
                          break;
                        case "carbs":
                          setCarbs("");
                          break;
                        case "protein":
                          setProtein("");
                          break;
                        case "fat":
                          setFat("");
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                ))}
              </>
            ) : (
              <Chip
                sx={{ marginRight: "1vh", height: "4vh" }}
                label="필터없음"
              />
            )}
          </Box>
          <Divider sx={{ marginBottom: "1vh" }} />
          <div
            className="noscroll"
            style={{ height: "66vh", overflowY: "scroll" }}
          >
            <FilteredSearchResults data={searchResults} filters={filters} />
          </div>
        </div>
      ) : (
        <Grid
          container
          direction="column"
          spacing={3}
          sx={{ marginTop: "5vh" }}
        >
          <Grid
            item
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={1}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="kcal"
                variant="outlined"
                type="number"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={1}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="탄수화물"
                variant="outlined"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={1}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="단백질"
                variant="outlined"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={1}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="지방"
                variant="outlined"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SearchFoodPage;
