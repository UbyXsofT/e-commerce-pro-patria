import React from "react";
import Groups from "@mui/icons-material/Groups";
import Place from "@mui/icons-material/Place";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { style, color } from "@mui/system";
import { animated, SpringValue, useSpring } from "react-spring";
import {
	Sede,
	Area,
	Abbonamento,
	Listino,
} from "src/components/CommonTypesInterfaces";
import BtnStepStore from "../stepper/BtnStepListino";
import { isAbbonamento, isArea, isGruppo, isSede } from "../utils/checkTipo";
import findInfoAbb from "../utils/findInfoAbb";
import trovaCodice from "../utils/trovaCodice";
import trovaCodiceNextOby from "../utils/trovaCodiceNextOby";
import ListinoCard from "./ListinoCard";
import chiaveRandom from "src/components/utils/chiaveRandom";
import { AutoAwesomeMosaic } from "@mui/icons-material";
import addSubTitleIconStep from "../utils/addSubTitleIconStep";

export default function CreateCard(
	stepId: number,
	listinoState: Listino,
	stepSelectOby: {
		stepId: number;
		endNavStepId: number;
		endStep: number;
		codice: string;
		isClickNext: boolean;
	},
	setStepSelectOby: React.Dispatch<
		React.SetStateAction<{
			stepId: number;
			endNavStepId: number;
			endStep: number;
			codice: string;
			isClickNext: boolean;
		}>
	>,
	storyStep_SubTitleComp: JSX.Element[],
	setStoryStep_SubTitleComp: React.Dispatch<
		React.SetStateAction<JSX.Element[]>
	>,
	aggiornaListino: () => Promise<void>,
	setBtnStep: React.Dispatch<React.SetStateAction<React.JSX.Element>>,
	setCardComponent: React.Dispatch<React.SetStateAction<never[]>>,
	springPropsCards: {
		opacity: SpringValue<number>;
	}
) {
	let cardComponents = [] as any;
	let idCount = 0;
	let gruppoDesideratoTrovato = false;
	let sedeDesiderataTrovata = false;
	let areaDesiderataTrovata = false;

	//console.log("@@@ --> CreateCard stepId: ", stepId);
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
							note: gruppo.NOTEGRUPPO,
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
								NOTEABB: "n.d",
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
					//console.log("SEDE stepSelectOby : ", stepSelectOby);
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
						//console.log(
						//	"@@@@>>>> chkCodeSede  <<<@@@@",
						//	chkCodeSede[0].GRUPPO
						//);
						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							chkCodeSede[0].GRUPPO,
							["CODGRUPPO"]
						);
						//console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);
						const sediDelGruppo = percorso?.SEDE;
						//console.log("@@@@>>>> sediDelGruppo  <<<@@@@", sediDelGruppo);

						if (
							stepSelectOby.isClickNext === true &&
							storyStep_SubTitleComp.length + 2 <= stepId
						) {
							addSubTitleIconStep(
								stepSelectOby,
								setStepSelectOby,
								storyStep_SubTitleComp,
								setStoryStep_SubTitleComp,
								percorso?.DESGRUPPO,
								stepId - 1,
								<Groups color="success" />
							);
						} else {
							// Rimuovi l'elemento dall'array utilizzando l'indice
							const indexToRemove =
								stepId - 1; /* indice dell'elemento da rimuovere */
							setStoryStep_SubTitleComp((prevState) => {
								const newState = [...prevState];
								newState.splice(indexToRemove, storyStep_SubTitleComp.length);
								return newState;
							});
						}

						if (sediDelGruppo?.length > 1) {
							gruppoDesideratoTrovato = true;
							// forEach sulle sedi se il gruppoDesiderato esiste
							sediDelGruppo.forEach((sede: Sede) => {
								// Ora 'sede' è un oggetto del tipo Sede
								//console.log("@@@ SEDE EACH: ", sede);
								const infoAbb = findInfoAbb(sede, stepId);
								//console.log("@@@ --> infoAbb: ", infoAbb);

								if (isSede(sede)) {
									const itemsCard = {
										stepId: stepId,
										tipo: "SEDE",
										codice: sede.IDSEDE,
										descrizione: sede.DESCSEDE,
										note: sede.NOTESEDE,
										onNextStep: sede.AREA.length > 1 ? true : false,
										onPrevStep: false,
										aPromozioni: infoAbb.promo.numero > 0 ? true : false,
										aConvenzioni: infoAbb.convenzioni.numero > 0 ? true : false,
										aSospensioni: infoAbb.sospensioni.numero > 0 ? true : false,
										aSceltaOrario:
											infoAbb.sceltaOrario.numero > 0 ? true : false,
										numeroSedi: infoAbb.promo.numeroSedi,
										numeroAree: infoAbb.promo.numeroAree,
										numeroAbbonamenti: infoAbb.promo.numeroAbbonamenti,
										abbonamento: {
											CODABB: "n.d",
											DESABB: "n.d",
											NOTEABB: "n.d",
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
								//console.log("@@@ IS SEDE: ", sede);
							});
						} else {
							//console.log("gruppoDesiderato.SEDE.length 0");
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
					//console.log("AREA stepSelectOby : ", stepSelectOby);
					//PER OTTENERE LE AREE HO BISOGNO DELLO STEP PRECEDENTE
					//QUINDI HO IDSEDE OPPURE CODGRUPPO
					if (!sedeDesiderataTrovata) {
						let codiceDaCercare = stepSelectOby.codice; //codice della AREA desiderata
						let chkCodeSede = trovaCodice(
							listinoState.listino,
							codiceDaCercare
						);
						//console.log("@@@@>>>> chkCodeSede  <<<@@@@", chkCodeSede[1].SEDE);
						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							chkCodeSede[1].SEDE,
							["IDSEDE"]
						);
						//console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);

						// Cerca il GRUPPO che contiene l'AREA desiderata
						const areeDellaSede = percorso?.AREA;
						//console.log("@@@@>>>> areeDellaSede  <<<@@@@", areeDellaSede);

						if (
							stepSelectOby.isClickNext === true &&
							storyStep_SubTitleComp.length + 2 <= stepId
						) {
							addSubTitleIconStep(
								stepSelectOby,
								setStepSelectOby,
								storyStep_SubTitleComp,
								setStoryStep_SubTitleComp,
								percorso?.DESCSEDE,
								stepId - 1,
								<Place color="warning" />
							);
						} else {
							// Rimuovi l'elemento dall'array utilizzando l'indice
							const indexToRemove =
								stepId - 1; /* indice dell'elemento da rimuovere */
							setStoryStep_SubTitleComp((prevState) => {
								const newState = [...prevState];
								newState.splice(indexToRemove, storyStep_SubTitleComp.length);
								return newState;
							});
						}

						if (areeDellaSede?.length > 1) {
							// Imposta la variabile di stato se il sedeDesiderataTrovata è stato trovato
							sedeDesiderataTrovata = true;

							areeDellaSede?.forEach((area: Area) => {
								// Ora 'area' è un oggetto del tipo area
								//console.log("@@@ area EACH: ", area);
								const infoAbb = findInfoAbb(area, stepId);
								//console.log("@@@ --> infoAbb: ", infoAbb);

								if (isArea(area)) {
									const itemsCard = {
										stepId: stepId,
										tipo: "AREA",
										codice: area.CODAREA,
										descrizione: area.DESAREA,
										note: area.NOTEAREA,
										onNextStep: area.ABBONAMENTO.length > 1 ? true : false,
										onPrevStep: false,
										aPromozioni: infoAbb.promo.numero > 0 ? true : false,
										aConvenzioni: infoAbb.convenzioni.numero > 0 ? true : false,
										aSospensioni: infoAbb.sospensioni.numero > 0 ? true : false,
										aSceltaOrario:
											infoAbb.sceltaOrario.numero > 0 ? true : false,
										numeroSedi: infoAbb.promo.numeroSedi,
										numeroAree: infoAbb.promo.numeroAree,
										numeroAbbonamenti: infoAbb.promo.numeroAbbonamenti,
										abbonamento: {
											CODABB: "n.d",
											DESABB: "n.d",
											NOTEABB: "n.d",
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
								//console.log("@@@ IS AREA: ", area);
							});

							//console.log("Aree della SEDE:", areeDellaSede);
							//console.log("Abbonamenti della SEDE:", abbonamentiDellaSede);
							return;
						} else {
							// console.log(
							// 	"gruppoConSedeDesiderata.SEDE  areeDellaSede.length 0"
							// );
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
					//console.log("ABBONAMENTO stepSelectOby : ", stepSelectOby);
					//console.log("listinoState.listino: ", listinoState.listino);

					//PER OTTENERE GLI ABBONAMENTI HO BISOGNO DELLO STEP PRECEDENTE
					//QUINDI O CODAREA OPPURE IDSEDE OPPURE CODGRUPPO
					if (!areaDesiderataTrovata) {
						let codiceDaCercare = stepSelectOby.codice; //codice della AREA desiderata
						let chkCodeSede = trovaCodice(
							listinoState.listino,
							codiceDaCercare
						);
						//console.log("@@@@>>>> chkCodeSede  <<<@@@@", chkCodeSede[2].AREA);
						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							chkCodeSede[2].AREA,
							["CODAREA"]
						);
						//console.log("@@@@>>>> PERCORSO  <<<@@@@", percorso);
						const abbonamentiDellArea = percorso?.ABBONAMENTO;
						// console.log(
						// 	"@@@@>>>> abbonamentiDellArea  <<<@@@@",
						// 	abbonamentiDellArea,
						// 	storyStep_SubTitleComp.length
						// );

						if (
							stepSelectOby.isClickNext === true &&
							storyStep_SubTitleComp.length + 2 <= stepId
						) {
							addSubTitleIconStep(
								stepSelectOby,
								setStepSelectOby,
								storyStep_SubTitleComp,
								setStoryStep_SubTitleComp,
								percorso?.DESAREA,
								stepId - 1,
								<AutoAwesomeMosaic color="error" />
							);
						} else {
							// Rimuovi l'elemento dall'array utilizzando l'indice
							const indexToRemove =
								stepId - 1; /* indice dell'elemento da rimuovere */
							setStoryStep_SubTitleComp((prevState) => {
								const newState = [...prevState];
								newState.splice(indexToRemove, storyStep_SubTitleComp.length);
								return newState;
							});
						}

						if (abbonamentiDellArea?.length > 0) {
							areaDesiderataTrovata = true;
							abbonamentiDellArea.forEach((abbonamento: Abbonamento) => {
								// Ora 'abbonamento' è un oggetto del tipo abbonamento
								//console.log("@@@ abbonamento EACH: ", abbonamento);
								if (isAbbonamento(abbonamento)) {
									const itemsCard = {
										stepId: stepId,
										tipo: "ABBONAMENTO",
										codice: abbonamento?.CODABB,
										descrizione: abbonamento.DESABB,
										note: abbonamento.NOTEABB,
										onNextStep: false,
										onPrevStep: true,
										aPromozioni: abbonamento.PROMO === "1" ? true : false,
										aConvenzioni: abbonamento.PROMO === "2" ? true : false,
										aSospensioni: abbonamento.NOSOSP === "0" ? true : false,
										aSceltaOrario: abbonamento.SCELTAF !== "0" ? true : false,
										numeroSedi: 0,
										numeroAree: 0,
										numeroAbbonamenti: 0,
										abbonamento: {
											CODABB: abbonamento?.CODABB,
											DESABB: abbonamento?.DESABB,
											NOTEABB: abbonamento?.NOTEABB,
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
								//console.log("@@@ IS ABBONAMENTO: ", abbonamento);
							});

							//console.log("abbonamento dell AREA:", abbonamentiDellArea);
							return;
						} else {
							// console.log(
							// 	"gruppoConAreaDesiderata.AREA  abbonamentiDellArea.length 0"
							// );
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
}
