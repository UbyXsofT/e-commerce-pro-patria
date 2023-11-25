import React, { useEffect, useState } from "react";
import {
	Grid,
	Button,
	Typography,
	TextField,
	Divider,
	ButtonGroup,
	Paper,
	Card,
	Avatar,
	FormHelperText,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../src/store/actions";
//REDUX-STORE
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
//*-----*//
import Layout from "../../src/components/layout/Layout";
import { useRouter } from "next/router";
import { Container } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import SettingsIcon from "@mui/icons-material/Settings";
import stringUpperCase from "src/components/utils/stringUpperCase";
import VirtualizedAutocomplete from "src/components/account/register/VirtualizedAutocomplete";
import {
	authUserCheck,
	authUserId,
	authUserIdCheck,
	AutocompleteSelected,
	ComunePaese,
	responseCall,
	StoreState,
	tokenlessAccess,
} from "src/components/CommonTypesInterfaces";
import getComuni from "src/components/utils/getComuni";
import { MuiTelInput } from "mui-tel-input";
import PasswordInput from "src/components/utils/PasswordInput";
import { LockOutlined } from "@mui/icons-material";

import eCommerceConf from "eCommerceConf.json";
import { useSettings } from "src/components/layout/SettingsContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { useSelector } from "react-redux";
import callNodeService from "pages/api/callNodeService";
import CookieManager from "src/components/cookie/CookieManager";

type AccountSettingsProps = {
	_setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};

const AccountSettings = ({ _setLoading }: AccountSettingsProps) => {
	const theme = useTheme();
	const router = useRouter();
	const { openSettings, setOpenSettings } = useSettings();
	const [interfaceState, setInterfaceState] = useState<
		"read" | "authenticate" | "modify"
	>("read");
	const [origin, setOrigin] = useState<"changePassword" | null>(null);

	const user = useSelector((state: StoreState) => state.authUser);
	//console.log("*******user: ", user);
	const name = user?.NOME;
	const surname = user?.COGNOME;
	const fiscalCode = user?.CODFISC;
	const address = user?.INDIRIZZO;
	const city = user?.CITTA;
	const province = user?.PROVINCIA;
	const cap = user?.CAP;
	const phoneNumber = user?.TELEFONO;
	const email = user?.EMAIL;

	const [modifyAddress, setModifyAddress] = useState(address);
	const [modifyCity, setModifyCity] = useState(city);
	const [modifyProvince, setModifyProvince] = useState(province);
	const [modifyCap, setModifyCap] = useState(cap);
	const [modifyEmail, setModifyEmail] = useState(email);
	const [modifyPhoneNumber, setModifyPhoneNumber] = useState(phoneNumber);

	const [selectedComune, setSelectedComune] =
		useState<AutocompleteSelected>(null);
	const [comuni, setComuni] = useState<ComunePaese[]>([]);

	const [password, setPassword] = useState("");
	const [wrongPassword, setWrongPassword] = useState(false);

	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

	useEffect(() => {
		getComuni(setComuni);
	}, []);

	const sendData = (
		modifyAddress: string | undefined,
		modifyCity: string | undefined,
		modifyProvince: string | undefined,
		modifyCap: string | undefined,
		modifyEmail: string | undefined,
		modifyPhoneNumber: string | undefined
	) => {
		setInterfaceState("read");
	};

	// TODO: Implement Password Checking
	const passwordCheck = (password: string) => {
		const handleCaptchaError = async () => {
			console.log("Si prega di completare il reCAPTCHA.");
			const textAlert = (
				<h3>
					<strong>Si prega di completare il reCAPTCHA.</strong>
				</h3>
			);
			showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
		};

		const fetchData = async () => {
			const handleLoginResponse = (respCall: responseCall) => {
				const handleSuccess = (msg_Resp: any) => {
					console.log("handleSuccess ISAUTH: ", msg_Resp.ISAUTH);
					if (msg_Resp.ISAUTH === "1" && msg_Resp.ESITO === "1") {
						alert("Autenticato");
					} else {
						const textAlert = (
							<h3>
								<strong>Utente non autenticato!</strong>
							</h3>
						);
						showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
					}
				};

				const msg_Resp = respCall.messageCli.message;
				if (respCall.successCli) {
					console.log("respCall.successCli: msg_Resp:", msg_Resp);
					if (msg_Resp) {
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
			let userName = CookieManager.getCookie("username");
			//*********** CALL NODE SERVICE
			const obyPostData: authUserCheck = {
				clienteKey: eCommerceConf.ClienteKey,
				userName: userName ?? "null",
				password: password,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"authUserCheck",
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
		//*********** CALL NODE SERVICE

		// Controlla se il captchaValue è valido prima di procedere con il login
		if (!captchaValue) {
			handleCaptchaError();
			return;
		}

		fetchData();
	};

	const { showAlert } = useAlertMe();

	const handleCaptchaError = async () => {
		console.log("Si prega di completare il reCAPTCHA.");
		const textAlert = (
			<h3>
				<strong>Si prega di completare il reCAPTCHA.</strong>
			</h3>
		);
		await showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
	};

	const defineUI = (interfaceState: "read" | "authenticate" | "modify") => {
		switch (interfaceState) {
			case "read":
				return (
					<>
						<Typography
							variant="h4"
							marginBottom={3}
						>
							Dati Utente
						</Typography>
						<Grid
							container
							spacing={2}
							marginBottom={3}
						>
							<Grid
								item
								xs={12}
								md={3}
							>
								<TextField
									value={name}
									label="Nome"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={3}
							>
								<TextField
									value={surname}
									label="Cognome"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={fiscalCode}
									label="Codice Fiscale"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>

							<Grid
								item
								xs={12}
								md={4.5}
							>
								<TextField
									value={address}
									label="Indirizzo"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={1.5}
							>
								<TextField
									value={cap}
									label="CAP"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={3}
							>
								<TextField
									value={city}
									label="Città"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={3}
							>
								<TextField
									value={province}
									label="Provincia"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>

							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={phoneNumber}
									label="Telefono"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={email}
									label="Email"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									inputProps={{ maxLength: 319 }}
								/>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								md={6}
							>
								<ButtonGroup fullWidth>
									<Button
										onClick={() => setInterfaceState("authenticate")}
										variant="contained"
									>
										<EditIcon style={{ marginRight: 5 }} />
										Modifica Utente
									</Button>
									<Button
										onClick={() => {
											setInterfaceState("authenticate");
											setOrigin("changePassword");
										}}
									>
										<KeyIcon style={{ marginRight: 5 }} />
										Cambia Password
									</Button>
								</ButtonGroup>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
								marginBottom={3}
							>
								<ButtonGroup fullWidth>
									<Button
										onClick={() => {
											setOpenSettings(true);
										}}
									>
										<SettingsIcon style={{ marginRight: 5 }} />
										Configura Cookie
									</Button>
									<Button
										onClick={() => {
											localStorage.removeItem("cookieSettings");
										}}
										color="warning"
									>
										<DeleteIcon style={{ marginRight: 5 }} />
										Rimuovi Cookie
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</>
				);
			case "authenticate":
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: "1em",
						}}
					>
						<Card
							sx={{
								padding: 3,
								maxWidth: "350px",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Avatar
								sx={{ m: 1, bgcolor: "secondary.main", alignSelf: "center" }}
							>
								<LockOutlined />
							</Avatar>
							<Typography
								variant="h4"
								marginBottom={3}
								textAlign={"center"}
							>
								Autenticazione
							</Typography>
							<PasswordInput
								name="password"
								id="password"
								error={wrongPassword}
								value={password}
								setValue={setPassword}
								label="Password"
							/>
							<FormHelperText>
								Inserisci la tua <strong>Password</strong> per{" "}
								<strong>Autenticarti</strong>
							</FormHelperText>
							<ReCAPTCHA
								style={{ marginTop: "1rem" }}
								sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY}
								onChange={(value) => setCaptchaValue(value)}
							></ReCAPTCHA>
							<div
								style={{
									marginTop: "10em",
									display: "flex",
									gap: 1,
									justifyContent: "space-between",
									marginBottom: "1em",
								}}
							>
								<Button
									onClick={() => {
										setInterfaceState("read");
										setWrongPassword(false);
									}}
								>
									Annulla
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										if (passwordCheck(password) === true) {
											if (origin === "changePassword") {
												setOrigin(null);

												router.push({
													pathname: "/auth/setNewPassword",
													query: { origin: "/auth/account" },
												});

												return;
											}

											setInterfaceState("modify");
											setWrongPassword(false);
										} else {
											setWrongPassword(true);
										}
									}}
									disabled={!password}
								>
									Autentica
								</Button>
							</div>
						</Card>
					</div>
				);
			case "modify":
				return (
					<>
						<Typography
							variant="h4"
							marginBottom={3}
						>
							Modifica Dati
						</Typography>
						<Grid
							container
							spacing={2}
							marginBottom={3}
						>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={modifyAddress}
									onChange={(e) => {
										setModifyAddress(stringUpperCase(e.target.value));
									}}
									onBlur={(e) => {
										setModifyAddress(e.target.value.trim());
									}}
									inputProps={{ maxLength: 60 }}
									label="Indirizzo"
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<VirtualizedAutocomplete
									label={"Residenza"}
									comuni={comuni}
									placeOfBirth={modifyCity}
									setPlaceOfBirth={setModifyCity}
									selectedComune={selectedComune}
									setSelectedComune={setSelectedComune}
									setProvinceOfBirth={setModifyProvince}
									setCap={setModifyCap}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={modifyProvince}
									onChange={(e) => {
										setModifyProvince(e.target.value);
									}}
									onBlur={(e) => {
										setModifyProvince(e.target.value.trim());
									}}
									inputProps={{ maxLength: 35 }}
									label="Provincia"
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={modifyCap}
									onChange={(e) => {
										setModifyCap(e.target.value.trim().replace(/\D/g, ""));
									}}
									inputProps={{ maxLength: 5, minLength: 5 }}
									label="CAP"
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={modifyEmail}
									onChange={(e) => {
										setModifyEmail(e.target.value.trim().toLowerCase());
									}}
									label="Email"
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<MuiTelInput
									label="Telefono"
									sx={{ width: "100%" }}
									defaultCountry="IT"
									value={modifyPhoneNumber}
									onChange={(e) => setModifyPhoneNumber(e)}
									inputProps={{ maxLength: 16 }}
									required
								/>
							</Grid>
						</Grid>
						<div
							style={{
								display: "flex",
								gap: 1,
								justifyContent: "space-between",
								marginBottom: "1em",
							}}
						>
							<Button
								onClick={() => {
									setInterfaceState("read");
								}}
							>
								Annulla
							</Button>
							<Button
								variant="contained"
								onClick={() => {
									sendData(
										modifyAddress,
										modifyCity,
										modifyProvince,
										modifyCap,
										modifyEmail,
										modifyPhoneNumber
									);
								}}
								disabled={
									!modifyAddress ||
									!modifyCity ||
									!modifyProvince ||
									!modifyCap ||
									modifyCap.length !== 5 ||
									!modifyEmail ||
									!modifyPhoneNumber
								}
							>
								Conferma
							</Button>
						</div>
					</>
				);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				// openSettings={openCookies}
				// setOpenSettings={setOpenCookies}
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Account | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce Avvisi page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<Container maxWidth="md">{defineUI(interfaceState)}</Container>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(AccountSettings);
