import React from "react";
import { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
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
	FormControl,
	FormHelperText,
	Link,
	Fade,
	AppBar,
	Toolbar,
	Collapse,
	Box,
	Icon,
	useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import callNodeService from "pages/api/callNodeService";
import {
	obyPostData,
	obyPostIdSessioneData,
	responseCall,
	StoreState,
} from "src/components/CommonTypesInterfaces";

// Importa i moduli necessari
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const successPayment = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const authUser = useSelector((state: StoreState) => state.authUser);

	const idSessione = router.query.SessionID
		? (router.query.SessionID as string)
		: null;

	const [msgShow, setMsgShow] = React.useState("");
	const [isRegisterIdTrue, setIsRegisterIdTrue] = React.useState(false);
	React.useEffect(() => {
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading
		if (idSessione !== null && isRegisterIdTrue === false) {
			const saveAndCloseSessionID = async () => {
				const handleError = (error: any) => {
					setMsgShow(error);
				};

				const setIdSessioneData: obyPostIdSessioneData = {
					clienteKey: eCommerceConf.ClienteKey,
					op: "2",
					Cliente: authUser?.USERID ?? "",
					ID_Sessione: idSessione,
				};

				try {
					const respCall_IdSessione: responseCall = await callNodeService(
						"ecommerce-registra-pagamento",
						setIdSessioneData,
						null
					);
					console.log(
						"respCall_IdSessione: ",
						respCall_IdSessione.messageCli.message
					);
					if (respCall_IdSessione.successCli) {
						setMsgShow(
							"Grazie per il tuo acquisto. Riceverai una conferma via email."
						);
					} else {
						handleError(
							"Non siamo riusciti a memorizzare lo stato del tuo pagamento nel sistema del tuo centro fitness. Ti invitiamo a contattare il tuo centro fitness per assistenza, comunicando questo codice di sessione di riferimento: " +
								idSessione
						);
					}
				} catch (error) {
					console.log("respCall: ", error);
					handleError(
						"Non siamo riusciti a memorizzare lo stato del tuo pagamento nel sistema del tuo centro fitness. Ti invitiamo a contattare il tuo centro fitness per assistenza, comunicando questo codice di sessione di riferimento: " +
							idSessione
					);
				} finally {
					setIsRegisterIdTrue(true);
					dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
				}
			};

			if (authUser?.USERID && isRegisterIdTrue === false) {
				console.log(
					"@@@@@ --- REGISTRAZIONE PAGAMENTO ID-SESSIONE: ",
					idSessione
				);
				saveAndCloseSessionID();
				setIsRegisterIdTrue(true); // Imposta il flag per indicare che la registrazione è avvenuta
			}
		} else if (idSessione !== null && isRegisterIdTrue === true) {
			setMsgShow("");
		} else {
			setMsgShow("Codice sessione assente.");
			dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
		}
	}, [idSessione, isRegisterIdTrue, authUser]);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`successPayment | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce successPayment page, using React.js Next.js and Material-UI. Powered by Byteware srl."
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
					<CheckCircleOutlineIcon
						sx={{
							fontSize: 100,
							color: theme.palette.success.main,
							marginBottom: 3,
						}}
					/>
					<Typography
						variant="h4"
						align="center"
					>
						Pagamento completato con successo!
					</Typography>
					<Typography
						variant="body1"
						align="center"
					>
						{msgShow}
					</Typography>
				</Box>
			</Layout>
		</ThemeProvider>
	);
};

export default successPayment;
