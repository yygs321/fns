import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nowDiet, resetDiet } from "../../Redux/actions/actions";

import { Grid, Typography, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const DietAccordion = (props) => {
  const { name, food, today, intakeTime } = props;

  const [isAccordionSelected, setIsAccordionSelected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalKcal = food.reduce((total, f) => total + f.kcal, 0);
  const handleAccordion = () => {
    setIsAccordionSelected(!isAccordionSelected);
  };

  const rateFood = food.map((f) => {
    const { kcal, carbs, protein, fat, rate, ...rest } = f;

    const newItem = {
      ...rest,
      kcal: kcal / rate,
      carbs: carbs / rate,
      protein: protein / rate,
      fat: fat / rate,
      rate: rate,
    };

    return newItem;
  });

  const handleAddButton = async (event) => {
    event.stopPropagation();
    dispatch(resetDiet());
    dispatch(nowDiet(rateFood));
    navigate("/diet/input", {
      state: { name: name, today: today, intakeTime: intakeTime },
    });
  };

  return (
    <Grid
      container
      item
      xs={11}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ marginTop: "1vh", marginBottom: "1vh" }}
    >
      <Accordion
        expanded={isAccordionSelected}
        onClick={handleAccordion}
        style={{ borderRadius: "25px" }}
        sx={{
          height: "100%",
          width: "100%",
          boxShadow: "2px 2px 4px #a5a5a5",
        }}
      >
        <AccordionSummary
          expandIcon={
            <Grid item container xs={12} justifyContent={"center"}>
              <ExpandMoreRoundedIcon sx={{ fontSize: "1.5rem" }} />
            </Grid>
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "0.5rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            <Grid item container xs={11} justifyContent={"space-between"}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                {name}
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {totalKcal.toFixed(0) || 0} kcal
              </Typography>
            </Grid>
            <hr style={{ width: "80vw", maxWidth: "650px" }} />
            {!isAccordionSelected ? (
              <Grid item container xs={11} justifyContent={"flex-start"}>
                {food.map((f, index) => (
                  <React.Fragment key={`${f.foodName}-${index}-selected`}>
                    <Typography
                      sx={{ color: "text.secondary" }}
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {f.foodName}
                    </Typography>
                    {index !== food.length - 1 && (
                      <Typography sx={{ color: "text.secondary" }}>
                        {","}&nbsp;
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            ) : (
              food.map((f, index) => (
                <Grid
                  item
                  container
                  xs={11}
                  justifyContent={"space-between"}
                  key={`${f.foodName}-${index}`}
                >
                  <Typography
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {f.foodName}
                  </Typography>
                  <Typography
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {f.kcal.toFixed(0) || 0} kcal
                  </Typography>
                </Grid>
              ))
            )}

            {isAccordionSelected && (
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ height: "6vh", zIndex: "20" }}
                onClick={handleAddButton}
              >
                <AddCircleOutlineRoundedIcon sx={{ fontSize: "1.8rem" }} />
                <hr
                  style={{
                    width: "80vw",
                    maxWidth: "650px",
                    marginBottom: "0px",
                  }}
                />
              </Grid>
            )}
          </Grid>
        </AccordionSummary>
      </Accordion>
    </Grid>
  );
};

export default DietAccordion;
