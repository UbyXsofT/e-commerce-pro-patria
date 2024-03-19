import {
	Abbonamento,
	Area,
	Gruppo,
	Sede,
} from "src/components/CommonTypesInterfaces";
import findInfoAbb from "./findInfoAbb";

export default function createItemsCard(
	tipo: string,
	stepId: number,
	itemsTipo: any
) {
	let itemsCard = {};

	try {
		const infoAbb = findInfoAbb(itemsTipo, stepId);
		console.log("infoAbb: ", infoAbb);
		switch (tipo) {
			case "GRUPPO":
				itemsCard = {
					stepId: stepId,
					tipo: "GRUPPO",
					codice: itemsTipo.CODGRUPPO,
					descrizione: itemsTipo.DESGRUPPO,
					note: itemsTipo.NOTEGRUPPO,
					onNextStep: itemsTipo.SEDE.length > 1 ? true : false,
					onPrevStep: false,
					aPromozioni: infoAbb?.promo.numero > 0 ? true : false,
					aConvenzioni: infoAbb?.convenzioni.numero > 0 ? true : false,
					aSospensioni: infoAbb?.sospensioni.numero > 0 ? true : false,
					aSceltaOrario: infoAbb?.sceltaOrario.numero > 0 ? true : false,
					numeroSedi: infoAbb?.promo.numeroSedi,
					numeroAree: infoAbb?.promo.numeroAree,
					numeroAbbonamenti: infoAbb?.promo.numeroAbbonamenti,
					abbonamento: {
						CODABB: "n.d",
						DESABB: "n.d",
						NOTEABB: "n.d",
						IMPORTO: "n.d",
						PROMO: "n.d",
						IMPORTOS: "n.d",
						SCELTAF: "n.d",
						NOSOSP: "n.d",
						DATAINI: "n.d",
						PERIODOATT: "n.d",
						FREQUENZAS: "n.d",
						CODPROMO: "n.d",
						DATAFIN: "n.d",
					},
				};

				break;
			case "SEDE":
				itemsCard = {
					stepId: stepId,
					tipo: "SEDE",
					codice: itemsTipo.IDSEDE,
					descrizione: itemsTipo.DESCSEDE,
					note: itemsTipo.NOTESEDE,
					onNextStep: itemsTipo.AREA.length > 1 ? true : false,
					onPrevStep: false,
					aPromozioni: infoAbb?.promo.numero > 0 ? true : false,
					aConvenzioni: infoAbb?.convenzioni.numero > 0 ? true : false,
					aSospensioni: infoAbb?.sospensioni.numero > 0 ? true : false,
					aSceltaOrario: infoAbb?.sceltaOrario.numero > 0 ? true : false,
					numeroSedi: infoAbb?.promo.numeroSedi,
					numeroAree: infoAbb?.promo.numeroAree,
					numeroAbbonamenti: infoAbb?.promo.numeroAbbonamenti,
					abbonamento: {
						CODABB: "n.d",
						DESABB: "n.d",
						NOTEABB: "n.d",
						IMPORTO: "n.d",
						PROMO: "n.d",
						IMPORTOS: "n.d",
						SCELTAF: "n.d",
						NOSOSP: "n.d",
						DATAINI: "n.d",
						PERIODOATT: "n.d",
						FREQUENZAS: "n.d",
						CODPROMO: "n.d",
						DATAFIN: "n.d",
					},
				};
				break;
			case "AREA":
				itemsCard = {
					stepId: stepId,
					tipo: "AREA",
					codice: itemsTipo.CODAREA,
					descrizione: itemsTipo.DESAREA,
					note: itemsTipo.NOTEAREA,
					onNextStep: itemsTipo.ABBONAMENTO.length > 1 ? true : false,
					onPrevStep: false,
					aPromozioni: infoAbb?.promo.numero > 0 ? true : false,
					aConvenzioni: infoAbb?.convenzioni.numero > 0 ? true : false,
					aSospensioni: infoAbb?.sospensioni.numero > 0 ? true : false,
					aSceltaOrario: infoAbb?.sceltaOrario.numero > 0 ? true : false,
					numeroSedi: infoAbb?.promo.numeroSedi,
					numeroAree: infoAbb?.promo.numeroAree,
					numeroAbbonamenti: infoAbb?.promo.numeroAbbonamenti,
					abbonamento: {
						CODABB: "n.d",
						DESABB: "n.d",
						NOTEABB: "n.d",
						IMPORTO: "n.d",
						PROMO: "n.d",
						IMPORTOS: "n.d",
						SCELTAF: "n.d",
						NOSOSP: "n.d",
						DATAINI: "n.d",
						PERIODOATT: "n.d",
						FREQUENZAS: "n.d",
						CODPROMO: "n.d",
						DATAFIN: "n.d",
					},
				};
				break;
			case "ABBONAMENTO":
				itemsCard = {
					stepId: stepId,
					tipo: "ABBONAMENTO",
					codice: itemsTipo?.CODABB,
					descrizione: itemsTipo.DESABB,
					note: itemsTipo.NOTEABB,
					onNextStep: false,
					onPrevStep: true,
					aPromozioni: itemsTipo.PROMO === "1" ? true : false,
					aConvenzioni: itemsTipo.PROMO === "2" ? true : false,
					aSospensioni: itemsTipo.NOSOSP === "0" ? true : false,
					aSceltaOrario: itemsTipo.SCELTAF !== "0" ? true : false,
					numeroSedi: 0,
					numeroAree: 0,
					numeroAbbonamenti: 0,
					abbonamento: {
						CODABB: itemsTipo?.CODABB,
						DESABB: itemsTipo?.DESABB,
						NOTEABB: itemsTipo?.NOTEABB,
						IMPORTO: itemsTipo?.IMPORTO,
						PROMO: itemsTipo?.PROMO,
						IMPORTOS: itemsTipo?.IMPORTOS,
						SCELTAF: itemsTipo?.SCELTAF,
						NOSOSP: itemsTipo?.NOSOSP,
						DATAINI: itemsTipo?.DATAINI,
						PERIODOATT: itemsTipo?.PERIODOATT,
						FREQUENZAS: itemsTipo?.FREQUENZAS,
						CODPROMO: itemsTipo?.CODPROMO,
						DATAFIN: itemsTipo?.DATAFIN,
					},
				};
				break;
			default:
				break;
		}
	} catch (error) {
		console.log(error);
	}

	return itemsCard;
}
