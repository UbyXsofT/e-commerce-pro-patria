import React from "react";
import {styled, useTheme} from "@mui/material/styles";
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {Badge} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const UserMenu = () => {
	const theme = useTheme();
	const [drawerWidth, setDrawerWidth] = React.useState(0);

	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setDrawerWidth(200);
		setIsDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setDrawerWidth(0);
		setIsDrawerOpen(false);
	};

	const StyledDrawer = styled(Drawer)(({theme}) => ({
		width: drawerWidth,
		flexShrink: 0,
		"& .MuiDrawer-paper": {
			width: drawerWidth,
			boxSizing: "border-box",
		},
	}));

	const StyledList = styled(List)(({theme}) => ({
		marginTop: theme.spacing(2),
	}));

	const menuItems = [
		{
			label: "Messaggi",
			icon: <MailIcon />,
			badgeContent: 4,
			badgeColor: "error",
		},
		{
			label: "Notifiche",
			icon: <InboxIcon />,
			badgeContent: 17,
			badgeColor: "error",
		},
		{
			label: "Carrello",
			icon: <InboxIcon />,
			badgeContent: 1,
			badgeColor: "error",
		},
		{
			label: "Profile",
			//onClick: handleDrawerClose,
		},
		{
			label: "My account",
			//onClick: handleDrawerClose,
		},
	];

	return (
		<>
			<IconButton
				edge='start'
				color='inherit'
				aria-label='open drawer'
				onClick={handleDrawerOpen}
				sx={{
					// marginRight: "36px",
					...(isDrawerOpen && {display: "none"}),
				}}
			>
				<MenuIcon />
			</IconButton>
			<StyledDrawer
				variant='persistent'
				anchor='right'
				open={isDrawerOpen}
			>
				<IconButton onClick={handleDrawerClose}>
					<ChevronRightIcon />
				</IconButton>
				<StyledList>
					{menuItems.map((menuItem, index) => (
						<ListItem
							button
							key={index}
							onClick={menuItem.onClick}
						>
							<ListItemIcon>{menuItem.icon}</ListItemIcon>
							<ListItemText primary={menuItem.label} />
						</ListItem>
					))}
				</StyledList>
			</StyledDrawer>
		</>
	);
};

export default UserMenu;
