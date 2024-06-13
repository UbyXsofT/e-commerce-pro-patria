import CookieManager from "../cookie/CookieManager";
//redux
import { setAuthUser } from "../../store/actions";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export default function logOutUser(dispatch: Dispatch<AnyAction>) {
	let esito = false;
	try {
		dispatch(setAuthUser(null)); // Ottieni il dispatcher dal Redux store
		CookieManager.removeCookie("accessToken");
		CookieManager.removeCookie("refreshToken");
		esito = true;
	} catch (error) {
		esito = false;
	}

	return esito;
}
