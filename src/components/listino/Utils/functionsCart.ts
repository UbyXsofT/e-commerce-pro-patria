import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
	ActualProduct,
	Cart,
	CartProdotto,
	StoreState,
	AuthUser,
	authEcommerce,
	obyPostUpDateCart,
	CartTommys,
	TommysOggettiCarrello,
	CarrelloInTommys,
	obyPostDataDeleteInCart,
	obyPostDataEmailCancella,
	Date,
	obyPostIdSessioneData,
} from "src/components/CommonTypesInterfaces";
import { setCart } from "src/store/actions";
import { SetCartTommys } from "src/store/actions";

import callNodeService from "pages/api/callNodeService";
import CookieManager from "src/components/cookie/CookieManager";
import eCommerceConf from "eCommerceConf.json";
import { setAuthUser } from "src/store/actions";
import { array } from "prop-types";
import router from "next/router";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { ImportContacts } from "@mui/icons-material";
import dayjs from "dayjs";

let eliminazioneEsito: boolean = true; // Imposta l'esito predefinito su true
let invioEmailEsito: boolean = true; // Imposta l'esito predefinito su true
let errorMessage: string | null = null; // Messaggio di errore eventualmente generato durante l'eliminazione o l'invio dell'email

export const numeroSenzaDecimale = (numberString: string): number => {
	let numeroSenzaDecimale: number = Number(
		numberString.toString().replace(".", "")
	);
	return numeroSenzaDecimale;
};

export const importoInCentesimi = (importo: number): number => {
	let importoInCentesimi: number = importo * 100;
	return importoInCentesimi;
};

// UBY_AJAX_CALL.WcfCall ----->>>>> CHIAMATA SERVIZIO METODO: Carrello_Vendite_Elimina
// U-AjaxCall.js:10 >>>>>>>> WcfCall: Carrello_Vendite_Elimina  - Chiave Cliente: CLADRD5
// U-AjaxCall.js:10 >>>>>>>> WcfCall: Carrello_Vendite_Elimina  - Chiave Tipo: 1
// U-AjaxCall.js:10 >>>>>>>> WcfCall: Carrello_Vendite_Elimina  - Chiave ID: 3400
// U-AjaxCall.js:10 >>>>>>>> WcfCall: Carrello_Vendite_Elimina  - Chiave Codice: IS0003404
export const removeFromCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch
): void => {
	const user = cart.at(0);
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("removeFromCart");
	}
	let filteredCart = null;

	if (user) {
		filteredCart = user.cart.filter((inCartProdotto) => {
			if (inCartProdotto?.codice !== prodotto?.codice) {
				return inCartProdotto;
			}
		});
	} else {
		return;
	}

	dispatch(setCart([{ userId: user.userId, cart: filteredCart }]));
};

export const addToCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch,
	authUser: AuthUser | null
): void => {
	const configurableProdotto: CartProdotto = {
		...prodotto,
	};

	let user = cart.at(0);
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("addToCart");
	}
	user
		? dispatch(
				setCart([
					{
						userId: authUser?.USERID ?? "null",
						cart: [...user.cart, configurableProdotto],
					},
				])
		  )
		: dispatch(
				setCart([
					{
						userId: authUser?.USERID ?? "null",
						cart: [configurableProdotto],
					},
				])
		  );
};

export const isInCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch
): boolean => {
	let user = cart.at(0);

	if (!user) {
		return false;
	}

	let filteredCart = user.cart.filter((inCartProdotto) => {
		if (inCartProdotto?.codice === prodotto?.codice) {
			return inCartProdotto;
		}
	});

	if (filteredCart.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const clearCart = (cart: Cart, dispatch: Dispatch): Cart => {
	const user = cart.at(0);
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("clearCart");
	}
	if (user) {
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("@@@ - OK: clearCart");
		}
		dispatch(setCart([{ userId: user.userId, cart: [] }]));
		return [{ userId: user.userId, cart: [] }];
	} else {
		return [{ userId: "null", cart: [] }];
	}
};

let isAnError = false;
// Funzione per aggiornare lo stato isUpdated
export const updateIsUpdated = (value: string) => {
	sessionStorage.setItem("isUpdated", value);
};

export const getIsUpdated = () => {
	// Funzione per recuperare lo stato isUpdated
	return sessionStorage.getItem("isUpdated");
};

export const useUpdateCartTommys = async (
	cartTommys: CartTommys,
	dispatch: Dispatch,
	authUser: AuthUser | null,
	authEcommerce: boolean
): Promise<void> => {
	// Calcola il numero di oggetti nel carrello attuale
	let prevCartItemCount = 0;
	const isUpdated = getIsUpdated();

	if (cartTommys) {
		prevCartItemCount = cartTommys.TommysCart_OGGETTO?.length;
		if (prevCartItemCount === undefined) {
			prevCartItemCount = 0;
			updateIsUpdated("false");
			dispatch(
				SetCartTommys({
					//default stato
					TommysCart_OGGETTO: [],
					TommysCart_EASYP: null,
					TommysCart_MONEYC: null,
				})
			);
		}
	}

	if (eCommerceConf.ModalitaSviluppo === true){
	console.log(
		"*********************** -------- FORZO L'AGGIORNAMENTO DEL CARRELLO"
	);
	console.log("prevCartItemCount: ", prevCartItemCount);
	console.log("cartTommys: ", cartTommys);
	console.log("authEcommerce: ", authEcommerce);
	console.log("authUser: ", authUser);
	console.log("isAnError: ", isAnError);
	console.log("isUpdated: ", isUpdated);
	}
	const fetchData = async () => {
		// La tua logica per recuperare il carrello
		try {
			if (!authUser?.USERID) {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("NO! USER ID");
				}
				isAnError = true;
				router.push("/account/login");
				return;
			}

			const obyPostData: obyPostUpDateCart = {
				clienteKey: eCommerceConf.ClienteKey,
				Cliente: authUser.USERID,
			};

			try {
				const respCall = await callNodeService(
					"ecommerce-visualizza-carrello-vendite",
					obyPostData,
					null
				);
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("respCall: ", respCall);
				}
				const msg_Resp = respCall.messageCli.message;

				if (respCall.successCli) {
					if (msg_Resp && msg_Resp.CARRELLO) {
						try {
							const obyResp = msg_Resp.CARRELLO;
							if (eCommerceConf.ModalitaSviluppo === true){
							console.log("Aggiorna Redux CARRELLO:", obyResp);
							}
							let processTommysObysCart: CarrelloInTommys = {
								TommysCart_OGGETTO: [],
								TommysCart_EASYP: null,
								TommysCart_MONEYC: null,
							};

							if (obyResp.OGGETTO) {
								let oggettoArray = Array.isArray(obyResp.OGGETTO)
									? obyResp.OGGETTO
									: [obyResp.OGGETTO];

								let _items = oggettoArray.map(
									(item: TommysOggettiCarrello): TommysOggettiCarrello => {
										if (eCommerceConf.ModalitaSviluppo === true){
										console.log("@ MAP item: ", item);
										}
										return {
											TIPO: item.TIPO,
											ID: item.ID,
											CODICE: item.CODICE,
											DESC: item.DESC,
											IMPORTO: item.IMPORTO,
											FLAGCANC: item.FLAGCANC,
										};
									}
								);

								processTommysObysCart = {
									TommysCart_OGGETTO: _items,
									TommysCart_EASYP: obyResp.EASYP,
									TommysCart_MONEYC: obyResp.MONEYC,
								};
							}

							if (
								prevCartItemCount !==
								processTommysObysCart?.TommysCart_OGGETTO.length
							) {
								dispatch(SetCartTommys(processTommysObysCart));
								updateIsUpdated("false");
							} else {
								updateIsUpdated("true");
							}
							if (eCommerceConf.ModalitaSviluppo === true){
							console.log("@ CARRELLO TUTTO OK");
							}
						} catch (error) {
							if (eCommerceConf.ModalitaSviluppo === true){
							console.log("Aggiorna Redux CARRELLO ERRORE:", error);
							}
							isAnError = true;
						}
					} else {
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("msg_Resp: ", msg_Resp);
						}
						isAnError = true;
					}
				} else {
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("CLI Failed");
					}
					isAnError = true;
				}
			} catch (error) {
				isAnError = true;
				console.error("Errore nella chiamata:", error);
			}
		} catch (error) {
			//isUpdated = false;
			isAnError = true;
		}
	};
	// Controlla e gestisce lo stato isUpdated solo se l'utente è autenticato
	if (authUser) {
		if (isUpdated === "false" || isUpdated === null) {
			// Aggiorna lo stato solo se è necessario
			fetchData();
		}
	}
};

const inviaEmailCancellazione = async (
	emailCliente: string,
	emailCentro: string,
	flagEmail: string,
	authUser: AuthUser,
	ProdottoInTommys: TommysOggettiCarrello
) => {
	let esitoFetch: boolean | undefined = undefined; // Imposta il tipo della variabile
	const currentDate: Date = dayjs();
	const Today_formattedDate = currentDate.locale("it").format("DD-MM-YYYY");
	
	const fetchData = async () => {
		try {
			const obyPostData: obyPostDataEmailCancella = {
				clienteKey: eCommerceConf.ClienteKey,
				Piattaforma: eCommerceConf.oggetto_Mail,
				emailCentro: emailCentro,
				emailCliente: emailCliente,
				emailLista: "",
				orario: "",
				data: Today_formattedDate,
				istruttore: "",
				corso: "",
				sala: "",
				lezioneId: "",
				clienteId: authUser.USERID,
				nomeCliente: authUser.NOMINATIVO,
				flagEmail: flagEmail,
				clienteIdLISTA: "",
				nomeClienteLista: "",
				Is_Canc_Acquisto: "true",
				desc_Acquisto: ProdottoInTommys.DESC,
			};

			const respCall = await callNodeService(
				"invio-mail-cancellazione",
				obyPostData,
				null
			);
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("respCall: ", respCall);
			}
			const msg_Resp = respCall.messageCli.message;

			if (respCall.successCli) {
				if (msg_Resp) {
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("msg_Resp invio-mail-cancellazione:", msg_Resp);
					}
					esitoFetch = true; // Imposta l'esito su true se l'operazione ha avuto successo
				} else {
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("msg_Resp INVIO EMAIL: ", msg_Resp);
					}
					esitoFetch = false; // Imposta l'esito su false se non è stata ricevuta una risposta valida
				}
			} else {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("CLI Failed INVIO EMAIL");
				}
				esitoFetch = false; // Imposta l'esito su false se la chiamata API ha fallito
			}
		} catch (error) {
			if (eCommerceConf.ModalitaSviluppo === true){
			console.error("Errore nella chiamata INVIO EMAIL:", error);
			}
			esitoFetch = false; // Imposta l'esito su false se si è verificato un errore durante la chiamata
		}
	};

	try {
		await fetchData(); // Attendiamo che fetchData() sia completato prima di proseguire
		if (esitoFetch === true) {
			//INVIO EMAIL INVIATA
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("@@@ fetch INVIO EMAIL POSITIVO!");
			}
			return true;
		} else {
			// mostro errore
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("@@@ fetch INVIO EMAIL FALLITO!");
			}
			return false;
		}
	} catch (error) {
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("Errore nell'esecuzione di fetchData INVIO EMAIL:", error);
		}
		return false;
	}
};

const eliminaObyCartTommys = async (
	ProdottoInTommys: TommysOggettiCarrello,
	authUser: AuthUser
) => {
	let emailCliente = "";
	let emailCentro = "";
	let flagEmail = "";
	let errMSG = "";
	let esitoFetch: boolean | undefined = undefined; // Imposta il tipo della variabile

	const fetchData = async () => {
		try {
			const obyPostData: obyPostDataDeleteInCart = {
				clienteKey: eCommerceConf.ClienteKey,
				Cliente: authUser?.USERID,
				Tipo: ProdottoInTommys.TIPO,
				ID: ProdottoInTommys.ID,
				Codice: ProdottoInTommys.CODICE,
			};

			const respCall = await callNodeService(
				"ecommerce-carrello-vendite-elimina",
				obyPostData,
				null
			);
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("respCall: ", respCall);
			}
			const msg_Resp = respCall.messageCli.message;

			if (respCall.successCli) {
				if (msg_Resp && msg_Resp.CANCELLAZIONE) {
					const obyResp = msg_Resp.CANCELLAZIONE;
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("obyResp CANCELLAZIONE:", obyResp);
					}
					if (Number(obyResp.ESITO) === 1) {
						emailCliente = obyResp.EMAILCLIENTE;
						emailCentro = obyResp.EMAILCENTRO;
						flagEmail = obyResp.FLAGEMAIL;
						errMSG = obyResp.ERRMSG;
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("@ CANCELLAZIONE TUTTO OK");
						}
						esitoFetch = true; // Imposta l'esito su true se l'operazione ha avuto successo
					} else {
						if (eCommerceConf.ModalitaSviluppo === true){
						console.log("@ CANCELLAZIONE CON ESITO NEGATIVO");
						}
						esitoFetch = false; // Imposta l'esito su false se l'operazione ha avuto esito negativo
					}
				} else {
					if (eCommerceConf.ModalitaSviluppo === true){
					console.log("msg_Resp: ", msg_Resp);
					}
					esitoFetch = false; // Imposta l'esito su false se non è stata ricevuta una risposta valida
				}
			} else {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("CLI Failed");
				}
				esitoFetch = false; // Imposta l'esito su false se la chiamata API ha fallito
			}
		} catch (error) {
			console.error("Errore nella chiamata:", error);
			esitoFetch = false; // Imposta l'esito su false se si è verificato un errore durante la chiamata
		}
	};

	try {
		await fetchData(); // Attendiamo che fetchData() sia completato prima di proseguire
		if (esitoFetch === true) {
			//provo ad inviare email
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("@@@ fetch POSITIVO!");
			console.log("emailCliente: ", emailCliente);
			console.log("emailCentro: ", emailCentro);
			console.log("flagEmail: ", flagEmail);
			console.log("errMSG: ", errMSG);
			}
			const respInvioMail = await inviaEmailCancellazione(
				emailCliente,
				emailCentro,
				flagEmail,
				authUser,
				ProdottoInTommys
			);

			if (respInvioMail === false) {
				eliminazioneEsito = false;
				invioEmailEsito = false;
				errorMessage =
					"Si è verificato un errore durante l'invio dell'email contenente l'avviso di cancellazione al suo centro fitness. La preghiamo di contattare il supporto clienti del suo centro fitness per risolvere questo problema.";
			} else {
				// Mostra errore
				eliminazioneEsito = true;
				invioEmailEsito = true;
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("@@@ fetch RIUSCITO MAIL!");
				}
			}
		} else {
			eliminazioneEsito = false;
			invioEmailEsito = false;
			errorMessage =
				"Si è verificato un errore durante l'eliminazione dell'oggetto dal carrello. Se il problema persiste, la preghiamo di contattare il supporto clienti del suo centro fitness.";
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("@@@ fetch FALLITO!");
				}
		}
	} catch (error) {
		eliminazioneEsito = false;
		invioEmailEsito = false;
		(errorMessage =
			"Si è verificato un errore durante l'eliminazione dell'oggetto dal carrello. Se il problema persiste, la preghiamo di contattare il supporto clienti del suo centro fitness. ERRORE: "),
			error;
			if (eCommerceConf.ModalitaSviluppo === true){
		console.log("Errore nell'esecuzione di fetchData:", error);
			}
	}
};

export const removeFromCartTommys = async (
	prodottoCodice: string | null | undefined,
	cartTommys: CartTommys,
	authUser: AuthUser | null,
	dispatch: Dispatch
): Promise<{
	eliminazioneEsito: boolean;
	invioEmailEsito: boolean;
	errorMessage: string | null;
}> => {
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("removeFromCart");
	}
	sessionStorage.setItem("isUpdated", "false");
	let filteredCart: TommysOggettiCarrello[] = [];
	const eliminazioniPromises: Promise<void>[] = []; // Array di promesse per le eliminazioni

	eliminazioneEsito = true; // Imposta l'esito predefinito su true
	invioEmailEsito = true; // Imposta l'esito predefinito su true
	errorMessage = null; // Messaggio di errore eventualmente generato durante l'eliminazione o l'invio dell'email

	if (cartTommys && cartTommys.TommysCart_OGGETTO) {
		for (const inCartProdotto of cartTommys.TommysCart_OGGETTO) {
			if (inCartProdotto?.CODICE !== prodottoCodice) {
				filteredCart.push(inCartProdotto as TommysOggettiCarrello);
			} else {
				// Aggiungi la promessa di eliminazione all'array delle promesse
				eliminazioniPromises.push(
					eliminaObyCartTommys(
						inCartProdotto as TommysOggettiCarrello,
						authUser as AuthUser
					)
				);
			}
		}
	} else {
		return {
			eliminazioneEsito: false,
			invioEmailEsito: false,
			errorMessage: "Carrello non valido",
		}; // Restituisci un esito negativo se il carrello non è valido
	}

	try {
		// Attendiamo che tutte le promesse di eliminazione vengano risolte
		await Promise.all(eliminazioniPromises);
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("TUTTE LE PROMESSE DI ELIMINAZIONE SONO STATE SODDISFATTE!");
		}
	} catch (error) {
		// Gestisci eventuali errori nell'eliminazione dei prodotti
		console.error("Errore durante l'eliminazione dei prodotti:", error);
		// Imposta l'esito su false e memorizza il messaggio di errore
		eliminazioneEsito = false;
		errorMessage =
			"Si è verificato un errore durante l'eliminazione del prodotto";
	}

	// Qui potresti gestire l'invio dell'email e memorizzare l'esito e il messaggio di errore, se presente

	// Una volta che tutte le eliminazioni sono state completate con successo,
	// aggiorna la pagina del carrello con i prodotti rimanenti
	dispatch(
		SetCartTommys({
			TommysCart_OGGETTO: filteredCart,
			TommysCart_EASYP: null,
			TommysCart_MONEYC: null,
		})
	);

	// Restituisci gli esiti e il messaggio di errore, se presente
	return { eliminazioneEsito, invioEmailEsito, errorMessage };
};

