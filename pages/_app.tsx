import React, { use, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../src/components/theme/theme";
import createEmotionCache from "../src/components/utils/createEmotionCache";
import { ThemeProvider as CustomThemeProvider } from "../src/components/theme/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";

import LoadingOverlay from "../src/components/utils/LoadingOverlay";
import ThemeColorListener from "../src/components/theme/ThemeColorListener";
import { AlertMeProvider } from "../src/components/layout/alert/AlertMeContext";

import { wrapper } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import BlockPage from "./blockPage";
import { AuthUser, StoreState } from "src/components/CommonTypesInterfaces";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import AuthUserHelper from "src/store/AuthUserHelper";
import { SettingsProvider } from "src/components/layout/SettingsContext";
import { NetworkStatusProvider } from "src/components/utils/network/NetworkStatusProvider";
import ErrorBoundary from "ErrorBoundary";
import callNodeService from "./api/callNodeService";
import CookieManager from "src/components/cookie/CookieManager";
import eCommerceConf from "eCommerceConf.json";
import { setAuthUser } from "src/store/actions";
import {
	updateIsUpdated,
	useUpdateCartTommys,
} from "src/components/listino/utils/functionsCart";
// pages/_app.tsx
const clientSideEmotionCache = createEmotionCache();
const MyApp = (props: {
	Component: React.ComponentType<any>;
	emotionCache?: any;
	pageProps: any;
}) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const router = useRouter();
	const authEcommerce = useSelector((state: StoreState) => state.authEcommerce);
	const authUser = useSelector((state: StoreState) => state.authUser);
	const listinoState = useSelector((state: StoreState) => state.listino);
	const dispatch = useDispatch();
	const cartTommys = useSelector((state: StoreState) => state.cartTommys);

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
			if (eCommerceConf.ModalitaSviluppo === true) {
				console.log(
					"@@@@@@@@@ _APP ---- >> checkAuthentication requiresAuth: ",
					requiresAuth
				);
			}
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
				} else {
					updateIsUpdated("false");
					useUpdateCartTommys(cartTommys, dispatch, authUser, authEcommerce);
					return;
				}
			}
		};

		checkAuthentication();
	}, [requiresAuth, authEcommerce, authUser, listinoState.listino]);

	// interface AuthUserHelperReturn {
	// 	result: boolean;
	// 	route?: string;
	// 	error?: string;
	// 	response: AuthUser | null;
	// }

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			// 	// Esegui le azioni desiderate ogni volta che cambia la pagina
			if (eCommerceConf.ModalitaSviluppo === true) {
				console.log("@@@@@ --- XXXX --- Nuova pagina:", url);
			}
			// if (authEcommerce === true) {
			// 	useUpdateCartTommys(cartTommys, dispatch, authUser, authEcommerce);
			// }
		};

		// Sottoscrivi la funzione handleRouteChange agli eventi di navigazione
		const handleRouteChangeComplete = () => {
			handleRouteChange(router.pathname);
		};

		// Aggiorna lo stato quando il valore di router.pathname cambia
		handleRouteChange(router.pathname);

		// Pulisci l'evento quando il componente viene smontato
		router.events.on("routeChangeComplete", handleRouteChangeComplete);

		// Pulisci l'evento quando il componente viene smontato
		return () => {
			router.events.off("routeChangeComplete", handleRouteChangeComplete);
		};
	}, [router.pathname]); // Aggiorna solo quando il valore di router.pathname cambia

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
									<ErrorBoundary>
										<Component {...pageProps} />
									</ErrorBoundary>
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
