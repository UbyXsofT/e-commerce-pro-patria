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
	IDCliente: string | undefined
): Promise<{
	listino: Listino | null;
	error: null | unknown;
}> => {
	const obyPostProdotti: obyPostProdotti = {
		clienteKey: eCommerceConf.ClienteKey,
		Cliente: IDCliente ?? "",
	};

	try {
		const respCall: responseCall = await callNodeService(
			"ecommerce-listino-prodotti",
			obyPostProdotti,
			null
		);

		const listinoResponse =
			(await respCall.messageCli.message?.prodotti) || null;

		const listinoArray = listinoResponse.LISTINO || null;
		console.log("fetchListino Array: ", listinoArray);

		return { listino: listinoArray, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { listino: null, error: error };
	}
};

export default fetchListino;
