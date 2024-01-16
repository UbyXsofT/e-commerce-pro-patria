import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
import { setAuthUser } from "src/store/actions";

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
	CartProdotto,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import { Box, Container, Stack } from "@mui/system";
import {
	DeleteRounded,
	Discount,
	EditCalendar,
	Handshake,
} from "@mui/icons-material";
import { removeFromCart } from "src/components/product/ProductPage";
import { getPrice, getPrices } from "../../src/components/inutilizzati/store";
import Router from "next/router";
import chiaveRandom from "src/components/utils/chiaveRandom";
import renderPrice from "src/components/utils/renderPrice";
// export const renderPrice = (price: number): string =>
// 	price?.toString().replace(".", ",");

const Carrello = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const cart = useSelector((state: StoreState) => state.cart);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const authUser = useSelector((state: StoreState) => state.authUser);
	const user = cart.at(0);
	const isCartEmpty = user ? user.cart.length === 0 : true ? true : false;

	type TotalPrice = {
		toShow: boolean;
		totalPrice: number;
		totalprezzoScontato: number;
	};

	const [totalPrice, setTotalPrice] = useState<TotalPrice>({
		toShow: true,
		totalPrice: 0,
		totalprezzoScontato: 0,
	});

	const calculateTotalPrice = (cart: CartProdotto[]): TotalPrice => {
		let totalPrice = 0;
		let totalprezzoScontato = 0;

		cart.forEach((prodotto) => {
			totalPrice += getPrices(prodotto).basePrice;
			totalprezzoScontato += getPrice(prodotto);
		});

		const totalPriceObj: TotalPrice = {
			toShow: totalPrice !== totalprezzoScontato ? true : false,
			totalPrice: Number(totalPrice.toFixed(2)),
			totalprezzoScontato: Number(totalprezzoScontato.toFixed(2)),
		};

		return totalPriceObj;
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

		const CreateCheckOutSession = async () => {
			const handleSuccess = (msg_Resp: any) => {
				console.log(
					"@@@ CreateCheckOutSession @@@@ ----- > handleSuccess: ",
					msg_Resp
				);
				const msg_error_session = `Ops! Siamo spiacenti, ma al momento riscontriamo un problema
				nella creazione della sessione di pagamento tramite Stripe.

				Ti invitiamo a riprovare tra qualche istante. Se il problema
				persiste, per favore, contatta il nostro servizio di
				assistenza. 
				
				Ci scusiamo per l'inconveniente e faremo del
				nostro meglio per risolvere la situazione al più presto.`;
				try {
					if (msg_Resp.successCli) {
						window.location.href = msg_Resp.messageCli.url;
					} else {
						//ERROR data
						console.log("error msg_Resp.successCli.url");
						//ERROR data
						const textAlert = (
							<React.Fragment>
								<h3>
									<strong>{msg_error_session}</strong>
								</h3>
							</React.Fragment>
						);
						showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
					}
				} catch (error) {
					//ERROR data
					console.log("error CreateCheckOutSession: ", error);
					const textAlert = (
						<React.Fragment>
							<h3>
								<strong> {msg_error_session}</strong>
							</h3>
						</React.Fragment>
					);
					showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
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

			const obyPostDataCart = {
				clienteKey: eCommerceConf.ClienteKey,
				userId: authUser?.USERID,
				emailUser: authUser?.EMAIL,
				emailCentro: authUser?.EMAILCENTRO,

				line_items: cart[0].cart.map((item) => {
					let numeroSenzaDecimale: number = Number(
						item.prezzo.toString().replace(".", "")
					);
					let importoInCentesimi: number = numeroSenzaDecimale * 100;

					return {
						id: item.id,
						nome: item.nome,
						prezzo: importoInCentesimi,
						immagine: item.immagine,
						descrizione: item.descrizione,
						convenzione: item.convenzione,
						promozione: item.promozione,
						sceltaOrari: item.sceltaOrari,
						configuration: item.configuration,
						quantity: 1,
					};
				}),

				currency: "eur",
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
				<Container sx={{ marginBottom: "100px" }}>
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
									onClick={() => Router.push("/auth/acquista")}
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
									user.cart.map((prodotto) => {
										const prices = getPrices(prodotto);

										return (
											<ListItem key={chiaveRandom()}>
												<ListItemText>
													<Stack
														alignItems={"center"}
														spacing={2}
														direction={isMobile ? "column" : "row"}
													>
														<Image
															src={
																prodotto.immagine
																	? prodotto.immagine
																	: "/images/LogoQ.png"
															}
															alt={prodotto.nome}
															width={125}
															height={125}
															style={{ borderRadius: 5 }}
														/>
														<Stack spacing={2}>
															<Box width={"200px"}>
																<Typography variant="h6">
																	{prodotto.nome}
																</Typography>
															</Box>
															{prices.prezzoScontato ? (
																<Stack
																	direction={"row"}
																	spacing={2}
																>
																	<Typography
																		variant="h6"
																		textAlign={"center"}
																		color={"green"}
																	>
																		{renderPrice(prices.prezzoScontato)}€
																	</Typography>
																	<Typography
																		variant="h6"
																		textAlign={"center"}
																		color={"grey"}
																		style={{
																			position: "relative",
																		}}
																	>
																		{renderPrice(prices.basePrice)}€
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
																	<strong>
																		{renderPrice(prices.basePrice)}€
																	</strong>
																</Typography>
															)}
														</Stack>
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
														removeFromCart(prodotto, cart, dispatch)
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
								style={{
									display: "grid",
									justifyContent: "end",
									marginTop: "50px",
								}}
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
												<strong>
													{renderPrice(totalPrice.totalprezzoScontato)}€
												</strong>
											</Typography>
											<Typography
												variant="h5"
												textAlign={"center"}
												color={"grey"}
												style={{
													position: "relative",
												}}
											>
												{renderPrice(totalPrice.totalPrice)}€
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
										<strong>{renderPrice(totalPrice.totalPrice)}€</strong>
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
