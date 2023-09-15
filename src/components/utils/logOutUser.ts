import CookieManager from "../cookie/CookieManager";
//redux
import { setAuthUser } from "../../store/actions";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export default function logOutUser(dispatch: Dispatch<AnyAction>) {
	let esito = false;
	try {
		console.log(">>>> logOutUser");
		dispatch(setAuthUser(null)); // Ottieni il dispatcher dal Redux store

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
