import React from "react";
import {
	Badge,
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
const drawerWidth = 200;
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
	//zIndex: -1, // Applica una z-index negativa al drawer
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(
	({theme, open}) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	})
);

export default function DrawerLeft() {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleItemMenu1 = () => {
		Router.push("/");
	};

	return (
		<>
			<Drawer
				variant='permanent'
				open={open}
			>
				<List sx={{height: 75}}>{/* fix height: */}</List>
				<List>
					<ListItem
						disablePadding
						sx={{display: "block"}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
								justifyContent: "flex-end",
								alignItems: "center",
							}}
							onClick={open ? handleDrawerClose : handleDrawerOpen}
						>
							{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />

				<List>
					<ListItem
						disablePadding
						sx={{display: "block"}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={handleItemMenu1}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText
								primary='ITEM MENU 1'
								sx={{opacity: open ? 1 : 0}}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
}
