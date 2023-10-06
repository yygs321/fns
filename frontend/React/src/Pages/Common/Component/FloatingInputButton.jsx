import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FlatwareRoundedIcon from "@mui/icons-material/FlatwareRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import MonitorWeightRoundedIcon from "@mui/icons-material/MonitorWeightRounded";
import { useMediaQuery, useTheme } from "@mui/material";

import WeightDrawer from "../../WeightInput/WeightDrawer";

const actions = [
  { icon: <FlatwareRoundedIcon />, name: "diet", text: "식단 입력" },
  { icon: <FitnessCenterRoundedIcon />, name: "fit", text: "운동 입력" },
  { icon: <MonitorWeightRoundedIcon />, name: "weight", text: "체중 입력" },
];

export default function FloatingInputButton() {
  const [dialOpen, setDialOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDialButton = () => setDialOpen(!dialOpen);
  const handleDialAction = (name) => {
    if (name === "weight") {
      setDrawerOpen(!drawerOpen);
    } else {
      navigate(`/${name}`);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Box
        sx={{
          bottom: "10vh",
          right: isSmallScreen ? "0" : "10vw",
          height: "20vh",
          width: "10vw",
          transform: "translateZ(0px)",
          flexGrow: "1",
          zIndex: "20",
          position: "fixed",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
          }}
          icon={<CreateRoundedIcon />}
          onClick={handleDialButton}
          open={dialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={`dial-${action.name}`}
              icon={action.icon}
              tooltipTitle={action.text}
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "rgba(50, 50, 50, 95%)",
                    boxShadow: "2px 2px 4px #a5a5a5",
                    border: "0.5px solid #a5a5a5",
                    borderRadius: "10px",
                    textShadow: "2px 2px 40px white",
                    fontSize: "0.9rem",
                    padding: "0.6rem",
                  },
                },
              }}
              onClick={() => handleDialAction(action.name)}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <WeightDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}
