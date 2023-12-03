import * as React from "react";
import { styled } from "@mui/material/styles";
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
	Abbonamento,
	Cart,
	CartAbbonamento,
	StoreState,
} from "../CommonTypesInterfaces";
import { setCart } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { renderPrice } from "pages/auth/carrello";
import { Button, Tooltip } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface ProductCardProps {
	product: Abbonamento;
}

export const removeFromCart = (
	abbonamento: Abbonamento,
	cart: Cart,
	dispatch: Dispatch
): void => {
	const user = cart.at(0);

	let filteredCart = null;

	if (user) {
		filteredCart = user.cart.filter((storedAbbonamento) => {
			if (storedAbbonamento.id !== abbonamento.id) {
				return storedAbbonamento;
			}
		});
	} else {
		return;
	}

	dispatch(setCart([{ userId: "todo", cart: filteredCart }]));
};

const ProductCard2 = ({ product }: ProductCardProps) => {
	const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
	const cart = useSelector((state: StoreState) => state.cart);
	const dispatch = useDispatch();

	const [descProdSmall, setDescProdSmall] = React.useState("");
	const [descProdFull, setDescProdFull] = React.useState("");
	const maxLengthSmallDescProd = 250;

	const authUser = useSelector((state: StoreState) => state.authUser);

	useEffect(() => {
		if (product.promozione.isPromo) {
			setDiscountedPrice(20.99);
		} else if (product.convenzione.isConv) {
			setDiscountedPrice(24.99);
		}

		if (product.descrizione.length > maxLengthSmallDescProd) {
			// Trova l'ultima occorrenza di uno spazio prima della posizione massima
			const lastSpaceIndex = product.descrizione.lastIndexOf(
				" ",
				maxLengthSmallDescProd
			);

			// Verifica se uno spazio è stato trovato
			if (lastSpaceIndex !== -1) {
				// Suddividi il testo alla fine della parola trovata
				setDescProdSmall(product.descrizione.substring(0, lastSpaceIndex));
				setDescProdFull(product.descrizione.substring(lastSpaceIndex + 1));
			} else {
				// Se non è stato trovato uno spazio, usa la posizione massima
				setDescProdSmall(
					product.descrizione.substring(0, maxLengthSmallDescProd)
				);
				setDescProdFull(product.descrizione.substring(maxLengthSmallDescProd));
			}
		} else {
			// Se la lunghezza del testo è inferiore alla lunghezza massima, non è necessario suddividerlo
			setDescProdSmall(product.descrizione);
			setDescProdFull("");
		}
	}, [product.descrizione]);

	const addToCart = (abbonamento: Abbonamento): void => {
		const configurableAbbonamento: CartAbbonamento = {
			...abbonamento,
			configuration: null,
		};

		let user = cart.at(0);

		user
			? dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [...user.cart, configurableAbbonamento],
						},
					])
			  )
			: dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [configurableAbbonamento],
						},
					])
			  );
	};

	const isInCart = (abbonamento: Abbonamento): boolean => {
		let user = cart.at(0);

		if (!user) {
			return false;
		}

		let filteredCart = user.cart.filter((storedAbbonamento) => {
			if (storedAbbonamento.id === abbonamento.id) {
				return storedAbbonamento;
			}
		});

		if (filteredCart.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Card
			// ref={cardRef}
			sx={{
				maxWidth: 345,
				minWidth: 300,
			}}
			// key={uniqueCardId}
		>
			<CardMedia
				component="img"
				image={product.immagine ? product.immagine : "/images/LogoQ.png"}
				alt={product.nome}
				height={260}
				style={{
					borderRadius: 5,
					objectFit: product.immagine ? "cover" : "contain",
				}}
			/>

			<CardHeader
				sx={{ minHeight: "160px" }}
				action={
					<span
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							height: "64px",
						}}
					>
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
										<Handshake color="success" />
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
										<Discount color="success" />
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
				}
				title={product.nome}
			></CardHeader>
			<CardContent sx={{ minHeight: "150px" }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					{descProdSmall}
				</Typography>
			</CardContent>
			<div>
				<CardActions disableSpacing>
					{discountedPrice ? (
						<span
							style={{
								display: "grid",
								padding: "1em",
								gridTemplateColumns: "1fr 1fr",
								gap: 4,
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
								{renderPrice(product.prezzo)}€
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
								{renderPrice(discountedPrice)}€
							</Typography>
						</span>
					) : (
						<Typography
							variant="h5"
							textAlign={"center"}
							padding={"1rem"}
						>
							{renderPrice(product.prezzo)}€
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
						onClick={() =>
							isInCart(product)
								? removeFromCart(product, cart, dispatch)
								: addToCart(product)
						}
						variant="contained"
					>
						<ShoppingCartIcon style={{ marginRight: 20 }} />
						{isInCart(product)
							? "Rimuovi dal Carrello"
							: "Aggiungi Al Carrello"}
					</Button>
				</div>
			</div>

			<Typography
				variant="body2"
				color="text.secondary"
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				Visualizza scheda completa prodotto
				<IconButton>
					<MoreHorizIcon />
				</IconButton>
			</Typography>
		</Card>
	);
};

export default ProductCard2;
