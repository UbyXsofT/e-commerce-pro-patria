import router from "next/router";
import getTotals from "./getTotals";
import eCommerceConf from "eCommerceConf.json";

export default function findInfoAbb(item: any, stepId: number) {
	type RequestItem = {
		name: string;
		tipo: string;
		valore: string;
		stepId: number;
	};

	const all_InfoRequest: RequestItem[] = [
		{ name: "promo", tipo: "PROMO", valore: "1", stepId },
		{ name: "convenzioni", tipo: "PROMO", valore: "2", stepId },
		{ name: "sospensioni", tipo: "NOSOSP", valore: ">0", stepId },
		{ name: "sceltaOrario", tipo: "SCELTAF", valore: ">0", stepId },
		{ name: "frequenza", tipo: "FREQUENZAS", valore: ">0", stepId },
	];

	// Dichiarare un array per le informazioni
	const arrayInfoData = [];
	// Tipo dell'oggetto infoData
	type InfoData = {
		[key: string]: any; // Qui puoi specificare un tipo più specifico se necessario
	};
	// Dichiarazione di infoData con il tipo specificato
	const infoData: InfoData = {};

	try {
		all_InfoRequest.forEach((richiesta: RequestItem) => {
			
			const { name, tipo, valore, stepId } = richiesta;
			

			let entityType = "NESSUNO";
			let inItemArray: any[] = [];

			let count = 0;
			//getTotals(item["ABBONAMENTO"], "AREA");

			switch (stepId) {
				case 1: //"GRUPPO"
					entityType = "GRUPPO";
					inItemArray = item;

					item["SEDE"].forEach((sede: any) => {
						sede["AREA"].forEach((area: any) => {
							count += area["ABBONAMENTO"].filter((abb: any) => {
								if (valore.startsWith(">")) {
									const valueToCompare = parseFloat(valore.substring(1));
									return abb[tipo] > valueToCompare;
								} else {
									return abb[tipo] === valore;
								}
							}).length;
						});
					});

					const totals = getTotals(inItemArray, entityType);
					// Aggiungere informazioni
					const infoObject = {
						name: name,
						item: item,
						tipo: tipo,
						numero: count,
						...totals,
					};
					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject;
					return;
				case 2: //"SEDE"
					entityType = "SEDE";
					inItemArray = item["AREA"];

					inItemArray.forEach((area: any) => {
						count += area["ABBONAMENTO"].filter((abb: any) => {
							if (valore.startsWith(">")) {
								const valueToCompare = parseFloat(valore.substring(1));
								return abb[tipo] > valueToCompare;
							} else {
								return abb[tipo] === valore;
							}
						}).length;
					});

					const totals2 = getTotals(inItemArray, entityType);
					// Aggiungere informazioni
					const infoObject2 = {
						name: name,
						item: item,
						tipo: tipo,
						numero: count,
						...totals2,
					};
					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject2;
					return;
				case 3: //"AREA"
					entityType = "AREA";
					inItemArray = item["ABBONAMENTO"];

					count += inItemArray.filter((abb: any) => {
						if (valore.startsWith(">")) {
							const valueToCompare = parseFloat(valore.substring(1));
							return abb[tipo] > valueToCompare;
						} else {
							return abb[tipo] === valore;
						}
					}).length;

					const totals3 = getTotals(inItemArray, entityType);
					// Aggiungere informazioni
					const infoObject3 = {
						name: name,
						item: item,
						tipo: tipo,
						numero: count,
						...totals3,
					};
					// Aggiungere l'oggetto all'oggetto infoData
					infoData[name] = infoObject3;
					return;
				case 4: //ABBONAMENTO
					return;
			}
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("@@@ infoData[name]", infoData[name]);
			}
		}); //FOREACH
	} catch (error) {
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("@@@@@@ ---> error: ", error);
		}
		router.push(
			`/blockPage?titolo=CARICAMENTO DATI LISTINO&descrizione=Si è verificato un errore durante il recupero dei dati necessari. Se il problema persiste si prega di cottattare il proprio centro fitness.. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
		);
		return;
	}
	arrayInfoData.push(infoData);
	return arrayInfoData[0];
}
