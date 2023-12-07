import { useSelector } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import {
	responseCall,
	obyPostProdotti,
	Prodotto,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";

export interface Centro {
	id: number;
	name: string;
	principale?: true;
	subscriptions: Prodotto[];
}

const fetchCentri = async (
	IDCliente: string | undefined,
	IDCentro: number
): Promise<{
	centri: Centro[];
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

		const centri: Centro[] = [
			{
				id: 0,
				name: "TUTTI",
				subscriptions: respCall.messageCli.message.prodotti,
				principale: true,
			},
			{
				id: 1,
				name: "CORSI IN SEDE",
				subscriptions: respCall.messageCli.message.prodotti.filter(
					(Prodotto: Prodotto) => Prodotto.idCentro === "1"
				),
			},
			{
				id: 2,
				name: "CORSI FUORI SEDE",
				subscriptions: respCall.messageCli.message.prodotti.filter(
					(Prodotto: Prodotto) => Prodotto.idCentro === "2"
				),
			},
		];

		return { centri, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { centri: [], error: error };
	}
};

export default fetchCentri;
