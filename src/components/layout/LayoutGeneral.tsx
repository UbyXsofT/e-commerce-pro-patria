// Layout.js
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Box } from "@mui/material";
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
import eCommerceConf from "../../../eCommerceConf.json";

import { SettingsProvider } from "./SettingsContext";

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

	const [drawerDxOpen, setDrawerDxOpen] = React.useState(false);
	const [tipoContesto, setTipoContesto] = React.useState("utente"); //carrello
	const [drawerSxOpen, setDrawerSxOpen] = React.useState(false);
	const pLeftDrawerOpen = "88px";
	const pLeftDrawerClose = "24px";
	const user = useSelector((state: StoreState) => state.authUser);
	const handleDrawerSxOpen = (open: boolean) => {
		if (open) {
			// Chiudi il DrawerDx se DrawerSx viene espanso
			setDrawerDxOpen(false);
			setDrawerSxOpen(true);
		} else {
			setDrawerSxOpen(false);
		}
	};

	const mainAnimation = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: {
			duration: 200,
		},
	});

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
				<animated.main style={mainAnimation}>
					<Box sx={{ display: "flex" }}>
						<Header
							drawerDxOpen={drawerDxOpen}
							tipoContesto={tipoContesto}
							setTipoContesto={setTipoContesto}
							setDrawerDxOpen={setDrawerDxOpen}
							alerts={user ? Number(user?.NEWAVV) + Number(user.NEWCOM) : 0}
							cartAlerts={user ? Number(user.CARRELLO) : 0}
						/>
						<DrawerSx onOpen={handleDrawerSxOpen} />{" "}
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
							<div id="content"> {children}</div>
							<Footer />
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