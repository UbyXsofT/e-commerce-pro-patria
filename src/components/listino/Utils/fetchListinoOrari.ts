//fetchListino.ts
import { useSelector } from "react-redux";
import eCommerceConf from "eCommerceConf.json";
import {
	responseCall,
	obyPostOrari,
} from "src/components/CommonTypesInterfaces";

import { ListinoAtvOrari } from "src/store/interfaces";
import callNodeService from "pages/api/callNodeService";

//-	ECommerce_Selezione(Cliente As String, Abbonamento As String, DataIni As String, Importo As String, SceltaA As String, FrequenzaS As String)

const fetchListinoOrari = async ({
	Cliente,
	clienteKey,
	IDCentro,
	Attivita,
	Datarif,
}: obyPostOrari): Promise<{
	listaAtvOrari: ListinoAtvOrari | null;
	error: null | unknown;
}> => {
	// const respCall = await fetch("/data/dataorari.json");
	try {
		const respCall: responseCall = await callNodeService(
			"ecommerce-lista-orari",
			{ Cliente, clienteKey, IDCentro, Attivita, Datarif },
			null
		);

		const listOrariResponse = respCall.messageCli.message?.ORARI || null;
		if (eCommerceConf.ModalitaSviluppo === true) {
			console.log("fetchListinoOrari  listOrariResponse: ", listOrariResponse);
		}
		return { listaAtvOrari: listOrariResponse, error: null };
	} catch (error) {
		if (eCommerceConf.ModalitaSviluppo === true) {
			console.log(error);
		}
		return { listaAtvOrari: null, error };
	}
};

export default fetchListinoOrari;
