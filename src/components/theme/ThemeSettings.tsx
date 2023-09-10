import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, List, Avatar, Divider } from "@mui/material";
import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { IconButton } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { styled, useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const ThemeSettings = () => {
  const theme = useTheme();
  const [autoMode, setAutoMode] = React.useState(true);
  const { toggleThemeMode } = React.useContext(ThemeContext);

  const isDarkMode = theme.palette.mode === "dark";

  const [colorIconTemaChiaro, setColorIconTemaChiaro] = React.useState<string>(isDarkMode ? "inherit" : theme.palette.primary.main);
  const [colorIconTemaScuro, setColorIconTemaScuro] = React.useState<string>(isDarkMode ? theme.palette.primary.main : "inherit");
  const [colorIconTemaAuto, setColorIconTemaAuto] = React.useState<string>(autoMode ? green[600] : theme.palette.grey[800]);

  // React.useEffect(() => {
  //   console.log(autoMode);
  // }, [autoMode]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      console.log("isDarkModeHook");

      const autoModeExists = localStorage.getItem("autoMode") === "true" || "false" ? true : false;
      autoModeExists ? setAutoMode(localStorage.getItem("autoMode") as unknown as boolean) : {};
      const storedThemeMode = localStorage.getItem("themeMode");
      const initialThemeMode = storedThemeMode || (isDarkMode ? "dark" : "light");
      initialThemeMode === "dark" ? changeColorIcon("Dark") : changeColorIcon("Light");
      toggleThemeMode(initialThemeMode);
    }
  }, [isDarkMode]);

  React.useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("autoMode", autoMode as unknown as string);
    }
  }, [autoMode]);

  const handleModeClick = (mode: "Light" | "Dark" | "Auto") => {
    console.log("Click", mode);

    mode === "Auto" ? setAutoMode(!autoMode) : {};
    changeColorIcon(mode);
    toggleThemeMode(mode === "Light" ? "light" : "dark");
    //localStorage.setItem("autoMode", true);
  };

  const changeColorIcon = (icona: "Light" | "Dark" | "Auto") => {
    console.log("CHANGE ICON COLOR:", icona);

    autoMode ? setColorIconTemaAuto(green[600]) : setColorIconTemaAuto(theme.palette.grey[800]);
    if (icona === "Light") {
      setColorIconTemaChiaro(theme.palette.primary.main);
      setColorIconTemaScuro("inherit");
    } else if (icona === "Dark") {
      setColorIconTemaChiaro("inherit");
      setColorIconTemaScuro(theme.palette.primary.main);
    }
  };

  return (
    <>
      {/* <Divider /> */}
      <Typography variant="body1" component="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px" }}>
        Modalità tema
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
          <Typography variant="body1" component="div">
            Chiaro
          </Typography>
          <IconButton
            size="large"
            aria-label="Tema chiaro"
            onClick={() => {
              handleModeClick("Light");
            }}
            sx={{ color: colorIconTemaChiaro }}
          >
            <LightModeIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
          <Typography variant="body1" component="div">
            Scuro
          </Typography>
          <IconButton
            size="large"
            sx={{ color: colorIconTemaScuro }}
            aria-label="Tema scuro"
            onClick={() => {
              handleModeClick("Dark");
            }}
          >
            <DarkModeIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
          <Typography variant="body1" component="div">
            Auto
          </Typography>
          <IconButton
            size="large"
            sx={{ color: colorIconTemaAuto }}
            aria-label="Tema automatico"
            onClick={() => {
              handleModeClick("Auto");
            }}
          >
            <AutoModeIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
