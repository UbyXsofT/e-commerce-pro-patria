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
import { StepListino, StepListinoData } from "./interfaces";

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

const setStepListinoReducer = (
	state = { stepListino: [] as any },
	action: AnyAction
) => {
	switch (action.type) {
		case "SET_STEP_LISTINO": {
			const newStep = action.payload.stepListino;

			console.log("@@@ >>>> SET_STEP_LISTINO --- newStep: ", newStep);

			// Assicurati che newStep non sia undefined o null
			if (newStep && newStep.stepId !== undefined && newStep.stepId !== null) {
				const existingStepIndex = state.stepListino?.some(
					(step: StepListinoData) => step.stepId === newStep.stepId
				);

				if (existingStepIndex) {
					// Logica per l'aggiornamento se lo stepId esiste
					const updatedState = {
						...state,
						stepListino: state.stepListino?.map((step: StepListinoData) =>
							step.stepId === newStep.stepId ? { ...step, ...newStep } : step
						),
					};

					console.log(
						"@@@ >>>> STORE : -------- XXXXX ----  Updated State:",
						updatedState
					);
					return updatedState;
				} else {
					// Logica per l'aggiunta se lo stepId non esiste
					const newState = {
						...state,
						stepListino: [...state.stepListino, newStep],
					};

					console.log(
						"@@@ >>>> STORE : -------- XXXXX ----  New State:",
						newState
					);
					return newState;
				}
			} else {
				// Logica gestione errori se newStep o newStep.stepId sono undefined o null
			}
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
			stepListino: setStepListinoReducer,
			// Altri riduttori...
		},
		devTools: true, // Abilita Redux DevTools
	});

// Crea il wrapper per Next.js utilizzando createWrapper
export const wrapper = createWrapper(makeStore);
