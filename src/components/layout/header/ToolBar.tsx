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
	Avatar,
} from "@mui/material";
import Image from "next/image";
import { IconButton } from "@mui/material";
import myIcons from "src/theme/IconsDefine";
import Router, { useRouter } from "next/router";
import CustomPopper from "src/components/utils/CustomPopper";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/components/CommonTypesInterfaces";
import AvatarName from "src/components/account/AvatarName";

const menuId = "up-account-menu";
const StyledImageLogo = styled(Image)({
	padding: "5px",
	// maxWidth: 190,
	// maxHeight: 60,
	// marginLeft: -30,
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

const stepParams = {
	stepPageId: 0,
	titlePage: "step",
	// altri parametri...
};
//const encodedParams = encodeURIComponent(JSON.stringify(stepParams));
//const encodedParams = encodeURIComponent(JSON.stringify(stepParams));

export const navigationPoints: NavigationPoint[] = [
	{ name: "Home", link: "/auth/home" },
	{ name: "Acquista", link: `/auth/acquista/prodotti` },
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

	const [cartAlertsNum, setCartAlertsNum] = React.useState(0);
	const dispatch = useDispatch();

	// const cartLength = useSelector(
	// 	(state: StoreState) => state.cart[0]?.cart.length ?? 0
	// );

	//uby cambio il recupero degli oggetti del carrello non più dal settagio redux cart,
	//ma dal carrello passato da tommys
	const cartLength = useSelector(
		(state: StoreState) => Number(state.authUser?.CARRELLO) ?? 0
	);
	React.useEffect(() => {
		setCartAlertsNum(cartLength);
	}, [dispatch, cartLength]);

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

	const handleButtonClickDrawer = (target: string) => {
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
						minHeight: "60px",
					}}
				>
					<StyledImageLogo
						src="/images/LogoO.png"
						alt="Logo"
						width={190}
						height={60}
						priority={true}
						sx={{ cursor: "pointer" }}
						onClick={() => {
							Router.push("/auth/home");
						}}
					/>

					{!noAuth ? (
						isMobile ? (
							<div
								style={{
									minHeight: "60px",
								}}
							></div>
						) : (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									minHeight: "60px",
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
										// disabled={
										// 	button.name.toString().includes("Acquista")
										// 		? cartAlertsNum !== 0
										// 			? true
										// 			: false
										// 		: false
										// }
										variant={"contained"}
										color={
											button.name &&
											router.pathname
												.toLowerCase()
												.includes(button.name.toLowerCase())
												? "success"
												: "primary"
										}
										onClick={() => {
											router.pathname === button.link
												? {}
												: router.push(button.link);
										}}
										key={idx}
									>
										{button.name}
									</Button>
								))}
							</Box>
						)
					) : (
						<div
							style={{
								minHeight: "60px",
							}}
						></div>
					)}

					<Box
						sx={
							tipoContesto !== null
								? { display: "flex", justifySelf: "end" }
								: { display: "none" }
						}
					>
						{/* NOTIFICHE --->						
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
						/> */}

						{/* <IconButton
							size="large"
							aria-label={
								cartAlertsNum !== 0
									? `${cartAlertsNum} elementi nel Carrello`
									: "Il Carrello è Vuoto"
							}
							color="inherit"
							//onClick={() => handleButtonClick("carrello")} // Chiamata corretta alla funzione
							onClick={() => Router.push("/auth/acquista/carrello")}
							onMouseEnter={(e) => handlePopperOpen(e, setCartPopper)}
							onMouseLeave={() => {
								handlePopperClose(setCartPopper);
							}}
						>
							<Badge
								badgeContent={cartAlertsNum}
								color="error"
							>
								<IconButton sx={{ color: "#dfdfdf" }}>
									{myIcons.ShoppingCartIcon}
								</IconButton>
							</Badge>
						</IconButton> */}

						<div
							style={{ marginTop: "15px" }}
							aria-label={
								cartAlertsNum !== 0
									? `${cartAlertsNum} elementi nel Carrello`
									: "Il Carrello è Vuoto"
							}
							color="inherit"
							onClick={() => Router.push("/auth/acquista/carrello")}
							onMouseEnter={(e) => handlePopperOpen(e, setCartPopper)}
							onMouseLeave={() => {
								handlePopperClose(setCartPopper);
							}}
						>
							<Badge
								badgeContent={cartAlertsNum ?? 0}
								color="error"
							>
								<IconButton sx={{ color: "#dfdfdf" }}>
									{myIcons.ShoppingCartIcon}
								</IconButton>
							</Badge>
						</div>

						{/* <Badge
							badgeContent={cartAlertsNum}
							color="error"
						>
							<IconButton
								size="large"
								aria-label={
									cartAlertsNum !== 0
										? `${cartAlertsNum} elementi nel Carrello`
										: "Il Carrello è Vuoto"
								}
								color="inherit"
								onClick={() => Router.push("/auth/acquista/carrello")}
								onMouseEnter={(e) => handlePopperOpen(e, setCartPopper)}
								onMouseLeave={() => {
									handlePopperClose(setCartPopper);
								}}
							>
								{myIcons.ShoppingCartIcon}
							</IconButton>
						</Badge> */}

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
							onClick={() => handleButtonClickDrawer("utente")} // Chiamata corretta alla funzione
							onMouseEnter={(e) => handlePopperOpen(e, setUserPopper)}
							onMouseLeave={() => {
								handlePopperClose(setUserPopper);
							}}
							color="inherit"
						>
							{/* <AccountCircle /> */}

							<AvatarName />
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
