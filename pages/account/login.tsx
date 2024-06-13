import React, { useState } from "react";
//REDUX-STORE
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
//*-----*//
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	AppBar,
	Toolbar,
	Paper,
	Box,
	Avatar,
	Link,
	CssBaseline,
	InputAdornment,
	IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";

import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CookieManager from "src/components/cookie/CookieManager";
// import TemaSwitch from "../../src/components/theme/TemaSwitch";
import Router from "next/router";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";

import callNodeService from "pages/api/callNodeService";
import logOutUser from "src/components/utils/logOutUser";
//redux
import { setAuthUser } from "src/store/actions";

import { TodayOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordInput from "src/components/utils/PasswordInput";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import {
	responseCall,
	tokenlessAccess,
} from "src/components/CommonTypesInterfaces";
import LayoutGeneral from "src/components/layout/LayoutGeneral";
import ReCAPTCHA from "react-google-recaptcha";
import SetStripeKeysHelper from "src/store/SetStripeKeysHelper";

const Login = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [ricordami, setRicordami] = React.useState(false);
	const [paddingTop, setPaddingTop] = React.useState(0);
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

	const CustomTextField = styled(TextField)(({ theme }) => ({
		"& .MuiInputBase-input": {
			padding: "8px", // Modifica il padding del testo all'interno
		},
		backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
		color: theme.palette.mode === "dark" ? "#ffffff" : "#121212",
		borderRadius: theme.shape.borderRadius, // Mantieni il borderRadius dal tema
	}));

	React.useEffect(() => {
		const handleLogout = () => {
			try {
				logOutUser(dispatch);
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("logoutSuccess");
				}
			} catch (error) {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("logoutSuccess error: ", error);
				}
			}
		};

		const centerContent = () => {
			const windowHeight = window.innerHeight;
			const mainHeight = document.getElementById("main")?.offsetHeight;
			const calculatedPaddingTop =
				(windowHeight - (mainHeight ? mainHeight : 0)) / 2;
			setPaddingTop(calculatedPaddingTop);
		};
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log(
			"@@@@@@@@@ _LOGIN---- >> AuthEcommerceHelper ??? provo a commentarlo"
		);
	}
		AuthEcommerceHelper(dispatch);
		//SetStripeKeysHelper(dispatch);
		//TODO #DA VERIFICARE PER BENE
		handleLogout();
		centerContent();
		window.addEventListener("resize", centerContent);

		return () => {
			window.removeEventListener("resize", centerContent);
		};
	}, []);

	const { showAlert } = useAlertMe();
	const handleLogin = async (captchaValue: string | null) => {
		const handleCaptchaError = async () => {
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("Si prega di completare il reCAPTCHA.");
			}
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>Si prega di completare il reCAPTCHA.</strong>
					</h3>
				</React.Fragment>
			);
			await showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
		};

		const fetchData = async () => {
			const handleLoginResponse = (respCall: responseCall) => {
				const handleSuccess = (msg_Resp: any) => {
					CookieManager.setCookie("username", username);
					//****** TOKENS
					// Salva il accessToken di accesso come cookie o nello stato dell'applicazione
					CookieManager.setCookie("accessToken", msg_Resp.accessToken);
					if (msg_Resp.refreshToken) {
						// Salva il refreshToken di accesso come cookie o nello stato dell'applicazione
						CookieManager.setCookie("refreshToken", msg_Resp.refreshToken);
					} else {
						//rimuovo l'eventuale refreshToken
						CookieManager.removeCookie("refreshToken");
					}

					//****** UTENTE
					// Aggiorna lo stato dell'OGGETTO utente
					try {
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("Aggiorna Redux AuthUser:", msg_Resp.respWCF);
						}
						dispatch(setAuthUser(msg_Resp.respWCF));
						Router.push("/auth/home");
					} catch (error) {
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("Aggiorna Redux AuthUser:", error);
						}
					}
				};

				const msg_Resp = respCall.messageCli.message;
				if (respCall.successCli) {
					if (msg_Resp && msg_Resp.respWCF && msg_Resp.accessToken) {
						handleSuccess(msg_Resp);
					} else {
						handleError("Errore nel recupero dei dati, dati incompleti!");
					}
				} else {
					handleError(respCall.messageCli);
				}
			};

			const handleError = (error: any) => {
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{error}</strong>
						</h3>
					</React.Fragment>
				);
				showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			const obyPostData: tokenlessAccess = {
				clienteKey: eCommerceConf.ClienteKey,
				userName: username,
				password: password,
				ricordami: ricordami,
				accessToken: null,
				refreshToken: null,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"login",
					obyPostData,
					null
				);
				handleLoginResponse(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};

		// Controlla se il captchaValue è valido prima di procedere con il login
		if (!captchaValue) {
			handleCaptchaError();
			return;
		}

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
			<LayoutGeneral
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				<div
					id="contenitore"
					style={{
						// minHeight: "calc(100vh - 50vh)",
						paddingBottom: "60px",
						height:
							"80vh" /* o qualsiasi percentuale desiderata rispetto all'altezza della finestra */,
					}}
				>
					<Box id="main">
						<Grid
							container
							component="main"
							style={{
								// overflowY: "scroll",
								height:
									"40vh" /* o qualsiasi percentuale desiderata rispetto all'altezza della finestra */,
								// marginBottom: "200px",
							}}
						>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								item
								xs={false}
								sm={4}
								md={6}
								component={Paper}
								elevation={2}
								square
								sx={{
									backgroundImage: "url(/images/wallpaper.jpg)",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundPosition: "center",
									position: "relative",
									//display: !isMobile ? "block" : "none",
								}}
							>
								<div
									style={{
										width: "50%",
										height: "50%",
										position: "relative",
										zIndex: 1,
									}}
								>
									<Image
										src="/images/LogoQ.png"
										alt="Logo"
										fill={true}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ objectFit: "contain" }}
										//objectFit='contain'
										priority={true}
									/>
								</div>
								<Box sx={overlayStyle} />
							</Grid>

							<Grid
								item
								xs={12}
								sm={8}
								md={6}
								component={Paper}
								elevation={2}
								square
							>
								<Box
									sx={{
										my: 2,
										mx: 4,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Avatar
										sx={{ ml: 1, mr: 1, mb: 1, bgcolor: "secondary.main" }}
									>
										<LockOutlinedIcon />
									</Avatar>

									<Typography
										// component="h3"
										// variant="h5"
										sx={{ textAlign: "center", fontSize: "3vh" }}
									>
										Accedi
									</Typography>
									<Box
										component="form"
										noValidate
										onSubmit={handleSubmit}
										sx={{ mt: 1, fontSize: "1vh" }}
									>
										<TextField
											margin="normal"
											required
											fullWidth
											id="username"
											label="Nome Utente"
											name="username"
											autoComplete="username"
											value={username}
											onChange={(event) => {
												setUsername(event.target.value);
											}}
											InputProps={{
												style: {
													backgroundColor:
														theme.palette.mode === "dark"
															? "#121212"
															: "#ffffff",
													color:
														theme.palette.mode === "dark"
															? "#ffffff"
															: "#121212",
												},
											}}
										/>

										<PasswordInput
											value={password}
											setValue={setPassword}
											name="password"
											id="password"
											label="Password"
											fullWidth={true}
											margin="normal"
										/>

										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<FormControlLabel
												control={
													<Checkbox
														value="remember"
														color="primary"
														checked={ricordami}
														onClick={() => setRicordami(!ricordami)}
													/>
												}
												label="Ricordati di me"
											/>

											{/* Add the reCAPTCHA component */}
											<Box
												sx={{
													maxWidth: 240,
												}}
											>
												<ReCAPTCHA
													sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY}
													onChange={(value) => setCaptchaValue(value)}
												/>
											</Box>
										</Box>

										<Button
											//   type="submit"
											fullWidth
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
											onClick={() => handleLogin(captchaValue)}
											disabled={!password || !username}
										>
											Accedi
										</Button>

										<Grid container>
											<Grid
												item
												xs
											>
												<Link
													onClick={() =>
														Router.push({
															pathname: "/account/resetPassword",
															query: { origin: "/account/login" },
														})
													}
													variant="body2"
													sx={{
														userSelect: "none",
														cursor: "pointer",
														color: (theme) =>
															theme.palette.mode === "light"
																? "black"
																: "white",
													}}
												>
													Password dimenticata?
												</Link>
											</Grid>
											<Grid item>
												<Link
													onClick={() => Router.push("/account/register")}
													variant="body2"
													sx={{
														userSelect: "none",
														cursor: "pointer",
														color: (theme) =>
															theme.palette.mode === "light"
																? "black"
																: "white",
													}}
												>
													Non hai un account? Iscriviti
												</Link>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</div>
			</LayoutGeneral>
		</ThemeProvider>
	);
};

export default Login;
