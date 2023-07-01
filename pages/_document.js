import * as React from "react";
import PropTypes from "prop-types";
import Document, {Html, Head, Main, NextScript} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import {roboto} from "/src/theme/theme";
import createEmotionCache from "/src/components/utils/createEmotionCache";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme} from "/src/theme/theme";

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
				<link
					rel='apple-touch-icon'
					sizes='57x57'
					href='/apple-icon-57x57.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='60x60'
					href='/apple-icon-60x60.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='72x72'
					href='/apple-icon-72x72.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='76x76'
					href='/apple-icon-76x76.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='114x114'
					href='/apple-icon-114x114.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='120x120'
					href='/apple-icon-120x120.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='144x144'
					href='/apple-icon-144x144.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='152x152'
					href='/apple-icon-152x152.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-icon-180x180.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href='/android-icon-192x192.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/favicon-96x96.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<meta
					name='msapplication-TileColor'
					content='#ffffff'
				/>
				<meta
					name='msapplication-TileImage'
					content='/ms-icon-144x144.png'
				/>
				<meta
					name='theme-color'
					content='#ffffff'
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
