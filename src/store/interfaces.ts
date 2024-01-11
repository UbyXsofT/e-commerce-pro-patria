import {
	Abbonamento,
	ActualProduct,
	AuthUser,
	Cart,
	Listino,
	ListinoCardProps,
	StripeKeysData,
	UserData,
} from "src/components/CommonTypesInterfaces";

//------------------------------//
export type SetLoading = {
	type: "SET_LOADING";
	payload: boolean;
};

export type SetAuthEcommerce = {
	type: "SET_AUTH_ECOMMERCE";
	payload: boolean;
};

export type SetAuthUser = {
	type: "SET_AUTH_USER";
	payload: UserData;
};

export type SetCart = {
	type: "SET_CART";
	payload: Cart;
};

export type SetListino = {
	type: "SET_LISTINO";
	payload: { listino: Listino; error: null | unknown };
};

export type SetStripeKeys = {
	type: "SET_STRIPE_KEYS";
	payload: StripeKeysData;
};

// interfaces.ts
export interface StepListino {
	stepListino: StepListinoData[]; // Modifica il tipo di stepListino da oggetto a array
}

export interface StepListinoData {
	stepId: number;
	tipo: string;
	codice: string;
	descrizione: string;
	onPrevStep: boolean;
	onNextStep: boolean;
	aPromozioni: boolean;
	aConvenzioni: boolean;
	aSospensioni: boolean;
	aSceltaOrario: boolean;
	numeroSedi: string;
	numeroAree: string;
	numeroAbbonamenti: string;
	abbonamento: Abbonamento;
}

export type SetStepListino = {
	type: "SET_STEP_LISTINO";
	payload: { stepListino: StepListino };
};

// ALL type Store Action
export type StoreActionTypes =
	| SetLoading
	| SetAuthEcommerce
	| SetAuthUser
	| SetCart
	| SetListino
	| SetStripeKeys
	| SetStepListino;

//// ALL interface
export interface StoreStateInterfaces {
	loading: boolean;
	authEcommerce: boolean;
	authUser: AuthUser | null;
	cart: Cart;
	listino: Listino;
	stripeKeys: StripeKeysData;
	actualProduct: { actualProduct: ActualProduct };
	listinoCardProps: ListinoCardProps;
	stepListino: StepListino;
}
