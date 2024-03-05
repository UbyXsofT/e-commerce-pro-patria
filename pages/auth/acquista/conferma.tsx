import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActualProduct,
	itemsCard,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import ConfermaAbbPage from "src/components/listino/ConfermaAbbPage";
import { addToCart } from "src/components/listino/utils/functionsCart";

const Conferma: React.FC = () => {
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
	});

	const [myNoteProduct, setMyNoteProduct] = useState<string>(
		`<label style="font-weight: bold;" />Inizia il: ${itemsCard?.abbonamento?.DATAINI}</label><br />Note: ${itemsCard?.abbonamento?.NOTEABB}`
	);

	useEffect(() => {
		console.log("ConfermaAbbPage");
		itemsCard.note = myNoteProduct;
	}, [myNoteProduct]);

	useEffect(() => {
		try {
			setActualProduct({
				codice: itemsCard.codice,
				nome: itemsCard.descrizione,
				prezzo: Number(itemsCard.abbonamento.IMPORTO),
				prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
				immagine: [],
				info: itemsCard.note,
				quantity: 1,
			});
		} catch (error) {
			console.log("ERROREEEEEEEE");
		}
	}, [itemsCard?.note]);

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
				addToCart(actualProduct, cart, dispatch, authUser);
				router.replace("/auth/carrello");
			}
		}
	}, [actualProduct, visualizzaComp]);

	return visualizzaComp && actualProduct?.codice !== null ? (
		<ConfermaAbbPage itemsCard={{ ...itemsCard, note: myNoteProduct }} />
	) : (
		<></>
	);
};

export default Conferma;
