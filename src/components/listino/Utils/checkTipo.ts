import {
	Abbonamento,
	Area,
	Gruppo,
	Item,
	Sede,
} from "src/components/CommonTypesInterfaces";

// Funzioni di verifica del tipo
function isGruppo(item: Item): item is Gruppo {
	return (item as Gruppo).CODGRUPPO !== undefined;
}
function isSede(item: Item): item is Sede {
	return (item as Sede).IDSEDE !== undefined;
}
function isArea(item: Item): item is Area {
	return (item as Area).CODAREA !== undefined;
}
function isAbbonamento(item: Item): item is Abbonamento {
	return (item as Abbonamento).CODABB !== undefined;
}

export { isGruppo, isSede, isArea, isAbbonamento };
