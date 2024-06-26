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
	obyPostIdSessioneData,
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
	const theme = useTheme();
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
			{/* <Box sx={{ backgroundColor: theme.palette.warning.main, color: "white" }}> */}
			<Box>
				<DialogTitle id="alert-dialog-title">
					{React.cloneElement(myIcons.InfoRoundedIcon, {
						fontSize: "medium",
						style: { marginRight: "5px", color: "red" },
					})}
					<span>
						ATTENZIONE!
						<br />
						Si desidera eliminare questo abbonamento?
					</span>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<span>
							{product?.DESC}
							<br />
							<br />
							{`Importo: ${product?.IMPORTO} €`}
						</span>
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

	const authEcommerce = useSelector((state: StoreState) => state.authEcommerce);
	const [isCheckLoading, setIsCheckLoading] = React.useState(true);
	const [isCartEmpty, setIsCartEmpty] = useState(false);

	useEffect(() => {
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading
		setIsCartEmpty(false);

		const aggiornaCarrello = async () => {
			await useUpdateCartTommys(cartTommys, dispatch, authUser, authEcommerce);
			if (
				cartTommys?.TommysCart_OGGETTO &&
				cartTommys?.TommysCart_OGGETTO.length > 0
			) {
				const calcPrezzo = await calculateTotalePrezzo();
				setPrezzo(calcPrezzo);
			} else {
				setIsCartEmpty(true);
			}
			dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			setIsCheckLoading(false);
		};
		aggiornaCarrello();
	}, [cartTommys]);

	const [prezzo, setPrezzo] = useState(0);
	const calculateTotalePrezzo = async () => {
		let totalePrezzo = 0;

		cartTommys?.TommysCart_OGGETTO.forEach((prodotto) => {
			// Rimuovi le virgole dai valori degli importi e convertili in numeri float
			const importoSenzaVirgola = prodotto?.IMPORTO?.replace(",", ".") ?? "0";
			const importoFloat = parseFloat(importoSenzaVirgola) || 0;
			// Aggiungi il valore dell'importo alla somma totale
			totalePrezzo += importoFloat;
		});

		// Restituisci la somma totale con due decimali
		return parseFloat(totalePrezzo.toFixed(2));
	};

	// // const [showAllertMe, setShowAllertMe] = React.useState(false);
	const handleDeleteConferma = async (codiceDel: string) => {
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("codiceDel: ", codiceDel);
		}
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading
		const resp = await removeFromCartTommys(
			codiceDel,
			cartTommys,
			authUser,
			dispatch
		);
		dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
		if (resp.eliminazioneEsito === true) {
			// Eliminazione riuscita
			if (resp.invioEmailEsito === true) {
				// Eliminazione riuscita, e invio email riuscito
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>Eliminazione avvenuta correttamente!</strong>
						</h3>
					</React.Fragment>
				);
				showAlert("filled", "success", "Informazione!", textAlert, true);
			} else {
				//invio email errore
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{resp.errorMessage}</strong>
						</h3>
					</React.Fragment>
				);
				showAlert("filled", "error", "Informazione!", textAlert, true);
			}
		} else {
			// Eliminazione fallita, puoi gestire l'errore o visualizzare un messaggio all'utente
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>{resp.errorMessage}</strong>
					</h3>
				</React.Fragment>
			);
			showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
		}
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
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log(
					"@@@ CreateCheckOutSession @@@@ ----- > handleSuccess: ",
					msg_Resp
				);
			}
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
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("error msg_Resp.successCli.url");
						}
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
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("error CreateCheckOutSession: ", error);
					}
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

			const getIdSessioneData: obyPostIdSessioneData = {
				clienteKey: eCommerceConf.ClienteKey,
				op: "1",
				Cliente: authUser?.USERID ?? "",
				ID_Sessione: "",
			};

			try {
				const respCall_IdSessione: responseCall = await callNodeService(
					"ecommerce-registra-pagamento",
					getIdSessioneData,
					null
				);
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log(
					"respCall_IdSessione: ",
					respCall_IdSessione.messageCli.message.SESSIONE
				);
			}
				if (respCall_IdSessione.successCli) {
					if (respCall_IdSessione.messageCli.message) {
						if (respCall_IdSessione.messageCli.message.ESITO === "0") {
							handleError(respCall_IdSessione.messageCli.message.ERRMSG);
						} else {
							const idSessione =
								respCall_IdSessione.messageCli.message.SESSIONE;

							if (idSessione !== "") {
								//provo a creare la sessione in stripe
								// Ottieni il protocollo, il dominio e la porta dalla finestra del browser
								const protocol = window.location.protocol ?? "https:";
								const domain = window.location.hostname;
								const port = window.location.port;
								if (eCommerceConf.ModalitaSviluppo === true){
								console.log(`Protocollo: ${protocol}`);
								console.log(`Dominio: ${domain}`);
								console.log(`Porta: ${port || "80"}`); // La porta può essere vuota se è la porta predefinita (80 per HTTP, 443 per HTTPS)
								}

								const infoToSendToStripe: any = [];
								const obyPostDataCart = {
									line_items: cartTommys?.TommysCart_OGGETTO.map(
										(prodotto: any) => {
											const importoSenzaVirgola =
												prodotto?.IMPORTO?.replace(",", ".") ?? "0";
											let prezzo: number | null = Number(importoSenzaVirgola);
											let importoFix: number;
											importoFix = importoInCentesimi(prezzo as number);
											//importoFix = 100;
											if (eCommerceConf.ModalitaSviluppo === true){
											console.log("CHK --- > prezzo : ", prezzo);
											console.log("CHK --- > importoFix : ", importoFix);
											}
											infoToSendToStripe.push({
												idSessioneTommys: idSessione ?? "NO ID SESSIONE",
												descProd: prodotto?.DESC ?? "NO DESC",
												prezzo: prodotto?.IMPORTO ?? "0",
											});
											return {
												id: `${prodotto.ID}-${prodotto.CODICE}`,
												nome: prodotto.DESC,
												prezzo: importoFix,
												immagine: [],
												quantity: 1,
											};
										}
									),
									clienteKey: eCommerceConf.ClienteKey,
									userId: authUser?.USERID,
									emailUser: authUser?.EMAIL,
									emailCentro: authUser?.EMAILCENTRO,
									dettaglioProdotti: infoToSendToStripe,
									currency: "eur",
									mode: "payment",
									success_url: `${protocol}//${domain}:${port}/auth/acquista/successPayment?SessionID=${idSessione}`,
									cancel_url: `${protocol}//${domain}:${port}/auth/acquista/cancelPayment?SessionID=${idSessione}`,
								};
								if (eCommerceConf.ModalitaSviluppo === true){
								console.log("CHK --- > obyPostDataCart : ", obyPostDataCart);
								}
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
							}
						}
					} else {
						handleError(
							"Non abbiamo ricevuto l'ID sessione dal sistema di Tommys. Impossibile creare la sessione di pagamento. Ti invitiamo a riprovare più tardi o a contattare il tuo centro fitness per assistenza."
						);
					}
				} else {
					handleError(
						"Non abbiamo ricevuto l'ID sessione dal sistema di Tommys. Impossibile creare la sessione di pagamento. Ti invitiamo a riprovare più tardi o a contattare il tuo centro fitness per assistenza."
					);
				}
			} catch (error) {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("respCall: ", error);
				}
				handleError(
					"Non abbiamo ricevuto l'ID sessione dal sistema di Tommys. Impossibile creare la sessione di pagamento. Ti invitiamo a riprovare più tardi o a contattare il tuo centro fitness per assistenza. Errore: " +
						error
				);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};

		if (
			cartTommys?.TommysCart_OGGETTO &&
			cartTommys?.TommysCart_OGGETTO.length > 0
		) {
			CreateCheckOutSession();
		}
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
					{isCheckLoading ? (
						<></>
					) : isCartEmpty === true ? (
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
