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

type Length = "" | "| Password Troppo Lunga" | "| Password Troppo Corta";
type LettereNumeri = "" | "| No Numeri" | "| No Lettere";
type MaiuscoloMinuscolo = "" | "| No Minuscoli" | "| No Maiuscoli";
type CaratteriSpeciali = "";
