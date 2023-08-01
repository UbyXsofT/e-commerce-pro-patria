// MyApp.js
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider} from "@emotion/react";
import {lightTheme, darkTheme} from "../src/components/theme/theme";
import createEmotionCache from "../src/components/utils/createEmotionCache";
import {ThemeProvider as CustomThemeProvider} from "../src/components/theme/ThemeContext";
import {ThemeProvider} from "@mui/material/styles";
import LoadingOverlay from "../src/components/utils/LoadingOverlay";
import ThemeColorListener from "../src/components/theme/ThemeColorListener"; // Importa il componente

//REDUX ---
import {wrapper} from "/src/store/store";
import {useSelector} from "react-redux";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
	const [themeMode, setThemeMode] = React.useState("light");
	const isLoading = useSelector((state) => state.loading);

	const [autoMode, setAutoMode] = React.useState("false");

	React.useEffect(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const savedThemeMode = localStorage.getItem("themeMode");
			setAutoMode(localStorage.getItem("autoMode"));
			if (savedThemeMode) {
				setThemeMode(savedThemeMode);
			}
		}
	}, []);

	const toggleThemeMode = (newThemeMode) => {
		//modificabile tramite context
		if (typeof window !== "undefined" && window.localStorage) {
			console.log("APP TOGGLE THEME MODE", themeMode);
			localStorage.setItem("themeMode", newThemeMode);
			setThemeMode(newThemeMode);
			setAutoMode(localStorage.getItem("autoMode"));
		}
	};

	const appTheme = React.useMemo(() => {
		return {
			...(themeMode === "dark" ? darkTheme : lightTheme),
			palette: {
				...(themeMode === "dark" ? darkTheme : lightTheme).palette,
				mode: themeMode,
			},
		};
	}, [themeMode]);

	return (
		<>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={appTheme}>
					<Head>
						<meta
							name='viewport'
							content='initial-scale=1, width=device-width'
						/>
					</Head>
					<CustomThemeProvider toggleThemeMode={toggleThemeMode}>
						{autoMode === "true" ? <ThemeColorListener setThemeMode={setThemeMode} /> : <></>}
						<CssBaseline />
						{isLoading && <LoadingOverlay />}
						<Component {...pageProps} />
					</CustomThemeProvider>
				</ThemeProvider>
			</CacheProvider>
		</>
	);
}
//const wrapper = createWrapper(store);
export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
