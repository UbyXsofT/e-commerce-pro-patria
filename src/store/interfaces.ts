import {
	Abbonamento,
	Activity,
	ActualProduct,
	AuthUser,
	Cart,
	Listino,
	ListinoCardProps,
	ORARIO,
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

//-- --//
// export interface Attività {
// 	tipo: number;
// 	codAtt: string;
// 	desAtt: string;
// }

// export interface Orario {
// 	idOrario: number;
// 	giorno: string;
// 	oraInizio: string;
// 	oraFine: string;
// 	livello: string;
// 	fascia: string;
// }

export interface ListinoAtvOrariData {
	ATTIVITA: Activity[]; // Modifica il tipo da oggetto a array
	ORARI: ORARIO[] | null[];
}

export interface ListinoAtvOrari {
	//attivitaOrariListino: ListinoAtvOrariData;
	ORARIO: ORARIO[] | null[];
}

export type SetListinoAtvOrari = {
	type: "SET_LISTINO_ATTIVITA_ORARI";
	payload: { attivitaOrariListino: ListinoAtvOrari };
};

// ALL type Store Action
export type StoreActionTypes =
	| SetLoading
	| SetAuthEcommerce
	| SetAuthUser
	| SetCart
	| SetListino
	| SetStripeKeys
	| SetListinoAtvOrari;

//// ALL interface
export interface StoreStateInterfaces {
	loading: boolean;
	authEcommerce: boolean;
	authUser: AuthUser | null;
	cart: Cart;
	listino: Listino;
	stripeKeys: StripeKeysData;
	actualProduct: ActualProduct;
	listinoCardProps: ListinoCardProps;
	listinoAtvOrari: ListinoAtvOrari;
}
