import { Centro } from "pages/auth/store";
import {
	Cart,
	Prodotto,
	StripeKeysData,
} from "src/components/CommonTypesInterfaces";

// actions.js
export const setLoading = (isLoading: boolean) => ({
	type: "SET_LOADING",
	payload: isLoading,
});

export const setAuthEcommerce = (isAuthenticated: boolean) => ({
	type: "SET_AUTH_ECOMMERCE",
	payload: isAuthenticated,
});

export const setAuthUser = (userData: any) => ({
	type: "SET_AUTH_USER",
	payload: userData,
});

export const setCart = (cart: Cart) => ({
	type: "SET_CART",
	payload: cart,
});

export const setCentri = (centri: {
	centri: Centro[];
	error: null | unknown;
}) => ({
	type: "SET_CENTRI",
	payload: centri,
});

export const setStripeKeys = (stripeKeys: StripeKeysData) => ({
	type: "SET_STRIPE_KEYS",
	payload: stripeKeys,
});
export const setActualProduct = (actualProduct: Prodotto) => ({
	type: "SET_ACTUAL_PRODUCT",
	payload: actualProduct,
});
