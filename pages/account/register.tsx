import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import "dayjs/locale/it";

import {
	AppBar,
	CssBaseline,
	Grid,
	Paper,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Toolbar,
	useMediaQuery,
} from "@mui/material";

import Step1 from "src/components/account/register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "src/components/account/register/Step2";
import Step3 from "src/components/account/register/Step3";
import Router, { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import eCommerceConf from "eCommerceConf.json";
import ReCAPTCHA from "react-google-recaptcha";

import dayjs, { Dayjs } from "dayjs";

import {
	Sex,
	Focus,
	AutocompleteSelected,
	Date,
	ComunePaese,
	PasswordSafety,
	UserData,
	responseCall,
	NewUserData,
} from "src/components/CommonTypesInterfaces";

import PrivacyLabel from "src/components/utils/PrivacyLabel";
import { Paesi } from "src/components/account/register/ProvinciePaesi";

import stringUpperCase from "src/components/utils/stringUpperCase";
import getComuni from "src/components/utils/getComuni";
import CodiceFiscale from "codice-fiscale-js";
import StyledImageLogo from "src/components/utils/StyledImageLogo";
import LayoutGeneral from "src/components/layout/LayoutGeneral";
import { number } from "prop-types";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { setLoading } from "src/store/actions";
import { useDispatch } from "react-redux";
import callNodeService from "pages/api/callNodeService";
import { fontSize } from "@mui/system";

const SignUp = () => {
	const theme = useTheme();

	const focus = useRef<Focus>(null);
	const router = useRouter();

	const [activeStep, setActiveStep] = useState(0);

	// TODO: Handle External Manipulation?

	useEffect(() => {
		router.query.activeStep = "0";
		router.push(router);
	}, []);

	useEffect(() => {
		router.query.activeStep
			? setActiveStep(Number(router.query.activeStep))
			: {};
	}, [router.query.activeStep]);

	const handleActiveStepChange = (newStep: number) => {
		setActiveStep(newStep);
		router.query.activeStep = newStep.toString();
		router.push(router);
	};

	const steps = ["Dati Personali", "Utente", "Finalizza"];
	const underageSteps = [
		"Dati Personali",
		"Dati Genitore",
		"Utente",
		"Finalizza",
	];
	const [underage, setUnderage] = useState(true);
	const [codiceFiscale, setCodiceFiscale] = useState("");
	const [codiceFiscaleInvalid, setCodiceFiscaleInvalid] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [parentCodiceFiscale, setParentCodiceFiscale] = useState("");
	const [parentCodiceFiscaleInvalid, setParentCodiceFiscaleInvalid] =
		useState(false);
	const [parentFirstName, setParentFirstName] = useState("");
	const [parentLastName, setParentLastName] = useState("");
	const [gender, setGender] = useState<Sex>(null);
	const [dateOfBirth, setDateOfBirth] = useState<Date>(null);
	const [placeOfBirth, setPlaceOfBirth] = useState("");
	const [selectedComune, setSelectedComune] =
		useState<AutocompleteSelected>(null);
	const [parentGender, setParentGender] = useState<Sex>(null);
	const [parentDateOfBirth, setParentDateOfBirth] = useState<Date>(null);
	const [parentSelectedComune, setParentSelectedComune] =
		useState<AutocompleteSelected>(null);
	const [parentPlaceOfBirth, setParentPlaceOfBirth] = useState("");
	const [address, setAddress] = useState("");
	const [comuneResidenza, setComuneResidenza] =
		useState<AutocompleteSelected>(null);
	const [city, setCity] = useState("");
	const [cap, setCap] = useState("");
	const [province, setProvince] = useState("");
	const [notes, setNotes] = useState<string | undefined>(undefined);
	const [parentAddress, setParentAddress] = useState("");
	const [parentComuneResidenza, setParentComuneResidenza] =
		useState<AutocompleteSelected>(null);
	const [parentCity, setParentCity] = useState("");
	const [parentCap, setParentCap] = useState("");
	const [parentProvince, setParentProvince] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("+39");
	const [parentPhoneNumber, setParentPhoneNumber] = useState("+39");
	const [privacy, setPrivacy] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordSafety, setPasswordSafety] = useState<PasswordSafety>({
		correct: false,
		detail: "",
	});
	const [isSamePassword, setIsSamePassword] = useState(false);
	const [readyToSend, setReadyToSend] = useState<ReadyToSend>({
		status: false,
		data: null,
	});
	interface ReadyToSend {
		status: boolean;
		data: UserData | null;
	}
	const [disableButton, setDisablebutton] = useState(false);
	const [comuni, setComuni] = useState<ComunePaese[]>([]);
	const [captcha, setCaptcha] = useState<string | null>(null);

	const [showReinviaMail, setShowReinviaMail] = useState(false);

	const updateUnderage = (date: Dayjs) => {
		const minDate = dayjs().subtract(18, "year");

		if (date > minDate) {
			setUnderage(true);
		} else {
			setUnderage(false);
		}
	};

	useEffect(() => {
		getComuni(setComuni);
	}, []);

	const Step1User = (
		<Step1
			focus={focus}
			parent={false}
			comuni={comuni}
			comuneResidenza={comuneResidenza}
			setComuneResidenza={setComuneResidenza}
			selectedComune={selectedComune}
			setSelectedComune={setSelectedComune}
			stringUpperCase={stringUpperCase}
			codiceFiscale={codiceFiscale}
			codiceFiscaleInvalid={codiceFiscaleInvalid}
			setCodiceFiscale={setCodiceFiscale}
			setCodiceFiscaleInvalid={setCodiceFiscaleInvalid}
			firstName={firstName}
			setFirstName={setFirstName}
			lastName={lastName}
			setLastName={setLastName}
			gender={gender}
			setGender={setGender}
			dateOfBirth={dateOfBirth}
			setDateOfBirth={setDateOfBirth}
			placeOfBirth={placeOfBirth}
			setPlaceOfBirth={
				setPlaceOfBirth as React.Dispatch<
					React.SetStateAction<string | undefined>
				>
			}
			address={address}
			setAddress={setAddress}
			city={city}
			setCity={
				setCity as React.Dispatch<React.SetStateAction<string | undefined>>
			}
			cap={cap}
			setCap={
				setCap as React.Dispatch<React.SetStateAction<string | undefined>>
			}
			province={province}
			setProvince={
				setProvince as React.Dispatch<
					React.SetStateAction<string | null | undefined>
				>
			}
			setProvinceOfBirth={
				setProvince as React.Dispatch<
					React.SetStateAction<string | null | undefined>
				>
			}
			email={email}
			setEmail={setEmail}
			phoneNumber={phoneNumber}
			setPhoneNumber={setPhoneNumber}
			privacy={privacy}
			setPrivacy={setPrivacy}
			notes={notes}
			setNotes={setNotes}
			toCheck={[
				!codiceFiscaleInvalid,
				firstName,
				lastName,
				gender,
				dateOfBirth,
				placeOfBirth,
				address,
				city,
				cap,
				province,
				email,
				phoneNumber,
				privacy,
			]}
		/>
	);

	const Step1Parent = (
		<Step1
			focus={focus}
			parent={true}
			comuni={comuni}
			comuneResidenza={parentComuneResidenza}
			setComuneResidenza={setParentComuneResidenza}
			selectedComune={parentSelectedComune}
			setSelectedComune={setParentSelectedComune}
			stringUpperCase={stringUpperCase}
			codiceFiscale={parentCodiceFiscale}
			codiceFiscaleInvalid={parentCodiceFiscaleInvalid}
			setCodiceFiscale={setParentCodiceFiscale}
			setCodiceFiscaleInvalid={setParentCodiceFiscaleInvalid}
			firstName={parentFirstName}
			setFirstName={setParentFirstName}
			lastName={parentLastName}
			setLastName={setParentLastName}
			gender={parentGender}
			setGender={setParentGender}
			dateOfBirth={parentDateOfBirth}
			setDateOfBirth={setParentDateOfBirth}
			placeOfBirth={parentPlaceOfBirth}
			setPlaceOfBirth={
				setParentPlaceOfBirth as React.Dispatch<
					React.SetStateAction<string | undefined>
				>
			}
			address={parentAddress}
			setAddress={setParentAddress}
			city={parentCity}
			setCity={
				setParentCap as React.Dispatch<React.SetStateAction<string | undefined>>
			}
			cap={parentCap}
			setCap={
				setParentCap as React.Dispatch<React.SetStateAction<string | undefined>>
			}
			province={parentProvince}
			setProvince={
				setParentProvince as React.Dispatch<
					React.SetStateAction<string | null | undefined>
				>
			}
			setProvinceOfBirth={
				setParentProvince as React.Dispatch<
					React.SetStateAction<string | null | undefined>
				>
			}
			phoneNumber={parentPhoneNumber}
			setPhoneNumber={setParentPhoneNumber}
			toCheck={[
				!parentCodiceFiscaleInvalid,
				parentFirstName,
				parentLastName,
				parentGender,
				parentDateOfBirth,
				parentPlaceOfBirth,
				parentAddress,
				parentCity,
				parentCap,
				parentProvince,
				parentPhoneNumber,
			]}
		/>
	);

	const Step2User = (
		<Step2
			focus={focus}
			email={email}
			setEmail={setEmail}
			username={username}
			setUsername={setUsername}
			password={password}
			setPassword={setPassword}
			confirmPassword={confirmPassword}
			setConfirmPassword={setConfirmPassword}
			passwordSafety={passwordSafety}
			setPasswordSafety={setPasswordSafety}
			setIsSamePassword={setIsSamePassword}
			toCheck={[email, username, passwordSafety.correct, isSamePassword]}
		/>
	);

	const Step3User = (
		<Step3
			focus={focus}
			codiceFiscale={codiceFiscale}
			firstName={firstName}
			lastName={lastName}
			gender={gender}
			dateOfBirth={dateOfBirth}
			placeOfBirth={placeOfBirth}
			address={address}
			city={city}
			cap={cap}
			province={province}
			email={email}
			phoneNumber={phoneNumber}
			privacy={privacy}
			username={username}
			underage={underage}
			parentCodiceFiscale={parentCodiceFiscale}
			parentFirstName={parentFirstName}
			parentLastName={parentLastName}
			parentGender={parentGender}
			parentDateOfBirth={parentDateOfBirth}
			parentPlaceOfBirth={parentPlaceOfBirth}
			parentAddress={parentAddress}
			parentCity={parentCity}
			parentCap={parentCap}
			parentProvince={parentProvince}
			parentPhoneNumber={parentPhoneNumber}
			notes={notes}
			toCheck={[]}
		/>
	);

	const getStepContent = (step: number): React.JSX.Element | true => {
		if (underage) {
			switch (step) {
				case 0:
					return Step1User;
				case 1:
					return Step1Parent;
				case 2:
					return Step2User;
				case 3:
					return Step3User;
				default:
					return true;
			}
		} else {
			switch (step) {
				case 0:
					return Step1User;
				case 1:
					return Step2User;
				case 2:
					return Step3User;
				default:
					return true;
			}
		}
	};

	const mdUp = useMediaQuery(theme.breakpoints.up("md"), {
		noSsr: false,
	});

	React.useEffect(() => {
		if (dateOfBirth) {
			updateUnderage(dateOfBirth);
		}
	}, [dateOfBirth]);

	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	const handleCaptchaError = async () => {
		console.log("Si prega di completare il reCAPTCHA.");
		const textAlert = (
			<React.Fragment>
				<h3>
					<strong>Si prega di completare il reCAPTCHA.</strong>
				</h3>
			</React.Fragment>
		);
		await showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
	};

	const rinviaMailConferma = (myEmail: string) => {
		console.log("METODO: Nuovo_Utente");

		const fetchData = async () => {
			const handleCallNodeService_Resp = (respCall: responseCall) => {
				const handleSuccess = (msg_Resp: any) => {
					console.log("handleSuccess ESITO: ", msg_Resp.ESITO);
					if (msg_Resp.ESITO === 1) {
						const textAlert = (
							<React.Fragment>
								<div
									style={{
										maxHeight:
											"60vh" /* o qualsiasi altezza massima desiderata */,
										overflowY: "auto",
									}}
								>
									<p
										style={{
											fontStyle: "bold",
											fontSize: "22px",
										}}
									>
										Abbiamo inviato una nuova e-mail all'indirizzo specificato{" "}
										{myEmail}
									</p>
								</div>
							</React.Fragment>
						);

						showAlert(
							"filled",
							"info",
							"INFO!",
							textAlert,
							true,
							"/account/login"
						);

						//setEsito_BackEnd(true);
					} else {
						const textAlert = (
							<React.Fragment>
								<h3
									style={{
										maxHeight:
											"60vh" /* o qualsiasi altezza massima desiderata */,
										overflowY: "auto",
									}}
								>
									<strong>{msg_Resp.ERRMSG}</strong>
								</h3>
							</React.Fragment>
						);
						showAlert(
							"filled",
							"error",
							"ATTENZIONE!",
							textAlert,
							true,
							"/account/login"
						);
					}
				};

				const msg_Resp = respCall.messageCli.message;
				if (respCall.successCli) {
					console.log("respCall.successCli: msg_Resp:", msg_Resp);
					if (msg_Resp) {
						handleSuccess({ ESITO: 1, MESSAGE: msg_Resp });
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
				showAlert("filled", "warning", "ATTENZIONE!", textAlert, true);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			//ID OPTIONI: 0= info / vuoto = registrazione /altrimenti verifica tramite email
			const obyPostData: NewUserData = {
				ID: "0",
				clienteKey: eCommerceConf.ClienteKey,
				EMail: myEmail,
				Cognome: "",
				Nome: "",
				Data_Nascita: "",
				Luogo_Nascita: "",
				Sesso: "",
				Indirizzo: "",
				Cellulare: "",
				NoteD: "",
				CodFisc: "",
				Citta: "",
				Provincia: "",
				Cap: "",
				IDUtente: "",
				PwdUtente: "",
				Tipo_Prov: "",
				Parent_CodFisc: "",
				Parent_Nome: "",
				Parent_Cognome: "",
				Parent_Sesso: "",
				Parent_Data_Nascita: "",
				Parent_Luogo_Nascita: "",
				Parent_Indirizzo: "",
				Parent_Citta: "",
				Parent_Cap: "",
				Parent_Provincia: "",
				Parent_Cellulare: "",
			};

			try {
				const respCall: responseCall = await callNodeService(
					"save-new-user",
					obyPostData,
					null
				);

				handleCallNodeService_Resp(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		//*********** CALL NODE SERVICE
		// Controlla se il captchaValue è valido prima di procedere con il login
		if (!captcha) {
			handleCaptchaError();
			return;
		}
		fetchData();
	};

	const sendData = (data: UserData) => {
		console.log("YES!");
		console.log(data);
		console.log("METODO: Nuovo_Utente");
		const formattedDateOfBirth = dayjs(data.user?.dateOfBirth).format(
			"YYYY-MM-DD"
		);
		console.log("formattedDateOfBirth: ", formattedDateOfBirth);

		const cognome = data.user?.lastName ?? "";
		const nome = data.user?.firstName ?? "";
		const data_Nascita = formattedDateOfBirth ?? "";
		const luogo_Nascita = data.user?.placeOfBirth ?? "";
		const sesso = data.user?.gender ?? "";
		const indirizzo = data.user?.address ?? "";
		const eMail = data.user?.email ?? "";
		const cellulare = data.user?.phoneNumber ?? "";
		const noteD = data.user?.notes ?? "";
		const codFisc = data.user?.codiceFiscale ?? "";
		const citta = data.user?.city ?? "";
		const provincia = data.user?.province ?? "";
		const cap = data.user?.cap ?? "";
		const idUtente = data.user?.username ?? "";
		const pwdUtente = data.user?.password ?? "";
		const tipo_Prov = 4; // 1 EasyT, 2 FitonT, 3 MyiClub, 4 E-COMMERCE // @#@ ATTENZIONE PER EASY TICKET

		const parent_CodFisc = data.parent?.parentCodiceFiscale ?? "";
		const parent_Nome = data.parent?.parentFirstName ?? "";
		const parent_Cognome = data.parent?.parentLastName ?? "";
		const parent_Sesso = data.parent?.parentGender ?? "";
		const parent_Data_Nascita = data.parent?.parentDateOfBirth ?? "";
		const parent_Luogo_Nascita = data.parent?.parentPlaceOfBirth ?? "";
		const parent_Indirizzo = data.parent?.parentAddress ?? "";
		const parent_Citta = data.parent?.parentCity ?? "";
		const parent_Cap = data.parent?.parentCap ?? "";
		const parent_Provincia = data.parent?.parentProvince ?? "";
		const parent_Cellulare = data.parent?.parentPhoneNumber ?? "";

		const fetchData = async () => {
			const handleCallNodeService_Resp = (respCall: responseCall) => {
				const handleSuccess = (msg_Resp: any) => {
					console.log("handleSuccess ESITO: ", msg_Resp.ESITO);
					if (msg_Resp.ESITO === 1) {
						const textAlert = (
							<React.Fragment>
								<div
									style={{
										maxHeight:
											"60vh" /* o qualsiasi altezza massima desiderata */,
										overflowY: "auto",
									}}
								>
									<p
										style={{
											fontStyle: "normal",
											fontSize: "22px",
										}}
									>
										Grazie per avere compilato il modulo di registrazione.{" "}
										<br />
										<br />
										<span style={{ fontWeight: "normal", fontSize: "18px" }}>
											Manca un ultimo passaggio per attivare il tuo account.
											Abbiamo inviato una mail all'indirizzo {eMail}. con le
											indicazioni che ti consentiranno di finalizzare la
											registrazione. <br />
											<br /> Se non l'avessi ricevuta verifica la cartella dello
											SPAM. Puoi richiedere un secondo invio della mail
											cliccando il bottone{" "}
											<span style={{ fontWeight: "bold", fontSize: "22px" }}>
												"Email non ricevuta? Richiedi un nuovo invio"
											</span>{" "}
											presente nell'area inferiore della pagina di
											registrazione.
											<br />
											<br /> Ricordiamo che la finalizzazione della
											registrazione deve avvenire entro e non oltre le 23.59 di
											oggi, diversamente dovrai procedere con una nuova
											registrazione.
										</span>
									</p>
								</div>
							</React.Fragment>
						);

						showAlert(
							"filled",
							"info",
							"INFO!",
							textAlert,
							true,
							"/account/login"
						);

						//setEsito_BackEnd(true);
					} else {
						const textAlert = (
							<React.Fragment>
								<h3
									style={{
										maxHeight:
											"60vh" /* o qualsiasi altezza massima desiderata */,
										overflowY: "auto",
									}}
								>
									<strong>{msg_Resp.ERRMSG}</strong>
								</h3>
							</React.Fragment>
						);
						showAlert(
							"filled",
							"error",
							"ATTENZIONE!",
							textAlert,
							true,
							"/account/login"
						);
					}
				};

				const msg_Resp = respCall.messageCli.message;
				if (respCall.successCli) {
					console.log("respCall.successCli: msg_Resp:", msg_Resp);
					if (msg_Resp) {
						handleSuccess({ ESITO: 1, MESSAGE: msg_Resp });
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
				showAlert(
					"filled",
					"warning",
					"ATTENZIONE!",
					textAlert,
					true,
					"/account/login"
				);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			//ID OPTIONI: 0= info / vuoto = registrazione /altrimenti verifica tramite email
			const obyPostData: NewUserData = {
				ID: "",
				clienteKey: eCommerceConf.ClienteKey,
				Cognome: cognome,
				Nome: nome,
				Data_Nascita: data_Nascita.toString(),
				Luogo_Nascita: luogo_Nascita,
				Sesso: sesso,
				Indirizzo: indirizzo,
				EMail: eMail,
				Cellulare: cellulare,
				NoteD: noteD,
				CodFisc: codFisc,
				Citta: citta,
				Provincia: provincia,
				Cap: cap,
				IDUtente: idUtente,
				PwdUtente: pwdUtente,
				Tipo_Prov: tipo_Prov.toString(),
				Parent_CodFisc: parent_CodFisc,
				Parent_Nome: parent_Nome,
				Parent_Cognome: parent_Cognome,
				Parent_Sesso: parent_Sesso,
				Parent_Data_Nascita: parent_Data_Nascita.toString(),
				Parent_Luogo_Nascita: parent_Luogo_Nascita,
				Parent_Indirizzo: parent_Indirizzo,
				Parent_Citta: parent_Citta,
				Parent_Cap: parent_Cap,
				Parent_Provincia: parent_Provincia,
				Parent_Cellulare: parent_Cellulare,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"save-new-user",
					obyPostData,
					null
				);

				handleCallNodeService_Resp(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		//*********** CALL NODE SERVICE

		// Controlla se il captchaValue è valido prima di procedere con il login
		if (!captcha) {
			handleCaptchaError();
			return;
		}

		fetchData();
	};

	// TODO: Handle dateOfBirth and Cap

	const checkValidation = (toCheck: any[]): boolean => {
		let isValid = true;

		toCheck.forEach((value) => {
			if (!value) {
				isValid = false;
			}
		});

		return isValid;
	};

	const handleNext = () => {
		setCaptcha(null);
		if ((underage && activeStep === 2) || (!underage && activeStep === 1)) {
			const data: UserData = {
				user: {
					codiceFiscale,
					firstName,
					lastName,
					gender,
					dateOfBirth,
					placeOfBirth,
					address,
					city,
					cap,
					province,
					email,
					phoneNumber,
					username,
					password,
					notes,
				},
				parent: underage
					? {
							parentCodiceFiscale,
							parentFirstName,
							parentLastName,
							parentGender,
							parentDateOfBirth,
							parentPlaceOfBirth,
							parentAddress,
							parentCity,
							parentCap,
							parentProvince,
							parentPhoneNumber,
					  }
					: null,
			};

			const userCheckPassed = Object.values(data.user).every(
				(value) => value !== null && value !== ""
			);
			const parentCheckPassed = data.parent
				? Object.values(data.parent).every(
						(value) => value !== null && value !== ""
				  )
				: true;

			const codiceFiscaleValid = CodiceFiscale.check(codiceFiscale);
			const capLength = cap.length === 5 ? true : false;

			const parentCodiceFiscaleValid = CodiceFiscale.check(parentCodiceFiscale);
			const parentCapLength = parentCap.length === 5 ? true : false;

			const privacyValid = privacy ? true : false;

			if (
				underage
					? userCheckPassed &&
					  codiceFiscaleValid &&
					  capLength &&
					  privacyValid &&
					  parentCheckPassed &&
					  parentCodiceFiscaleValid &&
					  parentCapLength
					: userCheckPassed && codiceFiscaleValid && capLength && privacyValid
			) {
				setReadyToSend({ status: true, data });
			} else {
				setReadyToSend({ status: false, data });
			}

			handleActiveStepChange(activeStep + 1);
		} else if (
			(underage && activeStep === 3) ||
			(!underage && activeStep === 2)
		) {
			if (!readyToSend.data) {
				return;
			}
			sendData(readyToSend.data);
			handleActiveStepChange(activeStep + 1);
		} else {
			handleActiveStepChange(activeStep + 1);
		}
	};

	const handleBack = () => {
		setCaptcha(null);
		handleActiveStepChange(activeStep - 1);
	};

	const isJSXElement = (
		element: React.JSX.Element | true
	): element is React.JSX.Element => {
		return (element as React.JSX.Element).type !== undefined;
	};

	const content = getStepContent(activeStep);

	const next = (
		<Button
			variant="contained"
			disabled={
				!checkValidation(isJSXElement(content) ? content.props.toCheck : [])
			}
			// disabled={disableButton}
			onClick={handleNext}
			sx={{ mt: "auto", ml: 1 }}
		>
			Successivo
		</Button>
	);

	const finalize = (
		<div style={{ display: "flex" }}>
			<ReCAPTCHA
				sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY}
				onChange={(token) => setCaptcha(token)}
			/>

			<Button
				variant="contained"
				disabled={
					disableButton && captcha
						? true
						: !disableButton && captcha
						? false
						: disableButton && !captcha
						? true
						: true
				}
				onClick={handleNext}
				sx={{ mt: "auto", ml: 1 }}
			>
				Finalizza
			</Button>
		</div>
	);

	useEffect(() => {
		let correctStep =
			(underage && activeStep === 2) || (!underage && activeStep === 1);
		(password !== confirmPassword ||
			(passwordSafety && !passwordSafety.correct)) &&
		correctStep
			? setDisablebutton(true)
			: setDisablebutton(false);

		if (correctStep) {
			return;
		}

		let correctStepFinalize =
			(underage && activeStep === 3) || (!underage && activeStep === 2);
		!readyToSend.status && correctStepFinalize
			? setDisablebutton(true)
			: setDisablebutton(false);
	}, [password, confirmPassword, passwordSafety, activeStep]);

	useEffect(() => {
		const input = focus.current?.children[1].children[0];
		if (input) {
			(input as HTMLInputElement).focus();
		}
	}, [activeStep]);

	const reinviaMailScreen = (
		<Grid
			container
			spacing={2}
		>
			<div style={{ marginLeft: "auto", marginRight: "auto" }}>
				<Typography
					variant="h5"
					gutterBottom
					sx={{ marginTop: 3 }}
					textAlign={"center"}
				>
					RICHIESTA NUOVO INVIO MAIL DI ATTIVAZIONE ACCOUNT
				</Typography>
				<Typography
					variant="subtitle1"
					gutterBottom
					sx={{ marginBottom: 3 }}
					textAlign={"center"}
				>
					Inserisci l′indirizzo mail con cui ti sei registrato:
				</Typography>
			</div>
			<Grid
				item
				xs={12}
			>
				<TextField
					value={email}
					onChange={(event) => setEmail(event.target.value.trim())}
					required
					fullWidth
					id="email"
					label="Indirizzo Email"
					name="email"
					autoComplete="email"
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sx={{ display: "flex", flexDirection: "column" }}
			>
				<Box
					sx={{
						maxWidth: 240,
					}}
				>
					<ReCAPTCHA
						style={{ marginRight: "1rem" }}
						sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY}
						onChange={(value) => setCaptcha(value)}
					/>
				</Box>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						margin: 3,
					}}
				>
					<Link
						onClick={() => {
							setShowReinviaMail(false);
						}}
						variant="body2"
						sx={{
							userSelect: "none",
							cursor: "pointer",
							color: (theme) =>
								theme.palette.mode === "light" ? "black" : "white",

							marginRight: "auto",
							marginTop: "auto",
							marginBottom: "auto",
						}}
					>
						Annulla
					</Link>

					<Button
						variant="contained"
						sx={{ mt: "auto" }}
						onClick={() => {
							if (!captcha) {
								handleCaptchaError();
								return;
							}
							//setDone(true);
							rinviaMailConferma(email);
						}}
						disabled={!email}
					>
						Invia
					</Button>
				</div>
			</Grid>
		</Grid>
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LayoutGeneral
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Registrati | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce register page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<Container
					maxWidth={"md"}
					component={Paper}
					sx={{
						padding: 3,
						marginTop: mdUp ? 3 : 0,
						marginBottom: mdUp ? 3 : 0,
					}}
				>
					{/* TODO: Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
					{/* TODO: Icons are not centered properly */}

					{showReinviaMail === true ? (
						reinviaMailScreen
					) : (
						<>
							<Stepper
								activeStep={activeStep}
								alternativeLabel
							>
								{underage
									? underageSteps.map((label) => (
											<Step key={label}>
												<StepLabel>{label}</StepLabel>
											</Step>
									  ))
									: steps.map((label) => (
											<Step key={label}>
												<StepLabel>{label}</StepLabel>
											</Step>
									  ))}
							</Stepper>

							<React.Fragment>
								{getStepContent(activeStep)}
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
										alignContent: "space-between",
										marginTop: "2em",
									}}
								>
									{activeStep == 0 && (
										<Link
											onClick={() => Router.push("/account/login")}
											variant="body2"
											sx={{
												userSelect: "none",
												cursor: "pointer",
												color: (theme) =>
													theme.palette.mode === "light" ? "black" : "white",

												marginRight: "auto",
												marginTop: "auto",
												marginBottom: "auto",
											}}
										>
											Hai già un account? Accedi
										</Link>
									)}
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											sx={{ mt: "auto", ml: 1, marginRight: "auto" }}
										>
											Precedente
										</Button>
									)}

									{underage
										? activeStep === underageSteps.length - 1
											? finalize
											: next
										: activeStep === steps.length - 1
										? finalize
										: next}
								</Box>
							</React.Fragment>
						</>
					)}
				</Container>
				<Container
					maxWidth={"md"}
					sx={{ mt: 3, mb: 3 }}
				>
					<Button
						fullWidth
						variant="contained"
						onClick={() => setShowReinviaMail(true)}
						sx={{
							mt: 3,
							mb: 3,

							marginRight: "auto",
							display: "flex",
						}}
					>
						Email non ricevuta? Richiedi un nuovo invio
					</Button>
				</Container>
			</LayoutGeneral>
		</ThemeProvider>
	);
};
export default SignUp;
