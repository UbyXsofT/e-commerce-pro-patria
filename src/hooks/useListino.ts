import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListino, setLoading } from "src/store/actions";
import { StoreState } from "src/components/CommonTypesInterfaces";
import fetchListino from "src/components/listino/utils/fetchListino";
import eCommerceConf from "eCommerceConf.json";
import router from "next/router";

export const useListino = () => {
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const listinoState = useSelector((state: StoreState) => state.listino);
	const [isFetchingData, setIsFetchingData] = useState(false);

	const aggiornaListino = async () => {
		setIsFetchingData(true);
		dispatch(setLoading(true));

		try {
			const data = await fetchListino(authUser?.USERID);

			if (eCommerceConf.ModalitaSviluppo === true) {
				console.log("****** 2) DATA: ", data);
			}

			if (data.listino === null) {
				setIsFetchingData(false);
				dispatch(setLoading(false));
				router.push(
					`/blockPage?titolo=CARICAMENTO DATI LISTINO&descrizione=Si è verificato un errore durante il recupero dei dati necessari. Se il problema persiste si prega di cottattare il proprio centro fitness.. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
				);
			} else {
				dispatch(setListino({ listino: data.listino, error: null }));
			}
		} catch (error) {
			console.error("Errore durante il fetch del listino:", error);
			dispatch(
				setListino({
					listino: null,
					error: error || "Errore sconosciuto",
				})
			);
		} finally {
			setIsFetchingData(false);
			dispatch(setLoading(false));
		}
	};

	// useEffect(() => {
	// 	//if (listinoState.listino === null) {
	// 	aggiornaListino();
	// 	//}
	// }, []);

	return { isFetchingData, aggiornaListino };
};
