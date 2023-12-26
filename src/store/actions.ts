import {
	Cart,
	Listino,
	ActualProduct,
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

export const setListino = (listino: {
	listino: Listino;
	error: null | unknown;
}) => ({
	type: "SET_LISTINO",
	payload: listino,
});

export const setStripeKeys = (stripeKeys: StripeKeysData) => ({
	type: "SET_STRIPE_KEYS",
	payload: stripeKeys,
});
export const setActualProduct = (actualProduct: ActualProduct) => ({
	type: "SET_ACTUAL_PRODUCT",
	payload: actualProduct,
});
