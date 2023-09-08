import { Dayjs } from "dayjs";

export type Sex = null | "male" | "female";

export type Focus = HTMLDivElement | null;

export type AutocompleteSelected = ComunePaese | null;

export type Date = Dayjs | null;

export interface ComunePaese {
  codice: string;
  nome: string;
  nomeStraniero?: string | null;
  codiceCatastale?: string;
  cap?: string;
  prefisso?: string;
  provincia: {
    nome: string;
    regione?: string;
  };
  email?: string;
  pec?: string;
  telefono?: string;
  fax?: string;
  coordinate?: {
    lat: number;
    lng: number;
  };
}

export type Paese = [string, "EE", string, 0 | 1];

export interface PasswordSafety {
  correct: boolean;
  detail: Length | LettereNumeri | MaiuscoloMinuscolo | CaratteriSpeciali;
}

export type Length = "" | "| Password Troppo Lunga" | "| Password Troppo Corta";
export type LettereNumeri = "" | "| No Numeri" | "| No Lettere";
export type MaiuscoloMinuscolo = "" | "| No Minuscoli" | "| No Maiuscoli";
export type CaratteriSpeciali = "";

export type Cookie = "accessToken" | "refreshToken";

export type StoreAction = SetLoading | SetAuthEcommerce | SetAuthUser;

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

export interface UserData {
  user: {
    codiceFiscale: string;
    firstName: string;
    lastName: string;
    gender: Sex;
    dateOfBirth: Date;
    placeOfBirth: string;
    provinceOfBirth: string;
    address: string;
    city: string;
    cap: string;
    province: string;
    email: string;
    phoneNumber: string;
    privacy: boolean;
    username: string;
    password: string;
  };
  parent: {
    parentCodiceFiscale: string;
    parentFirstName: string;
    parentLastName: string;
    parentGender: Sex;
    parentDateOfBirth: Date;
    parentPlaceOfBirth: string;
    parentProvinceOfBirth: string;
    parentAddress: string;
    parentCity: string;
    parentCap: string;
    parentProvince: string;
    parentEmail: string;
    parentPhoneNumber: string;
    parentPrivacy: boolean;
  } | null;
}

export interface MenuItem {
  id: string;
  label: string | null;
  onClick: Function | null;
  icon: React.JSX.Element | null;
  badgeContent: null;
  badgeColor: null;
  subItems: MenuItem[];
  control?: React.JSX.Element | null;
}
