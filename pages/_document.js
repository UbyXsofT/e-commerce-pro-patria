import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* produzione	 */}
				{/* <script src="https://unpkg.com/@mui/material@5.0.0-alpha.31/umd/material-ui.production.min.js"></script> */}
				{/* dev */}
				<script src='https://unpkg.com/@mui/material@5.0.0-alpha.31/umd/material-ui.production.min.js'></script>

				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
