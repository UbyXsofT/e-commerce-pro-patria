import React from "react";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setListino, setLoading } from "src/store/actions";
//*-----*//
import {
	Button,
	Container,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import ListinoErrorBox from "src/components/listino/utils/ListinoErrorBox";
import {
	StoreState,
	itemsCard,
	ActualProduct,
	Activity,
	ORARIO,
	ORARI,
	ActivitySelected,
	obyPostAttivita,
	obyPostOrari,
} from "src/components/CommonTypesInterfaces";
import myIcons from "src/theme/IconsDefine";

import {
	addToCart,
	isInCart,
	removeFromCart,
} from "src/components/listino/utils/functionsCart";
import { Router, useRouter } from "next/router";
import {
	ActivitySelector,
	TimeList,
} from "src/components/listino/conferma/ActivitySelector";
import Summary from "src/components/listino/conferma/Summary";
import { Info } from "@mui/icons-material";
import LegendaIcone from "src/components/listino/utils/LegendaIcone";
import fetchListinoAttivita from "src/components/listino/utils/fetchListinoAttivita";
import fetchListinoOrari from "./utils/fetchListinoOrari";
import { ListinoAtvOrari, ListinoAtvOrariData } from "src/store/interfaces";

// const activitiesData: Activity[] = [
// 	{
// 		CODATT: "CS000012",
// 		TIPO: "2",
// 		DESATT: "SPINNING",
// 	},
// 	{
// 		CODATT: "CS000015",
// 		TIPO: "2",
// 		DESATT: "KARATE",
// 	},
// ];

// const orariData: any = {
// 	ORARIO: [
// 		{
// 			IDORARIO: "10",
// 			GIORNO: "LUNEDI",
// 			ORAINIZIO: "09:00",
// 			ORAFINE: "10:00",
// 			LIVELLO: "PRINCIPIANTI",
// 			FASCIA: "BAMBINI",
// 		},
// 		{
// 			IDORARIO: "12",
// 			GIORNO: "MERCOLEDI",
// 			ORAINIZIO: "11:00",
// 			ORAFINE: "12:00",
// 			LIVELLO: "PRINCIPIANTI",
// 			FASCIA: {},
// 		},
// 	],
// };

interface ConfermaAbbPageProps {
	itemsCard: itemsCard; // Tipo dell'oggetto itemsCard
}

const ConfermaAbbPage: React.FC<ConfermaAbbPageProps> = ({ itemsCard }) => {
	const [activitiesData, setActivitiesData] = React.useState<Activity[]>([]);
	const theme = useTheme();
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const { showAlert } = useAlertMe();

	const [actualProduct, setActualProduct] = React.useState({
		codice: null,
		nome: null,
		prezzo: null,
		prezzoScontato: null,
		immagine: null,
		info: null,
		quantity: null,
	} as ActualProduct);

	//------------  "  selection times "  -----------------//
	const [quantiOrarioScelti, setQuantiOrarioScelti] = React.useState(0);
	const [quanteAttivitaScelte, setQuanteAttivitaScelte] = React.useState(0);
	const [islimiteOrariSuperato, setIslimiteOrariSuperato] =
		React.useState(false);
	const [islimiteAttivitaSuperato, setIslimiteAttivitaSuperato] =
		React.useState(false);

	const [selectedActivity, setSelectedActivity] =
		React.useState<ActivitySelected | null>(null);

	const [selectedTimesMap, setSelectedTimesMap] = React.useState<{
		[activityId: number]: {
			activity: ActivitySelected;
			selectedOrari: string[];
		};
	}>({});

	const [isFetchingData, setIsFetchingData] = React.useState(
		useSelector((state: StoreState) => state.loading)
	);
	React.useEffect(() => {
		isFetchingData ? dispatch(setLoading(true)) : dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
	}, [isFetchingData]);

	const fetchListaAttivitaFromBackend = async (
		itemsCard: itemsCard,
		Cliente: string
	) => {
		//Cliente, CodeAbb,
		console.log(
			"fetchAttivitaFromBackend itemsCard: ",
			itemsCard,
			" Cliente: ",
			Cliente
		);
		const clienteKey = eCommerceConf.ClienteKey;
		const IDCentro = eCommerceConf.IdCentro.toString();
		const Abbonamento = itemsCard.abbonamento.CODABB;
		const DataIni = itemsCard.abbonamento.DATAINI;
		const Importo = itemsCard.abbonamento.IMPORTO;
		const SceltaA = itemsCard.abbonamento.SCELTAF;
		const FrequenzaS = itemsCard.abbonamento.FREQUENZAS;
		try {
			const data = await fetchListinoAttivita({
				clienteKey,
				IDCentro,
				Cliente,
				Abbonamento,
				DataIni,
				Importo,
				SceltaA,
				FrequenzaS,
			} as obyPostAttivita);

			console.log("****** 1) DATA fetchListinoAttivita: ", data);

			const listaAttivita = data.listaAttivita || [];
			setActivitiesData(listaAttivita as Activity[]);
			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
		} catch (error) {
			console.error(error);
			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
		}
	};

	const fetchOrariFromBackend = async (activityCode: any) => {
		console.log("fetchOrariFromBackend: ", activityCode);

		const clienteKey = eCommerceConf.ClienteKey;
		const IDCentro = eCommerceConf.IdCentro.toString();
		let Cliente = "";
		if (authUser && itemsCard) {
			Cliente = authUser.USERID.toString();
		}

		try {
			const data = await fetchListinoOrari({
				Cliente: Cliente,
				clienteKey,
				IDCentro,
			} as obyPostOrari);

			console.log("****** 1) DATA fetchOrariFromBackend: ", data);
			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
			return data.listaAtvOrari || [];
		} catch (error) {
			console.error(error);
			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
			return [];
		}
	};

	React.useEffect(() => {
		setIsFetchingData(true); // Utilizza dispatch per inviare l'azione di setLoading
		console.log("ConfermaAbbPage");
		console.log(itemsCard);
		if (authUser && itemsCard) {
			fetchListaAttivitaFromBackend(itemsCard, authUser.USERID.toString());
		}
		setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
	}, []);

	const [stepSelectOby, setStepSelectOby] = React.useState({
		stepId: 1,
		endNavStepId: 5,
		endStep: 1,
		codice: "0",
		isClickNext: true,
	});

	const handleActivitySelection = async (activity: Activity | null) => {
		if (activity) {
			try {
				// Effettua la chiamata al servizio di backend per ottenere gli orari (prima verifico in local storage)

				// Recuperare i dati dell'attività i suoi orari da sessionStorage
				const storedData = sessionStorage.getItem(
					"attivitaData-" + activity.CODATT
				);
				const parsedData = storedData ? JSON.parse(storedData) : null;
				let orariResponse: any = null;

				if (parsedData === null) {
					console.log(
						"@@@ ORARI NON PRESENTI IN LOCAL STORAGE - EFFETTUO CHIAMATA API"
					);
					//effettuo la chiamata API
					orariResponse = await fetchOrariFromBackend(activity.CODATT);
					// Salvare i dati in sessionStorage
					sessionStorage.setItem(
						"attivitaData-" + activity.CODATT,
						JSON.stringify(orariResponse)
					);
				} else {
					console.log("@@@ ORARI PRESENTI IN LOCAL STORAGE - RECUPERO I DATI");
					//recupero i dati orario dal sessionStorage
					orariResponse = parsedData;
				}

				if (orariResponse) {
					const updatedActivity = {
						...activity,
						ORARI: orariResponse, // Assumi che la risposta contenga i dati degli orari nel formato desiderato
					};

					//console.error("updatedActivity:", updatedActivity);

					// Imposta l'attività selezionata con gli orari
					setSelectedActivity(updatedActivity);
				}
			} catch (error) {
				console.error("Errore durante il recupero degli orari:", error);
			}
		} else {
			// Gestisci il caso in cui nessuna attività sia selezionata
			setSelectedActivity(null);
		}
	};

	const handleTimeSelection = (ORARIO: ORARIO) => {
		let msgErroreLimite = "";

		// console.log("quantiOrarioScelti: ", quantiOrarioScelti);
		// console.log("quanteAttivitaScelte: ", quanteAttivitaScelte);

		// console.log("FREQUENZAS orari limite: ", itemsCard.abbonamento.FREQUENZAS);
		// console.log("SCELTAF attività limite: ", itemsCard.abbonamento.SCELTAF);

		if (!selectedActivity) {
			console.error(
				"Attività non selezionata. Impossibile selezionare l'orario."
			);
			msgErroreLimite =
				"Attività non selezionata. Impossibile selezionare l'orario.";
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>{msgErroreLimite}</strong>
					</h3>
				</React.Fragment>
			);
			showAlert("filled", "warning", "ATTENZIONE!", textAlert, true);
			return;
		}

		const activityId = selectedActivity.CODATT;
		const currentSelection = selectedTimesMap[activityId] || {
			activity: selectedActivity,
			selectedOrari: [],
		};
		const isTimeSelected = currentSelection.selectedOrari.includes(
			ORARIO.IDORARIO
		);
		const updatedOrari = isTimeSelected
			? currentSelection.selectedOrari.filter(
					(selectedTime) => selectedTime !== ORARIO.IDORARIO
			  )
			: [...currentSelection.selectedOrari, ORARIO.IDORARIO];

		if (islimiteOrariSuperato && !isTimeSelected) {
			//se il limite è stato superato e sto facendo una selezione
			msgErroreLimite =
				"E' stato raggiunto il limite massimo selezionabile degli orari per questo abbonamento";
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>{msgErroreLimite}</strong>
					</h3>
				</React.Fragment>
			);
			showAlert("filled", "warning", "ATTENZIONE!", textAlert, true);
			return;
		}

		setSelectedTimesMap((prev) => ({
			...prev,
			[activityId]: { activity: selectedActivity, selectedOrari: updatedOrari },
		}));
	};

	const handleClear = () => {
		setSelectedTimesMap((prevSelectedTimesMap) => ({
			...prevSelectedTimesMap,

			[selectedActivity?.CODATT || -1]: {
				activity: selectedActivity || ({} as ActivitySelected),
				selectedOrari: [],
			},
		}));
	};

	const handleConfirm = () => {
		let dataToSendService = "";
		console.log("@@@ handleConfirm ");

		const activitiesWithTimes = Object.entries(selectedTimesMap).filter(
			([_, { selectedOrari }]) => selectedOrari.length > 0
		);
		console.log("@@@ selectedTimesMap: ", selectedTimesMap);

		if (activitiesWithTimes.length > 0) {
			activitiesWithTimes.forEach(
				([activityId, { activity, selectedOrari }], atvIndex) => {
					//console.log("activityId:", activityId);
					//console.log("Attività: ", activity.CODATT + "-" + activity.DESATT);
					console.log("@@@ selectedOrari: ", selectedOrari);
					selectedOrari.forEach((timeId, timeIndex) => {
						//console.log("Orario: ", timeIndex + "-" + timeId);
						dataToSendService += `[${activityId}][${timeId}]`;
					});
				}
			);
		}
		console.log("dataToSendService: ", dataToSendService);

		let noteAttivitaOrari = "";
		// Filtra solo le attività con almeno un orario selezionato
		activitiesWithTimes.map(([_, { activity, selectedOrari }]) => {
			noteAttivitaOrari += `<br /><br /> Attività: <label style="font-weight: bold;" />${activity.DESATT}</label> <br /> Orari: <br />`;

			selectedOrari
				.map((selectedOrario) =>
					activity?.ORARI?.ORARIO.find(
						(orario: any) => orario.IDORARIO === selectedOrario
					)
				)
				.filter((orario) => {
					orario !== undefined;
					console.log("orario: ", orario);
					noteAttivitaOrari += `<label style="font-weight: bold;" />-		${orario?.GIORNO} ${orario?.ORAINIZIO}-${orario?.ORAFINE}</label> <br />`;
				});
		});
		noteAttivitaOrari += `<br />`;

		setActualProduct({
			codice: itemsCard.codice,
			nome: itemsCard.descrizione,
			prezzo: Number(itemsCard.abbonamento.IMPORTO),
			prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
			immagine: [],
			info: itemsCard.note + noteAttivitaOrari,
			quantity: 1,
		});
	};

	React.useEffect(() => {
		if (actualProduct?.codice !== null) {
			addToCart(actualProduct, cart, dispatch, authUser);
			router.replace("/auth/carrello");
		} else {
			console.log("@@@ NO actualProduct : ", actualProduct);
		}
	}, [actualProduct]); // useEffect dipendente da actualProduct

	const handleCancel = () => {
		// Implementa la logica per annullare le scelte dell'utente.
		// torno su acquista cancellando tutte le scelte
		router.push("/auth/acquista/prodotti");
	};

	React.useEffect(() => {
		if (Number(itemsCard.abbonamento.SCELTAF) < Number(quanteAttivitaScelte)) {
			setIslimiteAttivitaSuperato(true);
		} else {
			setIslimiteAttivitaSuperato(false);
		}

		if (
			Number(itemsCard.abbonamento.FREQUENZAS) <= Number(quantiOrarioScelti)
		) {
			setIslimiteOrariSuperato(true);
		} else {
			setIslimiteOrariSuperato(false);
		}
	}, [quantiOrarioScelti, quanteAttivitaScelte]); // useEffect dipendente da actualProduct

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina Conferma prodotti | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce products conferma page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

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
						{React.cloneElement(myIcons.OrarioAtvIcon, {
							fontSize: "large",
							style: { marginRight: "20px" },
						})}

						{eCommerceConf.StepStorePage[5]?.TitoloPage}
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

				<Grid
					style={{
						display: "flex",
						flexDirection: "column",
						flexFlow: "row",
						flexWrap: "wrap",
						alignItems: "flex-start",
						// justifyContent: "flex-start",
						minHeight: "50px",
						marginLeft: "20px",
					}}
				>
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign={"center"}
									variant="subtitle2"
								>
									Identifica un abbonamento
								</Typography>
							</span>
						}
					>
						{React.cloneElement(myIcons.AbbIcon, {
							fontSize: "medium",
							style: { marginRight: "20px" },
						})}
					</Tooltip>

					<Typography
						variant="h6"
						style={{ display: "flex", alignItems: "center" }}
					>
						{itemsCard?.abbonamento?.DESABB}
					</Typography>

					<div
						style={{
							marginLeft: "20px",
							display: "flex",
							alignItems: "center",
						}}
					>
						<Tooltip
							title={
								<span
									style={{
										display: "flex",
										flexDirection: "column",
										//marginLeft: "20px",
									}}
								>
									<Typography
										textAlign={"center"}
										variant="subtitle2"
									>
										Identifica una data
									</Typography>
								</span>
							}
						>
							{React.cloneElement(myIcons.DataCalendarIcon, {
								fontSize: "medium",
								style: {
									marginRight: "10px",
									color: theme.palette.warning.main,
								},
							})}
						</Tooltip>

						<Typography
							variant="subtitle1"
							style={{ display: "flex", alignItems: "center" }}
						>
							{`Data inizio: ${itemsCard?.abbonamento?.DATAINI}`}
						</Typography>
					</div>
				</Grid>

				{itemsCard === null ? (
					<ListinoErrorBox />
				) : (
					<>
						<Container
							style={{
								marginTop: "1em",
								marginBottom: "3em",
								height: "auto",
							}}
						>
							<Grid
								container
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-around",
									minHeight: "660px",
								}}
							>
								<>
									<Grid
										container
										spacing={2}
									>
										<Grid
											item
											xs={12}
											sm={8}
										>
											<ActivitySelector
												activities={activitiesData}
												handleActivitySelection={handleActivitySelection}
												handleClear={handleClear} // Passa la funzione di gestione dell'evento clear
												islimiteAttivitaSuperato={islimiteAttivitaSuperato}
											/>
											{selectedActivity && (
												<TimeList
													attivitaSelezionata={selectedActivity}
													orariSelezionati={
														selectedTimesMap[selectedActivity?.CODATT || ""]
															?.selectedOrari || []
													}
													handleTimeSelection={handleTimeSelection}
												/>
											)}
										</Grid>
										<Grid
											item
											xs={12}
											sm={4}
										>
											<Summary
												selectedTimesMap={selectedTimesMap}
												setSelectedTimesMap={setSelectedTimesMap}
												setQuantiOrarioScelti={setQuantiOrarioScelti}
												setQuanteAttivitaScelte={setQuanteAttivitaScelte}
												itemsCard={itemsCard}
											/>
										</Grid>
									</Grid>

									<div
										style={{
											display: "flex",
											alignItems: "center",
											width: "100%",
											justifyContent: "space-between",
											height: "min-content",
										}}
									>
										<Button
											color="secondary"
											variant="contained"
											onClick={handleCancel}
											sx={{ color: "white" }}
										>
											{myIcons.HighlightOffIcon} Annulla
										</Button>

										<Button
											disabled={quantiOrarioScelti === 0}
											color="success"
											variant="contained"
											onClick={handleConfirm}
										>
											{myIcons.CheckCircleOutlineIcon} Conferma
										</Button>
									</div>
								</>
							</Grid>
						</Container>
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default ConfermaAbbPage;