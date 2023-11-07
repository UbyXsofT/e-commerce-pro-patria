import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";

//----------
import {
	Button,
	IconButton,
	Link,
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
	StoreState,
	CartAbbonamento,
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
import { getPrice, getPrices } from "./store";
import Router from "next/router";

const Carrello = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const cart = useSelector((state: StoreState) => state.cart);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const user = cart.at(0);

	const isCartEmpty = user ? user.cart.length === 0 : true ? true : false;

	type TotalPrice = {
		toShow: boolean;
		totalPrice: number;
		totalDiscountedPrice: number;
	};

	const [totalPrice, setTotalPrice] = useState<TotalPrice>({
		toShow: true,
		totalPrice: 0,
		totalDiscountedPrice: 0,
	});

	const calculateTotalPrice = (cart: CartAbbonamento[]): TotalPrice => {
		let totalPrice = 0;
		let totalDiscountedPrice = 0;

		cart.forEach((abbonamento) => {
			totalPrice += getPrices(abbonamento).basePrice;
			totalDiscountedPrice += getPrice(abbonamento);
		});

		return {
			toShow: totalPrice !== totalDiscountedPrice ? true : false,
			totalPrice: totalPrice, //Number(totalPrice.toFixed(2)),
			totalDiscountedPrice: totalDiscountedPrice, //Number(totalDiscountedPrice.toFixed(2)),
		};
	};

	useEffect(() => {
		let user = cart.at(0);
		if (!user) {
			return;
		}

		setTotalPrice(calculateTotalPrice(user.cart));
	}, [cart]);

	const handleCheckOut = () => {
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

		// try {
		// 	// Create Checkout Sessions from body params.
		// 	const session = await stripe.checkout.sessions.create({
		// 	  line_items: [
		// 		{
		// 		  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
		// 		  price: '{{PRICE_ID}}',
		// 		  quantity: 1,
		// 		},
		// 	  ],
		// 	  mode: 'payment',
		// 	  success_url: `${req.headers.origin}/?success=true`,
		// 	  cancel_url: `${req.headers.origin}/?canceled=true`,
		// 	});
		// 	res.redirect(303, session.url);
		//   } catch (err) {
		// 	res.status(err.statusCode || 500).json(err.message);
		//   }
		// let userId = {};
		// 		cart.forEach(element => {
		// 			console.log("@ -- element: ",element )
		// 			userId : element.userId
		// 			line_items: element.cart.map((cartItem) => ({
		// 				...cartItem,
		// 				quantity: 1,
		// 			})),
		// 		});

	



		const CreateCheckOutSession = async () => {
			const handleSuccess = (msg_Resp: any) => {
				console.log(
					"@@@ CreateCheckOutSession @@@@ ----- > handleSuccess: ",
					msg_Resp
				);
				try {
					if (msg_Resp.messageCli.url) {
						window.location.href = msg_Resp.messageCli.url;
					}
				} catch (error) {
					console.log("error CreateCheckOutSession: ", error);
				}
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
			// Ottieni il protocollo, il dominio e la porta dalla finestra del browser
			const protocol = window.location.protocol ?? "https:";
			const domain = window.location.hostname;
			const port = window.location.port;

			console.log(`Protocollo: ${protocol}`);
			console.log(`Dominio: ${domain}`);
			console.log(`Porta: ${port || "80"}`); // La porta può essere vuota se è la porta predefinita (80 per HTTP, 443 per HTTPS)
			let userId = cart[0].userId;
			const obyPostDataCart = {
				userId: userId,
				clienteKey: eCommerceConf.ClienteKey,
				line_items: cart[0].cart.map(item => ({
				  id: item.id,
				  nome: item.nome,
				  prezzo: item.prezzo,
				  immagine: item.immagine,
				  descrizione: item.descrizione,
				  convenzione: item.convenzione,
				  promozione: item.promozione,
				  sceltaOrari: item.sceltaOrari,
				  configuration: item.configuration,
				  quantity: 1,
				})),
				mode: "payment",
				success_url: `${protocol}//${domain}:${port}/auth/successPayment`,
				cancel_url: `${protocol}//${domain}:${port}/auth/cancelPayment`,
			  };
			  

			try {
				const respCall: responseCall = await callNodeService(
					"stripe/checkout-session",
					obyPostDataCart,
					null
				);
				handleSuccess(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		CreateCheckOutSession();
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				title={`Carrello | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce carrello page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<Container>
					{isCartEmpty ? (
						<Box
							textAlign={"center"}
							marginTop={12}
						>
							<Typography
								variant="h4"
								gutterBottom
							>
								<strong>Il Carrello è vuoto</strong>
							</Typography>
							<Typography variant="h5">
								Per Aggiungere Prodotti visita gli{" "}
								<Link
									onClick={() => Router.push("/auth/store")}
									sx={{
										mt: 2,
										textAlign: "center",
										cursor: "pointer",
										color: (theme) =>
											theme.palette.mode === "light" ? "black" : "white",
									}}
								>
									Abbonamenti
								</Link>
							</Typography>
						</Box>
					) : (
						<>
							<Typography variant="h4">
								<strong>Il tuo carrello</strong>
							</Typography>
							<List>
								{user ? (
									user.cart.map((abbonamento) => {
										const prices = getPrices(abbonamento);

										const sconti = (
											<Stack direction={"row"}>
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
															src={
																abbonamento.immagine ? abbonamento.immagine : ""
															}
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
																<Typography>
																	{abbonamento.descrizione}
																</Typography>
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

								<Button
									variant="contained"
									onClick={() => handleCheckOut()}
								>
									CHECKOUT
								</Button>
							</Stack>
						</>
					)}
				</Container>
			</Layout>
		</ThemeProvider>
	);
};

export default Carrello;
