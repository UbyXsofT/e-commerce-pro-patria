import React from "react";
import router, { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
//*-----*//
import { Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

//*-- API---*//
//import esempio from "../api/esempio";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import callNodeService from "pages/api/callNodeService";
import {
	obyPostData,
	responseCall,
} from "src/components/CommonTypesInterfaces";

import { setGetSessionIdTommys } from "src/components/listino/utils/functionsCart";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const cancelPayment = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const router = useRouter();
	const idSessione = router.query.SessionID
		? (router.query.SessionID as string)
		: null;

	React.useEffect(() => {
		if (idSessione !== null) {
			console.log("idSessione PRESENTE: ", idSessione);

			const registraCancellaSessionePagamento = async () => {
				try {
					let esitoFetch = await setGetSessionIdTommys("1", "clienteID", ""); // Attendiamo che setGetSessionIdTommys() sia completato prima di proseguire

					if (esitoFetch === true) {
						console.log(
							"@@@ fetch registraCancellaSessionePagamento POSITIVO!"
						);
					} else {
						// mostro errore
						console.log("@@@ fetch registraCancellaSessionePagamento FALLITO!");
					}
				} catch (error) {
					console.log(
						"Errore nell'esecuzione di registraCancellaSessionePagamento:",
						error
					);
				}
			};

			registraCancellaSessionePagamento();
		}
	}, [idSessione]);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`cancelPayment | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce cancelPayment page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						// justifyContent: "center",
						height: "100vh",
						paddingTop: 4,
					}}
				>
					<ErrorOutlineIcon
						sx={{
							fontSize: 100,
							color: theme.palette.error.main,
							marginBottom: 3,
						}}
					/>
					<Typography
						variant="h4"
						align="center"
					>
						Pagamento non completato!
					</Typography>
					<Typography
						variant="body1"
						align="center"
					>
						{`Il pagamento è stato annullato dall'utente o si è verificato un errore.`}
						<br />
						{`Si prega di riprovare o contattare il supporto tecnico per ulteriore assistenza.`}
						<br />
						{`È importante prendere nota e comunicare questo numero di sessione di pagamento: ${idSessione}`}
					</Typography>
				</Box>
			</Layout>
		</ThemeProvider>
	);
};

export default cancelPayment;
