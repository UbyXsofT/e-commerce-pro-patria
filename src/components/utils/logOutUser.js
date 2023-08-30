import CookieManager from "../cookie/CookieManager";
//redux
import { setAuthUser } from "../../store/actions";

export default function logOutUser(dispatch) {
	let esito = false;
	try {
		dispatch(setAuthUser(null)); // Ottieni il dispatcher dal Redux store
		if (CookieManager.getCookie("userName") || CookieManager.getCookie("password") || CookieManager.getCookie("ricordami")) {
			CookieManager.removeCookie("userName");
			CookieManager.removeCookie("password");
			CookieManager.removeCookie("ricordami");
			if (CookieManager.getCookie("accessToken") || CookieManager.getCookie("refreshToken")) {
				CookieManager.removeCookie("accessToken");
				CookieManager.removeCookie("refreshToken");
			}
		}
		esito = true;
	} catch (error) {
		console.log("logOutUser: ", error);
		esito = false;
	}

	return esito;
}
