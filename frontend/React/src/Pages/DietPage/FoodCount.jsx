import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";
import { Grid, TextField, IconButton } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { NumericFormat } from "react-number-format";

import { useDispatch } from "react-redux";
import { fixedFromDiet } from "../../Redux/actions/actions";

const FoodCount = (props) => {
  const { one, addedDiet } = props;

  const [value, setValue] = useState(one.count || 1.0);
  const [isAddedFood, setIsAddedFood] = useState(false);

  console.log(isAddedFood);

  useEffect(() => {
    const index = addedDiet.findIndex((food) => food.name === one.name);
    setIsAddedFood(index !== -1);
  }, [addedDiet, one]);

  const dispatch = useDispatch();

  const handleValueChange = (values) => {
    const { floatValue } = values;
    setValue(floatValue);
    dispatch(
      fixedFromDiet({ name: one.name, kcal: one.kcal, count: floatValue })
    );
  };

  const handlePlus = () => {
    if (value < 99.5) {
      const newValue = value + 0.5;
      setValue(newValue);
      dispatch(
        fixedFromDiet({ name: one.name, kcal: one.kcal, count: newValue })
      );
    }
  };

  const handleMinus = () => {
    if (value > 0.5) {
      const newValue = value - 0.5;
      setValue(newValue);

      dispatch(
        fixedFromDiet({ name: one.name, kcal: one.kcal, count: newValue })
      );
    }
  };

  const materialUITextFieldProps = {
    focused: true,
    id: "outlined-required",
    label: "소수점 한 자리까지",
    variant: "outlined",
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "10px", // 외곽선
      },
      "& .MuiOutlinedInput-input": {
        textAlign: "center",
      },
    },
  };

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Grid
        container
        item
        xs={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton aria-label="minus" color="primary" onClick={handleMinus}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        item
        xs={6}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <NumericFormat
          customInput={StyledInput} // customInput을 StyledInput으로 설정
          {...materialUITextFieldProps}
          value={value}
          onValueChange={handleValueChange}
          decimalScale={1}
          allowNegative={false}
          allowLeadingZeros={false}
          suffix=" 인분"
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue < 100;
          }}
        />
      </Grid>
      <Grid
        container
        item
        xs={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton aria-label="plus" color="primary" onClick={handlePlus}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FoodCount;

const StyledInput = styled(TextField)`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375;
  border-radius: 10px;
`;
