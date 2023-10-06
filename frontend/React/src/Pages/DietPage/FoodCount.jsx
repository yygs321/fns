import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { fixedFromDiet } from "../../Redux/actions/actions";

import { styled } from "@mui/system";
import { Grid, TextField, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const FoodCount = (props) => {
  const { one } = props;

  const [value, setValue] = useState(one.rate || 1.0);

  const dispatch = useDispatch();

  const handleValueChange = (values) => {
    const { floatValue } = values;
    setValue(floatValue);
    dispatch(fixedFromDiet({ ...one, rate: floatValue }));
  };

  const handlePlus = () => {
    if (value < 99.5) {
      const newValue = value + 0.5;
      setValue(newValue);
      dispatch(fixedFromDiet({ ...one, rate: newValue }));
    }
  };

  const handleMinus = () => {
    if (value > 0.5) {
      const newValue = value - 0.5;
      setValue(newValue);

      dispatch(fixedFromDiet({ ...one, rate: newValue }));
    }
  };

  const materialUITextFieldProps = {
    focused: true,
    id: "outlined-required",
    label: "소수점 한 자리까지",
    variant: "outlined",
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "10px",
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
          customInput={StyledInput}
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
