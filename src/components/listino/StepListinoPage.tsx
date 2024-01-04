import React from "react";
import { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCart, setLoading, setListino } from "src/store/actions";
//*-----*//
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
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
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import callNodeService from "pages/api/callNodeService";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import BtnStepStore from "./Stepper/BtnStepListino";

import ListinoCard from "src/components/listino/Card/ListinoCard";
import ListinoErrorBox from "./Utils/ListinoErrorBox";
import {
	ConstructionOutlined,
	Discount,
	EditCalendar,
	Handshake,
	Info,
} from "@mui/icons-material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import LegendaIcone from "./Utils/LegendaIcone";

import {
	Abbonamento,
	Area,
	Gruppo,
	Item,
	Sede,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import chiaveRandom from "../utils/chiaveRandom";

const StepListinoPage = () => {
	//const [activeStepPageId, setActiveStepPageId] = React.useState(1);
	const [stepSelectOby, setStepSelectOby] = React.useState({
		stepId: 1,
		endStep: 1,
		codice: "0",
	});
	const theme = useTheme();
	//TODO MODIFICARE CENTRI E fetchListino PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const listinoState = useSelector((state: StoreState) => state.listino);

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const [cardComponent, setCardComponent] = React.useState([]);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	// Aggiungi uno stato per gestire il padding del corpo
	const [bodyPadding, setBodyPadding] = React.useState("0px");

	const storyStep = [] as any;
	const [storySteps, setStorySteps] = React.useState([]);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	type StepStorePageType = {
		[key: number]: {
			TitoloPage: string;
		};
	};
	// Utilizzo del tipo dichiarato
	const eCommerceConfType: { StepStorePage: StepStorePageType } = {
		StepStorePage: eCommerceConf.StepStorePage,
	};

	// Funzioni di verifica del tipo
	function isGruppo(item: Item): item is Gruppo {
		return (item as Gruppo).CODGRUPPO !== undefined;
	}
	function isSede(item: Item): item is Sede {
		return (item as Sede).IDSEDE !== undefined;
	}
	function isArea(item: Item): item is Area {
		return (item as Area).CODAREA !== undefined;
	}
	function isAbbonamento(item: Item): item is Abbonamento {
		return (item as Abbonamento).CODABB !== undefined;
	}

	React.useEffect(() => {
		createCardComponents(stepSelectOby.stepId);
	}, [stepSelectOby.stepId]);

	// Funzione ricorsiva per contare Aree
	const countAree = (items: Sede[] | Aree[], tipo: any): number => {
		console.log("countAree items: ", items);
		switch (tipo) {
			case "GRUPPO":
				return items.reduce((acc, sede) => acc + sede.AREA.length, 0);
			case "SEDE":
				return items.reduce((acc, area) => acc + area.length, 0);
		}
	};

	// Funzione ricorsiva per contare Abbonamenti
	const countAbbonamenti = (items: Sede[] | Aree[], tipo: any): number => {
		console.log("countAbbonamenti items: ", items);
		switch (tipo) {
			case "GRUPPO":
				return items.reduce(
					(acc, sede) =>
						acc +
						sede.AREA.reduce(
							(areaAcc, area) => areaAcc + area.ABBONAMENTO.length,
							0
						),
					0
				);
			case "SEDE":
				return items.reduce(
					(areaAcc, area) => areaAcc + area.ABBONAMENTO.length,
					0
				);
		}
	};

	// Funzione per ottenere il numero totale di Aree e Abbonamenti
	const getTotals = (
		items: Gruppo | Sede | Area,
		tipo: any
	): { totals: {} } => {
		console.log("getTotals items", items);

		switch (tipo) {
			case "GRUPPO":
				return {
					numeroSedi: items.SEDE.length,
					numeroAree: countAree(items.SEDE, tipo),
					numeroAbbonamenti: countAbbonamenti(items.SEDE, tipo),
				};
			case "SEDE":
				return {
					numeroSedi: 0,
					numeroAree: items.length,
					numeroAbbonamenti: countAbbonamenti(items, tipo),
				};
		}
	};

	const findInformazioni = (item, stepId) => {
		const allRequest = [
			{ name: "promo", tipo: "PROMO", valore: "1", stepId },
			{ name: "convenzioni", tipo: "PROMO", valore: "2", stepId },
			{ name: "sospensioni", tipo: "NOSOSP", valore: "0", stepId },
			{ name: "sceltaOrario", tipo: "SCELTAF", valore: "0", stepId },
		];

		// Dichiarare un array per le informazioni
		const arrayInfoData = [];

		const infoData = {};

		allRequest.forEach((richiesta) => {
			const { name, tipo, valore, stepId } = richiesta;

			switch (stepId) {
				case 1: //"GRUPPO"
					const numero = item["SEDE"]
						.map((sede) =>
							sede.AREA.flatMap((area) =>
								area.ABBONAMENTO.filter((abb) => abb[tipo] === valore)
							)
						)
						.flat().length;
					//console.log("RICHIESTA NUM ABB x ICONE promo ecc --> CASE NUM: ",numero);
					const totals = getTotals(item, "GRUPPO");

					// Aggiungere informazioni
					const infoObject = {
						name: name,
						item: item,
						tipo: tipo,
						numero: numero,
						...totals,
					};
					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject;
					return;
				case 2: //"SEDE"
					const numero2 = item["AREA"]
						.map((area) =>
							area.ABBONAMENTO.filter((abb) => abb[tipo] === valore)
						)
						.flat().length;

					//console.log("RICHIESTA NUM ABBONAMENTI --> CASE NUMERO2: ", numero2);
					const totals2 = getTotals(item["AREA"], "SEDE");

					// Aggiungere informazioni
					const infoObject2 = {
						name: name,
						item: item,
						tipo: tipo,
						numero: numero2,
						...totals2,
					};

					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject2;
					return;
				case 3: //"AREA"
					return;
				case 4: //ABBONAMENTO
					return;
			}
		});

		arrayInfoData.push(infoData);
		return arrayInfoData[0];
	};

	const createCardComponents = (stepId: number) => {
		let cardComponents = [] as any;
		let idCount = 0;
		let gruppoDesideratoTrovato = false;
		console.log("@@@ --> createCardComponents stepId: ", stepId);

		listinoState.listino["GRUPPO"].forEach((item) => {
			idCount += 1;
			console.log("@@@ --> idCount: ", idCount);

			switch (stepId) {
				case 1: //"GRUPPO"
					//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
					setStepSelectOby((prevStepSelectOby) => ({
						...prevStepSelectOby,
						//spread operator per recuperare tutti i valori precedenti
						endStep: 1, //disabilito button successivo
					}));

					const informazioni = findInformazioni(item, stepId);
					console.log("@@@ --> informazioni: ", informazioni);
					if (isGruppo(item)) {
						cardComponents.push(
							<ListinoCard
								key={item.CODGRUPPO}
								itemsCard={{
									tipo: "GRUPPO",
									codice: item.CODGRUPPO,
									descrizione: item.DESGRUPPO,
									aPromozioni: informazioni.promo.numero > 0 ? true : false,
									aConvenzioni:
										informazioni.convenzioni.numero > 0 ? true : false,
									aSospensioni:
										informazioni.sospensioni.numero > 0 ? true : false,
									aSceltaOrario:
										informazioni.sceltaOrario.numero > 0 ? true : false,
									numeroSedi: informazioni.promo.numeroSedi,
									numeroAree: informazioni.promo.numeroAree,
									numeroAbbonamenti: informazioni.promo.numeroAbbonamenti,
									aSede: item.SEDE.length > 1 ? true : false,
								}}
								stepSelectOby={stepSelectOby}
								setStepSelectOby={setStepSelectOby}
							/>
						);
						console.log("@@@ IS GRUPPO: ", item);
					}
					return;

				case 2: //"SEDE"
					if (!gruppoDesideratoTrovato) {
						const gruppoDesiderato = listinoState.listino["GRUPPO"].find(
							(gruppo) => {
								if (
									isGruppo(gruppo) &&
									gruppo.CODGRUPPO === stepSelectOby.codice
								) {
									storyStep.push(
										<Typography
											key={chiaveRandom()}
											variant="h6"
											style={{ display: "contents" }}
										>
											<GroupsIcon
												style={{ marginRight: "20px" }}
												color="success"
											/>
											{gruppo.DESGRUPPO}
										</Typography>
									);
									return true;
								}
								return false;
							}
						);

						console.log("@@@ IS SEDE gruppoDesiderato: ", gruppoDesiderato);

						// Imposta la variabile di stato se il gruppoDesiderato è stato trovato
						if (gruppoDesiderato && isGruppo(gruppoDesiderato)) {
							if (gruppoDesiderato.SEDE.length > 1) {
								gruppoDesideratoTrovato = true;
								// forEach sulle sedi se il gruppoDesiderato esiste
								gruppoDesiderato.SEDE.forEach((sede) => {
									// Ora 'sede' è un oggetto del tipo Sede
									console.log("@@@ SEDE EACH: ", sede);
									const informazioni = findInformazioni(sede, stepId);
									console.log("@@@ --> informazioni: ", informazioni);

									if (isSede(sede)) {
										cardComponents.push(
											<ListinoCard
												key={sede.IDSEDE}
												itemsCard={{
													tipo: "SEDE",
													codice: sede.IDSEDE,
													descrizione: sede.DESCSEDE,
													aPromozioni:
														informazioni.promo.numero > 0 ? true : false,
													aConvenzioni:
														informazioni.convenzioni.numero > 0 ? true : false,
													aSospensioni:
														informazioni.sospensioni.numero > 0 ? true : false,
													aSceltaOrario:
														informazioni.sceltaOrario.numero > 0 ? true : false,
													numeroSedi: informazioni.promo.numeroSedi,
													numeroAree: informazioni.promo.numeroAree,
													numeroAbbonamenti:
														informazioni.promo.numeroAbbonamenti,
													note: sede.NOTESEDE,
													aArea: sede.AREA.length > 1 ? true : false,
												}}
												stepSelectOby={stepSelectOby}
												setStepSelectOby={setStepSelectOby}
											/>
										);
									}
									console.log("@@@ IS SEDE: ", sede);
								});
							} else {
								console.log("TORNO INDIETRO DI UNO STEP");
								//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
								setStepSelectOby((prevStepSelectOby) => ({
									...prevStepSelectOby,
									//spread operator per recuperare tutti i valori precedenti
									stepId: stepId - 1, //disabilito button successivo
								}));
							}
						}
					}
					return;
				case 3: //"AREA"
					return;
				case 4: //ABBONAMENTO
					return;
			}
		});

		console.log("ListinoCard cardComponents: ", cardComponents);
		setCardComponent(cardComponents);
		setStorySteps(storyStep);
	};

	// Logica per la gestione della selezione del gruppo
	const handleSelection = (selectedId: number) => {};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina selezione prodotti | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce products select page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				{/* Componente LegendaIcone con stato del modale controllato dal componente padre */}

				{listinoState.error ? (
					<ListinoErrorBox />
				) : (
					<>
						<Grid
							container
							style={{
								justifyContent: "space-between",
								paddingRight: bodyPadding,
							}}
						>
							<Typography variant="h4">
								{stepSelectOby.stepId === 1 ? (
									<GroupsIcon
										style={{ marginRight: "20px" }}
										color="success"
									/>
								) : (
									<PlaceIcon
										style={{ marginRight: "20px" }}
										color="warning"
									/>
								)}
								{
									eCommerceConfType.StepStorePage[stepSelectOby.stepId]
										?.TitoloPage
								}
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
								flexDirection: "row",
								flexWrap: "nowrap",
								alignItems: "center",
								justifyContent: "flex-start",
								marginLeft: "50px",
							}}
						>
							{storySteps}
						</Grid>
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
								}}
							>
								{isMobile ? (
									// Contenuto per dispositivi mobili
									<>
										<BtnStepStore
											stepSelectOby={stepSelectOby}
											setStepSelectOby={setStepSelectOby}
										/>
										{cardComponent}
										<BtnStepStore
											stepSelectOby={stepSelectOby}
											setStepSelectOby={setStepSelectOby}
										/>
									</>
								) : (
									<>
										{cardComponent}
										<BtnStepStore
											stepSelectOby={stepSelectOby}
											setStepSelectOby={setStepSelectOby}
										/>
									</>
								)}
							</Grid>
						</Container>
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default StepListinoPage;
