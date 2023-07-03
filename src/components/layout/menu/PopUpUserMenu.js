import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import {Badge, Box, IconButton, Menu, MenuItem} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 200;

const menuId = "up-account-menu";
const mobileMenuId = "up-account-menu-mobile";

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuItems = [
		{
			label: "Messaggi",
			icon: <MailIcon />,
			badgeContent: 4,
			badgeColor: "error",
			onClick: handleMenuClose,
		},
		{
			label: "Notifiche",
			icon: <NotificationsIcon />,
			badgeContent: 17,
			badgeColor: "error",
			onClick: handleMenuClose,
		},
		{
			label: "Carrello",
			icon: <ShoppingCartIcon />,
			badgeContent: 1,
			badgeColor: "error",
			onClick: handleMenuClose,
		},
		{
			label: "Profile",
			onClick: handleMenuClose,
		},
		{
			label: "My account",
			onClick: handleMenuClose,
		},
	];

	const renderMenuItems = menuItems.map((menuItem, index) => (
		<MenuItem
			key={index}
			onClick={menuItem.onClick}
		>
			<IconButton
				size='large'
				aria-label={`show ${menuItem.badgeContent} new ${menuItem.label}`}
				color='inherit'
			>
				{menuItem.icon && (
					<Badge
						badgeContent={menuItem.badgeContent}
						color={menuItem.badgeColor}
					>
						{menuItem.icon}
					</Badge>
				)}
			</IconButton>
			<p>{menuItem.label}</p>
		</MenuItem>
	));

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{renderMenuItems}
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{renderMenuItems}
		</Menu>
	);

	return (
		<>
			{/* Aggiungi qui il tuo componente IconButton per il menu desktop */}
			<Box sx={{display: {xs: "none", md: "flex"}}}>
				<IconButton
					size='large'
					edge='end'
					aria-label='account of current user'
					aria-controls={menuId}
					aria-haspopup='true'
					onClick={handleProfileMenuOpen}
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
			</Box>
			{renderMenu}
			<Box sx={{display: {xs: "flex", md: "none"}}}>
				<IconButton
					size='large'
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					onClick={handleMobileMenuOpen}
					color='inherit'
				>
					<MoreIcon />
				</IconButton>
			</Box>
			{renderMobileMenu}
		</>
	);
}
