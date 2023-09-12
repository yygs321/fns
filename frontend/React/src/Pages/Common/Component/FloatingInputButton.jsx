import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FlatwareRoundedIcon from "@mui/icons-material/FlatwareRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import MonitorWeightRoundedIcon from "@mui/icons-material/MonitorWeightRounded";
import { useMediaQuery, useTheme } from "@mui/material";

const actions = [
  { icon: <FlatwareRoundedIcon />, name: "eat" },
  { icon: <FitnessCenterRoundedIcon />, name: "fit" },
  { icon: <MonitorWeightRoundedIcon />, name: "weight" },
];

export default function FloatingInputButton() {
  const [dialOpen, setDialOpen] = React.useState(false);
  const handleDialButton = () => setDialOpen(!dialOpen);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      sx={{
        bottom: "10vh",
        right: isSmallScreen ? "0" : "10vw", // 일단 제한 크기보다 큰 곳에선 화면 밖으로 빼기
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
        icon={
          <CreateRoundedIcon
          //  sx={{ color: "white" }}
          />
        }
        onClick={handleDialButton}
        open={dialOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleDialButton}
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              // color: "white"
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
