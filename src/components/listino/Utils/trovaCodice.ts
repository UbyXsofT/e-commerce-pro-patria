export default function trovaCodice(data: any, codiceDaCercare: any) {
	let percorso = [] as any;

	function cercaInternamente(oggetto: any, codice: any, chiavePadre: any) {
		for (let chiave in oggetto) {
			if (typeof oggetto[chiave] === "object") {
				let valore =
					oggetto[chiave]["CODGRUPPO"] ||
					oggetto[chiave]["IDSEDE"] ||
					oggetto[chiave]["CODAREA"] ||
					oggetto[chiave]["CODABB"];
				if (valore !== undefined) {
					percorso.push({ [chiavePadre]: valore });
				}
				if (cercaInternamente(oggetto[chiave], codice, chiave)) {
					return true;
				}
				if (valore !== undefined) {
					percorso.pop();
				}
			} else if (oggetto[chiave] === codice) {
				percorso.push({ [chiavePadre]: oggetto[chiave] });
				return true;
			}
		}
		return false;
	}

	cercaInternamente(data, codiceDaCercare, "");
	percorso.pop(); // Rimuove l'ultimo elemento dell'array
	return percorso;
}
