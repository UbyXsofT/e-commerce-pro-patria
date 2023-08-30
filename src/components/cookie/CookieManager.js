import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import eCommerceConf from "../../../eCommerceConf.json";
// Chiave di crittografia (assicurati di mantenere questa sicura e non condividerla)
const encryptionKey = eCommerceConf.CRYPTO_KEY;

// Cripta i dati utilizzando AES
export const encryptData = (data) => {
	const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
	return encryptedData;
};

// Decripta i dati utilizzando AES
export const decryptData = (encryptedData) => {
	const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
	const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
	return JSON.parse(decryptedData);
};

const CookieManager = {
	setCookie: (name, value, options = {}) => {
		Cookies.set(name, value, options);
	},
	// Salva un cookie crittografato
	setEncryptedCookie: (name, value, options = {}) => {
		const encryptedValue = encryptData(value);
		Cookies.set(name, encryptedValue, options);
	},

	getCookie: (name) => {
		return Cookies.get(name);
	},
	// Ottieni e decripta il valore di un cookie
	getDecryptedCookie: (name) => {
		const encryptedValue = Cookies.get(name);
		if (encryptedValue) {
			return decryptData(encryptedValue);
		}
		return null;
	},

	removeCookie: (name) => {
		Cookies.remove(name);
	},
};

export default CookieManager;
