// Index.js
import * as React from "react";
import Router from "next/router";
import { useSpring, animated, easings } from "@react-spring/web";
import { useTheme, styled } from "@mui/material/styles";
import Image from "next/image";
import { Lato, Poppins } from "next/font/google";
import eCommerceConf from "eCommerceConf.json";
//redux
import { useDispatch, useSelector } from "react-redux";
import AuthEcommerceHelper from "src/store/AuthEcommerceHelper";
import AuthUserHelper from "src/store/AuthUserHelper";
import SetStripeKeysHelper from "src/store/SetStripeKeysHelper";

import { StoreState } from "src/components/CommonTypesInterfaces";

export const lato = Lato({
	weight: ["300", "400"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const poppins = Poppins({
	weight: ["300", "400", "800"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

const networkError = `/blockPage?titolo=CONVALIDA ECOMMERCE&descrizione=${eCommerceConf.MsgErrConvEcommerce}&desc_azione=${eCommerceConf.MsgChkAgainConvEcommerce}&redirectTo=/`;

const Index = () => {
	const theme = useTheme();
	// console.log("theme: ", theme);
	const dispatch = useDispatch(); // Ottieni il dispatcher dal Redux store
	const [isAuthEcommerce, setIsAuthEcommerce] = React.useState(false);
	const [isAuthStripe, setIsAuthStripe] = React.useState(false);
	const [routerToPush, setRouterToPush] = React.useState<null | string>(null);

	const startRedirect = async () => {
		//STRIPE LOAD KEYS ESITO POSITIVO
		if (isAuthEcommerce === true && routerToPush && isAuthStripe) {
			Router.push(routerToPush);
		} else if (routerToPush === networkError) {
			Router.push(networkError);
		} else {
			Router.push(networkError);
		}
	};

	React.useEffect(() => {
		const updateEcommerceAuth = async () => {
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("@@@@@@@@@ ---- >> Index updateEcommerceAuth");
			}
			// 0. Chiama la funzione SetStripeKeysHelper(dispatch) asincrona per ottenere le informazioni su stripe.
			const authConfStripe = (await SetStripeKeysHelper(dispatch)).isGetKeys;
			setIsAuthStripe(authConfStripe);
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("authConfStripe: ", authConfStripe);
			}
			// 1. Chiama la funzione AuthEcommerceHelper(dispatch) asincrona per ottenere le informazioni sull'autenticazione dell'e-commerce.
			const authEcommerce = (await AuthEcommerceHelper(dispatch)).result;

			// 2. Imposta il valore di stato setIsAuthEcommerce con il risultato dell'autenticazione ottenuto dalla chiamata precedente.
			setIsAuthEcommerce(authEcommerce);

			// 3. Chiama la funzione AuthUserHelper(dispatch, authEcommerce) asincrona per ottenere le informazioni sull'utente autenticato.
			const route = (await AuthUserHelper(dispatch, authEcommerce)).route;

			// 4. Se la variabile 'route' è definita (diversa da null o undefined), imposta il valore di stato 'setRouterToPush' con il valore di 'route', altrimenti non fa nulla.
			route ? setRouterToPush(route) : {};
		};

		// 5. Chiama la funzione 'updateEcommerceAuth()' quando il componente viene montato o quando il valore della variabile 'dispatch' cambia.
		updateEcommerceAuth();
	}, [dispatch]);

	React.useEffect(() => {
		if (routerToPush) {
			startRedirect();
		}
	}, [isAuthEcommerce, routerToPush]);

	return <div></div>;
};

export default Index;
