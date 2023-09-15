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
	Paper,
	Step,
	StepLabel,
	Stepper,
	Toolbar,
	useMediaQuery,
} from "@mui/material";

import Step1 from "src/components/account/register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "src/components/account/register/Step2";
import Step3 from "src/components/account/register/Step3";
import Router from "next/router";
import { useEffect, useState, useRef } from "react";

import eCommerceConf from "eCommerceConf.json";
import dayjs, { Dayjs } from "dayjs";

import {
	Sex,
	Focus,
	AutocompleteSelected,
	Date,
	ComunePaese,
	PasswordSafety,
	UserData,
} from "src/components/CommonTypesInterfaces";

import PrivacyLabel from "src/components/utils/PrivacyLabel";
import { Paesi } from "src/components/account/register/ProvinciePaesi";
import ReCAPTCHA from "react-google-recaptcha";
import stringUpperCase from "src/components/utils/stringUpperCase";
import getComuni from "src/components/utils/getComuni";
import CodiceFiscale from "codice-fiscale-js";

const SignUp = () => {
	const theme = useTheme();

	const focus = useRef<Focus>(null);

	const StyledImageLogo = styled(Image)({
		padding: "10px",
		maxWidth: 300,
	});
	const [activeStep, setActiveStep] = useState(0);

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

	const [notes, setNotes] = useState<string | undefined>("");

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
			setPlaceOfBirth={setPlaceOfBirth}
			address={address}
			setAddress={setAddress}
			city={city}
			setCity={setCity}
			cap={cap}
			setCap={setCap}
			province={province}
			setProvince={setProvince}
			email={email}
			setEmail={setEmail}
			phoneNumber={phoneNumber}
			setPhoneNumber={setPhoneNumber}
			privacy={privacy}
			setPrivacy={setPrivacy}
			notes={notes}
			setNotes={setNotes}
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
			setPlaceOfBirth={setParentPlaceOfBirth}
			address={parentAddress}
			setAddress={setParentAddress}
			city={parentCity}
			setCity={setParentCity}
			cap={parentCap}
			setCap={setParentCap}
			province={parentProvince}
			setProvince={setParentProvince}
			phoneNumber={parentPhoneNumber}
			setPhoneNumber={setParentPhoneNumber}
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
		/>
	);

	function getStepContent(step: number) {
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
					throw new Error("Unknown step");
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
					throw new Error("Unknown step");
			}
		}
	}

	const mdUp = useMediaQuery(theme.breakpoints.up("md"), {
		noSsr: false,
	});

	useEffect(() => {
		if (dateOfBirth) {
			updateUnderage(dateOfBirth);
		}
	}, [dateOfBirth]);

	const sendData = (data: UserData) => {
		console.log("YES!");
	};

	// TODO: Handle dateOfBirth and Cap

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

			setActiveStep(activeStep + 1);
		} else if (
			(underage && activeStep === 3) ||
			(!underage && activeStep === 2)
		) {
			if (!readyToSend.data) {
				return;
			}
			sendData(readyToSend.data);
			setActiveStep(activeStep + 1);
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setCaptcha(null);
		setActiveStep(activeStep - 1);
	};

	const next = (
		<Button
			variant="contained"
			disabled={disableButton}
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="static"
				sx={{
					backgroundColor: (
						theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as {
							backgroundColor?: string;
						}
					)?.backgroundColor,
				}}
			>
				<Container sx={{ display: "flex", alignItems: "center" }}>
					<Toolbar>
						<StyledImageLogo
							src="/images/LogoO.png"
							alt="Logo"
							width={200}
							height={70}
							priority={true}
						/>
					</Toolbar>
				</Container>
			</AppBar>
			<Container
				maxWidth={"md"}
				component={Paper}
				sx={{ padding: 3, marginTop: mdUp ? 3 : 0, marginBottom: mdUp ? 3 : 0 }}
			>
				{/* TODO: Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
				{/* TODO: Icons are not centered properly */}
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
				{activeStep === (underage ? underageSteps.length : steps.length) ? (
					<React.Fragment>
						<Typography
							variant="h5"
							gutterBottom
							sx={{ marginTop: 3 }}
							textAlign={"center"}
						>
							Registrazione Completata
						</Typography>
						<Typography
							variant="subtitle1"
							textAlign={"center"}
						>
							Il tuo account è stato registrato con successo
						</Typography>
						<Button
							fullWidth
							variant="contained"
							onClick={() => Router.push("/account/login")}
							sx={{
								mt: 3,
								mb: 2,
								width: 500,
								marginLeft: "auto",
								marginRight: "auto",
								display: "flex",
							}}
						>
							Accedi
						</Button>
					</React.Fragment>
				) : (
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
				)}
			</Container>
		</ThemeProvider>
	);
};
export default SignUp;
