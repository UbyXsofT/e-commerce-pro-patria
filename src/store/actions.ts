import { AnyAction } from "redux";
import {
	Cart,
	Listino,
	ActualProduct,
	StripeKeysData,
	Abbonamento,
	CartTommys,
} from "src/components/CommonTypesInterfaces";
// Azioni
import { createAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

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

export const SetCartTommys = (cartTommys: CartTommys) => ({
	type: "SET_CART_TOMMYS",
	payload: cartTommys,
});

export const setListino = (listino: {
	listino: Listino | null;
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
