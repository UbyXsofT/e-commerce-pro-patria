// Layout.js
import React from "react";
import {
	Box,
	CssBaseline,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {styled, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import Router from "next/router";
import DriwerLeft from "./DrawerLeft";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline />
			<Header
			// open={open}
			// handleDrawerOpen={handleDrawerOpen}
			/>

			{/* INSERIAMO DRAVER */}
			<DriwerLeft />

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					transition: "margin-left 0.2s ease-in-out",
					//marginLeft: open ? `${drawerWidth}px` : 0,
				}}
			>
				<Toolbar />
				{children}
				<Footer />
			</Box>
		</Box>
	);
};

export default Layout;
