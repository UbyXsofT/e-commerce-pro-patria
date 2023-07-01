// MyApp.js
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider} from "@emotion/react";
import {lightTheme, darkTheme} from "../src/theme/theme";
import createEmotionCache from "../src/components/createEmotionCache";
import {ThemeProvider as CustomThemeProvider} from "../src/theme/ThemeContext";
import {ThemeProvider} from "@mui/material/styles";
import LoadingOverlay from "../src/components/LoadingOverlay";

//REDUX ---
import {wrapper} from "../src/store/store";
import {useSelector} from "react-redux";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
	const [themeMode, setThemeMode] = React.useState("light");
	const isLoading = useSelector((state) => state.loading);

	// React.useEffect(() => {
	// 	console.log("isLoading ha cambiato stato: ", isLoading);
	// }, [isLoading]);

	React.useEffect(() => {
		const savedThemeMode = localStorage.getItem("themeMode");
		if (savedThemeMode) {
			setThemeMode(savedThemeMode);
		}
	}, []);
	const toggleThemeMode = () => {
		const newThemeMode = themeMode === "light" ? "dark" : "light";
		setThemeMode(newThemeMode);
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
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={appTheme}>
				{/* {console.log("appTheme: ", appTheme)} */}
				<Head>
					<meta
						name='viewport'
						content='initial-scale=1, width=device-width'
					/>
				</Head>
				<CustomThemeProvider toggleThemeMode={toggleThemeMode}>
					<CssBaseline />

					{isLoading && <LoadingOverlay />}
					<Component {...pageProps} />
				</CustomThemeProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
//const wrapper = createWrapper(store);
export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
