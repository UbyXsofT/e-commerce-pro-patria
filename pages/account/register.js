import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useTheme} from "@emotion/react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import {width} from "@mui/system";
import TemaSwitch from "../../src/components/theme/TemaSwitch";
import {AppBar, FormControl, FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper, Toolbar} from "@mui/material";
import {MuiTelInput} from "mui-tel-input";

import Step1 from "./register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "./register/Step2";
import Step3 from "./register/Step3";
import Router from "next/router";

export default function SignUp() {
	const theme = useTheme();

	const StyledImageLogo = styled(Image)({
		padding: "10px",
		maxWidth: 300,
	});
	const [activeStep, setActiveStep] = React.useState(0);

	const steps = ["Dati Personali", "Utente", "Finalizza"];

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <Step1 />;
			case 1:
				return <Step2 />;
			case 2:
				return <Step3 />;
			default:
				throw new Error("Unknown step");
		}
	}

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar
				position='static'
				sx={{
					backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
				}}
			>
				<Container sx={{display: "flex", alignItems: "center"}}>
					<Toolbar>
						<StyledImageLogo
							src='/images/LogoO.png'
							alt='Logo'
							width={200}
							height={70}
							priority={true}
						/>
					</Toolbar>
					<TemaSwitch />
				</Container>
			</AppBar>
			<Container maxWidth={"md"}>
				{/* Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
				<Stepper
					activeStep={activeStep}
					sx={{pt: 3}}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography
							variant='h5'
							gutterBottom
							sx={{marginTop: 3}}
							textAlign={"center"}
						>
							Registrazione Completata
						</Typography>
						<Typography
							variant='subtitle1'
							textAlign={"center"}
						>
							Il tuo account è stato registrato con successo
						</Typography>
						<Button
							fullWidth
							variant='contained'
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
									variant='body2'
									sx={{
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
									sx={{mt: "auto", ml: 1, marginRight: "auto"}}
								>
									Precedente
								</Button>
							)}

							<Button
								variant='contained'
								onClick={handleNext}
								sx={{mt: "auto", ml: 1}}
							>
								{activeStep === steps.length - 1 ? "Finalizza" : "Successivo"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Container>
		</ThemeProvider>
	);
}
