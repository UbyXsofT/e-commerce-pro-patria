import * as React from "react";
import Router from "next/router";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Discount, EditCalendar, Handshake } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	Listino,
	Cart,
	CartProdotto,
	StoreState,
	Gruppo,
	Area,
	Sede,
	Abbonamento,
} from "../CommonTypesInterfaces";
import { setActualProduct, setCart } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import renderPrice from "src/components/utils/renderPrice";
import { Box, Button, Container, Grid, Tooltip } from "@mui/material";
import FormatString from "src/components/utils/FormatString";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ToggleOff from "@mui/icons-material/ToggleOff";
interface ListinoCardProps {
	itemsCard: any;
	tipo: number;
}

const ListinoCard = ({ itemsCard, tipo }: ListinoCardProps) => {
	const [discountedPrice, setDiscountedPrice] = React.useState<null | number>(
		null
	);

	const theme = useTheme();
	const dispatch = useDispatch();
	// const listino = useSelector((state: StoreState) => state.listino);
	//const authUser = useSelector((state: StoreState) => state.authUser);

	const [descProdSmall, setDescProdSmall] = React.useState("");
	const [descProdFull, setDescProdFull] = React.useState("");
	const maxLengthSmallDescProd = 300;

	useEffect(() => {
		if (itemsCard?.promozione === 1) {
			//promozione
			setDiscountedPrice(20.99);
		} else if (itemsCard?.promozione === 2) {
			//convenzione
			setDiscountedPrice(24.99);
		}

		let descCard = itemsCard.descrizione;
		descCard += `\n\n codice: item.CODABB,
descrizione: item.DESABB, //descrizione
importo: item.IMPORTO, //importo a listino
promozione: item.PROMO, //0=nessuna offerta, 1=in promozione, 2=in convenzione
importoScontato: item.IMPORTOS, //importo scontato, 0 se non c’è sconto
sceltaFine: item.SCELTAF, //0=abbonamento non prevede scelta attività ad orario, >0 abbonamento con scelta attività ad orario
noSospensione: item.NOSOSP, //0=abbonamento sospendibile, <>0 abbonamento non sospendibile
dataIniziale: item.DATAINI, //data proposta come inizio abbonamento
periodoAttivabile: item.PERIODOATT, //giorni disponibili per l’attivazione (se =0 vale la dataini)
frequenzaSedute: item.FREQUENZAS, //frequenza settimanale (per scegliere gli orari deve essere >0)`;

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

		console.log("XXXX - descProdSmall: ", descProdSmall.length);
		console.log("XXXX - descProdFull: ", descProdFull.length);
	}, [itemsCard.descrizione]);

	return (
		<Card
			sx={{
				maxWidth: "345px",
				width: "290px",
				// height: "540px",
				marginTop: "25px",
				marginBottom: "25px",
				cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
			}}
			//onClick={() => callProductPage(product.id)}
		>
			{/* <CardMedia
				component="img"
				image={itemsCard.immagine ? itemsCard.immagine : "/images/LogoQ.png"}
				alt={itemsCard.nome}
				height={260}
				style={{
					borderRadius: 5,
					objectFit: itemsCard.immagine ? "cover" : "contain",
					backgroundColor: "#a2a2a2",
				}}
			/> 
			
			
	codice: item.CODABB,
								descrizione: item.DESABB, //descrizione
								importo: item.IMPORTO, //importo a listino
								promozione: item.PROMO, //0=nessuna offerta, 1=in promozione, 2=in convenzione
								importoScontato: item.IMPORTOS, //importo scontato, 0 se non c’è sconto
								sceltaFine: item.SCELTAF, //0=abbonamento non prevede scelta attività ad orario, >0 abbonamento con scelta attività ad orario
								noSospensione: item.NOSOSP, //0=abbonamento sospendibile, <>0 abbonamento non sospendibile
								dataIniziale: item.DATAINI, //data proposta come inizio abbonamento
								periodoAttivabile: item.PERIODOATT, //giorni disponibili per l’attivazione (se =0 vale la dataini)
								frequenzaSedute: item.FREQUENZAS, //frequenza settimanale (per scegliere gli orari deve essere >0)

			
			*/}

			<CardHeader
				sx={{
					minHeight: "70px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "stretch",
					padding: "16px",
				}}
				title={
					<div>
						<div style={{ display: "flex", alignItems: "center" }}>
							{itemsCard.tipo === "GRUPPO" && <GroupsIcon />}
							{itemsCard.tipo === "SEDE" && <NotListedLocationIcon />}
							<div style={{ marginLeft: "8px" }}>
								{itemsCard.tipo === "GRUPPO"
									? itemsCard?.descrizione
									: itemsCard?.tipo}
							</div>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
								borderTop: "#454545 1px solid",
								marginTop: "10px",
								paddingTop: "10px",
							}}
						>
							<Tooltip
								title={
									<span style={{ display: "flex", flexDirection: "column" }}>
										<Typography
											textAlign="center"
											variant="subtitle2"
										>
											Contiene abbonamento in convenzione
										</Typography>
									</span>
								}
							>
								<IconButton>
									<Handshake color="success" />
								</IconButton>
							</Tooltip>

							<Tooltip
								title={
									<span style={{ display: "flex", flexDirection: "column" }}>
										<Typography
											textAlign={"center"}
											variant="subtitle2"
										>
											Contiene abbonamento in promozione
										</Typography>
									</span>
								}
							>
								<IconButton>
									<Discount color="error" />
								</IconButton>
							</Tooltip>

							<Tooltip
								title={
									<span style={{ display: "flex", flexDirection: "column" }}>
										<Typography
											textAlign={"center"}
											variant="subtitle2"
										>
											Contiene abbonamento sospendibile
										</Typography>
									</span>
								}
							>
								<IconButton>
									<ToggleOff color="warning" />
								</IconButton>
							</Tooltip>

							<Tooltip
								title={
									<span style={{ display: "flex", flexDirection: "column" }}>
										<Typography
											textAlign={"center"}
											variant="subtitle2"
										>
											Contiene abbonamento con scelta attività ad orario
										</Typography>
									</span>
								}
							>
								<IconButton>
									<EditCalendar color="info" />
								</IconButton>
							</Tooltip>

							{/* Altre icone... */}
						</div>
					</div>
				}
			></CardHeader>
			{itemsCard.tipo !== "GRUPPO" && (
				<CardContent
					sx={{
						minHeight: "190px",
						height: "300px",
						backgroundColor: (theme) =>
							theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
						display: "flex",
						flexDirection: "column",
						flexWrap: "nowrap",
						alignItems: "flex-end",
						justifyContent: "space-around",
					}}
				>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ whiteSpace: "pre-line" }}
					>
						<FormatString descrizione={descProdSmall} />
					</Typography>
					{descProdFull.length > 0 ? <MoreHorizIcon /> : <></>}
				</CardContent>
			)}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "nowrap",
				}}
			>
				<CardActions disableSpacing>
					{discountedPrice ? (
						<span
							style={{
								display: "grid",
								padding: "1em",
								gridTemplateColumns: "1fr 1fr",
								gap: "3em",
							}}
						>
							<Typography
								variant="h5"
								textAlign={"center"}
								color={"grey"}
								style={{
									position: "relative",
								}}
							>
								{itemsCard?.importo
									? renderPrice(itemsCard?.importo ? itemsCard.importo : 0.0) +
									  "€"
									: ""}
								<span
									style={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%) rotate(-20deg)",
										background: "red",
										width: "100%",
										height: "2px",
									}}
								></span>
							</Typography>
							<Typography
								variant="h5"
								textAlign={"center"}
								color={"green"}
							>
								{itemsCard?.importoScontato
									? renderPrice(
											itemsCard?.importoScontato
												? itemsCard.importoScontato
												: 0.0
									  ) + "€"
									: ""}
							</Typography>
						</span>
					) : (
						<Typography
							variant="h5"
							textAlign={"center"}
							padding={"1rem"}
						>
							{itemsCard?.importo
								? renderPrice(itemsCard?.importo ? itemsCard.importo : 0.0) +
								  "€"
								: ""}
						</Typography>
					)}
				</CardActions>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "30px",
						bottom: 0,
						position: "relative",
					}}
				>
					<Button
						//onClick={() => callProductPage(product.id)}
						variant="contained"
						style={{ width: 240 }}
					>
						{itemsCard?.importo ? "ACQUISTA" : "SELEZIONA"}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ListinoCard;
