import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
//import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import Place from "@mui/icons-material/Place";
import ToggleOff from "@mui/icons-material/ToggleOff";
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import {
	Discount,
	EditCalendar,
	Handshake,
	AutoAwesomeMosaic,
	MotionPhotosAuto,
	MoreHoriz,
} from "@mui/icons-material";
import React from "react";
import FormatString from "src/components/utils/FormatString";
import DescFullTxt from "./DescFullTxt";

interface CardHeadTitleProps {
	itemsCard: any;
}

const CardContentData = ({ itemsCard }: CardHeadTitleProps) => {
	// console.log("@@@ CardContentData ---> itemsCard: ", itemsCard);

	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [descProdSmall, setDescProdSmall] = React.useState("");
	const [descProdFull, setDescProdFull] = React.useState("");
	const maxLengthSmallDescProd = 300;

	React.useEffect(() => {
		// if (itemsCard?.promozione === 1) {
		// 	//promozione
		// 	setDiscountedPrice(20.99);
		// } else if (itemsCard?.promozione === 2) {
		// 	//convenzione
		// 	setDiscountedPrice(24.99);
		// }

		let descCard = itemsCard.descrizione;
		// 		descCard += `\n\n codice: item.CODABB,
		// descrizione: item.DESABB, //descrizione
		// importo: item.IMPORTO, //importo a listino
		// promozione: item.PROMO, //0=nessuna offerta, 1=in promozione, 2=in convenzione
		// importoScontato: item.IMPORTOS, //importo scontato, 0 se non c’è sconto
		// sceltaFine: item.SCELTAF, //0=abbonamento non prevede scelta attività ad orario, >0 abbonamento con scelta attività ad orario
		// noSospensione: item.NOSOSP, //0=abbonamento sospendibile, <>0 abbonamento non sospendibile
		// dataIniziale: item.DATAINI, //data proposta come inizio abbonamento
		// periodoAttivabile: item.PERIODOATT, //giorni disponibili per l’attivazione (se =0 vale la dataini)
		// frequenzaSedute: item.FREQUENZAS, //frequenza settimanale (per scegliere gli orari deve essere >0)`;

		//let descCard = itemsCard.descrizione;
		if (descCard.length > maxLengthSmallDescProd) {
			// Trova l'ultima occorrenza di uno spazio prima della posizione massima
			const lastSpaceIndex = descCard.lastIndexOf(" ", maxLengthSmallDescProd);
			// Verifica se uno spazio è stato trovato
			if (lastSpaceIndex !== -1) {
				// Suddividi il testo alla fine della parola trovata
				setDescProdSmall(descCard.substring(0, lastSpaceIndex));
				setDescProdFull(descCard.substring(lastSpaceIndex + 1));
			} else {
				// Se non è stato trovato uno spazio, usa la posizione massima
				setDescProdSmall(descCard.substring(0, maxLengthSmallDescProd));
				setDescProdFull(descCard.substring(maxLengthSmallDescProd));
			}
		} else {
			// Se la lunghezza del testo è inferiore alla lunghezza massima, non è necessario suddividerlo
			setDescProdSmall(descCard);
			setDescProdFull("");
		}

		//console.log("XXXX - descProdSmall: ", descProdSmall.length);
		//console.log("XXXX - descProdFull: ", descProdFull.length);
	}, [itemsCard.descrizione]);

	return (
		<Grid
			container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "stretch",
			}}
		>
			<Typography
				variant="body2"
				sx={{ fontWeight: "bold" }}
			>
				Informazioni:
			</Typography>
			<Divider sx={{ mb: 1 }} />
			{itemsCard.tipo === "GRUPPO" ? (
				<Grid
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						flexWrap: "nowrap",
					}}
				>
					<IconButton>
						<Place color="warning" />
					</IconButton>
					<Typography variant="body2">SEDI: {itemsCard.numeroSedi}</Typography>
				</Grid>
			) : (
				<></>
			)}

			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "center",
					flexWrap: "nowrap",
				}}
			>
				<IconButton>
					<AutoAwesomeMosaic color="error" />
				</IconButton>
				<Typography variant="body2">AREE: {itemsCard.numeroAree}</Typography>
			</Grid>

			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "center",
					flexWrap: "nowrap",
				}}
			>
				<IconButton>
					<MotionPhotosAuto color="info" />
				</IconButton>
				<Typography variant="body2">
					ABBONAMENTI: {itemsCard.numeroAbbonamenti}
				</Typography>
			</Grid>

			<Typography
				variant="body2"
				sx={{ fontWeight: "bold", mt: 2 }}
			>
				Descrizione:
			</Typography>
			<Divider sx={{ mb: 1 }} />
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ whiteSpace: "pre-line", height: "100px", overflow: "hidden" }}
			>
				<FormatString
					descrizione={
						itemsCard.tipo !== "SEDE" ? descProdSmall : itemsCard.note
					}
				/>
			</Typography>

			<DescFullTxt
				isOpen={isModalOpen}
				onClose={closeModal}
				fullTxt={descProdSmall + descProdFull}
			/>

			{descProdFull.length > 0 ? (
				<div>
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign="center"
									variant="subtitle2"
								>
									Visualizza altro contenuto
								</Typography>
							</span>
						}
					>
						<IconButton
							onClick={() => {
								openModal();
							}}
						>
							<MoreHoriz />
						</IconButton>
					</Tooltip>
				</div>
			) : (
				<></>
			)}
		</Grid>
	);
};

export default CardContentData;
