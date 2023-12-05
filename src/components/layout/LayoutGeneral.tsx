// Layout.js
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { DrawerDx } from "./drawer/drawerDx/DrawerDx";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { AlertMe } from "./alert/AlertMe";
import { UserDrawerContentDx } from "src/components/layout/drawer/drawerDx/UserDrawerContentDx";
import { CarrelloDrawerContentDx } from "src/components/layout/drawer/drawerDx/CarrelloDrawerContentDx";
import CookieConsent from "src/components/cookie/CookieConsent";
import DrawerSx from "./drawer/drawerSx/DrawerSx";
import { useSelector } from "react-redux";
import { StoreState } from "../CommonTypesInterfaces";
import Head from "next/head";
import eCommerceConf from "eCommerceConf.json";
import MuiAppBar from "@mui/material/AppBar";
import { SettingsProvider } from "./SettingsContext";
import { styled, useTheme } from "@mui/material/styles";
import { ToolBar } from "src/components/layout/header/ToolBar";
type LayoutProps = {
	children?: React.ReactNode;
	title: string;
	description: string;
	ogImage?: undefined;
	url?: undefined;
};

const LayoutGeneral = ({
	children,
	title,
	description,
	ogImage,
	url,
}: LayoutProps) => {
	// website Url
	const pageUrl = "https://tommysgest.com/";
	// quando condividi questa pagina su facebook vedrai questa immagine
	const ogImg = "/public/images/banner-social.png";
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// Nel componente padre
	const contentRef = React.useRef<HTMLDivElement | null>(null);

	const [drawerDxOpen, setDrawerDxOpen] = React.useState(false);
	const [tipoContesto, setTipoContesto] = React.useState("utente"); //carrello
	const [drawerSxOpen, setDrawerSxOpen] = React.useState(false);

	const [cartAlerts, setCartAlerts] = React.useState(1);

	const pLeftDrawerOpen = "88px";
	const pLeftDrawerClose = "24px";
	const user = useSelector((state: StoreState) => state.authUser);

	const mainAnimation = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: {
			duration: 200,
		},
	});

	const AppBar = styled(MuiAppBar)(({ theme }) => ({
		zIndex: theme.zIndex.drawer + 1,
		width: "100%",
	}));
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
			<SettingsProvider>
				<animated.main
					id="content"
					ref={contentRef}
					style={mainAnimation}
				>
					<Box sx={{ display: "flex" }}>
						<>
							<AppBar
								id="header"
								position="fixed"
								sx={{
									backgroundColor: (
										theme?.components?.MuiAppBar?.styleOverrides
											?.colorInherit as {
											backgroundColor?: string;
										}
									)?.backgroundColor,
								}}
							>
								<ToolBar
									drawerDxOpen={null}
									tipoContesto={null}
									setTipoContesto={null}
									setDrawerDxOpen={null}
									alerts={null}
									cartAlerts={null}
									isMobile={isMobile}
									noAuth={true}
								/>
							</AppBar>
						</>

						<Box
							component="main"
							sx={{
								flexGrow: 1,
								pr: 3,
								pt: 3,
								pb: 3,
								marginTop: (theme) =>
									`calc(${
										theme.mixins.toolbar.minHeight
											? (theme.mixins.toolbar.minHeight as number) + 5
											: 0
									}px)`,
								paddingLeft: drawerSxOpen ? pLeftDrawerOpen : pLeftDrawerClose,
							}}
						>
							<AlertMe />
							{/* <div id="content"> {children}</div>
						<Footer /> */}
							<div>
								{children}
								<Footer contentRef={contentRef} />
							</div>
						</Box>
						{/* Componente CookieConsent */}
						<CookieConsent />
					</Box>
				</animated.main>
			</SettingsProvider>
		</>
	);
};

export default LayoutGeneral;
