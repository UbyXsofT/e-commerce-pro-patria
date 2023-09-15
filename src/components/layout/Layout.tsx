// Layout.js
import React, {
	CSSProperties,
	Dispatch,
	ReactChild,
	ReactElement,
	ReactNode,
	SetStateAction,
} from "react";
import { Box, Toolbar, Button } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { DrawerDx } from "./drawer/drawerDx/DrawerDx";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { AlertMe } from "./alert/AlertMe";
import { Typography } from "@mui/material";
import { UserDrawerContentDx } from "src/components/layout/drawer/drawerDx/UserDrawerContentDx";
import { CarrelloDrawerContentDx } from "src/components/layout/drawer/drawerDx/CarrelloDrawerContentDx";
import CookieConsent from "src/components/cookie/CookieConsent";
import DrawerSx from "./drawer/drawerSx/DrawerSx";
import { useSelector } from "react-redux";
import { StoreState } from "../CommonTypesInterfaces";

type LayoutProps = {
	children: ReactElement;
	openSettings?: boolean;
	setOpenSettings?: Dispatch<SetStateAction<boolean>>;
};

const Layout = ({ children, openSettings, setOpenSettings }: LayoutProps) => {
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
					{children}
					<Footer />
				</Box>
				{/* Componente CookieConsent */}
				<CookieConsent
					openSettings={openSettings}
					setOpenSettings={setOpenSettings}
				/>
			</Box>
		</animated.main>
	);
};

export default Layout;
