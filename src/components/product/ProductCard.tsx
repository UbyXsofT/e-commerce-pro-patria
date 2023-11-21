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

const ProductCard = ({ product }: ProductCardProps) => {
	const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

	const cart = useSelector((state: StoreState) => state.cart);

	const dispatch = useDispatch();

	useEffect(() => {
		if (product.promozione.isPromo) {
			setDiscountedPrice(20.99);
		} else if (product.convenzione.isConv) {
			setDiscountedPrice(24.99);
		}
	}, []);

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
							userId: "todo",
							cart: [...user.cart, configurableAbbonamento],
						},
					])
			  )
			: dispatch(
					setCart([
						{
							userId: "todo",
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
				</span>

				<Image
					src={product.immagine ? product.immagine : ""}
					alt={product.nome}
					width={250}
					height={250}
					style={{ borderRadius: 5 }}
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

				<Typography>{product.descrizione}</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button
					onClick={() =>
						isInCart(product)
							? removeFromCart(product, cart, dispatch)
							: addToCart(product)
					}
					variant="contained"
				>
					{isInCart(product) ? "Rimuovi dal Carrello" : "Aggiungi Al Carrello"}
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
