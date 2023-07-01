import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import Router from "next/router";
import StickyFooter from "../../src/components/footer/StickyFooter";

const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({theme}) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessario che il contenuto si trovi sotto la barra dell'app
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

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

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleItemMenu1 = () => {
		Router.push("/");
	};

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

	const menuId = "up-account-menu";
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
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "up-account-menu-mobile";
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
			<MenuItem>
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
				<p>Messaggi</p>
			</MenuItem>
			<MenuItem>
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
				<p>Notifiche</p>
			</MenuItem>
			<MenuItem>
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
				<p>Carrello</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profilo</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<Box sx={{display: "flex"}}>
				<CssBaseline />
				<AppBar
					position='fixed'
					open={open}
				>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 5,
								...(open && {display: "none"}),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h6'
							noWrap
							component='div'
						>
							E-Commerce
						</Typography>
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
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}

				<Drawer
					variant='permanent'
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</DrawerHeader>
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
									primary='ITEM MENU 2'
									sx={{opacity: open ? 1 : 0}}
								/>
							</ListItemButton>
						</ListItem>
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
									primary='ITEM MENU 3'
									sx={{opacity: open ? 1 : 0}}
								/>
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
									primary='ITEM MENU 4'
									sx={{opacity: open ? 1 : 0}}
								/>
							</ListItemButton>
						</ListItem>
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
									primary='ITEM MENU 5'
									sx={{opacity: open ? 1 : 0}}
								/>
							</ListItemButton>
						</ListItem>
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
									primary='ITEM MENU 6'
									sx={{opacity: open ? 1 : 0}}
								/>
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>

				{/* CONTENUTO PAGINA */}
				<Box
					component='main'
					sx={{flexGrow: 1, p: 3}}
				>
					<DrawerHeader />
					<Typography paragraph>
						Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random
						text. It has roots in a piece of classical Latin literature from 45 BC, making it over
						2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
						Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
						passage, and going through the cites of the word in classical literature, discovered the
						undoubtable source.
					</Typography>
					<Typography paragraph>
						Why do we use it? It is a long established fact that a reader will be distracted by the
						readable content of a page when looking at its layout. The point of using Lorem Ipsum is
						that it has a more-or-less normal distribution of letters, as opposed to using 'Content
						here, content here', making it look like readable English. Many desktop publishing
						packages and web page editors now use Lorem Ipsum as their default model text, and a
						search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
						versions have evolved over the years, sometimes by accident, sometimes on purpose
						(injected humour and the like).
					</Typography>
					<Typography paragraph>
						Why do we use it? It is a long established fact that a reader will be distracted by the
						readable content of a page when looking at its layout.
					</Typography>

					<StickyFooter />
				</Box>
			</Box>
		</>
	);
}
