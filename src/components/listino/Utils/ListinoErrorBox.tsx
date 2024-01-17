import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setListino } from "src/store/actions";
import { StoreState } from "../../CommonTypesInterfaces";
import fetchListino from "../../utils/fetchListino";

const ListinoErrorBox = () => {
	const dispatch = useDispatch();
	const listinoState = useSelector((state: StoreState) => state.listino);
	const authUser = useSelector((state: StoreState) => state.authUser);

	return (
		<Box
			textAlign={"center"}
			// marginTop={12}
		>
			<Typography
				gutterBottom
				variant="h4"
			>
				<strong>Qualcosa è andato storto</strong>
			</Typography>
			<Button
				variant="contained"
				onClick={async () => {
					console.log("****** CHECK LISTINO: ", listinoState.listino);

					if (!listinoState.listino) {
						try {
							// Effettua la richiesta asincrona
							const data = await fetchListino(authUser?.USERID);

							// Aggiorna lo stato Redux utilizzando la tua azione setListino
							dispatch(setListino({ listino: data.listino, error: null }));
						} catch (error) {
							// Gestisci eventuali errori durante la richiesta
							console.error("Errore durante il fetch del listino:", error);
							dispatch(
								setListino({
									listino: null,
									error: error || "Errore sconosciuto",
								})
							);
						}
					}
				}}
			>
				Prova a Ricaricare
			</Button>
		</Box>
	);
};
export default ListinoErrorBox;
