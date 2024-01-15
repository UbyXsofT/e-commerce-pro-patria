export default function trovaCodiceNextOby(
	data: any,
	codice: any,
	tipiCode: string[]
) {
	for (let tipoCode of tipiCode) {
		let risultato = cercaCodiceInTipo(data, codice, tipoCode);
		if (risultato !== null) {
			return risultato;
		}
	}
	return null;
}

function cercaCodiceInTipo(data: any, codice: any, tipoCode: string) {
	if (data.hasOwnProperty(tipoCode)) {
		if (data[tipoCode] === codice) {
			return data;
		}
	} else if (typeof data === "object") {
		for (let key in data) {
			let risultato = cercaCodiceInTipo(data[key], codice, tipoCode) as any;
			if (risultato !== null) {
				return risultato;
			}
		}
	}
	return null;
}
