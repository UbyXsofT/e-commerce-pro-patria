//import "styles/globals.scss"; // TODO DA VERIFICARE COME CARICARLO
import React, { use, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../src/components/theme/theme";
import createEmotionCache from "../src/components/utils/createEmotionCache";
import { ThemeProvider as CustomThemeProvider } from "../src/components/theme/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

import LoadingOverlay from "../src/components/utils/LoadingOverlay";
import ThemeColorListener from "../src/components/theme/ThemeColorListener";
import { AlertMeProvider } from "../src/components/layout/alert/AlertMeContext";

import { wrapper } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import BlockPage from "./blockPage";
import {
	StoreState,
	obyPostProdotti,
	responseCall,
} from "src/components/CommonTypesInterfaces";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import AuthUserHelper from "src/store/AuthUserHelper";
import { SettingsProvider } from "src/components/layout/SettingsContext";
import { NetworkStatusProvider } from "src/components/utils/network/NetworkStatusProvider";

import eCommerceConf from "eCommerceConf.json";
import { setCentri } from "src/store/actions";
import { Centro } from "./auth/store";
import callNodeService from "./api/callNodeService";

// pages/_app.tsx
const clientSideEmotionCache = createEmotionCache();

export const fetchCentri = async (): Promise<{
	centri: Centro[];
	error: null | unknown;
}> => {
	const obyPostProdotti: obyPostProdotti = {
		clienteKey: eCommerceConf.ClienteKey,
		IDCliente: "CLABKM5",
		IDCentro: 0,
	};

	try {
		const respCall: responseCall = await callNodeService(
			"prodotti",
			obyPostProdotti,
			null
		);

		const centri: Centro[] = [
			{
				id: 0,
				name: "Principale",
				subscriptions: respCall.messageCli.message.prodotti,
				principale: true,
			},
			{
				id: 1,
				name: "Secondario",
				subscriptions: respCall.messageCli.message.prodotti.slice(0, 2),
			},
			{
				id: 2,
				name: "Terzo",
				subscriptions: respCall.messageCli.message.prodotti.slice(1, 3),
			},
		];

		return { centri, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { centri: [], error: error };
	}
};

const MyApp = (props: {
	Component: React.ComponentType<any>;
	emotionCache?: any;
	pageProps: any;
}) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const router = useRouter();
	const authEcommerce = useSelector((state: StoreState) => state.authEcommerce);
	const authUser = useSelector((state: StoreState) => state.authUser);
	const centri = useSelector((state: StoreState) => state.centri);
	const dispatch = useDispatch();

	const requiresAuth = router.pathname.startsWith("/auth");

	const [themeMode, setThemeMode] = React.useState("light");
	const isLoading = useSelector((state: StoreState) => state.loading);
	const [autoMode, setAutoMode] = React.useState("true");

	useEffect(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const savedThemeMode = localStorage.getItem("themeMode");
			const savedAutoMode = localStorage.getItem("autoMode");

			if (savedAutoMode === "true") {
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				mediaQuery.matches ? setThemeMode("dark") : setThemeMode("light");
			} else if (savedThemeMode) {
				setThemeMode(savedThemeMode);
			}

			savedAutoMode ? setAutoMode(savedAutoMode) : {};
		}
	}, []);

	// const toggleThemeMode = (newThemeMode) => {
	//   if (typeof window !== "undefined" && window.localStorage) {
	//     localStorage.setItem("themeMode", newThemeMode);
	//     setThemeMode(newThemeMode);
	//     setAutoMode(localStorage.getItem("autoMode"));
	//   }
	// };

	const appTheme = React.useMemo(() => {
		return {
			...(themeMode === "dark" ? darkTheme : lightTheme),
			palette: {
				...(themeMode === "dark" ? darkTheme : lightTheme).palette,
				mode: themeMode,
			},
		};
	}, [themeMode]);

	useEffect(() => {
		const checkAuthentication = async () => {
			if (requiresAuth) {
				let newAuthEcommerce = authEcommerce;
				let newAuthUser = authUser;

				!newAuthEcommerce
					? (newAuthEcommerce = (await AuthEcommerceHelper(dispatch)).result)
					: {};
				!newAuthUser
					? (newAuthUser = (await AuthUserHelper(dispatch, newAuthEcommerce))
							.response)
					: {};

				if (!newAuthEcommerce || !newAuthUser) {
					router.push(
						`/blockPage?titolo=ACCESSO NON AUTORIZZATO&descrizione=Sembra che tu non abbia l'autorizzazione necessaria per accedere a questa area. Al momento, non hai i privilegi per visualizzare o navigare attraverso queste pagine. Per favore, effettua nuovamente l'accesso per recuperare i tuoi diritti di accesso. &desc_azione=Clicca qui per effettuare il login e accedere.
    
            Ti ringraziamo per la comprensione e la collaborazione.&redirectTo=/`
					);
				}

				if (centri.centri.length === 0) {
					dispatch(setCentri(await fetchCentri()));
				}
			}
		};

		checkAuthentication();
	}, [requiresAuth]);

	return (
		<>
			<NetworkStatusProvider>
				<CacheProvider value={emotionCache}>
					<ThemeProvider theme={appTheme}>
						<SettingsProvider>
							<AlertMeProvider>
								<Head>
									<meta
										name="viewport"
										content="initial-scale=1, width=device-width"
									/>
								</Head>
								<CustomThemeProvider
									themeMode={themeMode}
									setThemeMode={setThemeMode}
									autoMode={autoMode}
									setAutoMode={setAutoMode}
								>
									{autoMode === "true" ? (
										<ThemeColorListener setThemeMode={setThemeMode} />
									) : (
										<></>
									)}
									<CssBaseline />
									{isLoading ? <LoadingOverlay /> : <></>}
									<Component {...pageProps} />
								</CustomThemeProvider>
							</AlertMeProvider>
						</SettingsProvider>
					</ThemeProvider>
				</CacheProvider>
			</NetworkStatusProvider>
		</>
	);
};

export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
