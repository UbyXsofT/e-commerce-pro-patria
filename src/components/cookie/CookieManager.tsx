import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import eCommerceConf from "../../../eCommerceConf.json";
import { Cookie } from "../CommonTypesInterfaces";
// Chiave di crittografia (assicurati di mantenere questa sicura e non condividerla)
const encryptionKey = eCommerceConf.CRYPTO_KEY;

// Cripta i dati utilizzando AES
export const encryptData = (data: string) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return encryptedData;
};

// Decripta i dati utilizzando AES
export const decryptData = (encryptedData: string) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

const CookieManager = {
  setCookie: (name: Cookie, value: string, options = {}) => {
    Cookies.set(name, value, options);
  },

  // Salva un cookie crittografato
  setEncryptedCookie: (name: Cookie, value: string, options = {}) => {
    const encryptedValue = encryptData(value);
    Cookies.set(name, encryptedValue, options);
  },

  getCookie: (name: Cookie) => {
    return Cookies.get(name);
  },

  // Ottieni e decripta il valore di un cookie
  getDecryptedCookie: (name: Cookie) => {
    const encryptedValue = Cookies.get(name);
    if (encryptedValue) {
      return decryptData(encryptedValue);
    }
    return null;
  },

  removeCookie: (name: Cookie) => {
    Cookies.remove(name);
  },
};

export default CookieManager;
