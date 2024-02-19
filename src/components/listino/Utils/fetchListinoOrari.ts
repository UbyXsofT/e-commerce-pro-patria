//fetchListino.ts
import { useSelector } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import {
	responseCall,
	obyPostSelezioneAbb,
	StoreState,
	Listino,
} from "src/components/CommonTypesInterfaces";

import { ListinoAtvOrari } from "src/store/interfaces";
import callNodeService from "pages/api/callNodeService";

//-	ECommerce_Selezione(Cliente As String, Abbonamento As String, DataIni As String, Importo As String, SceltaA As String, FrequenzaS As String)

const fetchListinoOrari = async ({
	Cliente,
	Abbonamento,
	Importo,
	SceltaA,
	FrequenzaS,
}: obyPostSelezioneAbb): Promise<{
	listAtvOrari: ListinoAtvOrari | null;
	error: null | unknown;
}> => {
	const obyPostSelezioneAbb: obyPostSelezioneAbb = {
		clienteKey: eCommerceConf.ClienteKey,
		Cliente: Cliente,
		Abbonamento: Abbonamento,
		Importo: Importo,
		SceltaA: SceltaA,
		FrequenzaS: FrequenzaS,
	};

	try {
		// const respCall: responseCall = await callNodeService(
		// 	"prodotti",
		// 	obyPostProdotti,
		// 	null
		// );

		const respCall = await fetch("/data/dataorari.json");

		// Verifica che la richiesta sia stata eseguita correttamente (status 200)
		if (!respCall.ok) {
			throw new Error(`Errore durante la richiesta: ${respCall.statusText}`);
		}

		const listinoOrariResponse = await respCall.json();

		const listinoOrariArray = listinoOrariResponse || null;
		console.log("fetchListinoOrari Array: ", listinoOrariArray);

		return { listAtvOrari: listinoOrariArray.SELATTIVITA, error: null };
	} catch (error: unknown) {
		console.log(error);
		return { listAtvOrari: null, error: error };
	}
};

export default fetchListinoOrari;
