//api/callNodeService.js
import axios from "axios";
import eCommerceConf from "eCommerceConf.json";
import qs from "qs";
import {
	authEcommerce,
	resetPsw,
	responseCall,
	tokenfulAccess,
	tokenlessAccess,
	obyPostProdotti,
	StripeKeysData,
	obyPostDataCart,
	NewUserData,
	obyPostAttivita,
	obyPostOrari,
	obyPostErrore,
	obyPostRegistraAcquisto,
	obyPostUpDateCart,
	obyPostDataDeleteInCart,
	obyPostDataEmailCancella,
} from "src/components/CommonTypesInterfaces";

async function isNodeServiceReachable() {
	try {
		await axios.head(`${eCommerceConf.UrlServerNode}/api/get-check-server`);
		return true;
	} catch (error) {
		console.error(
			"Il servizio Node.js non è raggiungibile o non attivo.",
			error
		);
		return false;
	}
}

export default async function callNodeService(
	endPoint:
		| "login"
		| "save-new-user"
		| "access-ecommerce"
		| "recupero-credenziali"
		| "stripe/get-stripe-key"
		| "stripe/checkout-session"
		| "ecommerce-listino-prodotti"
		| "authUserCheck"
		| "save-user-data"
		| "cambio-password"
		| "ecommerce-lista-attivita"
		| "ecommerce-lista-orari"
		| "ecommerce-registra-impegno-acquisto"
		| "ecommerce-visualizza-carrello-vendite"
		| "ecommerce-carrello-vendite-elimina"
		| "ecommerce-registra-pagamento"
		| "invio-mail-cancellazione"
		| "rec-error",
	obyPostData:
		| tokenlessAccess
		| tokenfulAccess
		| authEcommerce
		| resetPsw
		| StripeKeysData
		| obyPostProdotti
		| obyPostDataCart
		| NewUserData
		| obyPostAttivita
		| obyPostOrari
		| obyPostUpDateCart
		| obyPostDataDeleteInCart
		| obyPostDataEmailCancella
		| obyPostErrore,
	token: null
): Promise<responseCall> {
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("@@@ callNodeService ...");
	}
	// Controllo se il servizio Node.js è raggiungibile
	if (!(await isNodeServiceReachable())) {
		return {
			successCli: false,
			messageCli: "Il servizio Node.js non è raggiungibile o non attivo.",
		};
	}

	try {
		let headersData: {} = {
			"Content-Type": "application/x-www-form-urlencoded",
		};

		if (token !== null) {
			headersData = {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/x-www-form-urlencoded",
			};
		}

		//const postData = JSON.stringify(obyPostData);
		const postData = qs.stringify(obyPostData);
		const config = {
			method: "post",
			url: `${eCommerceConf.UrlServerNode}/api/${endPoint}`,
			headers: headersData,
			data: postData,
		};
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("callNodeService EndPoint config: ", config);
		}
		return axios
			.request(config)
			.then((response) => {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log("callNodeService then ok: ", response.data);
				}
				if (response.status === 200) {
					return { successCli: true, messageCli: response.data };
				} else {
					return { successCli: false, messageCli: response.data };
				}
			})
			.catch((error) => {
				if (eCommerceConf.ModalitaSviluppo === true){
				console.log(error);
				}
				return {
					successCli: false,
					messageCli: error.response?.data?.message
						? error.response.data.message
						: `errore: ${error}`,
				};
			});
	} catch (error) {
		return { successCli: false, messageCli: error };
	}
}
