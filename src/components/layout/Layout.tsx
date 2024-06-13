// Layout.js
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useRef,
} from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Button,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useSpring, animated } from "@react-spring/web";
import { DrawerDx } from "./drawer/drawerDx/DrawerDx";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { AlertMe } from "./alert/AlertMe";
import { UserDrawerContentDx } from "src/components/layout/drawer/drawerDx/UserDrawerContentDx";
import { CarrelloDrawerContentDx } from "src/components/layout/drawer/drawerDx/CarrelloDrawerContentDx";
import CookieConsent from "src/components/cookie/CookieConsent";
import DrawerSx from "./drawer/drawerSx/DrawerSx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../CommonTypesInterfaces";
import Head from "next/head";
import eCommerceConf from "eCommerceConf.json";
import { navigationPoints } from "./header/ToolBar";
import { useRouter } from "next/router";

type LayoutProps = {
	children?: React.ReactNode;
	title: string;
	description: string;
	ogImage?: undefined;
	url?: undefined;
};

const Layout = ({
	children,
	title,
	description,
	ogImage,
	url,
}: LayoutProps) => {
	const [cartAlertsNum, setCartAlertsNum] = React.useState(0);
	const dispatch = useDispatch();
	const cartLength = useSelector(
		(state: StoreState) => state.cart[0]?.cart.length ?? 0
	);
	React.useEffect(() => {
		setCartAlertsNum(cartLength);
	}, [dispatch, cartLength]);

	const [drawerDxOpen, setDrawerDxOpen] = React.useState(false);
	const [tipoContesto, setTipoContesto] = React.useState("utente"); //carrello
	const user = useSelector((state: StoreState) => state.authUser);

	const [bottomNavSelected, setBottomNavSelected] = React.useState<
		undefined | number
	>(undefined);

	const mainAnimation = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: {
			duration: 200,
		},
	});

	const router = useRouter();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// Nel componente padre
	const contentRef = React.useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		navigationPoints.forEach((button, idx) => {
			if (router.pathname === button.link) {
				setBottomNavSelected(idx);
			}
		});
	}, []);

	return (
		<>
			<Head>
				<title>
					{title
						? title
						: "E-commerce per il tuo centro fitness in React Next MUI"}
				</title>
				<meta
					name="description"
					key="description"
					content={
						description
							? description
							: "E-commerce per il tuo centro fitness in React Next MUI"
					}
				/>
				<meta
					property="og:title"
					content={
						title
							? title
							: "E-commerce per il tuo centro fitness in React Next MUI"
					}
					key="og:title"
				/>
				<meta
					property="og:url"
					content={eCommerceConf.LinkHomeCenter}
					key="og:url"
				/>
				<meta
					property="og:image"
					content="/images/banner-social.png"
					key="og:image"
				/>
				<meta
					property="og:description"
					content={
						description
							? description
							: "E-commerce per il tuo centro fitness in React Next MUI."
					}
					key="og:description"
				/>
			</Head>

			<animated.main
				id="content"
				ref={contentRef}
				style={mainAnimation}
			>
				<Box sx={{ display: "flex" }}>
					<Header
						drawerDxOpen={drawerDxOpen}
						tipoContesto={tipoContesto}
						setTipoContesto={setTipoContesto}
						setDrawerDxOpen={setDrawerDxOpen}
						alerts={user ? Number(user?.NEWAVV) + Number(user.NEWCOM) : 0}
						cartAlerts={user ? Number(user.CARRELLO) : 0}
						isMobile={isMobile}
					/>
					{/* Passa la funzione al componente DrawerSx */}
					<DrawerDx
						drawerDxOpen={drawerDxOpen}
						setDrawerDxOpen={setDrawerDxOpen}
						tipoContesto={tipoContesto}
					>
						{tipoContesto === "utente" ? (
							<UserDrawerContentDx username={user ? user?.NOMINATIVO : ""} />
						) : (
							<CarrelloDrawerContentDx />
						)}
					</DrawerDx>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 3,
							marginTop: (theme) =>
								`calc(${
									theme.mixins.toolbar.minHeight
										? (theme.mixins.toolbar.minHeight as number) + 5
										: 0
								}px)`,
						}}
					>
						<AlertMe />

						{/* <div id="content"> {children}</div>
						<Footer /> */}
						<div>
							{children}
							<Footer contentRef={contentRef} />
						</div>

						{isMobile ? (
							<BottomNavigation
								style={{
									width: "100%",
									position: "fixed",
									bottom: 0,
									marginLeft: -24,
									backgroundColor: theme.palette.primary.main,
								}}
								showLabels
								value={bottomNavSelected}
							>
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
											disabled={
												button.name.toString().includes("Acquista")
													? cartAlertsNum !== 0
														? true
														: false
													: false
											}
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

										// <BottomNavigationAction
										// 	label={button.name}
										// 	key={idx}
										// 	onClick={() => {
										// 		if (router.pathname !== button.link) {
										// 			setBottomNavSelected(idx);
										// 			router.push(button.link);
										// 		}
										// 	}}
										// 	disabled={
										// 		button.name.toString().includes("Acquista")
										// 			? cartAlertsNum !== 0
										// 				? true
										// 				: false
										// 			: false
										// 	}
										// 	sx={{
										// 		height: "fit-content",
										// 		Maxwidth: "fit-content",
										// 		width: "120px",
										// 		alignSelf: "center",
										// 		backgroundColor:
										// 			button.name &&
										// 			router.pathname
										// 				.toLowerCase()
										// 				.includes(button.name.toLowerCase())
										// 				? theme.palette.success.main
										// 				: theme.palette.primary.main,
										// 	}}
										// />
									))}
								</Box>
							</BottomNavigation>
						) : (
							<></>
						)}
					</Box>
					{/* Componente CookieConsent */}
					<CookieConsent />
				</Box>
			</animated.main>
		</>
	);
};

export default Layout;
