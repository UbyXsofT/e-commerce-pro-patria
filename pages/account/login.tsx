import React, { useState } from "react";
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
//REDUX-STORE
import { connect } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import { setLoading } from "src/store/actions";
import Image from "next/image";

import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CookieManager from "src/components/cookie/CookieManager";
// import TemaSwitch from "../../src/components/theme/TemaSwitch";
import Router from "next/router";

import { PartitaIva } from "src/components/layout/footer/PartitaIva";
import Copyright from "src/components/layout/footer/Copyright";

import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";

import callNodeService from "pages/api/callNodeService";
import LoadingWrapper from "src/components/utils/LoadingWrapper";
import logOutUser from "src/components/utils/logOutUser";
//redux
import { setAuthUser } from "src/store/actions";
import { useDispatch } from "react-redux";
import Layout from "src/components/layout/LayoutLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordInput from "src/components/utils/PasswordInput";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import {
	responseCall,
	tokenlessAccess,
} from "src/components/CommonTypesInterfaces";
import LayoutGeneral from "src/components/layout/LayoutGeneral";

const Login = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [ricordami, setRicordami] = React.useState(false);
	const [paddingTop, setPaddingTop] = React.useState(0);
	const [visLoader, setVisLoader] = React.useState(false);

	const CustomTextField = styled(TextField)(({ theme }) => ({
		"& .MuiInputBase-input": {
			padding: "8px", // Modifica il padding del testo all'interno
		},
		backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
		color: theme.palette.mode === "dark" ? "#ffffff" : "#121212",
		borderRadius: theme.shape.borderRadius, // Mantieni il borderRadius dal tema
	}));

	const dispatch = useDispatch(); // Ottieni il dispatcher dal Redux store

	React.useEffect(() => {
		const handleLogout = () => {
			try {
				logOutUser(dispatch);
			} catch (error) {
				console.log("logoutSuccess error: ", error);
			}
		};

		const centerContent = () => {
			const windowHeight = window.innerHeight;
			const mainHeight = document.getElementById("main")?.offsetHeight;
			const calculatedPaddingTop =
				(windowHeight - (mainHeight ? mainHeight : 0)) / 2;
			setPaddingTop(calculatedPaddingTop);
		};

		AuthEcommerceHelper(dispatch);
		handleLogout();
		centerContent();
		window.addEventListener("resize", centerContent);

		return () => {
			window.removeEventListener("resize", centerContent);
		};
	}, []);

	const { showAlert } = useAlertMe();
	const handleLogin = async () => {
		const fetchData = async () => {
			const handleLoginResponse = (respCall: responseCall) => {
				const handleSuccess = (msg_Resp: any) => {
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
						console.log("Aggiorna Redux AuthUser:", msg_Resp.respWCF);
						dispatch(setAuthUser(msg_Resp.respWCF));
						Router.push("/auth/home");
					} catch (error) {
						console.log("Aggiorna Redux AuthUser:", error);
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

			setVisLoader(true);

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
				setVisLoader(false);
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

	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: false,
	});

	const copyright = (
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
					variant="body2"
					align="center"
					sx={{ color: "white" }}
				>
					<PartitaIva />
				</Typography>

				<Typography
					variant="body2"
					align="center"
					sx={{ color: "white" }}
				>
					<Copyright />
				</Typography>
			</Box>
		</Box>
	);

	return (
		<ThemeProvider theme={theme}>
			<LoadingWrapper showLoader={visLoader}>
				<LayoutGeneral
					//digitare il titolo della pagina e la descrizione della pagina.
					title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
					description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
				>
					<AlertMe />
					<div
						id="contenitore"
						style={{ minHeight: "calc(100vh - 300px)", paddingBottom: "20px" }}
					>
						<Box id="main">
							<Grid
								container
								component="main"
								sx={{ height: 400 }}
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
											component="h3"
											variant="h5"
										>
											Accedi
										</Typography>
										<Box
											component="form"
											noValidate
											onSubmit={handleSubmit}
											sx={{ mt: 1 }}
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

											<Button
												//   type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
												onClick={() => handleLogin()}
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
											{/* <Copyright sx={{ mt: 5 }} /> */}
											{!smUp ? copyright : <div></div>}
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</div>
				</LayoutGeneral>
			</LoadingWrapper>
		</ThemeProvider>
	);
};

export default Login;
