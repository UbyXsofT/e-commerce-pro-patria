import axios from "axios";
import { ReactElement } from "react";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import eCommerceConf from "eCommerceConf.json";

const formatPrezzo = (prezzo: number) => {
	// Controlla se ci sono decimali
	const decimalCount = (prezzo.toString().split(".")[1] || "").length;
	const decimalSeparator = ",";

	// Se ci sono meno di 2 cifre decimali, aggiungi gli zeri necessari
	const formattedPrezzo =
		decimalCount < 2
			? prezzo
					.toLocaleString(eCommerceConf.FormattazionePrezzo.toLocaleString, {
						minimumFractionDigits:
							eCommerceConf.FormattazionePrezzo.minimumFractionDigits,
						maximumFractionDigits:
							eCommerceConf.FormattazionePrezzo.maximumFractionDigits,
					})
					.replace(".", decimalSeparator)
			: prezzo.toLocaleString(
					eCommerceConf.FormattazionePrezzo.toLocaleString,
					{
						minimumFractionDigits:
							eCommerceConf.FormattazionePrezzo.minimumFractionDigits,
						maximumFractionDigits:
							eCommerceConf.FormattazionePrezzo.maximumFractionDigits,
					}
			  );

	return formattedPrezzo;
};

export default function ProductCard(props: {
	id: string;
	nome: string;
	descrizione: string;
	immagine: string;
	prezzo: number;
	convenzione: object;
	promozione: object;
	sceltaOrari: object;
}) {
	const formattedPrezzo = formatPrezzo(props.prezzo);

	return (
		<Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
			<CardOverflow>
				<AspectRatio sx={{ minWidth: 200 }}>
					<img
						src={props.immagine}
						loading="lazy"
						alt={props.nome}
					/>
				</AspectRatio>
			</CardOverflow>
			<CardContent>
				<Typography level="body-xs">{props.nome}</Typography>
				<Link
					href="#product-card"
					fontWeight="md"
					color="neutral"
					textColor="text.primary"
					overlay
					endDecorator={<ArrowOutwardIcon />}
				>
					{props.descrizione}
				</Link>

				<Typography
					level="title-lg"
					sx={{ mt: 1, fontWeight: "xl" }}
					endDecorator={
						<Chip
							component="span"
							size="sm"
							variant="soft"
							color="success"
						>
							Lowest price
						</Chip>
					}
				>
					{formattedPrezzo} {eCommerceConf.FormattazionePrezzo.currency}
				</Typography>
				<Typography level="body-sm">
					(Only <b>7</b> left in stock!)
				</Typography>
			</CardContent>
			<CardOverflow>
				<Button
					variant="solid"
					color="danger"
					size="lg"
				>
					Aggiungi al carrello
				</Button>
			</CardOverflow>
		</Card>
	);
}
