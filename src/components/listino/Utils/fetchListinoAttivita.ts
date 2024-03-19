//fetchListino.ts
import { useSelector } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import {
	responseCall,
	obyPostAttivita,
	Activity,
} from "src/components/CommonTypesInterfaces";

import callNodeService from "pages/api/callNodeService";

// Inside your fetchListinoAttivita function, you can simplify the return statement
const fetchListinoAttivita = async ({
	clienteKey,
	IDCentro,
	Cliente,
	Abbonamento,
	DataIni,
	Importo,
	SceltaA,
	FrequenzaS,
}: obyPostAttivita): Promise<{
	listaAttivita: Activity | null;
	error: null | unknown;
}> => {
	try {
		const respCall: responseCall = await callNodeService(
			"ecommerce-lista-attivita",
			{
				clienteKey,
				IDCentro,
				Cliente,
				Abbonamento,
				DataIni,
				Importo,
				SceltaA,
				FrequenzaS,
			},
			null
		);

		const listAttivitaResponse =
			respCall.messageCli.message?.SELATTIVITA || null;
		console.log(
			"fetchListinoAttivita  listAttivitaResponse: ",
			listAttivitaResponse
		);

		const attivitaArray = listAttivitaResponse?.ATTIVITA || null;
		console.log("fetchListinoAttivita  attivitaArray: ", attivitaArray);

		return { listaAttivita: attivitaArray, error: null };
	} catch (error) {
		console.log(error);
		return { listaAttivita: null, error };
	}
};

export default fetchListinoAttivita;
