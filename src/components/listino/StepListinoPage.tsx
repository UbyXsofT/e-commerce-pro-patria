import React from "react";
import Router, { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import {
	setCart,
	setLoading,
	setListino,
	setStepListino,
} from "src/store/actions";
//*-----*//
import {
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
import callNodeService from "pages/api/callNodeService";
import BtnStepStore from "./Stepper/BtnStepListino";
import ListinoCard from "src/components/listino/Card/ListinoCard";
import ListinoErrorBox from "./Utils/ListinoErrorBox";
import {
	ConstructionOutlined,
	Discount,
	EditCalendar,
	Handshake,
	Info,
	Place,
	Groups,
	AutoAwesomeMosaic,
	MotionPhotosAuto,
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
import { Dispatch } from "redux";
import trovaCodice from "./Utils/trovaCodice";
import trovaCodiceNextOby from "./Utils/trovaCodiceNextOby";
import fetchListino from "../utils/fetchListino";
import { animated, useSpring } from "react-spring";

const StepListinoPage = () => {
	//const [activeStepPageId, setActiveStepPageId] = React.useState(1);
	const [stepSelectOby, setStepSelectOby] = React.useState({
		stepId: 1,
		endNavStepId: 5,
		endStep: 1,
		codice: "0",
		isClickNext: true,
	});

	const theme = useTheme();
	//TODO MODIFICARE CENTRI E fetchListino PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const listinoState = useSelector((state: StoreState) => state.listino);
	const authUser = useSelector((state: StoreState) => state.authUser);

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	const [btnStep, setBtnStep] = React.useState(<></>);
	// Esempio di come recuperare lo stato
	// const stateStepListino = useSelector(
	// 	(state: StoreState) => state.stepListino
	// );

	const [cardComponent, setCardComponent] = React.useState([]);
	const springPropsCards = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: { duration: 500 }, // Imposta la durata dell'animazione in millisecondi
	});

	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const [storyStep_SubTitleComp, setStoryStep_SubTitleComp] = React.useState(
		[] as JSX.Element[]
	);

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
		if (stepSelectOby.stepId !== 1) {
		} else if (stepSelectOby.stepId === 1) {
			//CANCELLO I DATI MEMORIZZATI DEGLI STEP
			setStoryStep_SubTitleComp([]);
			console.log("****** 1) ---- CHECK LISTINO: ", listinoState);
			if (listinoState.listino === null) {
				aggiornaListino();
			}
		}

		if (stepSelectOby.stepId < stepSelectOby.endNavStepId) {
			createCardComponents(stepSelectOby.stepId);
		} else {
			setStepSelectOby((prev) => ({
				...prev,
				stepId: prev.stepId - 1,
			}));
		}
	}, [stepSelectOby.stepId, listinoState.listino]);

	const aggiornaListino = async () => {
		//if (listinoState.listino === null) {
		try {
			// Effettua la richiesta asincrona
			const data = fetchListino(authUser?.USERID, 0);
			console.log("****** 2) DATA: ", data);
			// Aggiorna lo stato Redux utilizzando la tua azione setListino
			dispatch(setListino({ listino: (await data).listino, error: null }));
		} catch (error) {
			// Gestisci eventuali errori durante la richiesta
			console.error("Errore durante il fetch del listino:", error);
			dispatch(
				setListino({
					listino: null,
					error: error || "Errore sconosciuto",
				})
			);
		}
		//}
	};

	// Funzione ricorsiva per contare Aree
	const countAree = (item: any[], tipo: string): number => {
		//console.log("countAree item: ", item);
		switch (tipo) {
			case "GRUPPO":
				return item.reduce(
					(acc: number, sede: any) => acc + sede.AREA.length,
					0
				);
			case "SEDE":
				return item.reduce((acc: number, area: any) => acc + area.length, 0);
			default:
				return 0;
		}
	};

	// Funzione ricorsiva per contare Abbonamenti
	const countAbbonamenti = (item: any[], tipo: string): number => {
		//console.log("countAbbonamenti item: ", item);
		switch (tipo) {
			case "GRUPPO":
				return item.reduce(
					(acc: number, sede: any) =>
						acc +
						sede.AREA.reduce(
							(areaAcc: number, area: any) => areaAcc + area.ABBONAMENTO.length,
							0
						),
					0
				);
			case "SEDE":
				return item.reduce(
					(areaAcc, area) => areaAcc + area.ABBONAMENTO.length,
					0
				);
			default:
				return 0;
		}
	};

	// Funzione per ottenere il numero totale di Aree e Abbonamenti
	const getTotals = (item: any, entityType: string): any => {
		//console.log("getTotals item", item);

		switch (entityType) {
			case "GRUPPO":
				return {
					numeroSedi: item.SEDE.length,
					numeroAree: countAree(item.SEDE, entityType),
					numeroAbbonamenti: countAbbonamenti(item.SEDE, entityType),
				};
			case "SEDE":
				return {
					numeroSedi: 0,
					numeroAree: item.length,
					numeroAbbonamenti: countAbbonamenti(item, entityType),
				};
			case "AREA":
				return {
					numeroSedi: 0,
					numeroAree: 0,
					numeroAbbonamenti: item.length,
				};
		}
	};

	const findInfoAbb = (item: any, stepId: number) => {
		type RequestItem = {
			name: string;
			tipo: string;
			valore: string;
			stepId: number;
		};

		const all_InfoRequest: RequestItem[] = [
			{ name: "promo", tipo: "PROMO", valore: "1", stepId },
			{ name: "convenzioni", tipo: "PROMO", valore: "2", stepId },
			{ name: "sospensioni", tipo: "NOSOSP", valore: "0", stepId },
			{ name: "sceltaOrario", tipo: "SCELTAF", valore: "0", stepId },
		];

		// Dichiarare un array per le informazioni
		const arrayInfoData = [];
		// Tipo dell'oggetto infoData
		type InfoData = {
			[key: string]: any; // Qui puoi specificare un tipo più specifico se necessario
		};
		// Dichiarazione di infoData con il tipo specificato
		const infoData: InfoData = {};

		all_InfoRequest.forEach((richiesta: RequestItem) => {
			const { name, tipo, valore, stepId } = richiesta;

			switch (stepId) {
				case 1: //"GRUPPO"
					const numero = item["SEDE"]
						.map((sede: any) =>
							sede.AREA.flatMap((area: any) =>
								area.ABBONAMENTO.filter((abb: any) => abb[tipo] === valore)
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
						.map((area: any) =>
							area.ABBONAMENTO.filter((abb: any) => abb[tipo] === valore)
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
					const numero3 = item["ABBONAMENTO"].length;
					//console.log("RICHIESTA NUM ABBONAMENTI --> CASE numero3: ", numero3);
					const totals3 = getTotals(item["ABBONAMENTO"], "AREA");

					// Aggiungere informazioni
					const infoObject3 = {
						name: name,
						item: item,
						tipo: tipo,
						numero: numero3,
						...totals3,
					};

					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject3;
					return;
				case 4: //ABBONAMENTO
					return;
			}
		});

		arrayInfoData.push(infoData);
		return arrayInfoData[0];
	};

	const createCardComponents = async (stepId: number) => {
		let cardComponents = [] as any;
		let idCount = 0;
		let gruppoDesideratoTrovato = false;
		let sedeDesiderataTrovata = false;
		let areaDesiderataTrovata = false;

		console.log("@@@ --> createCardComponents stepId: ", stepId);
		// Aggiungi un nuovo passo con uno stepId univoco
		if (
			listinoState?.listino &&
			Array.isArray(listinoState.listino["GRUPPO"]) &&
			listinoState.listino["GRUPPO"].length > 0
		) {
			listinoState?.listino["GRUPPO"]?.forEach((gruppo) => {
				idCount += 1;
				//console.log("@@@ --> idCount: ", idCount);

				switch (stepId) {
					case 1: //"GRUPPO"
						//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
						setStepSelectOby((prevStepSelectOby) => ({
							...prevStepSelectOby,
							//spread operator per recuperare tutti i valori precedenti
							endStep: 1,
						}));
						const infoAbb = findInfoAbb(gruppo, stepId);
						//console.log("@@@ --> infoAbb: ", infoAbb);
						if (isGruppo(gruppo)) {
							const itemsCard = {
								stepId: stepId,
								tipo: "GRUPPO",
								codice: gruppo.CODGRUPPO,
								descrizione: gruppo.DESGRUPPO,
								onNextStep: gruppo.SEDE.length > 1 ? true : false,
								onPrevStep: false,
								aPromozioni: infoAbb.promo.numero > 0 ? true : false,
								aConvenzioni: infoAbb.convenzioni.numero > 0 ? true : false,
								aSospensioni: infoAbb.sospensioni.numero > 0 ? true : false,
								aSceltaOrario: infoAbb.sceltaOrario.numero > 0 ? true : false,
								numeroSedi: infoAbb.promo.numeroSedi,
								numeroAree: infoAbb.promo.numeroAree,
								numeroAbbonamenti: infoAbb.promo.numeroAbbonamenti,
								abbonamento: {
									CODABB: "n.d",
									DESABB: "n.d",
									IMPORTO: "n.d",
									PROMO: "n.d",
									IMPORTOS: "n.d",
									SCELTAF: "n.d",
									NOSOSP: "n.d",
									DATAINI: "n.d",
									PERIODOATT: "n.d",
									FREQUENZAS: "n.d",
								},
							};

							cardComponents.push(
								<div key={chiaveRandom()}>
									<animated.div style={springPropsCards}>
										<ListinoCard
											key={itemsCard.codice}
											itemsCard={itemsCard}
											stepSelectOby={stepSelectOby}
											setStepSelectOby={setStepSelectOby}
										/>
									</animated.div>
								</div>
							);

							//console.log("@@@ IS GRUPPO: ", gruppo);
						}
						return;

					case 2: //"SEDE"
						console.log("SEDE stepSelectOby : ", stepSelectOby);
						//console.log("listinoState.listino[GRUPPO]: ",listinoState.listino["GRUPPO"]);
						//console.log("gruppo: ", gruppo);

						//PER OTTENERE GLI ABBONAMENTI HO BISOGNO DELLO STEP PRECEDENTE
						//QUINDI O CODAREA OPPURE IDSEDE OPPURE CODGRUPPO
						if (!gruppoDesideratoTrovato) {
							let codiceDaCercare = stepSelectOby.codice;
							let chkCodeSede = trovaCodice(
								listinoState.listino,
								codiceDaCercare
							);
							console.log(
								"@@@@>>>> chkCodeSede  <<<@@@@",
								chkCodeSede[0].GRUPPO
							);
							let percorso = trovaCodiceNextOby(
								listinoState.listino,
								chkCodeSede[0].GRUPPO,
								["CODGRUPPO"]
							);
							console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);
							const sediDelGruppo = percorso?.SEDE;
							console.log("@@@@>>>> sediDelGruppo  <<<@@@@", sediDelGruppo);

							if (
								stepSelectOby.isClickNext === true &&
								storyStep_SubTitleComp.length + 2 <= stepId
							) {
								setStoryStep_SubTitleComp((prevState) => [
									...prevState,
									<Typography
										key={chiaveRandom()}
										variant="subtitle1"
										style={{ display: "flex", alignItems: "center" }}
									>
										<Groups
											color="success"
											style={{ marginRight: "5px", marginLeft: "20px" }}
										/>
										{percorso?.DESGRUPPO}
									</Typography>,
								]);
							} else {
								// Rimuovi l'elemento dall'array utilizzando l'indice
								const indexToRemove =
									stepId - 1; /* indice dell'elemento da rimuovere */
								setStoryStep_SubTitleComp((prevState) => {
									const newState = [...prevState];
									newState.splice(indexToRemove, 1);
									return newState;
								});
							}

							if (sediDelGruppo?.length > 1) {
								gruppoDesideratoTrovato = true;
								// forEach sulle sedi se il gruppoDesiderato esiste
								sediDelGruppo.forEach((sede: Sede) => {
									// Ora 'sede' è un oggetto del tipo Sede
									console.log("@@@ SEDE EACH: ", sede);
									const infoAbb = findInfoAbb(sede, stepId);
									//console.log("@@@ --> infoAbb: ", infoAbb);

									if (isSede(sede)) {
										const itemsCard = {
											stepId: stepId,
											tipo: "SEDE",
											codice: sede.IDSEDE,
											descrizione: sede.DESCSEDE,
											onNextStep: sede.AREA.length > 1 ? true : false,
											onPrevStep: false,
											aPromozioni: infoAbb.promo.numero > 0 ? true : false,
											aConvenzioni:
												infoAbb.convenzioni.numero > 0 ? true : false,
											aSospensioni:
												infoAbb.sospensioni.numero > 0 ? true : false,
											aSceltaOrario:
												infoAbb.sceltaOrario.numero > 0 ? true : false,
											numeroSedi: infoAbb.promo.numeroSedi,
											numeroAree: infoAbb.promo.numeroAree,
											numeroAbbonamenti: infoAbb.promo.numeroAbbonamenti,
											abbonamento: {
												CODABB: "n.d",
												DESABB: "n.d",
												IMPORTO: "n.d",
												PROMO: "n.d",
												IMPORTOS: "n.d",
												SCELTAF: "n.d",
												NOSOSP: "n.d",
												DATAINI: "n.d",
												PERIODOATT: "n.d",
												FREQUENZAS: "n.d",
											},
										};

										cardComponents.push(
											<div key={chiaveRandom()}>
												<animated.div style={springPropsCards}>
													<ListinoCard
														key={itemsCard.codice}
														itemsCard={itemsCard}
														stepSelectOby={stepSelectOby}
														setStepSelectOby={setStepSelectOby}
													/>
												</animated.div>
											</div>
										);
									}
									console.log("@@@ IS SEDE: ", sede);
								});
							} else {
								console.log("gruppoDesiderato.SEDE.length 0");
								//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
								// Rimuovi l'elemento dall'array utilizzando l'indice
								const indexToRemove =
									stepId - 1; /* indice dell'elemento da rimuovere */
								setStoryStep_SubTitleComp((prevState) => {
									const newState = [...prevState];
									newState.splice(indexToRemove, 1);
									return newState;
								});
								if (stepSelectOby.isClickNext === true) {
									setStepSelectOby((prevStepSelectOby) => ({
										...prevStepSelectOby,
										stepId: stepId + 1,
										codice: sediDelGruppo[0].IDSEDE,
									}));
								} else {
									setStepSelectOby((prevStepSelectOby) => ({
										...prevStepSelectOby,
										stepId: stepId - 1,
										codice: sediDelGruppo[0].IDSEDE,
									}));
								}
							}
						}
						return;
					case 3: //"AREA"
						console.log("AREA stepSelectOby : ", stepSelectOby);
						//PER OTTENERE LE AREE HO BISOGNO DELLO STEP PRECEDENTE
						//QUINDI HO IDSEDE OPPURE CODGRUPPO
						if (!sedeDesiderataTrovata) {
							let codiceDaCercare = stepSelectOby.codice; //codice della AREA desiderata
							let chkCodeSede = trovaCodice(
								listinoState.listino,
								codiceDaCercare
							);
							console.log("@@@@>>>> chkCodeSede  <<<@@@@", chkCodeSede[1].SEDE);
							let percorso = trovaCodiceNextOby(
								listinoState.listino,
								chkCodeSede[1].SEDE,
								["IDSEDE"]
							);
							console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);

							// Cerca il GRUPPO che contiene l'AREA desiderata
							const areeDellaSede = percorso?.AREA;
							console.log("@@@@>>>> areeDellaSede  <<<@@@@", areeDellaSede);

							if (
								stepSelectOby.isClickNext === true &&
								storyStep_SubTitleComp.length + 2 <= stepId
							) {
								setStoryStep_SubTitleComp((prevState) => [
									...prevState,
									<Typography
										key={chiaveRandom()}
										variant="subtitle1"
										style={{ display: "flex", alignItems: "center" }}
									>
										<Place
											color="warning"
											style={{ marginRight: "5px", marginLeft: "20px" }}
										/>
										{percorso?.DESCSEDE}
									</Typography>,
								]);
							} else {
								// Rimuovi l'elemento dall'array utilizzando l'indice
								const indexToRemove =
									stepId - 1; /* indice dell'elemento da rimuovere */
								setStoryStep_SubTitleComp((prevState) => {
									const newState = [...prevState];
									newState.splice(indexToRemove, 1);
									return newState;
								});
							}

							if (areeDellaSede?.length > 1) {
								// Imposta la variabile di stato se il sedeDesiderataTrovata è stato trovato
								sedeDesiderataTrovata = true;

								areeDellaSede?.forEach((area: Area) => {
									// Ora 'area' è un oggetto del tipo area
									console.log("@@@ area EACH: ", area);
									const infoAbb = findInfoAbb(area, stepId);
									//console.log("@@@ --> infoAbb: ", infoAbb);

									if (isArea(area)) {
										const itemsCard = {
											stepId: stepId,
											tipo: "AREA",
											codice: area.CODAREA,
											descrizione: area.DESAREA,
											onNextStep: area.ABBONAMENTO.length > 1 ? true : false,
											onPrevStep: false,
											aPromozioni: infoAbb.promo.numero > 0 ? true : false,
											aConvenzioni:
												infoAbb.convenzioni.numero > 0 ? true : false,
											aSospensioni:
												infoAbb.sospensioni.numero > 0 ? true : false,
											aSceltaOrario:
												infoAbb.sceltaOrario.numero > 0 ? true : false,
											numeroSedi: infoAbb.promo.numeroSedi,
											numeroAree: infoAbb.promo.numeroAree,
											numeroAbbonamenti: infoAbb.promo.numeroAbbonamenti,
											abbonamento: {
												CODABB: "n.d",
												DESABB: "n.d",
												IMPORTO: "n.d",
												PROMO: "n.d",
												IMPORTOS: "n.d",
												SCELTAF: "n.d",
												NOSOSP: "n.d",
												DATAINI: "n.d",
												PERIODOATT: "n.d",
												FREQUENZAS: "n.d",
											},
										};

										cardComponents.push(
											<div key={chiaveRandom()}>
												<animated.div style={springPropsCards}>
													<ListinoCard
														key={itemsCard.codice}
														itemsCard={itemsCard}
														stepSelectOby={stepSelectOby}
														setStepSelectOby={setStepSelectOby}
													/>
												</animated.div>
											</div>
										);
									}
									console.log("@@@ IS AREA: ", area);
								});

								console.log("Aree della SEDE:", areeDellaSede);
								//console.log("Abbonamenti della SEDE:", abbonamentiDellaSede);
								return;
							} else {
								console.log(
									"gruppoConSedeDesiderata.SEDE  areeDellaSede.length 0"
								);
								//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
								// Rimuovi l'elemento dall'array utilizzando l'indice
								const indexToRemove =
									stepId - 1; /* indice dell'elemento da rimuovere */
								setStoryStep_SubTitleComp((prevState) => {
									const newState = [...prevState];
									newState.splice(indexToRemove, 1);
									return newState;
								});
								if (stepSelectOby.isClickNext === true) {
									setStepSelectOby((prevStepSelectOby) => ({
										...prevStepSelectOby,
										stepId: stepId + 1,
										codice: areeDellaSede[0]?.CODAREA,
									}));
								} else {
									setStepSelectOby((prevStepSelectOby) => ({
										...prevStepSelectOby,
										stepId: stepId - 1,
										codice: areeDellaSede[0]?.CODAREA,
									}));
								}

								return;
							}
						}
						return;
					case 4: //ABBONAMENTO
						console.log("ABBONAMENTO stepSelectOby : ", stepSelectOby);
						//console.log("listinoState.listino: ", listinoState.listino);

						//PER OTTENERE GLI ABBONAMENTI HO BISOGNO DELLO STEP PRECEDENTE
						//QUINDI O CODAREA OPPURE IDSEDE OPPURE CODGRUPPO
						if (!areaDesiderataTrovata) {
							let codiceDaCercare = stepSelectOby.codice; //codice della AREA desiderata
							let chkCodeSede = trovaCodice(
								listinoState.listino,
								codiceDaCercare
							);
							console.log("@@@@>>>> chkCodeSede  <<<@@@@", chkCodeSede[2].AREA);
							let percorso = trovaCodiceNextOby(
								listinoState.listino,
								chkCodeSede[2].AREA,
								["CODAREA"]
							);
							console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);
							const abbonamentiDellArea = percorso?.ABBONAMENTO;
							console.log(
								"@@@@>>>> abbonamentiDellArea  <<<@@@@",
								abbonamentiDellArea,
								storyStep_SubTitleComp.length
							);

							if (
								stepSelectOby.isClickNext === true &&
								storyStep_SubTitleComp.length + 2 <= stepId
							) {
								setStoryStep_SubTitleComp((prevState) => [
									...prevState,
									<Typography
										key={chiaveRandom()}
										variant="subtitle1"
										style={{ display: "flex", alignItems: "center" }}
									>
										<AutoAwesomeMosaic
											color="error"
											style={{ marginRight: "5px", marginLeft: "20px" }}
										/>
										{percorso?.DESAREA}
									</Typography>,
								]);
							} else {
								// Rimuovi l'elemento dall'array utilizzando l'indice
								const indexToRemove =
									stepId - 1; /* indice dell'elemento da rimuovere */
								setStoryStep_SubTitleComp((prevState) => {
									const newState = [...prevState];
									newState.splice(indexToRemove, 1);
									return newState;
								});
							}

							if (abbonamentiDellArea?.length > 0) {
								areaDesiderataTrovata = true;
								abbonamentiDellArea.forEach((abbonamento: Abbonamento) => {
									// Ora 'abbonamento' è un oggetto del tipo abbonamento
									console.log("@@@ abbonamento EACH: ", abbonamento);
									if (isAbbonamento(abbonamento)) {
										const itemsCard = {
											stepId: stepId,
											tipo: "ABBONAMENTO",
											codice: abbonamento?.CODABB,
											descrizione: abbonamento.DESABB,
											onNextStep: false,
											onPrevStep: true,
											aPromozioni: abbonamento.PROMO === "1" ? true : false,
											aConvenzioni: abbonamento.PROMO === "2" ? true : false,
											aSospensioni: abbonamento.PROMO === "0" ? true : false,
											aSceltaOrario: abbonamento.SCELTAF !== "0" ? true : false,
											numeroSedi: 0,
											numeroAree: 0,
											numeroAbbonamenti: 0,
											abbonamento: {
												CODABB: abbonamento?.CODABB,
												DESABB: abbonamento?.DESABB,
												IMPORTO: abbonamento?.IMPORTO,
												PROMO: abbonamento?.PROMO,
												IMPORTOS: abbonamento?.IMPORTOS,
												SCELTAF: abbonamento?.SCELTAF,
												NOSOSP: abbonamento?.NOSOSP,
												DATAINI: abbonamento?.DATAINI,
												PERIODOATT: abbonamento?.PERIODOATT,
												FREQUENZAS: abbonamento?.FREQUENZAS,
											},
										};

										cardComponents.push(
											<div key={chiaveRandom()}>
												<animated.div style={springPropsCards}>
													<ListinoCard
														key={itemsCard.codice}
														itemsCard={itemsCard}
														stepSelectOby={stepSelectOby}
														setStepSelectOby={setStepSelectOby}
													/>
												</animated.div>
											</div>
										);
									}
									console.log("@@@ IS ABBONAMENTO: ", abbonamento);
								});

								console.log("abbonamento dell AREA:", abbonamentiDellArea);
								return;
							} else {
								console.log(
									"gruppoConAreaDesiderata.AREA  abbonamentiDellArea.length 0"
								);
								//TODO "A QUESTO PUNTO DOBBIAMO ANDARE DIRETTAMENTE ALL'ABBONAMENTO"
								if (stepSelectOby.isClickNext === true) {
									// setStepSelectOby((prevStepSelectOby) => ({
									// 	...prevStepSelectOby,
									// 	stepId: stepId + 1,
									// 	codice: abbonamentiDellArea[0].CODABB,
									// }));
								} else {
									setStepSelectOby((prevStepSelectOby) => ({
										...prevStepSelectOby,
										stepId: stepId - 1,
										codice: abbonamentiDellArea[0].CODABB,
									}));
								}

								return;
							}
						}
						return;
				}
			});
		} else {
			// Fai qualcosa quando "GRUPPO" non è un array o è vuoto
			// Ad esempio, puoi impostare cardComponents su un valore predefinito o fare altre operazioni necessarie.
			console.log("<--- E - R - R - O - R - E --->");
			// Nel tuo componente o nell'area dove vuoi eseguire il fetch e aggiornare lo stato Redux
			console.log("****** 1) ---- CHECK LISTINO: ", listinoState);

			if (listinoState.listino === null) {
				aggiornaListino();
			}
		}

		const btnStepS = (
			<BtnStepStore
				stepSelectOby={stepSelectOby}
				setStepSelectOby={setStepSelectOby}
				itemsCard={undefined}
			/>
		);

		setBtnStep(btnStepS);
		setCardComponent(cardComponents);
	};

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
								paddingRight: "0px",
							}}
						>
							<Typography variant="h4">
								{stepSelectOby.stepId === 1 ? (
									<Groups
										style={{ marginRight: "20px" }}
										color="success"
									/>
								) : stepSelectOby.stepId === 2 ? (
									<Place
										style={{ marginRight: "20px" }}
										color="warning"
									/>
								) : stepSelectOby.stepId === 3 ? (
									<AutoAwesomeMosaic
										style={{ marginRight: "20px" }}
										color="error"
									/>
								) : stepSelectOby.stepId === 4 ? (
									<MotionPhotosAuto
										style={{ marginRight: "20px" }}
										color="info"
									/>
								) : (
									<></>
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
								minHeight: "50px",
							}}
						>
							{storyStep_SubTitleComp.map((element: any, index: any) => {
								console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^ element: ", element);
								console.log("index: ", index);
								return <React.Fragment key={index}>{element}</React.Fragment>;
							})}
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
									minHeight: "660px",
								}}
							>
								{isMobile ? (
									<>
										{btnStep}
										{cardComponent}
										{btnStep}
									</>
								) : (
									<>
										{cardComponent}
										{btnStep}
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
