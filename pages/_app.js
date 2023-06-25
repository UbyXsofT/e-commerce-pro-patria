import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider} from "@emotion/react";
import {lightTheme, darkTheme} from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import {ThemeProvider as CustomThemeProvider} from "../src/ThemeContext";
import {ThemeProvider} from "@mui/material/styles";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
	const [themeMode, setThemeMode] = React.useState("light");

	const toggleThemeMode = () => {
		const newThemeMode = themeMode === "light" ? "dark" : "light";
		setThemeMode(newThemeMode);
	};

	React.useEffect(() => {
		localStorage.setItem("themeMode", themeMode);
	}, [themeMode]);

	React.useEffect(() => {
		const savedThemeMode = localStorage.getItem("themeMode");
		if (savedThemeMode) {
			setThemeMode(savedThemeMode);
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

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={appTheme}>
				<Head>
					<meta
						name='viewport'
						content='initial-scale=1, width=device-width'
					/>
				</Head>
				<CustomThemeProvider toggleThemeMode={toggleThemeMode}>
					<CssBaseline />
					<Component {...pageProps} />
				</CustomThemeProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
