import React from "react";
import { useRouter } from "next/router";
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
	FormControl,
	FormHelperText,
	Link,
	Fade,
	AppBar,
	Toolbar,
	Collapse,
	Box,
	Icon,
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
	responseCall,
} from "src/components/CommonTypesInterfaces";

// Importa i moduli necessari
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const successPayment = () => {
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
		}
	}, [idSessione]);
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
						Grazie per il tuo acquisto. Riceverai una conferma via email.
					</Typography>
				</Box>
			</Layout>
		</ThemeProvider>
	);
};

export default successPayment;
