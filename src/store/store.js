// store.js
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authMiddleware } from "./_middleware"; // Aggiungi il percorso corretto al tuo middleware

// Definisci i riduttori per gestire gli stati
const loadingReducer = (state = false, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return action.payload;
		default:
			return state;
	}
};

const authEcommerceReducer = (state = false, action) => {
	switch (action.type) {
		case "SET_AUTH_ECOMMERCE":
			return action.payload;
		default:
			return state;
	}
};

const authUserReducer = (state = null, action) => {
	switch (action.type) {
		case "SET_AUTH_USER":
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
			// Altri riduttori...
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
		devTools: true, // Abilita Redux DevTools
	});

// Crea il wrapper per Next.js utilizzando createWrapper
export const wrapper = createWrapper(makeStore);
