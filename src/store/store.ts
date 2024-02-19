// store.js
//import { AnyAction, configureStore } from "@reduxjs/toolkit";
// Azioni
import {
	AnyAction,
	configureStore,
	createAction,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";
import { StoreAction } from "src/components/CommonTypesInterfaces";
import { ListinoAtvOrari, ListinoAtvOrariData } from "./interfaces";

// Definisci i riduttori per gestire gli stati
const loadingReducer = (state = false, action: AnyAction) => {
	switch (action.type) {
		case "SET_LOADING":
			return action.payload;
		default:
			return state;
	}
};

const authEcommerceReducer = (state = false, action: AnyAction) => {
	switch (action.type) {
		case "SET_AUTH_ECOMMERCE":
			return action.payload;
		default:
			return state;
	}
};

const authUserReducer = (state = null, action: AnyAction) => {
	switch (action.type) {
		case "SET_AUTH_USER":
			return action.payload;
		default:
			return state;
	}
};

const setCartReducer = (state = [], action: AnyAction) => {
	switch (action.type) {
		case "SET_CART":
			return action.payload;
		default:
			return state;
	}
};

// Modifica la chiave dell'azione o semplifica la struttura dello stato
const setListinoReducer = (
	state = { listino: null, error: null },
	action: AnyAction
) => {
	switch (action.type) {
		case "SET_LISTINO":
			console.log("Payload received:", action.payload);
			return {
				...state,
				listino:
					action.payload.listino !== null
						? action.payload.listino
						: state.listino,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

const setStripeKeysReducer = (state = false, action: AnyAction) => {
	switch (action.type) {
		case "SET_STRIPE_KEYS":
			return action.payload;
		default:
			return state;
	}
};

const setActualProductReducer = (state = null, action: AnyAction) => {
	switch (action.type) {
		case "SET_ACTUAL_PRODUCT":
			return action.payload;
		default:
			return state;
	}
};

const setAttivitaOrariListino = (
	state = { listinoAtvOrari: [] as any },
	action: AnyAction
) => {
	switch (action.type) {
		case "SET_LISTINO_ATTIVITA_ORARI": {
			const newStep = action.payload.listinoAtvOrari;
			console.log("@@@ >>>> SET_LISTINO_ATTIVITA_ORARI --- newStep: ", newStep);
		}
		default:
			return state;
	}
};

// Crea il tuo store Redux utilizzando configureStore
const makeStore = () =>
	configureStore({
		reducer: {
			loading: loadingReducer,
			authEcommerce: authEcommerceReducer,
			authUser: authUserReducer,
			cart: setCartReducer,
			listino: setListinoReducer,
			stripeKeys: setStripeKeysReducer,
			actualProduct: setActualProductReducer,
			listinoAtvOrari: setAttivitaOrariListino,
			// Altri riduttori...
		},
		devTools: true, // Abilita Redux DevTools
	});

// Crea il wrapper per Next.js utilizzando createWrapper
export const wrapper = createWrapper(makeStore);
