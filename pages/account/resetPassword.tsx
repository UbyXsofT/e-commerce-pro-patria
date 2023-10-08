import React, { useEffect, useState } from "react";
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
	CssBaseline,
	Paper,
	Box,
	Avatar,
	Link,
	useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "src/store/actions";

import Image from "next/image";
import { styled } from "@mui/material/styles";

import callNodeService from "pages/api/callNodeService";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { responseCall, resetPsw } from "src/components/CommonTypesInterfaces";
import eCommerceConf from "eCommerceConf.json";
import Step1 from "src/components/account/resetPassword/Step1";
import Step2 from "src/components/account/resetPassword/Step2";
import { useRouter } from "next/router";
import LayoutGeneral from "src/components/layout/LayoutGeneral";

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const resetPassword = (_setLoading: any) => {
	const router = useRouter();
	const { origin } = router.query;

	//setLoading(true); rende visibile il loading
	const theme = useTheme();
	const [done, setDone] = useState(false);

	const [email, setEmail] = useState("");
	const [codiceFiscale, setCodiceFiscale] = useState("");

	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: false,
	});

	const { showAlert } = useAlertMe();
	const [visLoader, setVisLoader] = React.useState(false);

	const fetchData = async () => {
		const handleResetPswResponse = (respCall: responseCall) => {
			const handleSuccess = (msg_Resp: any) => {
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{msg_Resp}</strong>
						</h3>
					</React.Fragment>
				);
				showAlert(
					"filled",
					"success",
					"Recupero Credenziali di Accesso Riuscito!",
					textAlert,
					true,
					"/account/login"
				);
			};

			const msg_Resp = respCall.messageCli.message;
			if (respCall.successCli) {
				console.log(msg_Resp);

				if (msg_Resp && msg_Resp.respWCF) {
					handleSuccess(msg_Resp.respWCF.message);
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

		const obyPostData: resetPsw = {
			clienteKey: eCommerceConf.ClienteKey,
			email: email,
			codFisc: codiceFiscale,
		};

		try {
			const respCall: responseCall = await callNodeService(
				"recupero-credenziali",
				obyPostData,
				null
			);
			handleResetPswResponse(respCall);
		} catch (error) {
			handleError(error);
		} finally {
			setVisLoader(false);
		}
	};

	useEffect(() => {
		if (done === true) {
			//alert("done! " + done);
			fetchData();
		}
	}, [done]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LayoutGeneral
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Recupera credenziali | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<Step1
					origin={origin}
					smUp={smUp}
					setDone={setDone}
					email={email}
					setEmail={setEmail}
					codiceFiscale={codiceFiscale}
					setCodiceFiscale={setCodiceFiscale}
				/>
			</LayoutGeneral>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(resetPassword);
