import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, List, Avatar, Divider} from "@mui/material";
import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import {IconButton} from "@mui/material";
import {ThemeContext} from "./ThemeContext";
import {styled, useTheme} from "@mui/material/styles";
import {green} from "@mui/material/colors";

export const TemaControls = () => {
	const theme = useTheme();
	const [autoMode, setAutoMode] = React.useState("false");
	const {toggleThemeMode} = React.useContext(ThemeContext);

	const [colorIconTemaChiaro, setColorIconTemaChiaro] = React.useState();
	const [colorIconTemaScuro, setColorIconTemaScuro] = React.useState();
	const [colorIconTemaAuto, setColorIconTemaAuto] = React.useState();

	const isDarkMode = theme.palette.mode === "dark";

	React.useEffect(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			setAutoMode(localStorage.getItem("autoMode"));
			const storedThemeMode = localStorage.getItem("themeMode");
			const initialThemeMode = storedThemeMode || (isDarkMode ? "dark" : "light");
			initialThemeMode === "dark" ? changeColorIcon("Scuro") : changeColorIcon("Chiaro");
			console.log("initialThemeMode: ", initialThemeMode);
			toggleThemeMode(initialThemeMode);
		}
	}, [isDarkMode]);

	React.useMemo(() => {
		console.log("useMemo autoMode: ", autoMode);
		if (typeof window !== "undefined" && window.localStorage) {
			localStorage.setItem("autoMode", autoMode);
		}
	}, [autoMode]);

	const handleModeClick = (mode) => {
		console.log("handleModeClick : ", mode);
		mode === "Auto" ? (autoMode === "true" ? setAutoMode("false") : setAutoMode("true")) : null;
		changeColorIcon(mode);
		toggleThemeMode(mode === "Chiaro" ? "light" : "dark");
		//localStorage.setItem("autoMode", true);
	};

	const changeColorIcon = (icona) => {
		console.log("autoMode: ", autoMode);
		autoMode === "true" ? setColorIconTemaAuto(green[600]) : setColorIconTemaAuto(theme.palette.grey[800]);
		if (icona === "Chiaro") {
			setColorIconTemaChiaro(theme.palette.primary.main);
			setColorIconTemaScuro("inherit");
		} else if (icona === "Scuro") {
			setColorIconTemaChiaro("inherit");
			setColorIconTemaScuro(theme.palette.primary.main);
		}
	};

	return (
		<>
			{/* <Divider /> */}
			<Typography
				variant='body1'
				component='div'
				sx={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}}
			>
				Modalità tema
			</Typography>
			<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
				<Box sx={{display: "flex", flexDirection: "column-reverse", alignItems: "center"}}>
					<Typography
						variant='body1'
						component='div'
					>
						Chiaro
					</Typography>
					<IconButton
						size='large'
						aria-label='Tema chiaro'
						onClick={() => {
							handleModeClick("Chiaro");
						}}
						sx={{color: colorIconTemaChiaro}}
					>
						<LightModeIcon />
					</IconButton>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column-reverse", alignItems: "center"}}>
					<Typography
						variant='body1'
						component='div'
					>
						Scuro
					</Typography>
					<IconButton
						size='large'
						sx={{color: colorIconTemaScuro}}
						aria-label='Tema scuro'
						onClick={() => {
							handleModeClick("Scuro");
						}}
					>
						<DarkModeIcon />
					</IconButton>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column-reverse", alignItems: "center"}}>
					<Typography
						variant='body1'
						component='div'
					>
						Auto
					</Typography>
					<IconButton
						size='large'
						sx={{color: colorIconTemaAuto}}
						aria-label='Tema automatico'
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
