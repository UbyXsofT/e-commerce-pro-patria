// /api/login.js
import axios from "axios";
import eCommerceConf from "../../eCommerceConf.json";

export default async function login(username, password, rememberMe) {
	console.log("Call EndPoint: ", `${eCommerceConf.UrlServerNode}/api/login`);

	try {
		const response = await axios.post(`${eCommerceConf.UrlServerNode}/api/login`, {
			username: username,
			password: password,
			rememberMe: rememberMe,
			token: null,
			clientKey: eCommerceConf.ClientKey,
		});
		console.log("response: ", response);
		if (response.status === 200) {
			const {token} = response.data;
			// Esegui altre azioni dopo il login
			return {token, error: "null", success: true};
		} else {
			// Gestisci un'eventuale errore di autenticazione
			return {error: "Credenziali non valide", success: false};
		}
	} catch (error) {
		// Gestisci l'errore di connessione o altre eccezioni
		return {error: error.message, success: false};
	}
}
