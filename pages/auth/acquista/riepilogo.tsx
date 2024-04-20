import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCart, setLoading } from "src/store/actions";
import { setAuthUser } from "src/store/actions";

//----------
import {
	Button,
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
	obyPostRegistraAcquisto,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import { Box, Container, Stack } from "@mui/system";
import { DeleteRounded, Info } from "@mui/icons-material";
import {
	numeroSenzaDecimale,
	removeFromCart,
	importoInCentesimi,
} from "src/components/listino/utils/functionsCart";
// import { getPrice, getPrices } from "../../src/components/inutilizzati/store";
import Router from "next/router";
import chiaveRandom from "src/components/utils/chiaveRandom";
import renderPrice from "src/components/utils/renderPrice";
import myIcons from "src/theme/IconsDefine";
import LegendaIcone from "src/components/listino/utils/LegendaIcone";
import router from "next/router";
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
	//const isCartEmpty = user ? user.cart.length === 0 : true ? true : false;

	const [isCheckInCorsoDisp, setIsCheckInCorsoDisp] = React.useState(false);

	const [progress, setProgress] = React.useState(0);
	const [buffer, setBuffer] = React.useState(10);
	const [isTimerActive, setIsTimerActive] = React.useState(false);

	const progressRef = React.useRef(() => {});

	React.useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setProgress(0);
				setBuffer(10);
			} else {
				const diff = Math.random() * 10;
				const diff2 = Math.random() * 10;
				setProgress(progress + diff);
				setBuffer(progress + diff + diff2);
			}
		};
	}, [progress]);

	React.useEffect(() => {
		// Quando isTimerActive cambia, ferma l'animazione

		let timer: any;

		if (!isTimerActive) {
			//false
			setProgress(100);
			setBuffer(100);
			setIsCheckInCorsoDisp(false);
		} else {
			//setIsCheckInCorsoDisp(true);
			const startTimer = () => {
				timer = setInterval(() => {
					progressRef.current();
				}, 500);
			};
			startTimer(); // Avvia il timer quando il componente viene montato

			const timeout = setTimeout(() => {
				clearInterval(timer);
				clearTimeout(timeout);
				setIsCheckInCorsoDisp(false);
				setIsTimerActive(false);
			}, eCommerceConf.TimerAttesaDispCarrello);
		}
	}, [isTimerActive]);

	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: 10,
		borderRadius: 0,
		[`&.${linearProgressClasses.barColorSecondary}`]: {},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 0,
		},
	}));

	type Prezzi = {
		//toShow: boolean;
		totalePrezzo: number;
		totalePrezzoScontato: number;
	};

	const [Prezzi, setPrezzi] = useState<Prezzi>({
		//toShow: true,
		totalePrezzo: 0,
		totalePrezzoScontato: 0,
	});

	const calculateTotalePrezzo = (cart: CartProdotto[]): Prezzi => {
		let totalePrezzo: number = 0;
		let totalePrezzoScontato: number = 0;

		cart?.forEach((prodotto: CartProdotto) => {
			totalePrezzo += prodotto?.prezzo ?? 0;
			totalePrezzoScontato += prodotto?.prezzoScontato ?? prodotto?.prezzo ?? 0;
		});

		const totalePrezzoObj: Prezzi = {
			//toShow: totalePrezzo !== totalePrezzoScontato ? true : false,
			totalePrezzo: Number(totalePrezzo.toFixed(2)),
			totalePrezzoScontato: Number(totalePrezzoScontato.toFixed(2)),
		};

		return totalePrezzoObj;
	};

	useEffect(() => {
		let user = cart.at(0);
		if (!user) {
			return;
		}
		//info contiene gli Orari
		// if (user?.cart[0]?.info?.includes("Orari")) {
		// 	setIsCheckInCorsoDisp(true);
		// } else {
		// 	setIsCheckInCorsoDisp(false);
		// }

		setPrezzi(calculateTotalePrezzo(user.cart));
	}, [cart]);

	const callCheckDispRegistraInDB = (prodotto: ActualProduct) => {
		console.log("****************** callCheckDispRegistraInDB");
		const fetchData = async () => {
			setIsTimerActive(true);
			const handleSuccess = (msg_Resp: any) => {
				//success data
				console.log("****************** handleSuccess msg_Resp: ", msg_Resp);
				if (msg_Resp.successCli === true) {
					if (isTimerActive === false) {
						router.push("/auth/acquista/carrello");
					}
				}
			};
			const handleError = (error: any) => {
				console.log("****************** handleError");
				//ERROR data
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{error}</strong>
						</h3>
					</React.Fragment>
				);
				setIsTimerActive(false);
				showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			let conv_prod = prodotto.Tommys_Importo?.replace(".", ",") ?? null;

			const obyPostRegistraAcquisto: obyPostRegistraAcquisto = {
				clienteKey: eCommerceConf.ClienteKey,
				Cliente: prodotto.Tommys_Cliente,
				Abbonamento: prodotto.Tommys_Abbonamento,
				DataIni: prodotto.Tommys_DataIni,
				Importo: conv_prod,
				Frequenze: prodotto.Tommys_Frequenze,
				Promo: prodotto.Tommys_Promo,
				Codice_Promo: prodotto.Tommys_Codice_Promo,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"ecommerce-registra-impegno-acquisto",
					obyPostRegistraAcquisto,
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
		// clienteKey:BytewareDemoBeta
		// Cliente:CLABKM5
		// Abbonamento:AB001
		// DataIni:2023-01-01
		// Importo:1.00
		// Frequenze:[CS000001][152][CS000012][250]
		// Promo:
		// Codice_Promo:

		// codice: null, //abbonamento
		// nome: null, //descrizione
		// prezzo: null, //
		// prezzoScontato: null,
		// immagine: null,
		// info: null,
		// quantity: null,
	};

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleCancel = (prodotto: any) => {
		// Implementa la logica per annullare le scelte dell'utente.
		// torno su acquista cancellando tutte le scelte
		removeFromCart(prodotto, cart, dispatch);
		router.push("/auth/acquista/prodotti");
	};
	const handleConfirm = (prodotto: any) => {
		callCheckDispRegistraInDB(prodotto);
		console.log(prodotto);
		//alert("gestire conferma");
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				title={`Carrello | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce carrello page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				{/* <Container sx={{ marginBottom: "100px" }}> */}
				{isCheckInCorsoDisp ? (
					<>
						<Paper
							elevation={5}
							sx={{
								backgroundColor:
									theme.palette.mode === "light" ? "white" : "black",
							}}
						>
							<Box
								textAlign={"center"}
								marginTop={"1rem"}
							>
								<Typography
									sx={{
										padding: "10px",
										fontWeight: 200,
										fontSize: "medium",
									}}
									gutterBottom
								>
									<strong>{eCommerceConf.MsgChkAttesaDispCarrello}</strong>
								</Typography>

								<BorderLinearProgress
									variant="buffer"
									value={progress}
									valueBuffer={buffer}
									// color="secondary"
								/>
							</Box>
						</Paper>
					</>
				) : (
					<Grid
						container
						style={{
							display: "block",
							marginBottom: "5rem",
							minHeight: "32rem",
						}}
					>
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
									{React.cloneElement(myIcons.SummarizeIcon, {
										fontSize: "large",
										style: { marginRight: "20px", color: "red" },
									})}
									Riepilogo scelte
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
							<List>
								{user ? (
									user.cart.map((prodotto: ActualProduct) => {
										return (
											<Paper
												elevation={0}
												key={chiaveRandom()}
												style={{ marginBottom: "1rem" }}
											>
												<ListItem key={chiaveRandom()}>
													<ListItemText>
														<Stack
															alignItems={"center"}
															spacing={2}
															direction={isMobile ? "column" : "row"}
														>
															<Stack spacing={2}>
																<Box
																	sx={{ display: "flex", alignItems: "center" }}
																	width={"100%"}
																>
																	{React.cloneElement(myIcons.AbbIcon, {
																		fontSize: "medium",
																		style: { marginRight: "10px" },
																	})}
																	<Typography
																		variant="h5"
																		sx={{ fontWeight: "bold" }}
																	>
																		{prodotto.nome}
																	</Typography>
																</Box>

																<div
																	dangerouslySetInnerHTML={{
																		__html: prodotto?.Tommys_infoHtml as
																			| string
																			| TrustedHTML,
																	}}
																/>
															</Stack>
														</Stack>
													</ListItemText>

													{/* <IconButton
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
												</IconButton> */}
												</ListItem>

												<Grid
													style={{
														display: "flex",
														justifyContent: "flex-end",
														padding: "10px",
														marginRight: "20px",
													}}
												>
													<Typography
														variant="h5"
														sx={{ fontWeight: "500", marginRight: "10px" }}
													>{`Prezzo: `}</Typography>

													{Prezzi.totalePrezzoScontato ? (
														<Typography
															variant="h5"
															textAlign={"center"}
															style={{
																position: "relative",
															}}
														>
															{renderPrice(Prezzi.totalePrezzoScontato)}€
														</Typography>
													) : (
														<Typography
															variant="h5"
															textAlign={"center"}
															style={{
																position: "relative",
															}}
														>
															{renderPrice(Prezzi.totalePrezzo)}€
														</Typography>
													)}
												</Grid>
												<Divider sx={{ mb: "1rem", mt: "1rem" }} />
												<div
													style={{
														display: "flex",
														alignItems: "center",
														width: "100%",
														justifyContent: "space-between",
														height: "min-content",
														padding: "20px",
													}}
												>
													<Button
														color="secondary"
														variant="contained"
														onClick={() => {
															handleCancel(prodotto);
														}}
														sx={{ color: "white" }}
													>
														{myIcons.HighlightOffIcon}
														<span style={{ marginLeft: "8px" }}>
															Annulla scelte
														</span>
													</Button>

													<Button
														//disabled={quantiOrarioScelti === 0}
														color="success"
														variant="contained"
														onClick={() => {
															handleConfirm(prodotto);
														}}
														sx={{ color: "white" }}
													>
														{myIcons.CheckCircleOutlineIcon}
														<span style={{ marginLeft: "8px" }}>
															AGGIUNGI AL CARRELLO
														</span>
													</Button>
												</div>
											</Paper>
										);
									})
								) : (
									<></>
								)}
							</List>
						</>
					</Grid>
				)}

				{/* </Container> */}
			</Layout>
		</ThemeProvider>
	);
};

export default Carrello;
