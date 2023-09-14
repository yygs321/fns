import React, { useState } from "react";

import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const FoodButtonGroup = (props) => {
  const { one, index } = props;

  const [alignment, setAlignment] = useState("100%"); // 이거 하나로 두니까 다같이 바뀌므로 이거 수정해야됨

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {
      // 선택 해제를 막기 위해 현재 값으로 유지
      newAlignment = alignment;
    }
    setAlignment(newAlignment);
  };

  const children = [
    <ToggleButton
      value="25%"
      key={`${one.name}-${index}-25%`}
      sx={{ borderRadius: "10px 0 0 10px" }}
    >
      <Typography
        variant="caption"
        component="div"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
      >
        25%
      </Typography>
    </ToggleButton>,
    <ToggleButton
      value="50%"
      key={`${one.name}-${index}-50%`}
      sx={{ borderRadius: "0px" }}
    >
      <Typography
        variant="caption"
        component="div"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
      >
        50%
      </Typography>
    </ToggleButton>,
    <ToggleButton
      value="75%"
      key={`${one.name}-${index}-75%`}
      sx={{ borderRadius: "0px" }}
    >
      <Typography
        variant="caption"
        component="div"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
      >
        75%
      </Typography>
    </ToggleButton>,
    <ToggleButton
      value="100%"
      key={`${one.name}-${index}-100%`}
      sx={{ borderRadius: "0 10px 10px 0" }}
    >
      <Typography
        variant="caption"
        component="div"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
      >
        100%
      </Typography>
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <ToggleButtonGroup fullWidth size="medium" {...control} color="primary">
        {children}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default FoodButtonGroup;
