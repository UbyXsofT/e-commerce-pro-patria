import React from "react";
import { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCart, setLoading, setCentri } from "src/store/actions";

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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//*-- API---*//
//import esempio from "../api/esempio";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import callNodeService from "pages/api/callNodeService";
import {
	CartProdotto,
	obyPostData,
	Prodotto,
	responseCall,
	StoreState,
	Cart,
} from "src/components/CommonTypesInterfaces";
import ProductStepper from "src/components/product/ProductStepper";
import { Dispatch } from "redux";
import FormatString from "../utils/FormatString";
import fetchCentri from "../utils/fetchCentri";
// const productPage = () => {

export const removeFromCart = (
	prodotto: Prodotto,
	cart: Cart,
	dispatch: Dispatch
): void => {
	const user = cart.at(0);

	let filteredCart = null;

	if (user) {
		filteredCart = user.cart.filter((storedProdotto) => {
			if (storedProdotto.id !== prodotto.id) {
				return storedProdotto;
			}
		});
	} else {
		return;
	}

	dispatch(setCart([{ userId: user.userId, cart: filteredCart }]));
};

const ProductPage = (productId: any) => {
	const router = useRouter();
	const [activeStep, setActiveStep] = React.useState(0);
	const prodotto: Prodotto | null = useSelector(
		(state: StoreState) => state.actualProduct
	);

	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const centri = useSelector((state: StoreState) => state.centri);
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);
	const addToCart = (prodotto: Prodotto): void => {
		const configurableProdotto: CartProdotto = {
			...prodotto,
			configuration: null,
		};

		let user = cart.at(0);

		user
			? dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [...user.cart, configurableProdotto],
						},
					])
			  )
			: dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [configurableProdotto],
						},
					])
			  );
	};

	const isInCart = (prodotto: Prodotto): boolean => {
		let user = cart.at(0);

		if (!user) {
			return false;
		}

		let filteredCart = user.cart.filter((storedProdotto) => {
			if (storedProdotto.id === prodotto.id) {
				return storedProdotto;
			}
		});

		if (filteredCart.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	React.useEffect(() => {
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

		console.log("@@@@ xxxx ProductPage actualProduct: ", prodotto);

		if (prodotto === null) {
			const checkCentri = async () => {
				if (centri.centri.length === 0) {
					const data = await fetchCentri(authUser?.USERID, 0);
					dispatch(setCentri(data));
				}
				router.push("/auth/store");
			};
			checkCentri();
		}

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

				{/* <Typography
					variant="h5"
					component="h1"
					gutterBottom
				>
					Product Details: {prodotto?.nome}
				</Typography> */}
				<ProductStepper activeStep={activeStep} />

				<Container
					style={{
						marginTop: "1em",
						marginBottom: "1em",
					}}
				>
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
								style={{ width: "100%", borderRadius: "5px" }}
							/>
						</Grid>

						{/* Dettagli a destra */}
						<Grid
							item
							xs={12}
							md={6}
						>
							<Typography variant="h4">{prodotto?.nome}</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ whiteSpace: "pre-line" }}
							>
								<FormatString descrizione={prodotto?.descrizione} />
							</Typography>
							<Typography variant="h6">
								Prezzo: ${prodotto?.prezzo.toFixed(2)}
							</Typography>

							{/* Bottone Aggiungi al Carrello */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: "30px",
									bottom: 0,
									position: "relative",
								}}
							>
								<Button
									onClick={() =>
										isInCart(prodotto)
											? removeFromCart(prodotto, cart, dispatch)
											: addToCart(prodotto)
									}
									variant="contained"
								>
									<ShoppingCartIcon style={{ marginRight: 20 }} />
									{isInCart(prodotto)
										? "Rimuovi dal Carrello"
										: "Aggiungi Al Carrello"}
								</Button>
							</div>
						</Grid>

						<Button
							variant="contained"
							disabled={activeStep === 2 ? true : false}
							//disabled={disableButton}
							onClick={() => setActiveStep(activeStep + 1)}
							sx={{ mt: "auto", ml: 1 }}
						>
							Successivo
						</Button>
					</Grid>
				</Container>
			</Layout>
		</ThemeProvider>
	);
};

export default ProductPage;
