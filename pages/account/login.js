import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, AppBar, Toolbar, Paper, Box, Avatar, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//*-----*//
import Layout from "../../src/components/layout/LayoutLogin";
import eCommerceConf from "../../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CookieManager from "../../src/components/cookie/CookieManager";
import Router from "next/router";
import { PartitaIva } from "../../src/components/layout/footer/PartitaIva";
import Copyright from "../../src/components/layout/footer/Copyright";
import { useAlertMe } from "../../src/components/layout/alert/AlertMeContext";
import { AlertMe } from "../../src/components/layout/alert/AlertMe";
import callNodeService from "../api/callNodeService";
import LoadingWrapper from "../../src/components/utils/LoadingWrapper";
import logOutUser from "../../src/components/utils/logOutUser";
//redux
import { setAuthUser } from "../../src/store/actions";
import { useDispatch } from "react-redux";

const Login = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [username, setUsername] = React.useState("Nome");
	const [password, setPassword] = React.useState("password");
	const [ricordami, setRicordami] = React.useState(false);
	const [paddingTop, setPaddingTop] = React.useState(0);
	const [visLoader, setVisLoader] = React.useState(false);

	const dispatch = useDispatch(); // Ottieni il dispatcher dal Redux store

	React.useEffect(() => {
		try {
			logOutUser(dispatch);
		} catch (error) {
			console.log("logoutSuccess error: ", error);
		}

		const calculatePaddingTop = () => {
			const windowHeight = window.innerHeight;
			const mainHeight = document.getElementById("main").offsetHeight;
			const calculatedPaddingTop = (windowHeight - mainHeight) / 2;
			setPaddingTop(calculatedPaddingTop);
		};
		calculatePaddingTop();
		window.addEventListener("resize", calculatePaddingTop);
		return () => {
			window.removeEventListener("resize", calculatePaddingTop);
		};
	}, []);

	const [captchaValue, setCaptchaValue] = React.useState(null);
	const { showAlert } = useAlertMe();

	const handleUsernameChange = (event) => {
		console.log("handleUsernameChange: ", event.target.value);
		setUsername(event.target.value);
	};
	const handlePasswordChange = (event) => {
		console.log("handlePasswordChange: ", event.target.value);
		setPassword(event.target.value);
	};
	const handleRicordamiChange = (event) => {
		console.log("handleRicordamiChange: ", event.target.checked);
		setRicordami(event.target.checked);
	};

	const handleLogin = async () => {
		// Controlla se il captchaValue è valido prima di procedere con il login
		if (!captchaValue) {
			console.log("Si prega di completare il reCAPTCHA.");
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>Si prega di completare il reCAPTCHA.</strong>
					</h3>
				</React.Fragment>
			);
			await showAlert(null, "error", "ATTENZIONE!", textAlert, true);
			return;
		}

		const fetchData = async () => {
			setVisLoader(true);
			const obyPostData = {
				clienteKey: eCommerceConf.ClienteKey,
				userName: username,
				password: password,
				ricordami: ricordami,
				accessToken: null,
				refreshToken: null,
			};

			try {
				const respCall = await callNodeService("login", obyPostData, null);
				console.log("respCall: ", respCall);
				const msg_Resp = respCall.messageCli.message;
				if (respCall.successCli) {
					if (msg_Resp && msg_Resp.respWCF && msg_Resp.accessToken) {
						//****** TOKENS
						// Salva il accessToken di accesso come cookie o nello stato dell'applicazione
						CookieManager.setCookie("accessToken", msg_Resp.accessToken);
						if (msg_Resp.refreshToken) {
							// Salva il refreshToken di accesso come cookie o nello stato dell'applicazione
							CookieManager.setCookie("refreshToken", msg_Resp.refreshToken); //la scadenza del token viene impostata lato server, la validità è gestita sempre lato server
						} else {
							//rimuovo l'eventuale refreshToken
							CookieManager.removeCookie("refreshToken");
						}
						//****** UTENTE
						// Aggiorna lo stato dell'OGGETTO utente
						try {
							console.log("Aggiorna Redux AuthUser:", msg_Resp.respWCF);
							dispatch(setAuthUser(msg_Resp.respWCF));
							setVisLoader(false);
							Router.push("/auth/home");
						} catch (error) {
							console.log("Aggiorna Redux AuthUser:", error);
						}
					} else {
						console.log("msg_Resp: ", msg_Resp);
						// Gestisci l'errore di autenticazione o l'errore di connessione
						const textAlert = (
							<React.Fragment>
								<h3>
									<strong>Errore nel recupero dei dati, dati incompleti!</strong>
								</h3>
							</React.Fragment>
						);
						setVisLoader(false);
						await showAlert(null, "error", "ATTENZIONE!", textAlert, true);
					}
				} else {
					// Gestisci l'errore di autenticazione o l'errore di connessione
					const textAlert = (
						<React.Fragment>
							<h3>
								<strong>{respCall.messageCli}</strong>
							</h3>
						</React.Fragment>
					);
					setVisLoader(false);
					await showAlert(null, "error", "ATTENZIONE!", textAlert, true);
				}
			} catch (error) {
				setVisLoader(false);
				console.error("Errore nella chiamata:", error);
			}
		};

		fetchData();
	};
	const StyledImageLogo = styled(Image)({
		padding: "5px",
		maxWidth: 190,
		maxHeight: 60,
		marginLeft: -30,
	});

	const overlayStyle = {
		backgroundColor: "rgba(255, 255, 255, 0.5)", // Imposta il colore grigio e l'opacità desiderati
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};

	const handleSubmit = () => {};

	return (
		<ThemeProvider theme={theme}>
			<LoadingWrapper visualizzaLoading={visLoader}>
				<Layout
					//digitare il titolo della pagina e la descrizione della pagina.
					title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
					description='This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl.'
				>
					<AlertMe />
					<AppBar
						position='static'
						sx={{
							display: isMobile ? "block" : "none",
							backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
						}}
					>
						<Container sx={{ display: "flex", alignItems: "center" }}>
							<Toolbar>
								<StyledImageLogo
									// src='/images/LogoO.png'
									// alt='Logo'
									// width={200}
									// height={70}
									// priority={true}
									// style={{padding: "10px", maxWidth: 300}}
									src='/images/LogoO.png'
									alt='Logo'
									width={190}
									height={70}
									priority={true}
									sx={{ cursor: "pointer" }}
								/>
							</Toolbar>
						</Container>
					</AppBar>

					<Box
						id='main'
						sx={{ paddingTop: `${paddingTop}px` }}
					>
						<Grid
							container
							component='main'
							sx={{ py: 2, px: 2 }}
						>
							{/* TODO There has to be a better way to implement this */}

							<Grid
								container
								justifyContent='center'
								alignItems='center'
								item
								xs={false}
								sm={4}
								md={7}
								component={Paper}
								elevation={6}
								square
								sx={{
									backgroundImage: "url(/images/wallpaper.jpg)",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundPosition: "center",
									position: "relative",
								}}
							>
								<div style={{ width: "50%", height: "50%", position: "relative", zIndex: 1 }}>
									<Image
										src='/images/LogoQ.png'
										alt='Logo'
										fill={true}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										style={{ objectFit: "contain" }}
									/>
								</div>
								<Box sx={overlayStyle} />
							</Grid>

							<Grid
								item
								xs={12}
								sm={8}
								md={5}
								component={Paper}
								elevation={6}
								square
							>
								<Box
									sx={{
										my: 8,
										mx: 4,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
										<LockOutlinedIcon />
									</Avatar>
									<Typography
										component='h1'
										variant='h5'
									>
										Accedi
									</Typography>
									<Box
										component='form'
										noValidate
										onSubmit={handleSubmit}
										sx={{ mt: 1 }}
									>
										<TextField
											margin='normal'
											required
											fullWidth
											id='username'
											label='Nome Utente'
											name='username'
											autoComplete='username'
											InputProps={{
												style: {
													backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
													color: "#ffffff",
												},
											}}
											value={username}
											onChange={handleUsernameChange}
										/>
										<TextField
											margin='normal'
											required
											fullWidth
											name='password'
											label='Password'
											type='password'
											id='password'
											autoComplete='current-password'
											value={password}
											onChange={handlePasswordChange}
										/>
										<FormControlLabel
											control={
												<Checkbox
													value={ricordami}
													onChange={handleRicordamiChange}
													color='primary'
												/>
											}
											label='Ricordati di me'
										/>

										{/* Add the reCAPTCHA component */}
										<ReCAPTCHA
											sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY}
											onChange={(value) => setCaptchaValue(value)}
										/>

										<Button
											//   type="submit"
											fullWidth
											variant='contained'
											sx={{ mt: 3, mb: 2 }}
											onClick={handleLogin}
										>
											Accedi
										</Button>
										<Grid container>
											<Grid
												item
												xs
											>
												<Link
													href=''
													variant='body2'
													sx={{ cursor: "pointer", color: (theme) => (theme.palette.mode === "light" ? "black" : "white") }}
												>
													Password dimenticata?
												</Link>
											</Grid>
											<Grid item>
												<Link
													onClick={() => Router.push("/account/register")}
													variant='body2'
													sx={{ cursor: "pointer", color: (theme) => (theme.palette.mode === "light" ? "black" : "white") }}
												>
													Non hai un account? Iscriviti
												</Link>
											</Grid>
										</Grid>
										{/* <Copyright sx={{ mt: 5 }} /> */}
									</Box>
								</Box>
							</Grid>

							<Box style={{ width: "100%", marginTop: 30 }}>
								<Box
									sx={{
										backgroundColor: (theme) => theme.palette.primary.main,
										borderRadius: 1,
										p: 2,
										m: 2,
									}}
								>
									<Typography
										variant='body2'
										align='center'
										sx={{ color: "white" }}
									>
										<PartitaIva />
									</Typography>

									<Typography
										variant='body2'
										align='center'
										sx={{ color: "white" }}
									>
										<Copyright />
									</Typography>
								</Box>
							</Box>
							{/* <CookieConsent /> */}
						</Grid>
					</Box>
				</Layout>
			</LoadingWrapper>
		</ThemeProvider>
	);
};

export default Login;
