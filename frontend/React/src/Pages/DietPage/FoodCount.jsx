import React, { useState } from "react";

import { styled } from "@mui/system";
import { Grid, TextField, IconButton } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { NumericFormat } from "react-number-format";

const FoodCount = () => {
  const [value, setValue] = useState(1.0);

  const handleValueChange = (values) => {
    const { floatValue } = values;
    setValue(floatValue);
  };

  const handlePlus = () => {
    if (value < 99.5) {
      setValue(value + 0.5);
    }
  };
  const handleMinus = () => {
    if (value > 0.5) {
      setValue(value - 0.5);
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
