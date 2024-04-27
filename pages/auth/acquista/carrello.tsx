import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
import { setAuthUser } from "src/store/actions";

//----------
import {
	Backdrop,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	LinearProgress,
	linearProgressClasses,
	Link,
	List,
	ListItem,
	ListItemText,
	Paper,
	Popover,
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
	ActualProduct,
	CartTommys,
	TommysOggettiCarrello,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import { Box, Container, Stack } from "@mui/system";
import {
	numeroSenzaDecimale,
	removeFromCart,
	importoInCentesimi,
	useUpdateCartTommys,
	removeFromCartTommys,
} from "src/components/listino/utils/functionsCart";
// import { getPrice, getPrices } from "../../src/components/inutilizzati/store";
import Router from "next/router";
import chiaveRandom from "src/components/utils/chiaveRandom";
import renderPrice from "src/components/utils/renderPrice";
import myIcons from "src/theme/IconsDefine";
import LegendaIcone from "src/components/listino/utils/LegendaIcone";
import { Info } from "@mui/icons-material";
// export const renderPrice = (price: number): string =>
// 	price?.toString().replace(".", ",");

const AlertDeleteProduct = ({ open, onClose, product, onDelete }: any) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			BackdropComponent={Backdrop}
			BackdropProps={{
				style: { opacity: 0.5 }, // Imposta l'opacità del background al 50%
			}}
		>
			<Box sx={{ backgroundColor: "red", color: "white" }}>
				<DialogTitle id="alert-dialog-title">
					{myIcons.InfoRoundedIcon}
					<span
						style={{ marginLeft: "8px", marginTop: "-5px", marginRight: "8px" }}
					>
						ATTENZIONE!
					</span>
					<p>Si desidera eliminare questo abbonamento?</p>
				</DialogTitle>

				<DialogContent>
					<DialogContentText
						sx={{ backgroundColor: "red", color: "white" }}
						id="alert-dialog-description"
					>
						{`${product?.DESC}
						Importo: ${product?.IMPORTO}€`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="info"
						variant="contained"
						sx={{ color: "white", width: "100% !important" }}
						onClick={onClose}
					>
						<span style={{ marginLeft: "8px" }}>ANNULLA</span>
					</Button>
					<Button
						color="error"
						variant="contained"
						sx={{ color: "white", width: "100% !important" }}
						onClick={() => {
							onDelete(product?.CODICE ?? "nessuno");
							onClose();
						}}
					>
						<span style={{ marginLeft: "8px" }}>ELIMINA</span>
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

const Carrello = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const cart = useSelector((state: StoreState) => state.cart);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const authUser = useSelector((state: StoreState) => state.authUser);
	//const user = cart.at(0);

	const cartTommys = useSelector((state: StoreState) => state.cartTommys);
	//const isCartEmpty =	cartTommys?.TommysCart_OGGETTO?.length === 0 ? true : false;
	const [isCartEmpty, setIsCartEmpty] = useState(true);
	const authEcommerce = useSelector((state: StoreState) => state.authEcommerce);

	useEffect(() => {
		useUpdateCartTommys(cartTommys, dispatch, authUser, authEcommerce);
		setPrezzo(calculateTotalePrezzo);
		console.log("prezzo: ", prezzo);
	}, [cartTommys]);

	const [prezzo, setPrezzo] = useState(0);
	const calculateTotalePrezzo = () => {
		let totalePrezzo = 0;
		if (
			cartTommys?.TommysCart_OGGETTO &&
			cartTommys?.TommysCart_OGGETTO.length > 0
		) {
			setIsCartEmpty(false);
			cartTommys?.TommysCart_OGGETTO.forEach((prodotto) => {
				// Rimuovi le virgole dai valori degli importi e convertili in numeri float
				const importoSenzaVirgola = prodotto?.IMPORTO?.replace(",", ".") ?? "0";
				//console.log("importoSenzaVirgola: ", importoSenzaVirgola);
				const importoFloat = parseFloat(importoSenzaVirgola) || 0;
				//console.log("importoFloat: ", importoFloat);
				// Aggiungi il valore dell'importo alla somma totale
				totalePrezzo += importoFloat;
			});
		} else {
			setIsCartEmpty(true);
		}

		console.log("totalePrezzo: ", totalePrezzo);
		// Restituisci la somma totale con due decimali
		return parseFloat(totalePrezzo.toFixed(2));
	};

	// // const [showAllertMe, setShowAllertMe] = React.useState(false);
	const handleDeleteConferma = (codiceDel: string) => {
		console.log("codiceDel: ", codiceDel);
		removeFromCartTommys(codiceDel, cartTommys, dispatch);
		//setShowAllertMe(false);
	};

	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleOpenDeleteDialog = (product: TommysOggettiCarrello | any) => {
		setSelectedProduct(product);
	};

	const handleCloseDeleteDialog = () => {
		setSelectedProduct(null);
	};

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

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
					let prezzo: number | null = item.prezzoScontato
						? item.prezzoScontato
						: item.prezzo;
					let importoFix: number;
					importoFix = importoInCentesimi(prezzo as number);
					//importoFix = 100;
					console.log("CHK --- > prezzo : ", prezzo);
					console.log("CHK --- > importoFix : ", importoFix);

					return {
						id: item.codice,
						nome: item.nome,
						prezzo: importoFix,
						immagine: item.immagine,
						info: item.info,
						quantity: 1,
					};
				}),

				currency: "eur",
				mode: "payment",
				success_url: `${protocol}//${domain}:${port}/auth/successPayment`,
				cancel_url: `${protocol}//${domain}:${port}/auth/cancelPayment`,
			};

			console.log("CHK --- > obyPostDataCart : ", obyPostDataCart);
			//return;
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
				{/* <Container sx={{ marginBottom: "100px" }}> */}

				<Grid
					container
					style={{
						display: "block",
						marginBottom: "5rem",
						minHeight: "32rem",
					}}
				>
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
								Per Aggiungere Prodotti visita la sezione{" "}
								<Link
									onClick={() => Router.push("/auth/acquista/prodotti")}
									sx={{
										mt: 2,
										textAlign: "center",
										cursor: "pointer",
										color: (theme) =>
											theme.palette.mode === "light" ? "black" : "white",
									}}
								>
									Acquista
								</Link>
							</Typography>
						</Box>
					) : (
						<>
							<Grid
								container
								style={{
									justifyContent: "space-between",
									paddingRight: "0px",
								}}
							>
								<Typography
									variant="h4"
									style={{
										display: "flex",
										flexDirection: "row",
										flexWrap: "nowrap",
										alignItems: "center",
									}}
								>
									{React.cloneElement(myIcons.ShoppingCartIcon, {
										fontSize: "large",
										style: { marginRight: "20px", color: "red" },
									})}
									Il tuo Carrello
								</Typography>

								<Tooltip
									title={
										<span style={{ display: "flex", flexDirection: "column" }}>
											<Typography
												textAlign={"center"}
												variant="subtitle2"
											>
												Visualizza legenda icone
											</Typography>
										</span>
									}
								>
									<IconButton
										onClick={() => {
											openModal();
										}}
									>
										<Info color="info" />
									</IconButton>
								</Tooltip>
								<LegendaIcone
									isOpen={isModalOpen}
									onClose={closeModal}
								/>
							</Grid>
							{selectedProduct && (
								<AlertDeleteProduct
									open={true}
									onClose={handleCloseDeleteDialog}
									product={selectedProduct}
									onDelete={handleDeleteConferma}
								/>
							)}

							<List>
								{/* {cartTommys ? (
									cartTommys.TommysCart_OGGETTO.map( */}

								{cartTommys && cartTommys.TommysCart_OGGETTO ? (
									cartTommys.TommysCart_OGGETTO.map(
										(prodotto: TommysOggettiCarrello | any) => {
											return (
												<Paper
													elevation={1}
													key={chiaveRandom()}
													style={{ marginBottom: "1rem" }}
												>
													<ListItem
														sx={{ display: isMobile ? "block" : "flex" }}
														key={chiaveRandom()}
													>
														<ListItemText>
															<Stack
																alignItems={"center"}
																spacing={2}
																direction={isMobile ? "column" : "row"}
															>
																<Stack spacing={2}>
																	<Box
																		sx={{
																			display: "flex",
																			alignItems: "center",
																		}}
																		width={"100%"}
																	>
																		{React.cloneElement(myIcons.AbbIcon, {
																			fontSize: "medium",
																			style: { marginRight: "10px" },
																		})}
																		<Typography
																			variant="body1"
																			style={{ fontWeight: "normal" }}
																		>
																			{prodotto?.DESC}
																		</Typography>
																	</Box>

																	{/* <div
																	dangerouslySetInnerHTML={{
																		__html: prodotto?.Tommys_infoHtml as
																			| string
																			| TrustedHTML,
																	}}
																/> */}
																</Stack>
															</Stack>
														</ListItemText>
														<Typography
															variant="h5"
															textAlign={"right"}
															style={{
																position: "relative",
																marginLeft: "50px",
															}}
														>
															{prodotto?.IMPORTO}€
														</Typography>

														<Tooltip
															title={
																<span
																	style={{
																		display: "flex",
																		flexDirection: "column",
																	}}
																>
																	<Typography
																		textAlign="center"
																		variant="subtitle2"
																	>
																		Elimina
																	</Typography>
																</span>
															}
														>
															<IconButton
																sx={{
																	marginRight: "auto",
																	color: theme.palette.error.main,
																}}
																onClick={() => handleOpenDeleteDialog(prodotto)}
															>
																{React.cloneElement(myIcons.DeleteRoundedIcon, {
																	fontSize: "medium",
																})}
															</IconButton>
														</Tooltip>
													</ListItem>
												</Paper>
											);
										}
									)
								) : (
									<></>
								)}
							</List>

							<Stack
								direction={"row"}
								spacing={2}
								justifyContent={"space-between"}
								style={{
									display: "flex",
									justifyContent: "end",
									alignItems: "center",
								}}
							>
								<div>
									<Typography
										variant="h5"
										sx={{ fontWeight: "800" }}
									>{`Totale: `}</Typography>

									{/* {prezzo.totalePrezzoScontato ? (
										<Typography
											variant="h5"
											textAlign={"center"}
											style={{
												position: "relative",
											}}
										>
											{renderPrice(prezzo.totalePrezzoScontato)}€
										</Typography>
									) : ( */}
									<Typography
										variant="h5"
										textAlign={"center"}
										style={{
											position: "relative",
										}}
									>
										{renderPrice(prezzo)}€
									</Typography>
									{/* )} */}
								</div>

								<Button
									variant="contained"
									onClick={() => handleCheckOut()}
								>
									CHECKOUT
								</Button>
							</Stack>
						</>
					)}
				</Grid>
				{/* </Container> */}
			</Layout>
		</ThemeProvider>
	);
};

export default Carrello;
