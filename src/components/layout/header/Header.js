// Header.js
import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {ToolBar} from "./ToolBar";

const AppBar = styled(MuiAppBar)(({theme}) => ({
	zIndex: theme.zIndex.drawer + 1,
	width: "100%",
}));

export const Header = ({drawerDxOpen, toggleDrawerDx, setTipoContesto, setDrawerDxOpen}) => {
	const theme = useTheme();
	return (
		<>
			<AppBar
				position='fixed'
				sx={{
					backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
				}}
			>
				<ToolBar
					drawerDxOpen={drawerDxOpen}
					toggleDrawerDx={toggleDrawerDx}
					setTipoContesto={setTipoContesto}
					setDrawerDxOpen={setDrawerDxOpen}
				/>
			</AppBar>
		</>
	);
};
