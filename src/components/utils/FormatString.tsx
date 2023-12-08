import React from "react";

interface FormatStringProps {
	descrizione: string | any;
}

const FormatString: React.FC<FormatStringProps> = ({ descrizione }): any => {
	if (typeof descrizione !== "string") {
		return null;
	}

	const paroleMax = 40; // Limite parole
	let countParole = 0; // Conteggio dell'attuale numero di parole
	let newDescrizione = ""; // La nuova descrizione

	for (let i = 0; i < descrizione.length; i++) {
		const carattere = descrizione[i];

		// Aggiungi uno spazio dopo ogni punto o virgola
		if (carattere === "." || carattere === ",") {
			newDescrizione += carattere + " ";
		} else {
			newDescrizione += carattere;
		}

		// Aggiungi una nuova riga dopo paroleMax parole
		if (carattere === " ") {
			countParole += 1;
			if (countParole === paroleMax) {
				newDescrizione += "\n\n";
				countParole = 0;
			}
		}
	}

	return <>{newDescrizione}</>;
};

export default FormatString;
