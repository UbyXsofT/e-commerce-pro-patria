// Index.js
import * as React from "react";
import Router from "next/router";
import { useSpring, animated, easings } from "@react-spring/web";
import { useTheme, styled } from "@mui/material/styles";
import Image from "next/image";
import { Lato, Poppins } from "next/font/google";
import eCommerceConf from "../eCommerceConf.json";
//redux
import { useDispatch } from "react-redux";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import AuthUserHelper from "src/store/AuthUserHelper";

export const lato = Lato({
	weight: ["300", "400"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const poppins = Poppins({
	weight: ["300", "400", "800"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

const networkError = `/blockPage?titolo=CONVALIDA ECOMMERCE&descrizione=${eCommerceConf.MsgErrConvEcommerce}&desc_azione=${eCommerceConf.MsgChkAgainConvEcommerce}&redirectTo=/`;

const Index = () => {
	const theme = useTheme();
	// console.log("theme: ", theme);
	const dispatch = useDispatch(); // Ottieni il dispatcher dal Redux store
	const [isAuthEcommerce, setIsAuthEcommerce] = React.useState(false);
	const [routerToPush, setRouterToPush] = React.useState<null | string>(null);

	const startRedirect = () => {
		if (isAuthEcommerce === true && routerToPush) {
			Router.push(routerToPush);
		} else if (routerToPush === networkError) {
			Router.push(networkError);
		}
	};

	React.useEffect(() => {
		const updateEcommerceAuth = async () => {
			const authEcommerce = (await AuthEcommerceHelper(dispatch)).result;
			setIsAuthEcommerce(authEcommerce);
			const route = (await AuthUserHelper(dispatch, authEcommerce)).route;
			route ? setRouterToPush(route) : {};
		};
		updateEcommerceAuth();
	}, [dispatch]);

	const Container = styled("div")({
		width: "100%",
		height: "100vh",
		background: theme.palette.background.default,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	});

	const Box = styled("div")({
		width: 250,
		height: 250,
		position: "relative",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	});

	const Title = styled("div")({
		width: "100%",
		position: "relative",
		display: "flex",
		alignItems: "center",
		height: 50,
		justifyContent: "center",
	});

	const Block = styled(animated.div)({
		//blocco colore prima riga
		width: 0,
		height: 20,
		background: theme.palette.secondary.main,
		position: "absolute",
		display: "flex",
		justifyContent: "center",
	});

	const H1 = styled(animated.h1)({
		//blocco colore Testo prima riga
		fontFamily: poppins.style.fontFamily,
		color: theme.palette.text.primary,
		fontSize: 32,
		display: "flex",
		alignItems: "baseline",
		position: "relative",
		justifyContent: "center",
	});

	const Span = styled(animated.span)({
		width: 0,
		height: 0,
		borderRadius: "50%",

		marginLeft: 5,
		marginTop: -10,
		position: "absolute",
		bottom: 13,
		right: -12,
	});

	const Role = styled("div")({
		width: "100%",
		position: "relative",
		display: "flex",
		alignItems: "center",
		height: 30,
		marginTop: -10,
		justifyContent: "center",
	});

	const SecBlock = styled(animated.div)({
		//blocco colore seconda riga
		width: 0,
		height: 20,
		background: theme.palette.primary.main,
		position: "absolute",
		display: "flex",
		justifyContent: "center",
	});

	const P = styled(animated.p)({
		//blocco testo colore seconda riga
		fontWeight: "400",
		fontFamily: lato.style.fontFamily,
		color: theme.palette.text.primary,
		fontSize: 12,
		textTransform: "uppercase",
		letterSpacing: 5,
	});

	const mainBlockAnimation = useSpring({
		from: { width: "0%", left: "0" },
		to: async (next) => {
			await next({ width: "100%", left: "0" });
			await next({ width: "0", left: "100%" });
		},
		config: {
			duration: 1000,
			easing: easings.easeInBack,
		},
	});

	const secBlockAnimation = useSpring({
		from: { width: "0%", left: "0" },
		to: async (next) => {
			await next({ width: "100%", left: "0" });
			await next({ width: "0", left: "100%" });
		},
		config: {
			duration: 1000,
			easing: easings.easeInBack,
		},
		delay: 2000,
	});

	const mainFadeInAnimation = useSpring({
		opacity: 0,
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 1000,
		},
		delay: 2000,
	});

	const popInAnimation = useSpring({
		from: {
			width: 0,
			height: 0,
			background: theme.palette.secondary.main,
			border: "0px solid #ddd",
			opacity: 0,
			bottom: 0,
		},
		to: async (next) => {
			await next({
				width: 10,
				height: 10,
				background: theme.palette.secondary.main,
				opacity: 1,
				bottom: 45,
			});
			await next({ width: 7, height: 7, bottom: 0 });
			await next({ width: 10, height: 10, bottom: 20 });
			await next({
				width: 7,
				height: 7,
				background: theme.palette.secondary.main,
				border: "0px solid #222",
				bottom: 13,
			});
		},
		config: {
			duration: 300,
		},
		delay: 2000,
	});

	const secFadeInAnimation = useSpring({
		opacity: 0,
		from: { opacity: 0 },
		to: { opacity: 0.5 },
		config: {
			duration: 1000,
		},
		delay: 2800,
	});

	const allxEndBoxAnimation = useSpring({
		opacity: 1,
		from: { opacity: 1 },
		to: { opacity: 0 },
		config: {
			duration: 1000,
			easing: easings.easeInBack,
		},
		delay: 4000,
		onRest: () => {
			startRedirect();
		},
	});

	return (
		<animated.div
			style={{
				width: "100%",
				height: "100vh",
				background: "#232323",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				...allxEndBoxAnimation,
			}}
		>
			<Container>
				<Box
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						margin: "auto",
						marginTop: "90px", // Imposta un valore negativo per alzare il contenuto più in alto
					}}
				>
					<Image
						src="/images/LogoQ.png"
						alt="Logo"
						fill={true}
						sizes="max-width: 300px"
						style={{ objectFit: "contain" }}
						priority={true}
					/>

					<Box
						style={{
							position: "absolute",
							top: "70%", // Imposta il top al 100% per posizionare il testo sotto l'immagine
							left: "50%",
							transform: "translate(-50%, 20px)", // Regola il valore del traslato in base all'altezza desiderata tra l'immagine e il testo
							textAlign: "center",
						}}
					>
						{/* Inserisci qui i tuoi componenti animati di testo */}
						<Title>
							<Block style={mainBlockAnimation} />
							<H1 style={mainFadeInAnimation}>
								Loading
								<Span style={popInAnimation} />
							</H1>
						</Title>
						<Role>
							<SecBlock style={secBlockAnimation} />
							<P style={secFadeInAnimation}>Powered by Tommys</P>
						</Role>
					</Box>
				</Box>
			</Container>
		</animated.div>
	);
};

export default Index;
