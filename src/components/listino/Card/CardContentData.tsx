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
import { itemsCard } from "src/components/CommonTypesInterfaces";

interface CardHeadTitleProps {
	itemsCard: itemsCard;
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
		let cardNote = "n.d.";

		if (itemsCard.tipo === "ABBONAMENTO") {
			cardNote = `CODICE: ${itemsCard.abbonamento.CODABB} \n DATAINI: ${itemsCard.abbonamento.DATAINI} \n DESABB: : ${itemsCard.abbonamento.DESABB} \n IMPORTO: ${itemsCard.abbonamento.IMPORTO} \n IMPORTOS: ${itemsCard.abbonamento.IMPORTOS} \n NOSOSP: ${itemsCard.abbonamento.NOSOSP} \n PERIODOATT: ${itemsCard.abbonamento.PERIODOATT} \n PROMO: ${itemsCard.abbonamento.PROMO} \n SCELTAF: ${itemsCard.abbonamento.SCELTAF} \n\n\n  note: ${itemsCard.note}`;
		} else {
			cardNote = itemsCard.note ? itemsCard.note : "";
		}

		//let cardNote = itemsCard.descrizione;
		if (cardNote.length > maxLengthSmallDescProd) {
			// Trova l'ultima occorrenza di uno spazio prima della posizione massima
			const lastSpaceIndex = cardNote.lastIndexOf(" ", maxLengthSmallDescProd);
			// Verifica se uno spazio è stato trovato
			if (lastSpaceIndex !== -1) {
				// Suddividi il testo alla fine della parola trovata
				setDescProdSmall(cardNote.substring(0, lastSpaceIndex));
				setDescProdFull(cardNote.substring(lastSpaceIndex + 1));
			} else {
				// Se non è stato trovato uno spazio, usa la posizione massima
				setDescProdSmall(cardNote.substring(0, maxLengthSmallDescProd));
				setDescProdFull(cardNote.substring(maxLengthSmallDescProd));
			}
		} else {
			// Se la lunghezza del testo è inferiore alla lunghezza massima, non è necessario suddividerlo
			setDescProdSmall(cardNote);
			setDescProdFull("");
		}

		//console.log("XXXX - descProdSmall: ", descProdSmall.length);
		//console.log("XXXX - descProdFull: ", descProdFull.length);
	}, [itemsCard.note]);

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
			{itemsCard.tipo !== "ABBONAMENTO" ? (
				<>
					<Typography
						variant="body2"
						sx={{ fontWeight: "bold" }}
					>
						Informazioni:
					</Typography>
					<Divider sx={{ mb: 1 }} />
				</>
			) : (
				<></>
			)}

			{itemsCard.tipo === "GRUPPO" ? (
				<>
					<Grid
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							flexWrap: "nowrap",
						}}
					>
						<IconButton style={{ width: "40px" }}>
							<Place color="warning" />
						</IconButton>
						<Typography variant="body2">
							SEDI: {itemsCard.numeroSedi}
						</Typography>
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
						<IconButton style={{ width: "40px" }}>
							<AutoAwesomeMosaic color="error" />
						</IconButton>
						<Typography variant="body2">
							AREE: {itemsCard.numeroAree}
						</Typography>
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
						<IconButton style={{ width: "40px" }}>
							<MotionPhotosAuto color="info" />
						</IconButton>
						<Typography variant="body2">
							ABBONAMENTI: {itemsCard.numeroAbbonamenti}
						</Typography>
					</Grid>
				</>
			) : itemsCard.tipo === "SEDE" ? (
				<>
					<Grid
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							flexWrap: "nowrap",
						}}
					>
						<IconButton style={{ width: "40px" }}>
							<AutoAwesomeMosaic color="error" />
						</IconButton>
						<Typography variant="body2">
							AREE: {itemsCard.numeroAree}
						</Typography>
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
						<IconButton style={{ width: "40px" }}>
							<MotionPhotosAuto color="info" />
						</IconButton>
						<Typography variant="body2">
							ABBONAMENTI: {itemsCard.numeroAbbonamenti}
						</Typography>
					</Grid>
				</>
			) : itemsCard.tipo === "AREA" ? (
				<>
					<Grid
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							flexWrap: "nowrap",
						}}
					>
						<IconButton style={{ width: "40px" }}>
							<MotionPhotosAuto color="info" />
						</IconButton>
						<Typography variant="body2">
							ABBONAMENTI: {itemsCard.numeroAbbonamenti}
						</Typography>
					</Grid>
				</>
			) : (
				<></>
			)}

			<Typography
				variant="body2"
				sx={{ fontWeight: "bold", mt: 2 }}
			>
				Descrizione/Note:
			</Typography>
			<Divider sx={{ mb: 1 }} />
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ whiteSpace: "pre-line", overflow: "hidden" }}
			>
				<FormatString descrizione={descProdSmall} />
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
