import { Dayjs } from "dayjs";
import { MouseEventHandler } from "react";
import { StoreActionTypes, StoreStateInterfaces } from "src/store/interfaces";

export type Url = string;

export type Sex = null | "male" | "female";

export type Focus = HTMLDivElement | null;

export type AutocompleteSelected = ComunePaese | null;

export type Date = Dayjs | null;

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
export type CaratteriSpeciali = string | null;

export type Cookie = "accessToken" | "refreshToken" | "username";

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

export interface NewUserData {
	ID: string;
	clienteKey: string;
	Cognome: string;
	Nome: string;
	Data_Nascita: string;
	Luogo_Nascita: string;
	Sesso: string;
	Indirizzo: string;
	EMail: string;
	Cellulare: string;
	NoteD?: string;
	CodFisc: string;
	Citta: string;
	Provincia: string;
	Cap: string;
	IDUtente: string;
	PwdUtente: string;
	Tipo_Prov: string;
	Parent_CodFisc: string;
	Parent_Nome: string;
	Parent_Cognome: string;
	Parent_Sesso: string;
	Parent_Data_Nascita: string;
	Parent_Luogo_Nascita: string;
	Parent_Indirizzo: string;
	Parent_Citta: string;
	Parent_Cap: string;
	Parent_Provincia: string;
	Parent_Cellulare: string;
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
	Cliente: string;
}

export interface obyPostErrore {
	clienteKey: string;
	IDCliente: string;
	IDCentro: string;
	Errore: string;
}

export interface obyPostAttivita {
	clienteKey: string;
	Cliente: string;
	IDCentro: string;
	Abbonamento: string;
	DataIni: string;
	Importo: string;
	SceltaA: string;
	FrequenzaS: string;
}

export interface obyPostRegistraAcquisto {
	clienteKey: string | null;
	Cliente: string | null;
	Abbonamento: string | null;
	DataIni: string | null;
	Importo: string | null;
	Frequenze: string | null;
	Promo: string | null;
	Codice_Promo: string | null;
}

export interface obyPostUpDateCart {
	clienteKey: string | null;
	Cliente: string | null;
}
export interface obyPostOrari {
	clienteKey: string;
	Cliente: string;
	IDCentro: string;
	Attivita: string;
}
//-	ECommerce_Selezione(Cliente As String, Abbonamento As String, DataIni As String, Importo As String, SceltaA As String, FrequenzaS As String)
// export interface obyPostSelezioneAbb {
// 	clienteKey: string;
// 	Cliente: string;
// 	Abbonamento: string;
// 	Importo: string;
// 	SceltaA: string;
// 	FrequenzaS: string;
// }

export interface itemsCard {
	stepId: number;
	tipo: "GRUPPO" | "SEDE" | "AREA" | "ABBONAMENTO";
	codice: string;
	descrizione: string;
	onNextStep: boolean;
	onPrevStep: boolean;
	aPromozioni: boolean;
	aConvenzioni: boolean;
	aSospensioni: boolean;
	aSceltaOrario: boolean;
	numeroSedi: string;
	numeroAree: string;
	numeroAbbonamenti: string;
	abbonamento: Abbonamento;
	note: string; // Proprietà opzionale
	noteHtml: string; // Proprietà opzionale
}

export interface Abbonamento {
	CODABB: string;
	DESABB: string;
	NOTEABB: string;
	IMPORTO: string;
	PROMO: "0" | "1" | "2";
	IMPORTOS: string;
	SCELTAF: string;
	NOSOSP: string;
	DATAINI: string;
	PERIODOATT: string;
	FREQUENZAS: string;
	CODPROMO: string;
	DATAFIN: string;
}

export interface Area {
	CODAREA: string;
	DESAREA: string;
	NOTEAREA: string;
	ABBONAMENTO: Abbonamento[];
}

export interface Sede {
	IDSEDE: string;
	DESCSEDE: string;
	NOTESEDE: string;
	AREA: Area[];
}

export interface Gruppo {
	CODGRUPPO: string;
	DESGRUPPO: string;
	NOTEGRUPPO: string;
	SEDE: Sede[];
}

export type ListinoData = {
	[key: string]: Item[]; // Indicizzazione con una chiave di tipo stringa
};

export type Item = {
	// La struttura generica di un elemento
	// Può contenere campi diversi in base al tipo
};

export interface Listino {
	listino: ListinoData;
	error: null | unknown;
}

export interface ListinoCardProps {
	itemsCard: any;
	stepSelectOby: {
		stepId: number;
		endNavStepId: number;
		endStep: number;
		codice: string;
		isClickNext: boolean;
	};
	setStepSelectOby: React.Dispatch<
		React.SetStateAction<{
			stepId: number;
			endNavStepId: number;
			endStep: number;
			codice: string;
			isClickNext: boolean;
		}>
	>;
}

export type Cart = CartUser[];

export interface CartUser {
	userId: string;
	cart: CartProdotto[];
}

export interface obyPostDataCart {
	line_items: CartProdotto[];
	userId: string;
	clienteKey: string;
	mode: string;
	success_url: string;
	cancel_url: string;
}

export interface CartProdotto extends ProdottoInTommys {
	codice: Abbonamento["CODABB"] | null;
	nome: string | null;
	prezzo: number | null;
	prezzoScontato: number | null;
	immagine: any | null;
	info: string | null;
	quantity: number | null;
}

export interface ProdottoInTommys {
	Tommys_infoHtml: string | null;
	Tommys_Cliente: string | null;
	Tommys_Abbonamento: string | null;
	Tommys_DataIni: string | null;
	Tommys_Importo: string | null;
	Tommys_Frequenze: string | null;
	Tommys_Promo: string | null;
	Tommys_Codice_Promo: string | null;
}

export type CartTommys = CarrelloInTommys;
export interface CarrelloInTommys {
	TommysCart_OGGETTO: TommysOggettiCarrello[] | null[];
	TommysCart_EASYP: string | null;
	TommysCart_MONEYC: string | null;
}

export interface TommysOggettiCarrello {
	TIPO: string | null;
	ID: string | null;
	CODICE: string | null;
	DESC: string | null;
	IMPORTO: string | null;
	FLAGCANC: string | null;
}

export interface obyPostDataDeleteInCart {
	clienteKey: string | null;
	Cliente: string | undefined;
	Tipo: string | null;
	ID: string | null;
	Codice: string | null;
}

export interface obyPostDataEmailCancella {
	clienteKey: string | null;
	Piattaforma: string | null;
	emailCentro: string | null;
	emailCliente: string | null;
	emailLista: string | null;
	orario: string | null;
	data: string | null;
	istruttore: string | null;
	corso: string | null;
	sala: string | null;
	lezioneId: string | null;
	clienteId: string | null;
	nomeCliente: string | null;
	flagEmail: string | null;
	clienteIdLISTA: string | null;
	nomeClienteLista: string | null;
	Is_Canc_Acquisto: string | null;
	desc_Acquisto: string | null;
}

export interface ORARIO {
	IDORARIO: string;
	GIORNO: string;
	ORAINIZIO: string;
	ORAFINE: string;
	LIVELLO: string;
	FASCIA?: string | {};
}

export interface ORARI {
	ORARIO: ORARIO | null[];
}

export interface Activity {
	CODATT: string | any;
	TIPO: string;
	DESATT: string;
	// ORARI: {
	// 	ORARIO: ORARIO[];
	// };
}

export interface ActivitySelected {
	CODATT: string | any;
	TIPO: string;
	DESATT: string;
	ORARI: {
		ORARIO: ORARIO[];
	};
}

export interface ActualProduct extends CartProdotto {}

export type StoreAction = StoreActionTypes;
export interface StoreState extends StoreStateInterfaces {}
