import { Box, Typography, FormControlLabel } from "@mui/material";
import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { IconButton } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { useTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";

export const ThemeSettings = () => {
	const theme = useTheme();
	const { themeMode, setThemeMode, autoMode, setAutoMode } =
		React.useContext(ThemeContext);

	const isDarkMode = theme.palette.mode === "dark";

	const [colorIconTemaChiaro, setColorIconTemaChiaro] = React.useState<string>(
		isDarkMode ? "inherit" : theme.palette.primary.main
	);
	const [colorIconTemaScuro, setColorIconTemaScuro] = React.useState<string>(
		isDarkMode ? theme.palette.primary.main : "inherit"
	);
	const [colorIconTemaAuto, setColorIconTemaAuto] = React.useState<string>(
		autoMode ? green[600] : grey[700]
	);

	React.useEffect(() => {
		setColorIconTemaAuto(autoMode === "true" ? green[600] : grey[700]);
	}, [autoMode]);

	React.useEffect(() => {
		if (isDarkMode) {
			setColorIconTemaChiaro("inherit");
			setColorIconTemaScuro(theme.palette.primary.main);
		} else {
			setColorIconTemaChiaro(theme.palette.primary.main);
			setColorIconTemaScuro("inherit");
		}
	}, [isDarkMode]);

	const handleThemeChange = (newSetting: "Light" | "Dark" | "Auto") => {
		switch (newSetting) {
			case "Light":
				setColorIconTemaChiaro(theme.palette.primary.main);
				setColorIconTemaScuro("inherit");
				setThemeMode("light");
				if (typeof window !== "undefined" && window.localStorage) {
					localStorage.setItem("themeMode", "light");
				}
				break;

			case "Dark":
				setColorIconTemaChiaro("inherit");
				setColorIconTemaScuro(theme.palette.primary.main);
				setThemeMode("dark");
				if (typeof window !== "undefined" && window.localStorage) {
					localStorage.setItem("themeMode", "dark");
				}
				break;

			case "Auto":
				autoMode === "true" ? setAutoMode("false") : setAutoMode("true");
				setColorIconTemaAuto(autoMode === "false" ? green[600] : grey[700]);
				if (typeof window !== "undefined" && window.localStorage) {
					localStorage.setItem(
						"autoMode",
						autoMode === "false" ? "true" : "false"
					);
				}
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				autoMode === "false"
					? setThemeMode(mediaQuery.matches ? "dark" : "light")
					: {};
				if (
					typeof window !== "undefined" &&
					window.localStorage &&
					autoMode === "false"
				) {
					localStorage.setItem(
						"themeMode",
						mediaQuery.matches ? "dark" : "light"
					);
				}

				break;
		}
	};

	return (
		<div>
			<Typography sx={{ textAlign: "center" }}>Modalità Tema</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<FormControlLabel
					label="Chiaro"
					labelPlacement="bottom"
					control={
						<IconButton
							size="large"
							aria-label="Tema chiaro"
							onClick={() => {
								handleThemeChange("Light");
							}}
							sx={{ color: colorIconTemaChiaro }}
						>
							<LightModeIcon />
						</IconButton>
					}
				/>
				<FormControlLabel
					label="Scuro"
					labelPlacement="bottom"
					control={
						<IconButton
							size="large"
							sx={{ color: colorIconTemaScuro }}
							aria-label="Tema scuro"
							onClick={() => {
								handleThemeChange("Dark");
							}}
						>
							<DarkModeIcon />
						</IconButton>
					}
				/>
				<FormControlLabel
					label="Auto"
					labelPlacement="bottom"
					control={
						<IconButton
							size="large"
							sx={{ color: colorIconTemaAuto }}
							aria-label="Tema automatico"
							onClick={() => {
								handleThemeChange("Auto");
							}}
						>
							<AutoModeIcon />
						</IconButton>
					}
				/>
			</Box>
		</div>
	);
};
