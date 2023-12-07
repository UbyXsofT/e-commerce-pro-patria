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
	Prodotto,
	responseCall,
} from "src/components/CommonTypesInterfaces";
import ProductStepper from "src/components/product/ProductStepper";
// const productPage = () => {

interface ProductPageProps {
	prodotto?: Prodotto;
}

const ProductPage: React.FC<ProductPageProps> = ({ prodotto }) => {
	const router = useRouter();
	const [activeStep, setActiveStep] = React.useState(0);
	//const { prodotto }: Prodotto = router.query ;
	// Effettua il casting esplicito del tipo di router.query
	//const { prodotto }: { prodotto?: Prodotto } = router.query;

	// // Ora puoi accedere alle proprietà di prodotto senza errori
	// const { id, idCentro, nome, prezzo } = prodotto;

	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	React.useEffect(() => {
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

		const fetchData = async () => {
			const handleSuccess = (msg_Resp: any) => {
				//success data
			};
			const handleError = (error: any) => {
				//ERROR data
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

			const obyPostData: obyPostData = {
				clienteKey: eCommerceConf.ClienteKey,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"stripe/get-stripe-key",
					obyPostData,
					null
				);
				handleSuccess(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina del prodotto | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce product page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				<Typography
					variant="h5"
					component="h1"
					gutterBottom
				>
					Product Details: {prodotto?.nome}
				</Typography>
				<ProductStepper activeStep={activeStep} />

				<Container>
					<Grid
						container
						spacing={3}
					>
						{/* Immagine a sinistra */}
						<Grid
							item
							xs={12}
							md={6}
						>
							<img
								src={prodotto?.immagine ?? undefined}
								alt={prodotto?.nome}
								style={{ width: "100%" }}
							/>
						</Grid>

						{/* Dettagli a destra */}
						<Grid
							item
							xs={12}
							md={6}
						>
							<Typography variant="h4">{prodotto?.nome}</Typography>
							<Typography variant="body1">{prodotto?.descrizione}</Typography>
							<Typography variant="h6">
								Prezzo: ${prodotto?.prezzo.toFixed(2)}
							</Typography>

							{/* Bottone Aggiungi al Carrello */}
							<Button
								variant="contained"
								color="primary"
								// onClick={handleAddToCart}
							>
								Aggiungi al Carrello
							</Button>
						</Grid>
					</Grid>
				</Container>
			</Layout>
		</ThemeProvider>
	);
};

export default ProductPage;
