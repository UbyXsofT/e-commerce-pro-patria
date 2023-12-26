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
		const respCall: responseCall = await callNodeService(
			"prodotti",
			obyPostProdotti,
			null
		);

		const listinoArray = respCall.messageCli.message?.prodotti || null;
		console.log("listinoArray: ", listinoArray);
		return { listino: listinoArray, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { listino: null, error: error };
	}
};

export default fetchListino;
