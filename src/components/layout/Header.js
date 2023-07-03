// Header.js
import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import {Badge, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import UserMenu from "./menu/UserMenu";
import Image from "next/image";
import {IconButton} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
const menuId = "up-account-menu";
const mobileMenuId = "up-account-menu-mobile";
const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
	marginLeft: -30,
});

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		//marginLeft: drawerWidth,
		//width: `calc(100% - ${drawerWidth}px)`,
		width: "100%",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Header = ({open}) => {
	const theme = useTheme();
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

	return (
		<>
			<CssBaseline />
			<AppBar
				position='fixed'
				open={open}
				sx={{
					backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
				}}
			>
				<Toolbar>
					<StyledImageLogo
						src='/images/LogoO.png'
						alt='Logo'
						width={200}
						height={70}
						priority={true}
					/>
					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: {xs: "none", md: "flex"}}}>
						<IconButton
							size='large'
							aria-label='show 4 new mails'
							color='inherit'
						>
							<Badge
								badgeContent={4}
								color='error'
							>
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							aria-label='show 17 new notifications'
							color='inherit'
						>
							<Badge
								badgeContent={17}
								color='error'
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							aria-label='show 1 item'
							color='inherit'
						>
							<Badge
								badgeContent={1}
								color='error'
							>
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
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
					<UserMenu />
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
