// store.js
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authMiddleware } from "./_middleware"; // Aggiungi il percorso corretto al tuo middleware
import { StoreAction } from "src/components/CommonTypesInterfaces";

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

const setCentriReducer = (
	state = { centri: [], error: null },
	action: AnyAction
) => {
	switch (action.type) {
		case "SET_CENTRI":
			return action.payload;
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

// Crea il tuo store Redux utilizzando configureStore
const makeStore = () =>
	configureStore({
		reducer: {
			loading: loadingReducer,
			authEcommerce: authEcommerceReducer,
			authUser: authUserReducer,
			cart: setCartReducer,
			centri: setCentriReducer,
			stripeKeys: setStripeKeysReducer,
			// Altri riduttori...
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(authMiddleware),
		devTools: true, // Abilita Redux DevTools
	});

// Crea il wrapper per Next.js utilizzando createWrapper
export const wrapper = createWrapper(makeStore);
