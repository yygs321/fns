import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Slider,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReplayIcon from "@mui/icons-material/Replay";

import axios from "axios";

const MyCustomPage = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const [kcal, setKcal] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [protein, setProtein] = useState(null);
  const [fat, setFat] = useState(null);
  const [pollination, setPollination] = useState(null);
  const [sugar, setSugar] = useState(null);
  const [dietaryfiber, setDietaryFiber] = useState(null);
  const [calcium, setCalcium] = useState(null);
  const [potassium, setPotassium] = useState(null);
  const [iron, setIron] = useState(null);
  const [phosphorus, setPhosphorus] = useState(null);
  const [sodium, setSodium] = useState(null);
  const [vitaminA, setVitaminA] = useState(null);
  const [vitaminC, setVitaminC] = useState(null);
  const [vitaminD, setVitaminD] = useState(null);
  const [cholesterol, setCholesterol] = useState(null);
  const [acid, setAcid] = useState(null);
  const [transfat, setTransFat] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/base/current`, {
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        });

        if (response.data.success) {
          const data = response.data.data;
          setInitialValues(data);

          setKcal(data.kcal);
          setCarbs(data.carbs);
          setProtein(data.protein);
          setFat(data.fat);
          setPollination(data.pollination);
          setSugar(data.sugar);
          setDietaryFiber(data.dietaryFiber);
          setCalcium(data.calcium);
          setPotassium(data.potassium);
          setIron(data.iron);
          setPhosphorus(data.phosphorus);
          setSodium(data.sodium);
          setVitaminA(data.vitaminA);
          setVitaminC(data.vitaminC);
          setVitaminD(data.vitaminD);
          setCholesterol(data.cholesterol);
          setAcid(data.acid);
          setTransFat(data.transFat);
        } else {
          console.error("Failed to fetch base data:", response.data.message);
        }
      } catch (error) {
        console.error("Error while fetching base data:", error);
      }
    };

    fetchBaseData();
  }, [accessToken, SERVER_API_URL]);

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleSave = async () => {
    try {
      const requestData = {
        acid: acid,
        calcium: calcium,
        carbs: carbs,
        cholesterol: cholesterol,
        dietaryFiber: dietaryfiber,
        fat: fat,
        iron: iron,
        kcal: kcal,
        phosphorus: phosphorus,
        pollination: pollination,
        potassium: potassium,
        protein: protein,
        sodium: sodium,
        sugar: sugar,
        transFat: transfat,
        vitaminA: vitaminA,
        vitaminC: vitaminC,
        vitaminD: vitaminD,
      };

      const response = await axios.post(
        `${SERVER_API_URL}/base/update`,
        requestData,
        {
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }
      );

      if (response.data.success) {
        console.log("영양소 값 저장 성공");
        setOpenModal(true);
        timeoutRef.current = setTimeout(() => {
          navigate("/mypage");
        }, 1000);
      } else {
        console.error("영양소 값 저장 실패:", response.data.message);
      }
    } catch (error) {
      console.error("영양소 값 저장 중 오류 발생:", error);
    }
  };

  const handleModalClose = () => {
    clearTimeout(timeoutRef.current);
    navigate("/mypage");
  };

  const resetValues = async () => {
    try {
      await axios.post(
        `${SERVER_API_URL}/base`,
        {},
        {
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error while sending reset request:", error);
      window.location.reload();
    }
  };

  return (
    <div
      className="gray-pages"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "92vh",
      }}
    >
      <div
        className="white-content-box"
        style={{
          width: "80%",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          나에게 맞는 영양소를 설정해보세요!
          <Tooltip
            title="내 추천 영양소의 0.5배 ~ 1.5배까지 조정 가능합니다!"
            open={tooltipOpen}
          >
            <IconButton
              size="small"
              style={{ marginLeft: "10px" }}
              onClick={() => setTooltipOpen(!tooltipOpen)}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            style={{ marginLeft: "10px" }}
            onClick={resetValues}
          >
            <ReplayIcon />
          </IconButton>
        </Typography>

        <Grid
          container
          spacing={3}
          className="noscroll"
          sx={{ overflowY: "scroll", maxHeight: "50vh" }}
        >
          {renderSlider("칼로리(Kcal)", kcal, setKcal, initialValues.kcal)}
          {renderSlider("탄수화물(g)", carbs, setCarbs, initialValues.carbs)}
          {renderSlider(
            "단백질(g)",
            protein,
            setProtein,
            initialValues.protein
          )}
          {renderSlider("지방(g)", fat, setFat, initialValues.fat)}
          {renderSlider(
            "수분(g)",
            pollination,
            setPollination,
            initialValues.pollination
          )}
          {renderSlider("당류(g)", sugar, setSugar, initialValues.sugar)}
          {renderSlider(
            "식이섬유(g)",
            dietaryfiber,
            setDietaryFiber,
            initialValues.dietaryFiber
          )}
          {renderSlider("칼슘(mg)", calcium, setCalcium, initialValues.calcium)}
          {renderSlider(
            "칼륨(mg)",
            potassium,
            setPotassium,
            initialValues.potassium
          )}
          {renderSlider("철(mg)", iron, setIron, initialValues.iron)}
          {renderSlider(
            "인(mg)",
            phosphorus,
            setPhosphorus,
            initialValues.phosphorus
          )}
          {renderSlider("나트륨(mg)", sodium, setSodium, initialValues.sodium)}
          {renderSlider(
            "비타민A(μg)",
            vitaminA,
            setVitaminA,
            initialValues.vitaminA
          )}
          {renderSlider(
            "비타민C(mg)",
            vitaminC,
            setVitaminC,
            initialValues.vitaminC
          )}
          {renderSlider(
            "비타민D(μg)",
            vitaminD,
            setVitaminD,
            initialValues.vitaminD
          )}
          {renderSlider(
            "콜레스테롤",
            cholesterol,
            setCholesterol,
            initialValues.cholesterol
          )}
          {renderSlider("포화지방산(g)", acid, setAcid, initialValues.acid)}
          {renderSlider(
            "트랜스지방산(g)",
            transfat,
            setTransFat,
            initialValues.transFat
          )}

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                fontSize: "20px",
                padding: "5px 100px",
              }}
              onClick={handleSave}
            >
              저장
            </Button>
          </Grid>
        </Grid>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            maxWidth: "400px",
            backgroundColor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
            border: "1px solid #ddd",
            p: 4,
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            저장되었습니다!
          </Typography>
          <Button style={{ marginTop: "12px" }} onClick={handleModalClose}>
            확인
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const renderSlider = (label, value, setValue, initialValue) => {
  const minValue = initialValue * 0.5;
  const maxValue = initialValue * 1.5;

  return (
    <Grid item xs={12}>
      <Typography gutterBottom>
        {label}: {value}/{maxValue}
      </Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        min={minValue}
        max={maxValue}
        sx={{
          "& .MuiSlider-rail": {
            backgroundColor: "#e7e7e7",
          },
        }}
      />
    </Grid>
  );
};

export default MyCustomPage;
