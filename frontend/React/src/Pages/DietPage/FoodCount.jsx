import React, { useState } from "react";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { NumericFormat } from "react-number-format"; // NumericInput으로 변경

const FoodCount = () => {
  const [value, setValue] = useState(1.0);

  const handleValueChange = (values) => {
    const { floatValue } = values;
    setValue(floatValue);
  };

  return (
    <div>
      <NumericFormat // NumericInput을 사용하도록 변경
        customInput={StyledInput} // customInput을 StyledInput으로 설정
        value={value}
        onValueChange={handleValueChange}
        // decimalScale={1}
        // allowNegative={false}
        // format={(value) => (value === "" ? "" : `${value}인분`)}
        // isAllowed={(values) => {
        //   const { formattedValue, value } = values;
        //   return /^[0-9.]+인분?$/.test(formattedValue + value);
        // }}
      />
    </div>
  );
};

export default FoodCount;

// 나머지 스타일 및 컴포넌트 정의는 그대로 사용
const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${grey[900]};
  background: ${"#fff"};
  border: 1px solid ${grey[200]};
  border-radius: 4px;
  margin: 0 4px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color:#00E1AB;
  }

  &:focus {
    border-color: #00E1AB;
    box-shadow: 0 0 0 3px ${"#00E1AB"};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid #00E1AB;
  border-radius: 999px;
  color: #00E1AB;
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    // background: #00E1AB;
    border-color: #00E1AB;
    box-shadow: 0 0 0 3px ${"#00E1AB"};
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
    
  }
`
);
