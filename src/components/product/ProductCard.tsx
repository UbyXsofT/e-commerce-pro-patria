import { Discount, EditCalendar, Handshake } from "@mui/icons-material";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import Image from "next/image";
import { Abbonamento } from "pages/auth/store";
import { useEffect, useState } from "react";

interface ProductCardProps {
	product: Abbonamento;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

	useEffect(() => {
		if (product.promozione.isPromo) {
			setDiscountedPrice(20);
		} else if (product.convenzione.isConv) {
			setDiscountedPrice(24);
		}
	}, []);

	return (
		<Card sx={{ padding: 1 }}>
			<CardContent>
				<span
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						height: "64px",
					}}
				>
					<Typography
						marginBottom={3}
						variant="h5"
					>
						{product.nome}
					</Typography>
					<span style={{ display: "flex" }}>
						{product.convenzione.isConv ? (
							<Typography
								marginBottom={3}
								variant="h5"
							>
								<Tooltip
									title={
										<span style={{ display: "flex", flexDirection: "column" }}>
											<Typography
												textAlign={"center"}
												variant="subtitle2"
											>
												Convenzione
											</Typography>
											<Typography variant="subtitle2">
												{product.convenzione.descConve}
											</Typography>
										</span>
									}
								>
									<IconButton>
										<Handshake />
									</IconButton>
								</Tooltip>
							</Typography>
						) : (
							<></>
						)}
						{product.promozione.isPromo ? (
							<Typography
								marginBottom={3}
								variant="h5"
							>
								<Tooltip
									title={
										<span style={{ display: "flex", flexDirection: "column" }}>
											<Typography
												textAlign={"center"}
												variant="subtitle2"
											>
												Promozione
											</Typography>
											<Typography variant="subtitle2">
												{product.promozione.descPromo}
											</Typography>
										</span>
									}
								>
									<IconButton>
										<Discount />
									</IconButton>
								</Tooltip>
							</Typography>
						) : (
							<></>
						)}
						{product.sceltaOrari.isOrari ? (
							<Typography
								marginBottom={3}
								variant="h5"
							>
								<Tooltip
									title={
										<span style={{ display: "flex", flexDirection: "column" }}>
											<Typography
												textAlign={"center"}
												variant="subtitle2"
											>
												Orario Configurabile <br />
											</Typography>
											<Typography variant="h6">
												{`${product.sceltaOrari.daOrari} - ${product.sceltaOrari.aOrari}`}
											</Typography>
										</span>
									}
								>
									<IconButton>
										<EditCalendar />
									</IconButton>
								</Tooltip>
							</Typography>
						) : (
							<></>
						)}
					</span>
				</span>

				<Image
					src={product.immagine ? product.immagine : ""}
					alt={product.nome}
					width={250}
					height={250}
				/>
				{discountedPrice ? (
					<span
						style={{
							display: "grid",
							padding: "1em",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: 3,
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
							{product.prezzo}€
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
							{discountedPrice}€
						</Typography>
					</span>
				) : (
					<Typography
						variant="h5"
						textAlign={"center"}
						padding={"1rem"}
					>
						{product.prezzo}€
					</Typography>
				)}

				<Typography>{product.descrizione}</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button variant="contained">Iscriviti</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
