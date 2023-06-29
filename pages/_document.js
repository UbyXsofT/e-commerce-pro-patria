import * as React from "react";
import PropTypes from "prop-types";
import Document, {Html, Head, Main, NextScript} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import {roboto} from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme} from "../src/theme";

export default function MyDocument(props) {
	const {emotionStyleTags} = props;

	return (
		<Html
			lang='en'
			className={roboto.className}
		>
			<Head>
				{/* PWA primary color */}
				<meta
					name='theme-color'
					content={lightTheme.palette.primary.main}
				/>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				<meta
					name='emotion-insertion-point'
					content=''
				/>
				{emotionStyleTags}
			</Head>
			<body>
				<ThemeProvider theme={lightTheme}>
					<Main />
					<NextScript />
				</ThemeProvider>
			</body>
		</Html>
	);
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// è compatibile con la generazione di siti statici (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Ordine di risoluzione
	//
	// Sul server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// Sul server con errore:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// Sul cliente
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage;

	// Puoi prendere in considerazione la condivisione della stessa cache Emotion tra tutte le richieste SSR per accelerare le prestazioni.
	// Tuttavia, tieni presente che può avere effetti collaterali globali.
	const cache = createEmotionCache();
	const {extractCriticalToChunks} = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) =>
				function EnhanceApp(props) {
					return (
						<App
							emotionCache={cache}
							{...props}
						/>
					);
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	// Questo è importante. Impedisce a Emotion di rendere HTML non valido.
	// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{__html: style.css}}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};

MyDocument.propTypes = {
	emotionStyleTags: PropTypes.array.isRequired,
};
