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
} from "@mui/material";
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

const cancelPayment = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`cancelPayment | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce cancelPayment page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				<Typography
					variant="h5"
					component="h1"
					gutterBottom
				>
					PAGAMENTO NON EFFETTUATO!
				</Typography>
			</Layout>
		</ThemeProvider>
	);
};

export default cancelPayment;
