import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import Step1 from "src/components/account/setNewPassword/Step1";
import Step2 from "src/components/account/setNewPassword/Step2";
import LayoutGeneral from "src/components/layout/LayoutGeneral";
import eCommerceConf from "eCommerceConf.json";
import { useRouter } from "next/router";
import React from "react";
import callNodeService from "pages/api/callNodeService";
import {
	responseCall,
	setNewPsw,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import { setLoading } from "src/store/actions";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import CookieManager from "src/components/cookie/CookieManager";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const setNewPassword = () => {
	const theme = useTheme();
	const router = useRouter();
	const [done, setDone] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const smUp = useMediaQuery(theme.breakpoints.up("sm"));
	const { origin } = router.query;
	const user = useSelector((state: StoreState) => state.authUser);
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const { showAlert } = useAlertMe();

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
					`Attenzione e′ richiesto un nuovo accesso, con le nuove credenziali!`,
					textAlert,
					true,
					"/account/login"
				);
			};

			const msg_Resp = respCall.messageCli.message;
			if (respCall.successCli) {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log(msg_Resp);
				}
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
		let corpoMail =
			"Gentile Utente, \ninviamo la presente a conferma dell’avvenuta modifica della sua password di accesso all’E-Commerce.\n\nATTENZIONE: questo messaggio è stato inviato da un indirizzo abilitato solo per l'invio.\nSi prega di non rispondere a questa e-mail.\nIn caso di dubbi o domande, contattare il supporto clienti all’indirizzo: support@bytewarenet.com";

		const obyPostData: setNewPsw = {
			clienteKey: eCommerceConf.ClienteKey,
			UserID: userName ?? "null",
			Pwd_New: newPassword,
			mittente: user?.EMAILCENTRO ?? "null",
			destinatario: user?.EMAIL ?? "null",
			oggetto: eCommerceConf.oggetto_Mail,
			corpo: corpoMail,
		};

		try {
			const respCall: responseCall = await callNodeService(
				"cambio-password",
				obyPostData,
				null
			);
			handleResetPswResponse(respCall);
		} catch (error) {
			handleError(error);
		} finally {
			dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
		}
	};

	React.useEffect(() => {
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
				title={`Modifica password | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce password change, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<Step1
					origin={origin}
					smUp={smUp}
					setDone={setDone}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					confirmNewPassword={confirmNewPassword}
					setConfirmNewPassword={setConfirmNewPassword}
				/>
			</LayoutGeneral>
		</ThemeProvider>
	);
};

export default setNewPassword;
