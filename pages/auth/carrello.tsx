import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
//STRIPE LOAD
import { loadStripe } from "@stripe/stripe-js";
//----------
import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//*-----*//
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
//*-- API---*//
//import esempio from "../api/esempio";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import {
	responseCall,
	authStripe,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import { Box, Container, Stack } from "@mui/system";
import {
	DeleteRounded,
	Discount,
	EditCalendar,
	Handshake,
} from "@mui/icons-material";
import { removeFromCart } from "src/components/product/ProductCard";
import { getPrices } from "./store";

const Carrello = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const cart = useSelector((state: StoreState) => state.cart);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const user = cart.at(0);

	const [stripeSecretKey, setStripeSecretKey] = React.useState(null);

	type TotalPrice = {
		toShow: boolean;
		totalPrice: number;
		totalDiscountedPrice: number;
	};

	const [totalPrice, setTotalPrice] = useState<TotalPrice>({
		toShow: true,
		totalPrice: 126,
		totalDiscountedPrice: 100,
	});

	React.useEffect(() => {
		const fetchStripeKey = async () => {
			const handleSuccess = (msg_Resp: any) => {
				//success
				console.log(msg_Resp);

				try {
					if (
						msg_Resp.messageCli.message.stripeKeys !== null ||
						msg_Resp.messageCli.message.stripeKeys !== undefined
					) {
						setStripeSecretKey(
							msg_Resp.messageCli.message.stripeKeys.PUBLISHABLE_KEY
						);
					} else {
						const textAlert = (
							<React.Fragment>
								<h3>
									<strong>Stripe Key non valida!</strong>
								</h3>
							</React.Fragment>
						);
						showAlert(
							"filled",
							"error",
							"ATTENZIONE!",
							textAlert,
							true,
							"/account/login"
						);
					}
				} catch (error) {
					const textAlert = (
						<React.Fragment>
							<h3>
								<strong>"Errore assegnazione Stripe Key"</strong>
							</h3>
						</React.Fragment>
					);
					showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
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

			const obyPostData: authStripe = {
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
		fetchStripeKey();
	}, []);

	const handleCheckout = async () => {
		setLoading(true);

		if (!stripeSecretKey) {
			console.error("Chiave di Stripe non disponibile");
			setLoading(false);
			return;
		}

		try {
			// Assicurati di chiamare `loadStripe` al di fuori del rendering di un componente
			// per evitare di ricreare l'oggetto `Stripe` ad ogni rendering.
			const stripe = await loadStripe(stripeSecretKey);

			if (!stripe) {
				console.error("L'oggetto Stripe è nullo");
				setLoading(false);
				return;
			}

			// Avvia il Checkout di Stripe
			const result = await stripe.redirectToCheckout({
				lineItems: [{ price: "10,200", quantity: 1 }],
				mode: "payment",
				successUrl: "http://localhost:3000/success",
				cancelUrl: "http://localhost:3000/cancel",
			});

			if (result.error) {
				console.error(result.error.message);
				setLoading(false);
			}
		} catch (error) {
			console.error("Errore durante il caricamento di Stripe:", error);
			setLoading(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				title={`Carrello | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce carrello page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<Container>
					<Typography variant="h4">
						<strong>Il tuo carrello</strong>
					</Typography>
					<List>
						{user ? (
							user.cart.map((abbonamento) => {
								const prices = getPrices(abbonamento);

								const sconti = (
									<Stack direction={isMobile ? "row" : "column"}>
										{abbonamento.convenzione.isConv ? (
											<Typography
												marginBottom={3}
												variant="h5"
											>
												<Tooltip
													title={
														<span
															style={{
																display: "flex",
																flexDirection: "column",
															}}
														>
															<Typography
																textAlign={"center"}
																variant="subtitle2"
															>
																Convenzione
															</Typography>
															<Typography variant="subtitle2">
																{abbonamento.convenzione.descConve}
															</Typography>
														</span>
													}
												>
													<IconButton>
														<Handshake color="success" />
													</IconButton>
												</Tooltip>
											</Typography>
										) : (
											<></>
										)}
										{abbonamento.promozione.isPromo ? (
											<Typography
												marginBottom={3}
												variant="h5"
											>
												<Tooltip
													title={
														<span
															style={{
																display: "flex",
																flexDirection: "column",
															}}
														>
															<Typography
																textAlign={"center"}
																variant="subtitle2"
															>
																Promozione
															</Typography>
															<Typography variant="subtitle2">
																{abbonamento.promozione.descPromo}
															</Typography>
														</span>
													}
												>
													<IconButton>
														<Discount color="success" />
													</IconButton>
												</Tooltip>
											</Typography>
										) : (
											<></>
										)}
										{abbonamento.sceltaOrari.isOrari ? (
											<Typography
												marginBottom={3}
												variant="h5"
											>
												<Tooltip
													title={
														<span
															style={{
																display: "flex",
																flexDirection: "column",
															}}
														>
															<Typography
																textAlign={"center"}
																variant="subtitle2"
															>
																Orario Configurabile <br />
															</Typography>
															<Typography variant="h6">
																{`${abbonamento.sceltaOrari.daOrari} - ${abbonamento.sceltaOrari.aOrari}`}
															</Typography>
														</span>
													}
												>
													<IconButton>
														<EditCalendar />
													</IconButton>
												</Tooltip>
											</Typography>
										) : (
											<></>
										)}
									</Stack>
								);

								return (
									<ListItem>
										<ListItemText>
											<Stack
												alignItems={"center"}
												spacing={2}
												direction={isMobile ? "column" : "row"}
											>
												<Image
													src={abbonamento.immagine ? abbonamento.immagine : ""}
													alt={abbonamento.nome}
													width={125}
													height={125}
													style={{ borderRadius: 5 }}
												/>
												<Stack spacing={2}>
													<Box width={"200px"}>
														<Typography variant="h6">
															{abbonamento.nome}
														</Typography>
														<Typography>{abbonamento.descrizione}</Typography>
													</Box>
													{prices.discountedPrice ? (
														<Stack
															direction={"row"}
															spacing={2}
														>
															<Typography
																variant="h6"
																textAlign={"center"}
																color={"green"}
															>
																{prices.discountedPrice}€
															</Typography>
															<Typography
																variant="h6"
																textAlign={"center"}
																color={"grey"}
																style={{
																	position: "relative",
																}}
															>
																{prices.basePrice}€
																<span
																	style={{
																		position: "absolute",
																		top: "50%",
																		left: "50%",
																		transform:
																			"translate(-50%, -50%) rotate(-20deg)",
																		background: "red",
																		width: "100%",
																		height: "2px",
																	}}
																></span>
															</Typography>
														</Stack>
													) : (
														<Typography variant="h6">
															<strong>{prices.basePrice}€</strong>
														</Typography>
													)}
													{isMobile ? sconti : <></>}
												</Stack>
												{!isMobile ? sconti : <></>}
											</Stack>
										</ListItemText>
										<IconButton
											edge="end"
											aria-label="delete"
											sx={{
												marginRight: "auto",
												color: theme.palette.error.main,
											}}
											onClick={() =>
												removeFromCart(abbonamento, cart, dispatch)
											}
										>
											<DeleteRounded />
										</IconButton>
									</ListItem>
								);
							})
						) : (
							<></>
						)}
					</List>
					<Stack
						direction={"row"}
						spacing={2}
						justifyContent={"space-between"}
					>
						<Typography variant="h5">
							{`Totale: `}
							{totalPrice.toShow ? (
								<Stack
									display={"inline-flex"}
									direction={"row"}
									spacing={2}
								>
									<Typography
										variant="h5"
										textAlign={"center"}
										color={"green"}
									>
										<strong>{totalPrice.totalDiscountedPrice}€</strong>
									</Typography>
									<Typography
										variant="h5"
										textAlign={"center"}
										color={"grey"}
										style={{
											position: "relative",
										}}
									>
										{totalPrice.totalPrice}€
										<span
											style={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%) rotate(-20deg)",
												background: "red",
												width: "100%",
												height: "2px",
											}}
										></span>
									</Typography>
								</Stack>
							) : (
								<strong>{totalPrice.totalPrice}€</strong>
							)}
						</Typography>
						{stripeSecretKey && (
							<Button
								variant="contained"
								onClick={handleCheckout}
							>
								CHECKOUT
							</Button>
						)}
					</Stack>
				</Container>
			</Layout>
		</ThemeProvider>
	);
};

export default Carrello;
