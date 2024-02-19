import getTotals from "./getTotals";

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
		{ name: "sospensioni", tipo: "NOSOSP", valore: "0", stepId },
		{ name: "sceltaOrario", tipo: "SCELTAF", valore: "0", stepId },
	];

	// Dichiarare un array per le informazioni
	const arrayInfoData = [];
	// Tipo dell'oggetto infoData
	type InfoData = {
		[key: string]: any; // Qui puoi specificare un tipo più specifico se necessario
	};
	// Dichiarazione di infoData con il tipo specificato
	const infoData: InfoData = {};

	all_InfoRequest.forEach((richiesta: RequestItem) => {
		const { name, tipo, valore, stepId } = richiesta;

		switch (stepId) {
			case 1: //"GRUPPO"
				const numero = item["SEDE"]
					.map((sede: any) =>
						sede.AREA.flatMap((area: any) =>
							area.ABBONAMENTO.filter((abb: any) =>
								tipo === "SCELTAF" ? abb[tipo] !== valore : abb[tipo] === valore
							)
						)
					)
					.flat().length;
				//console.log("RICHIESTA NUM ABB x ICONE promo ecc --> CASE NUM: ",numero);
				const totals = getTotals(item, "GRUPPO");

				// Aggiungere informazioni
				const infoObject = {
					name: name,
					item: item,
					tipo: tipo,
					numero: numero,
					...totals,
				};
				// Aggiungere l'oggetto all'oggetto infoData
				infoData[name] = infoObject;
				//console.log("CASE GRUPPO: infoObject: ", infoObject);
				return;
			case 2: //"SEDE"
				const numero2 = item["AREA"]
					.map((area: any) =>
						area.ABBONAMENTO.filter((abb: any) =>
							tipo === "SCELTAF" ? abb[tipo] !== valore : abb[tipo] === valore
						)
					)
					.flat().length;

				//console.log("RICHIESTA NUM ABBONAMENTI --> CASE NUMERO2: ", numero2);
				const totals2 = getTotals(item["AREA"], "SEDE");

				// Aggiungere informazioni
				const infoObject2 = {
					name: name,
					item: item,
					tipo: tipo,
					numero: numero2,
					...totals2,
				};

				// Aggiungere l'oggetto all'oggetto infoData
				infoData[name] = infoObject2;
				return;
			case 3: //"AREA"
				const numero3 = item["ABBONAMENTO"]
					.filter((abb: any) =>
						tipo === "SCELTAF" ? abb[tipo] !== valore : abb[tipo] === valore
					)
					.flat().length;

				//console.log("RICHIESTA NUM ABBONAMENTI --> CASE numero3: ", numero3);
				const totals3 = getTotals(item["ABBONAMENTO"], "AREA");

				// Aggiungere informazioni
				const infoObject3 = {
					name: name,
					item: item,
					tipo: tipo,
					numero: numero3,
					...totals3,
				};

				// Aggiungere l'oggetto all'oggetto infoData
				infoData[name] = infoObject3;
				return;
			case 4: //ABBONAMENTO
				return;
		}
	});

	arrayInfoData.push(infoData);
	return arrayInfoData[0];
}
