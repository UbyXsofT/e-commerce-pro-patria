const codGruppoDesiderato = "G001"; // Sostituisci con il CODGRUPPO desiderato

const gruppoDesiderato = listinoState?.listino[
	newTagTipo !== undefined ? newTagTipo : "GRUPPO"
]?.find((item) => item.CODGRUPPO === codGruppoDesiderato);

if (gruppoDesiderato) {
	gruppoDesiderato.SEDE.forEach((sede) => {
		console.log("@@@@ -- > Tratta item come Sede: ", sede);
		cardComponents.push(
			<ListinoCard
				key={sede.IDSEDE}
				itemsCard={{
					tipo: newTagTipo,
					codice: sede.IDSEDE,
					descrizione: sede.DESCSEDE,
					note: sede.NOTESEDE,
				}}
				stepSelectOby={stepSelectOby}
				setStepSelectOby={setStepSelectOby}
			/>
		);
	});
} else {
	console.log("Gruppo non trovato");
}

listinoState?.listino[
	newTagTipo !== undefined ? newTagTipo : "GRUPPO"
]?.forEach((item) => {
	// Usa item come un elemento generico, puoi controllare il tipo specifico all'interno del loop
	if (isGruppo(item)) {
		console.log("@@@@ -- > Tratta item come Gruppo: ", item);
		cardComponents.push(
			<ListinoCard
				key={item.CODGRUPPO}
				itemsCard={{
					tipo: newTagTipo,
					codice: item.CODGRUPPO,
					descrizione: item.DESGRUPPO,
					aSede: item.SEDE.length > 1 ? true : false,
				}}
				stepSelectOby={stepSelectOby}
				setStepSelectOby={setStepSelectOby}
			/>
		);
	} else if (isSede(item)) {
		console.log("@@@@ -- > Tratta item come Sede: ", item);
		cardComponents.push(
			<ListinoCard
				key={item.IDSEDE}
				itemsCard={{
					tipo: newTagTipo,
					codice: item.IDSEDE,
					descrizione: item.DESCSEDE,
					note: item.NOTESEDE,
				}}
				stepSelectOby={stepSelectOby}
				setStepSelectOby={setStepSelectOby}
			/>
		);
	} else if (isArea(item)) {
		console.log("@@@@ -- > Tratta item come Area: ", item);
		cardComponents.push(
			<ListinoCard
				key={item.CODAREA}
				itemsCard={{
					tipo: newTagTipo,
					codice: item.CODAREA,
					descrizione: item.DESAREA,
				}}
				tipo={1}
			/>
		);
	} else if (isAbbonamento(item)) {
		console.log("@@@@ -- > Tratta item come Abbonamento: ", item);
		cardComponents.push(
			<ListinoCard
				key={item.CODABB}
				itemsCard={{
					tipo: newTagTipo,
					codice: item.CODABB,
					descrizione: item.DESABB, //descrizione
					importo: item.IMPORTO, //importo a listino
					promozione: item.PROMO, //0=nessuna offerta, 1=in promozione, 2=in convenzione
					importoScontato: item.IMPORTOS, //importo scontato, 0 se non c’è sconto
					sceltaFine: item.SCELTAF, //0=abbonamento non prevede scelta attività ad orario, >0 abbonamento con scelta attività ad orario
					noSospensione: item.NOSOSP, //0=abbonamento sospendibile, <>0 abbonamento non sospendibile
					dataIniziale: item.DATAINI, //data proposta come inizio abbonamento
					periodoAttivabile: item.PERIODOATT, //giorni disponibili per l’attivazione (se =0 vale la dataini)
					frequenzaSedute: item.FREQUENZAS, //frequenza settimanale (per scegliere gli orari deve essere >0)
				}}
				tipo={1}
			/>
		);
	}
});

const findNumeroAbbonamentiIn = (item, tipo, valore, stepId) => {
	const chkFind = stepId === 1 ? "sede" : stepId === 2 ? "area" : "abbonamento";
	const chkItem = stepId === 1 ? "SEDE" : stepId === 2 ? "AREA" : "ABBONAMENTO";
	console.log("@@@ --> findNumeroAbbonamentiIn stepId: ", stepId);
	console.log("@@@ --> findNumeroAbbonamentiIn chkFind: ", chkFind);
	console.log("@@@ --> findNumeroAbbonamentiIn chkItem: ", chkItem);
	const abbonamentiCount = item["chkItem"]
		.map((chkFind) => {
			stepId === 1
				? chkFind.AREA.flatMap((area) =>
						area.ABBONAMENTO.filter((abb) => abb[tipo] === valore)
				  )
				: chkFind.AREA.flatMap((area) =>
						area.ABBONAMENTO.filter((abb) => abb[tipo] === valore)
				  );
		})
		.flat().length;
	return abbonamentiCount;
};
