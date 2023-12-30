//fetchListino.ts
import { useSelector } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import {
	responseCall,
	obyPostProdotti,
	StoreState,
	Listino,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";

const fetchListino = async (
	IDCliente: string | undefined,
	IDCentro: number
): Promise<{
	listino: Listino | null;
	error: null | unknown;
}> => {
	const obyPostProdotti: obyPostProdotti = {
		clienteKey: eCommerceConf.ClienteKey,
		IDCliente: IDCliente ?? "",
		IDCentro: IDCentro,
	};

	try {
		// const respCall: responseCall = await callNodeService(
		// 	"prodotti",
		// 	obyPostProdotti,
		// 	null
		// );

		const respCall = await fetch("/data/data.json");

		// Verifica che la richiesta sia stata eseguita correttamente (status 200)
		if (!respCall.ok) {
			throw new Error(`Errore durante la richiesta: ${respCall.statusText}`);
		}

		const listinoResponse = await respCall.json();

		const listinoArray = listinoResponse || null;
		console.log("fetchListino Array: ", listinoArray);

		return { listino: listinoArray.LISTINO, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { listino: null, error: error };
	}
};

export default fetchListino;
