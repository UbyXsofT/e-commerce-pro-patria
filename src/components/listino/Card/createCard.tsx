import React from "react";
import { animated, SpringValue } from "react-spring";
import {
	Sede,
	Area,
	Abbonamento,
	Listino,
	itemsCard,
	StoreState,
} from "src/components/CommonTypesInterfaces";
// import BtnStepStore from "../stepper/BtnStepListino";
import BtnStepStore from "src/components/listino/stepper/BtnStepListino";
// import { isAbbonamento, isArea, isGruppo, isSede } from "../utils/checkTipo";
import {
	isAbbonamento,
	isArea,
	isGruppo,
	isSede,
} from "src/components/listino/utils/checkTipo";
import trovaCodiceNextOby from "src/components/listino/utils/trovaCodiceNextOby";
import ListinoCard from "./ListinoCard";
import chiaveRandom from "src/components/utils/chiaveRandom";
import addSubTitleIconStep from "src/components/listino/utils/addSubTitleIconStep";
import myIcons from "src/theme/IconsDefine";
import createItemsCard from "src/components/listino/utils/creaItemsCard";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import router from "next/router";
import eCommerceConf from "eCommerceConf.json";
import { setLoading } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";

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
	// Aggiungi un nuovo passo con uno stepId univoco
	if (
		listinoState?.listino &&
		Array.isArray(listinoState.listino["GRUPPO"]) &&
		listinoState.listino["GRUPPO"].length > 0
	) {
		listinoState?.listino["GRUPPO"]?.forEach((gruppo) => {
			idCount += 1;
			let codiceDaCercare = "";
			// Recuperare i dati dell'attività e i suoi orari da sessionStorage
			const storedData = sessionStorage.getItem("STEP");
			const parsedData = storedData ? JSON.parse(storedData) : [];
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("---- >> STEP parsedData: ", parsedData);
			}
			// Verificare se lo stepId è già presente nell'array
			const existingStepIndex = parsedData.findIndex(
				(item: any) => item.stepId === stepId
			);

			if (existingStepIndex !== -1) {
				// Se lo stepId è già presente, utilizzo il codice dell'oggetto corrispondente
				codiceDaCercare = parsedData[existingStepIndex].stepCodice;
			}
			switch (stepId) {
				case 1: //"GRUPPO"
					//essendo cards a scelta obbligatoria per i gruppi disabilito il pulsante successivo
					setStepSelectOby((prevStepSelectOby) => ({
						...prevStepSelectOby,
						//spread operator per recuperare tutti i valori precedenti
						endStep: 1,
					}));

					if (isGruppo(gruppo)) {
						const itemsCard = createItemsCard(
							"GRUPPO",
							stepId,
							gruppo
						) as itemsCard;

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
					return;

				case 2: //"SEDE"
				if (eCommerceConf.ModalitaSviluppo === true){
					console.log("@@@@>>>>STEP2 --- SEDE stepSelectOby : ", stepSelectOby);
					console.log(
						"listinoState.listino[GRUPPO]: ",
						listinoState.listino["GRUPPO"]
					);
				}
				
				//PER OTTENERE GLI ABBONAMENTI HO BISOGNO DELLO STEP PRECEDENTE
					//QUINDI O CODAREA OPPURE IDSEDE OPPURE CODGRUPPO
					if (!gruppoDesideratoTrovato) {
						//let codiceDaCercare = stepSelectOby.codice;
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP2 --- codiceDaCercare  <<<@@@@",
							codiceDaCercare
						);
					}
						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							codiceDaCercare,
							["CODGRUPPO", "IDSEDE", "CODAREA", "CODABB"]
						);
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("@@@@>>>>STEP2 --- PERCORSO  <<<@@@@", percorso);
						}
						const sediDelGruppo = percorso?.SEDE;
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP2 --- sediDelGruppo  <<<@@@@",
							sediDelGruppo
						);
					}
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
								React.cloneElement(myIcons.GruppoIcon, { fontSize: "medium" })
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
								if (isSede(sede)) {
									const itemsCard = createItemsCard(
										"SEDE",
										stepId,
										sede
									) as itemsCard;
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
								
							});
						} else {
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
					
					//PER OTTENERE LE AREE HO BISOGNO DELLO STEP PRECEDENTE
					//QUINDI HO IDSEDE OPPURE CODGRUPPO
					if (!sedeDesiderataTrovata) {
						// let codiceDaCercare = stepSelectOby.codice; //codice della AREA desiderata
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP3 --- codiceDaCercare  <<<@@@@",
							codiceDaCercare
						);
					}
						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							codiceDaCercare,
							["CODGRUPPO", "IDSEDE", "CODAREA", "CODABB"]
						);

						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("@@@@>>>>STEP3 ---  PERCORSO  <<<@@@@", percorso);
						}
						// Cerca il GRUPPO che contiene l'AREA desiderata
						const areeDellaSede = percorso?.AREA;
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP3 --- areeDellaSede  <<<@@@@",
							areeDellaSede
						);
					}
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
								React.cloneElement(myIcons.SedeIcon, { fontSize: "medium" })
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
								if (isArea(area)) {
									const itemsCard = createItemsCard(
										"AREA",
										stepId,
										area
									) as itemsCard;
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
							});
							return;
						} else {
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
					//PER OTTENERE GLI ABBONAMENTI HO BISOGNO DELLO STEP PRECEDENTE
					//QUINDI O CODAREA OPPURE IDSEDE OPPURE CODGRUPPO
					if (!areaDesiderataTrovata) {
						
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP4 --- codiceDaCercare  <<<@@@@",
							codiceDaCercare
						);
					}

						let percorso = trovaCodiceNextOby(
							listinoState.listino,
							codiceDaCercare,
							["CODGRUPPO", "IDSEDE", "CODAREA", "CODABB"]
						);

						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("@@@@>>>>STEP4 --- PERCORSO  <<<@@@@", percorso);
						}
						const abbonamentiDellArea = percorso?.ABBONAMENTO;
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log(
							"@@@@>>>>STEP4 --- abbonamentiDellArea  <<<@@@@",
							abbonamentiDellArea,
							storyStep_SubTitleComp.length
						);
					}
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
								React.cloneElement(myIcons.AreaIcon, { fontSize: "medium" })
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
								if (isAbbonamento(abbonamento)) {
									const itemsCard = createItemsCard(
										"ABBONAMENTO",
										stepId,
										abbonamento
									) as itemsCard;

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
							});
							return;
						} else {
							
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
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("<--- E - R - R - O - R - E --->");
		// Nel tuo componente o nell'area dove vuoi eseguire il fetch e aggiornare lo stato Redux
		console.log("****** 1) ---- CHECK LISTINO: ", listinoState);
		}
		
		if (listinoState.listino === null || listinoState.listino === undefined) {
			try {
				aggiornaListino();
			} catch (error) {
				router.push(
					`/blockPage?titolo=CARICAMENTO DATI LISTINO&descrizione=Si è verificato un errore durante il recupero dei dati dal servizio del centro fitness. Se il problema persiste si prega di cottattare il proprio centro fitness. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
				);
			}
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
