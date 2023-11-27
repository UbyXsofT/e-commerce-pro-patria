import { Dayjs } from "dayjs";
import { Centro } from "pages/auth/store";
import { MouseEventHandler } from "react";

export type Url = string;

export type Sex = null | "male" | "female";

export type Focus = HTMLDivElement | null;

export type AutocompleteSelected = ComunePaese | null;

export type Date = Dayjs | null;

// export type ComunePaese = {
// 	codice: string;
// 	nome: string;
// 	nomeStraniero?: string | null;
// 	codiceCatastale?: string;
// 	cap?: string;
// 	prefisso?: string | null;
// 	provincia: {
// 		nome: string;
// 		regione?: string;
// 	};
// 	email?: string | null;
// 	pec?: string | null;
// 	telefono?: string | null;
// 	fax?: string | null;
// 	coordinate?: {
// 		lat: number;
// 		lng: number;
// 	};
// };

export type ComunePaese = Comune | Paese;

export type Comune = {
	codice: string;
	nome: string;
	nomeStraniero?: string | null;
	codiceCatastale?: string;
	cap?: string;
	prefisso?: string | null;
	provincia: {
		nome: string;
		regione?: string;
	};
	email?: string | null;
	pec?: string | null;
	telefono?: string | null;
	fax?: string | null;
	coordinate?: {
		lat: number;
		lng: number;
	};
};

export type Paese = {
	codice: string;
	nome: string;
	provincia: {
		nome: string;
	};
	// We add it later
	cap?: string;
};

export interface PasswordSafety {
	correct: boolean;
	detail: Length | LettereNumeri | MaiuscoloMinuscolo | CaratteriSpeciali;
}

export type Length = "" | "| Password Troppo Lunga" | "| Password Troppo Corta";
export type LettereNumeri = "" | "| No Numeri" | "| No Lettere";
export type MaiuscoloMinuscolo = "" | "| No Minuscoli" | "| No Maiuscoli";
export type CaratteriSpeciali = "";

export type Cookie = "accessToken" | "refreshToken" | "username";

export type StoreAction =
	| SetLoading
	| SetAuthEcommerce
	| SetAuthUser
	| SetCart
	| SetCentri
	| SetStripeKeys;

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

export type SetCentri = {
	type: "SET_CENTRI";
	payload: { centri: Centro[]; error: null | unknown };
};

export type SetStripeKeys = {
	type: "SET_STRIPE_KEYS";
	payload: StripeKeysData;
};
//*--*//

export interface StoreState {
	loading: boolean;
	authEcommerce: boolean;
	authUser: AuthUser | null;
	cart: Cart;
	centri: { centri: Centro[]; error: null | unknown };
	stripeKeys: StripeKeysData;
}

export interface StripeKeysData {
	PUBLISHABLE_KEY: string;
	STRIPE_SECRET_KEY: string;
	STRIPE_WEBHOOK_SECRET: string;
	STRIPE_PORTALE_CLIENTE_LINK: Url;
	isGetKeys: boolean;
}

// Work In Progress, check in with Antonio for Definition
export interface AuthUser {
	ISAUTH: "0" | "1";
	USERID: string;
	ADMIN: "0" | "1";
	EMAIL: string;
	ATTIVAZ: string;
	PRIMOACC: "0" | "1";
	ESITO: "0" | "1";
	ERRMSG: string;
	NOMINATIVO: string;
	EMAILCENTRO: string;
	TELCENTRO: string;
	EMAILCONSULENTE: string;
	CELLCONSULENTE: string;
	EMAILISTRUTTORE: string;
	CELLISTRUTTORE: string;
	EMAILFISIOTERAPISTA: string;
	CELLFISIOTERAPISTA: string;
	EMAILESTETISTA: string;
	CELLESTETISTA: string;
	EMAILMEDICO: string;
	CELLMEDICO: string;
	NEWCOM: "0" | "1";
	NEWAVV: "0" | "1";
	IRR: "0" | "1";
	CARRELLO: string;
	PREN: string;
	PROMO: "0" | "1";
	CONV: "0" | "1";
	VIDEO: "0" | "1";
	DOC: "0" | "1";
	PARTNER: "0" | "1";
	PAYPAL: "0" | "1";
	LISTACENTRI: string;
	NOME: string;
	COGNOME: string;
	INDIRIZZO: string;
	CITTA: string;
	TELEFONO: string;
	CELLULARE: string;
	CAP: string;
	PROVINCIA: string;
	CODFISC: string;
	SCADENZEFISSE: {
		SCADENZA: {
			TIPO: string;
			DESC: string;
			FLREGULAR: string;
			DATA: string;
			TIPOID: string;
			RINNOVA: string;
		}[];
	};
	ABBONAMENTI: {
		ABBONAMENTO: {
			DESC: string;
			DATAINIZIO: string;
			DATAFINE: string;
			ISCRIZIONE: string;
			IDAGGIUNTA: string;
			IDPACCHETTO: string;
			GESTSOSP: string;
			DATAINIZIOSOSP: string;
			DATAFINESOSP: string;
			ATTIVITA: {
				DESC: string;
				DATAINIZIO: string;
				DATAFINE: string;
				SEDUTE: string;
			};
		};
	};
	INTEGRAZIONI: string;
	PAGAMENTI: {
		PAGAMENTO: {
			DATA: string;
			DESC: string;
			IMPORTO: string;
		}[];
	};
	MONEYCARD: string;
	LIVELLINAT: {
		LIVELLO: {
			IDLIV: string;
			DATA: string;
			DESC: string;
			NOTES: string;
		}[];
	};
}

export interface UserData {
	user: {
		codiceFiscale: string;
		firstName: string;
		lastName: string;
		gender: Sex;
		dateOfBirth: Date;
		placeOfBirth: string;
		address: string;
		city: string;
		cap: string;
		province: string;
		email: string;
		phoneNumber: string;
		username: string;
		password: string;
		notes?: string;
	};
	parent: {
		parentCodiceFiscale: string;
		parentFirstName: string;
		parentLastName: string;
		parentGender: Sex;
		parentDateOfBirth: Date;
		parentPlaceOfBirth: string;
		parentAddress: string;
		parentCity: string;
		parentCap: string;
		parentProvince: string;
		parentPhoneNumber: string;
	} | null;
}

export interface MenuItem {
	id: string;
	label: string | null;
	onClick: MouseEventHandler | null;
	icon: React.JSX.Element | null;
	badgeContent: null;
	badgeColor: null;
	subItems: MenuItem[];
	control?: React.JSX.Element | null;
}

export interface Subscription {
	name: string;
	cost: string;
	description: string;
	minMonths: number;
	characteristics: string[];
	highlighted?: boolean;
}

export interface tokenlessAccess {
	clienteKey: string;
	userName: string;
	password: string;
	ricordami: boolean;
	accessToken: null;
	refreshToken: null;
}

export interface authUserCheck {
	clienteKey: string;
	userName: string;
	password: string;
}

export interface changeUserData {
	clienteKey: string;
	op: number;
	Codice_Cliente: string;
	Indirizzo: string;
	Citta: string;
	Provincia: string;
	Cap: string;
	EMail: string;
	Cellulare: string;
	Telefono: string;
}

export interface tokenfulAccess {
	clienteKey: string;
	accessToken: string;
	refreshToken: string;
}

export interface authEcommerce {
	clienteKey: string;
}

export interface resetPsw {
	clienteKey: string;
	codFisc: string;
	email: string;
}

export interface setNewPsw {
	clienteKey: string;
	UserID: string;
	Pwd_New: string;
	mittente: string;
	destinatario: string;
	oggetto: string;
	corpo: string;
}

export interface responseCall {
	successCli: boolean;
	messageCli: any;
}

export interface obyPostData {
	clienteKey: string;
}

export interface obyPostProdotti {
	clienteKey: string;
	IDCliente: string;
	IDCentro: number;
}

export interface Abbonamento {
	id: string;
	nome: string;
	prezzo: number;
	immagine: string | null;
	descrizione: string;
	convenzione: {
		isConv: boolean;
		descConve: string;
	};
	promozione: {
		isPromo: boolean;
		descPromo: string;
	};
	sceltaOrari: {
		isOrari: boolean;
		daOrari: string;
		aOrari: string;
	};
	quantity: number; // Aggiunta della proprietà quantity
}

export type Cart = CartUser[];

export interface CartUser {
	userId: string;
	cart: CartAbbonamento[];
}

export interface CartAbbonamento extends Abbonamento {
	configuration: { initialDate: Dayjs } | null;
}

export interface obyPostDataCart {
	line_items: CartAbbonamento[];
	userId: string;
	clienteKey: string;
	mode: string;
	success_url: string;
	cancel_url: string;
}
