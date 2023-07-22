// /api/login.js
import axios from "axios";
import eCommerceConfig from "../../eCommerceConfig.json";

export default async function login(username, password, rememberMe) {
	console.log("Call EndPoint: ", `${eCommerceConfig.UrlServerNode}/api/login`);

	try {
		const response = await axios.post(`${eCommerceConfig.UrlServerNode}/api/login`, {
			username: username,
			password: password,
			rememberMe: rememberMe,
			token: null,
			clientKey: eCommerceConfig.ClientKey,
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
