import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActualProduct,
	itemsCard,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import OrariPage from "src/components/listino/OrariPage";
import {
	addToCart,
	clearCart,
} from "src/components/listino/utils/functionsCart";
import eCommerceConf from "eCommerceConf.json";

const Orari: React.FC = () => {
	const router = useRouter();
	const itemsCard: itemsCard = router.query.itemsCard
		? JSON.parse(router.query.itemsCard as string)
		: null;
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);

	const [visualizzaComp, setVisualizzaComp] = useState(false);

	const [actualProduct, setActualProduct] = useState<ActualProduct>({
		codice: null,
		nome: null,
		prezzo: null,
		prezzoScontato: null,
		immagine: null,
		info: null,
		quantity: null,
		Tommys_infoHtml: null,
		Tommys_Cliente: null,
		Tommys_Abbonamento: null,
		Tommys_DataIni: null,
		Tommys_Importo: null,
		Tommys_Frequenze: null,
		Tommys_Promo: null,
		Tommys_Codice_Promo: null,
	});

	const [infoHtml, setInfoHtml] = useState<string>(
		`<label style="font-weight: bold;" />Inizia il: ${itemsCard?.abbonamento?.DATAINI}</label><br />Note: ${itemsCard?.abbonamento?.NOTEABB}`
	);

	const [infoString, setInfoString] = useState<string>(
		`Inizia il: ${itemsCard?.abbonamento?.DATAINI} <|> Note: ${itemsCard?.abbonamento?.NOTEABB}`
	);

	useEffect(() => {
		console.log("OrariPage");
		try {
			setActualProduct({
				codice: itemsCard.codice,
				nome: itemsCard.descrizione,
				prezzo: Number(itemsCard.abbonamento.IMPORTO),
				prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
				immagine: [],
				info: infoString, //da convertire in stringa
				quantity: 1,
				Tommys_infoHtml: infoHtml ?? "",
				Tommys_Cliente: authUser?.USERID ?? null,
				Tommys_Abbonamento: itemsCard.abbonamento.CODABB,
				Tommys_DataIni: itemsCard.abbonamento.DATAINI,
				Tommys_Importo:
					Number(itemsCard.abbonamento.PROMO) > 0
						? itemsCard.abbonamento.IMPORTOS
						: itemsCard.abbonamento.IMPORTO,
				Tommys_Frequenze: "",
				Tommys_Promo: itemsCard.abbonamento.PROMO,
				Tommys_Codice_Promo: itemsCard.abbonamento.CODPROMO,
			});
		} catch (error) {
			console.log("ERROREEEEEEEE");
			router.push(
				`/blockPage?titolo=CARICAMENTO DATI ORARI&descrizione=Si è verificato un errore durante il recupero dei dati necessari. Se il problema persiste si prega di cottattare il proprio centro fitness.. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
			);
		}
	}, []);

	useEffect(() => {
		if (actualProduct?.codice !== null && !visualizzaComp) {
			if (
				Number(itemsCard?.abbonamento?.SCELTAF) > 0 &&
				Number(itemsCard?.abbonamento?.FREQUENZAS) > 0
			) {
				console.log("VISUALIZZARE IL COMPONENTE PER SCEGLIERE GLI ORARI");
				setVisualizzaComp(true);
			} else {
				setVisualizzaComp(false);
				const newCart = clearCart(cart, dispatch);
				addToCart(actualProduct, newCart, dispatch, authUser);
				router.replace("/auth/acquista/riepilogo");
			}
		}
	}, [actualProduct, visualizzaComp]);

	return visualizzaComp && actualProduct?.codice !== null ? (
		// <OrariPage itemsCard={{ ...itemsCard, note: infoHtml }} />
		<OrariPage itemsCard={{ ...itemsCard, noteHtml: infoHtml }} />
	) : (
		<></>
	);
};

export default Orari;
