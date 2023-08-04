//ToolBar.js
import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import {Badge, Box, Toolbar, Typography, Avatar} from "@mui/material";
import Image from "next/image";
import {IconButton} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Router from "next/router";

const menuId = "up-account-menu";
const StyledImageLogo = styled(Image)({
	padding: "5px",
	maxWidth: 190,
	maxHeight: 60,
	marginLeft: -30,
});

export const ToolBar = ({drawerDxOpen, toggleDrawerDx, setTipoContesto, setDrawerDxOpen}) => {
	const theme = useTheme();
	const [drawerLocked, setDrawerLocked] = React.useState(false);

	const handleButtonClick = (target) => {
		setDrawerLocked(!drawerLocked);
		//toggleDrawerDx(!drawerDxOpen); // Inverte il valore di drawerDxOpen
	};

	const handleMouseEnter = () => {
		if (!drawerLocked) {
			setDrawerDxOpen(true);
		}
	};

	const handleMouseLeave = () => {
		if (!drawerLocked) {
			setDrawerDxOpen(false);
		}
	};

	return (
		<>
			<Toolbar>
				<StyledImageLogo
					src='/images/LogoO.png'
					alt='Logo'
					width={190}
					height={70}
					priority={true}
					sx={{cursor: "pointer"}}
					onClick={() => {
						Router.push("/auth/home");
					}}
				/>
				<Box sx={{flexGrow: 1}} />
				{/* <Box sx={{display: {xs: "none", md: "flex"}}}> */}
				<Box sx={{display: "flex"}}>
					<IconButton
						size='large'
						aria-label='show 4 new mails'
						color='inherit'
						onClick={() => {
							Router.push("/auth/notifiche");
						}}
					>
						<Badge
							badgeContent={4}
							color='error'
						>
							<NotificationsIcon />
						</Badge>
					</IconButton>

					<IconButton
						size='large'
						aria-label='show 1 item'
						color='inherit'
						onClick={() => handleButtonClick("carrello")} // Chiamata corretta alla funzione
						onMouseEnter={() => {
							setTipoContesto("carrello");
							handleMouseEnter();
						}}
						onMouseLeave={() => {
							setTipoContesto("carrello");
							handleMouseLeave();
						}}
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
						onClick={() => handleButtonClick("utente")} // Chiamata corretta alla funzione
						onMouseEnter={() => {
							setTipoContesto("utente");
							handleMouseEnter();
						}}
						onMouseLeave={() => {
							setTipoContesto("utente");
							handleMouseLeave();
						}}
						color='inherit'
					>
						<AccountCircle />
					</IconButton>
				</Box>
			</Toolbar>
		</>
	);
};
