import CookieManager from "../cookie/CookieManager";
//redux
import { setAuthUser } from "../../store/actions";

export default function logOutUser(dispatch) {
	let esito = false;
	try {
		console.log(">>>> logOutUser");
		dispatch(setAuthUser(null)); // Ottieni il dispatcher dal Redux store

		CookieManager.removeCookie("userName");
		CookieManager.removeCookie("password");
		CookieManager.removeCookie("ricordami");
		CookieManager.removeCookie("accessToken");
		CookieManager.removeCookie("refreshToken");

		console.log(">>>> logOutUser esito = true");
		esito = true;
	} catch (error) {
		console.log("logOutUser: ", error);
		esito = false;
	}

	return esito;
}
