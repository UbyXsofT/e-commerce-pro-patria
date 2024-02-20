import React from "react";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setListino } from "src/store/actions";
//*-----*//
import {
	Button,
	Container,
	Grid,
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
} from "src/components/CommonTypesInterfaces";
import fetchListino from "src/components/listino/utils/fetchListino";
import { useSpring } from "react-spring";
import HeadListinoPage from "src/components/listino/layout/HeadListinoPage";
import CreateCard from "src/components/listino/card/createCard";
import { addToCart, isInCart, removeFromCart } from "./utils/functionsCart";
import { useRouter } from "next/router";
import {
	ActivitySelector,
	TimeList,
} from "src/components/listino/ActivitySelector";
import Summary from "src/components/listino/Summary";
import ListinoOrariErrorBox from "./utils/ListinoOrariErrorBox";
//import { Activity } from '../types'; // Assumi che esista un file types.ts con l'interfaccia Activity

// const activitiesData: Activity[] = [
// 	{
// 		id: 1,
// 		name: "Attività 1",
// 		times: ["10:00", "12:00", "14:00", "16:00", "18:00"],
// 	},
// 	{
// 		id: 2,
// 		name: "Attività 2",
// 		times: ["10:00", "12:00", "14:00", "16:00", "18:00"],
// 	},
// 	// ... altre attività ...
// ];

const activitiesData: Activity[] = [
	{
		CODATT: "CS000012",
		TIPO: "2",
		DESATT: "SPINNING",
		ORARI: {
			ORARIO: [
				{
					IDORARIO: "10",
					GIORNO: "LUNEDI",
					ORAINIZIO: "09:00",
					ORAFINE: "10:00",
					LIVELLO: "PRINCIPIANTI",
					FASCIA: "BAMBINI",
				},
				{
					IDORARIO: "12",
					GIORNO: "MERCOLEDI",
					ORAINIZIO: "11:00",
					ORAFINE: "12:00",
					LIVELLO: "PRINCIPIANTI",
					FASCIA: {},
				},
			],
		},
	},
	{
		CODATT: "CS000015",
		TIPO: "2",
		DESATT: "KARATE",
		ORARI: {
			ORARIO: [
				{
					IDORARIO: "20",
					GIORNO: "MARTEDI",
					ORAINIZIO: "15:00",
					ORAFINE: "16:00",
					LIVELLO: "PRINCIPIANTI",
					FASCIA: "BAMBINI",
				},
				{
					IDORARIO: "22",
					GIORNO: "VENERDI",
					ORAINIZIO: "17:00",
					ORAFINE: "18:00",
					LIVELLO: "PRINCIPIANTI",
					FASCIA: {},
				},
			],
		},
	},
];

interface ConfermaAbbPageProps {
	itemsCard: any; // Tipo dell'oggetto itemsCard
}

const ConfermaAbbPage: React.FC<ConfermaAbbPageProps> = ({ itemsCard }) => {
	const [stepSelectOby, setStepSelectOby] = React.useState({
		stepId: 1,
		endNavStepId: 5,
		endStep: 1,
		codice: "0",
		isClickNext: true,
	});

	const theme = useTheme();
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();

	const [showCompSceltaAtv, setShowCompSceltaAtv] = React.useState(false);

	const [actualProduct, setActualProduct] = React.useState({
		codice: null,
		nome: null,
		prezzo: null,
		prezzoScontato: null,
		immagine: null,
		info: null,
		quantity: null,
	} as ActualProduct);

	const handleClickBtnCart = (itemsCard: itemsCard) => {
		console.log("handleClickBtnCart");
		console.log("@@@@@@@ ---------- >itemsCard: ");
		console.log(itemsCard);
		//vado alla pagina carrello

		if (actualProduct?.codice !== null) {
			//vado alla pagina carrello
			addToCart(actualProduct, cart, dispatch, authUser);
			router.replace("/auth/carrello");
		} else {
			console.log("@@@ NO actualProduct : ", actualProduct);
		}
	};

	// const aggiornaListino = async () => {
	// 	//if (listinoState.listino === null) {
	// 	try {
	// 		// Effettua la richiesta asincrona
	// 		const data = fetchListino(authUser?.USERID);
	// 		console.log("****** 2) DATA: ", data);
	// 		// Aggiorna lo stato Redux utilizzando la tua azione setListino
	// 		dispatch(setListino({ listino: (await data).listino, error: null }));
	// 	} catch (error) {
	// 		// Gestisci eventuali errori durante la richiesta
	// 		console.error("Errore durante il fetch del listino:", error);
	// 		dispatch(
	// 			setListino({
	// 				listino: null,
	// 				error: error || "Errore sconosciuto",
	// 			})
	// 		);
	// 	}
	// 	//}
	// };

	React.useEffect(() => {
		console.log("ConfermaAbbPage");
		console.log(itemsCard);

		try {
			if (
				Number(itemsCard.abbonamento.SCELTAF) > 0 &&
				Number(itemsCard.abbonamento.FREQUENZAS) > 0
			) {
				console.log("VISUALIZZARE IL COMPONENTE PER SCEGLIERE GLI ORARI");
				setShowCompSceltaAtv(true);
			} else {
				setActualProduct({
					codice: itemsCard.codice,
					nome: itemsCard.descrizione,
					prezzo: Number(itemsCard.abbonamento.IMPORTO),
					prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
					immagine: [],
					info: "informazioni",
					quantity: 1,
				});
			}
		} catch (error) {
			console.log("ERROREEEEEEEE");
		}
	}, []); // useEffect senza dipendenze per eseguire solo all'inizio

	React.useEffect(() => {
		if (actualProduct?.codice !== null) {
			addToCart(actualProduct, cart, dispatch, authUser);
			router.replace("/auth/carrello");
		} else {
			console.log("@@@ NO actualProduct : ", actualProduct);
		}
	}, [actualProduct]); // useEffect dipendente da actualProduct

	const [selectedActivity, setSelectedActivity] =
		React.useState<Activity | null>(null);

	const [selectedTimesMap, setSelectedTimesMap] = React.useState<{
		[activityId: number]: {
			code: string;
			description: string;
			times: string[];
		};
	}>({});

	const [selectedTimes, setSelectedTimes] = React.useState<string[]>([]);

	const handleActivitySelection = (activity: Activity | null) => {
		setSelectedActivity(activity);

		// Se hai già selezioni precedenti per questa attività, caricalo
		const previousSelections =
			selectedTimesMap[activity?.CODATT || ""]?.times || [];
		setSelectedTimes(previousSelections);
	};

	const handleTimeSelection = (time: string) => {
		if (!selectedActivity) {
			console.error(
				"Attività non selezionata. Impossibile selezionare l'orario."
			);
			return;
		}

		const isTimeSelected = selectedTimes.includes(time);
		let updatedTimes: string[];

		if (isTimeSelected) {
			// Se l'orario è già selezionato, lo rimuovi
			updatedTimes = selectedTimes.filter(
				(selectedTime) => selectedTime !== time
			);
		} else {
			// Altrimenti, lo aggiungi
			updatedTimes = [...selectedTimes, time];
		}

		// Aggiorna lo stato
		setSelectedTimes(updatedTimes);
		// Aggiorna anche selectedTimesMap per mantenere coerenza tra i due stati
		setSelectedTimesMap((prev: any) => ({
			...prev,
			[selectedActivity.CODATT]: {
				code: selectedActivity.CODATT,
				description: selectedActivity.DESATT,
				times: updatedTimes,
			},
		}));
	};

	React.useEffect(() => {
		// Aggiorna selectedTimes quando selectedActivity cambia
		console.log("selectedTimesMap:  ", selectedTimesMap);
		if (selectedActivity) {
			setSelectedTimes(selectedTimesMap[selectedActivity.CODATT]?.times || []);
		}
	}, [selectedActivity, selectedTimesMap]);

	const handleClear = () => {
		// Effettua l'operazione di pulizia dell'array di orari
		console.log("handleClear: ", selectedActivity?.CODATT);
		setSelectedTimes([]);

		// setSelectedTimesMap({
		// 	...selectedTimesMap,
		// 	[selectedActivity?.CODATT || -1]: [],
		// });

		setSelectedTimesMap(
			(prevSelectedTimesMap) =>
				({
					...prevSelectedTimesMap,
					[selectedActivity?.CODATT || -1]: [],
				} as {
					[activityId: number]: {
						code: string;
						description: string;
						times: string[];
					};
				})
		);
	};

	const handleConfirm = () => {
		// Implementa la logica per confermare le scelte dell'utente.
	};

	const handleCancel = () => {
		// Implementa la logica per annullare le scelte dell'utente.
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina Conferma prodotti | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce products conferma page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				{itemsCard === null ? (
					<ListinoOrariErrorBox />
				) : (
					<>
						{showCompSceltaAtv === true ? (
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
									{isMobile ? (
										<>
											<Typography>
												CONFERMA PAGE VISUALIZZA SELEZIONA ORARI?
											</Typography>
										</>
									) : (
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
													/>
													{selectedActivity && (
														<TimeList
															times={selectedActivity.ORARI.ORARIO}
															selectedTimes={
																selectedTimesMap[selectedActivity?.CODATT || ""]
																	?.times
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
													<Summary selectedTimesMap={selectedTimesMap} />
												</Grid>
											</Grid>
											<Button
												onClick={handleConfirm}
												variant="contained"
												color="primary"
											>
												Conferma
											</Button>
											<Button
												onClick={handleCancel}
												variant="contained"
												color="secondary"
											>
												Annulla
											</Button>
										</>
									)}
								</Grid>
							</Container>
						) : (
							<></>
						)}
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default ConfermaAbbPage;
