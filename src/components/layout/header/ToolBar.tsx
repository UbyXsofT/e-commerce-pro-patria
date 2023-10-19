//ToolBar.js
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	Badge,
	Box,
	Toolbar,
	Popper,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import Image from "next/image";
import { IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Router, { useRouter } from "next/router";
import CustomPopper from "src/components/utils/CustomPopper";

const menuId = "up-account-menu";
const StyledImageLogo = styled(Image)({
	padding: "5px",
	maxWidth: 190,
	maxHeight: 60,
	marginLeft: -30,
});
//React.Dispatch<React.SetStateAction<string | undefined>>
type ToolBarProps = {
	drawerDxOpen: boolean | null;
	setDrawerDxOpen?: React.Dispatch<React.SetStateAction<boolean>> | null;
	tipoContesto: string | null;
	setTipoContesto?: React.Dispatch<React.SetStateAction<string>> | null;
	alerts: number | null;
	cartAlerts: number | null;
	isMobile: boolean;
	noAuth: boolean;
};
export interface NavigationPoint {
	name: string;
	link: string;
}
export const navigationPoints: NavigationPoint[] = [
	{
		name: "About",
		link: "/auth/about",
	},
	{ name: "Home", link: "/auth/home" },
	{ name: "Abbonamenti", link: "/auth/store" },
	{ name: "Carrello", link: "/auth/carrello" },
];

export const ToolBar = ({
	drawerDxOpen,
	setDrawerDxOpen,
	tipoContesto,
	setTipoContesto,
	alerts,
	cartAlerts,
	isMobile,
	noAuth,
}: ToolBarProps) => {
	const [notificationsPopper, setNotificationsPopper] =
		React.useState<null | HTMLElement>(null);
	const [cartPopper, setCartPopper] = React.useState<null | HTMLElement>(null);
	const [userPopper, setUserPopper] = React.useState<null | HTMLElement>(null);

	const router = useRouter();

	const handlePopperOpen = (
		event: React.BaseSyntheticEvent,
		setPopper: React.Dispatch<React.SetStateAction<null | HTMLElement>>
	) => {
		if (!event.currentTarget) {
			return;
		}

		setPopper(event.currentTarget);
	};

	const handlePopperClose = (
		setPopper: React.Dispatch<React.SetStateAction<null | HTMLElement>>
	) => {
		setPopper(null);
	};

	const openPopper = Boolean(notificationsPopper);
	const openCart = Boolean(cartPopper);
	const openUser = Boolean(userPopper);

	// const handleButtonClick = (target: string) => {
	// 	if (target !== tipoContesto && drawerDxOpen) {
	// 		setTipoContesto(target);
	// 	} else {
	// 		setTipoContesto(target);
	// 		setDrawerDxOpen(!drawerDxOpen);
	// 	}
	// };

	const handleButtonClick = (target: string) => {
		if (setTipoContesto && setDrawerDxOpen) {
			if (target !== tipoContesto && drawerDxOpen) {
				setTipoContesto(target);
			} else {
				setTipoContesto(target);
				setDrawerDxOpen(!drawerDxOpen);
			}
		}
	};

	return (
		<>
			<Toolbar>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						width: "100%",
					}}
				>
					<StyledImageLogo
						src="/images/LogoO.png"
						alt="Logo"
						width={190}
						height={70}
						priority={true}
						sx={{ cursor: "pointer" }}
						onClick={() => {
							Router.push("/auth/home");
						}}
					/>

					{!noAuth ? (
						isMobile ? (
							<div></div>
						) : (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
								gap={1}
							>
								{navigationPoints.map((button, idx) => (
									<Button
										sx={{
											height: "fit-content",
											Maxwidth: "fit-content",
											width: "120px",
											alignSelf: "center",
										}}
										variant={"contained"}
										color={
											router.pathname === button.link ? "success" : "primary"
										}
										onClick={() =>
											router.pathname === button.link
												? {}
												: Router.push(button.link)
										}
										key={idx}
									>
										{button.name}
									</Button>
								))}
							</Box>
						)
					) : (
						<div></div>
					)}

					<Box
						sx={
							tipoContesto !== null
								? { display: "flex", justifySelf: "end" }
								: { display: "none" }
						}
					>
						<IconButton
							size="large"
							aria-label={
								alerts !== 0
									? `Mostra ${alerts} nuovi Messaggi`
									: "Non ci sono Messaggi"
							}
							color="inherit"
							onMouseEnter={(e) => handlePopperOpen(e, setNotificationsPopper)}
							onMouseLeave={() => {
								handlePopperClose(setNotificationsPopper);
							}}
							onClick={() => {
								Router.push("/auth/notifiche");
							}}
						>
							<Badge
								badgeContent={alerts}
								color="error"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<CustomPopper
							isOpen={openPopper}
							anchorEl={notificationsPopper}
							content="Messaggi e Avvisi"
						/>

						<IconButton
							size="large"
							aria-label={
								cartAlerts !== 0
									? `${cartAlerts} elementi nel Carrello`
									: "Il Carrello è Vuoto"
							}
							color="inherit"
							onClick={() => handleButtonClick("carrello")} // Chiamata corretta alla funzione
							onMouseEnter={(e) => handlePopperOpen(e, setCartPopper)}
							onMouseLeave={() => {
								handlePopperClose(setCartPopper);
							}}

							// onMouseEnter={() => {
							//   setTipoContesto("carrello");
							//   handleMouseEnter();
							// }}
							// onMouseLeave={() => {
							//   setTipoContesto("carrello");
							//   handleMouseLeave();
							// }}
						>
							<Badge
								badgeContent={cartAlerts}
								color="error"
							>
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
						<CustomPopper
							isOpen={openCart}
							anchorEl={cartPopper}
							content="Carrello"
						/>

						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={() => handleButtonClick("utente")} // Chiamata corretta alla funzione
							onMouseEnter={(e) => handlePopperOpen(e, setUserPopper)}
							onMouseLeave={() => {
								handlePopperClose(setUserPopper);
							}}
							// onMouseEnter={() => {
							//   setTipoContesto("utente");
							//   handleMouseEnter();
							// }}
							// onMouseLeave={() => {
							//   setTipoContesto("utente");
							//   handleMouseLeave();
							// }}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<CustomPopper
							isOpen={openUser}
							anchorEl={userPopper}
							content="Utente"
						/>
					</Box>
				</div>
			</Toolbar>
			{/* <Box
				style={{
					backgroundColor: "red",
					height: "auto",
					width: "100%",
				}}
			>
				<h6 style={{ textAlign: "center" }}>
					Connessione persa. Controlla la tua connessione.
				</h6>
			</Box> */}
		</>
	);
};
