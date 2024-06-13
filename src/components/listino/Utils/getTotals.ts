import { ObjectType } from "react-spring";
import eCommerceConf from "eCommerceConf.json"
// Funzione ricorsiva per contare Aree
const countAree = (item: any[], tipo: string): number => {
	
	switch (tipo) {
		case "GRUPPO":
			return item.reduce((acc: number, sede: any) => acc + sede.AREA.length, 0);
		case "SEDE":
			return item.reduce((acc: number, area: any) => acc + area.length, 0);
		default:
			return 0;
	}
};

// // Funzione ricorsiva per contare Abbonamenti
const countAbbonamenti = (item: any[], tipo: string): number => {
	
	switch (tipo) {
		case "GRUPPO":
			return item.reduce(
				(acc: number, sede: any) =>
					acc +
					sede.AREA.reduce(
						(areaAcc: number, area: any) => areaAcc + area.ABBONAMENTO.length,
						0
					),
				0
			);
		case "SEDE":
			return item.reduce(
				(areaAcc, area) => areaAcc + area.ABBONAMENTO.length,
				0
			);
		default:
			return 0;
	}
};

// Funzione per ottenere il numero totale di Aree e Abbonamenti
export default function getTotals(item: any, entityType: string) {
	if (eCommerceConf.ModalitaSviluppo === true){
	 console.log("getTotals entityType", entityType);
	}
	let numeroSedi = 0;
	let numeroAree = 0;
	let numeroAbbonamenti = 0;
	switch (entityType) {
		case "GRUPPO":
			numeroSedi = item.SEDE.length;
			numeroAree = countAree(item.SEDE, entityType);
			numeroAbbonamenti = countAbbonamenti(item.SEDE, entityType);
			return {
				numeroSedi: numeroSedi,
				numeroAree: numeroAree,
				numeroAbbonamenti: numeroAbbonamenti,
			};
		case "SEDE":
			numeroSedi = 0;
			numeroAree = item.length;
			numeroAbbonamenti = countAbbonamenti(item, entityType);
			return {
				numeroSedi: numeroSedi,
				numeroAree: numeroAree,
				numeroAbbonamenti: numeroAbbonamenti,
			};
		case "AREA":
			numeroSedi = 0;
			numeroAree = 0;
			numeroAbbonamenti = item.length;
			return {
				numeroSedi: numeroSedi,
				numeroAree: numeroAree,
				numeroAbbonamenti: numeroAbbonamenti,
			};
	}
}
