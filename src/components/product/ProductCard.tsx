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
	Prodotto,
	Cart,
	CartProdotto,
	StoreState,
} from "../CommonTypesInterfaces";
import { setActualProduct, setCart } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import renderPrice from "src/components/utils/renderPrice";
import { Button, Tooltip } from "@mui/material";
import FormatString from "src/components/utils/FormatString";
import StorefrontIcon from "@mui/icons-material/Storefront";

// interface ExpandMoreProps extends IconButtonProps {
// 	expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
// 	const { expand, ...other } = props;
// 	return <IconButton {...other} />;
// })(({ theme, expand }) => ({
// 	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
// 	marginLeft: "auto",
// 	transition: theme.transitions.create("transform", {
// 		duration: theme.transitions.duration.shortest,
// 	}),
// }));

interface ProductCardProps {
	product: Prodotto;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
	const theme = useTheme();
	const dispatch = useDispatch();
	const centri = useSelector((state: StoreState) => state.centri);
	const authUser = useSelector((state: StoreState) => state.authUser);

	const [descProdSmall, setDescProdSmall] = React.useState("");
	const [descProdFull, setDescProdFull] = React.useState("");
	const maxLengthSmallDescProd = 300;
	useEffect(() => {
		if (product.promozione.isPromo) {
			setDiscountedPrice(20.99);
		} else if (product.convenzione.isConv) {
			setDiscountedPrice(24.99);
		}

		let descrizioneProdotto = product.descrizione;
		//let descrizioneProdotto = product.descrizione;
		if (descrizioneProdotto.length > maxLengthSmallDescProd) {
			// Trova l'ultima occorrenza di uno spazio prima della posizione massima
			const lastSpaceIndex = descrizioneProdotto.lastIndexOf(
				" ",
				maxLengthSmallDescProd
			);
			// Verifica se uno spazio è stato trovato
			if (lastSpaceIndex !== -1) {
				// Suddividi il testo alla fine della parola trovata
				setDescProdSmall(descrizioneProdotto.substring(0, lastSpaceIndex));
				setDescProdFull(descrizioneProdotto.substring(lastSpaceIndex + 1));
			} else {
				// Se non è stato trovato uno spazio, usa la posizione massima
				setDescProdSmall(
					descrizioneProdotto.substring(0, maxLengthSmallDescProd)
				);
				setDescProdFull(descrizioneProdotto.substring(maxLengthSmallDescProd));
			}
		} else {
			// Se la lunghezza del testo è inferiore alla lunghezza massima, non è necessario suddividerlo
			setDescProdSmall(descrizioneProdotto);
			setDescProdFull("");
		}

		console.log("XXXX - descProdSmall: ", descProdSmall.length);
		console.log("XXXX - descProdFull: ", descProdFull.length);
	}, [product.descrizione]);

	const callProductPage = (productId: any) => {
		Router.push(`/auth/prodotto/${productId}`);

		// const prodotto: Prodotto | null = useSelector(
		// 	(state: StoreState) => state.actualProduct
		// );

		let actualProduct = centri.centri[0].subscriptions.filter(
			(listProduct: any) => {
				console.log("@@@@ xxxx ProductPage listProduct.id: ", listProduct.id);
				console.log("@@@@ xxxx ProductPage productId: ", productId);
				if (listProduct.id === productId) {
					console.log(
						"@@@@ xxxx >>>>>> ProductPage listProduct: ",
						listProduct
					);
					dispatch(setActualProduct(listProduct));
					return listProduct;
				}
			}
		);
	};

	return (
		<Card
			sx={{
				maxWidth: 345,
				width: 290,
				cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
			}}
			onClick={() => callProductPage(product.id)}
		>
			<CardMedia
				component="img"
				image={product.immagine ? product.immagine : "/images/LogoQ.png"}
				alt={product.nome}
				height={260}
				style={{
					borderRadius: 5,
					objectFit: product.immagine ? "cover" : "contain",
					backgroundColor: "#a2a2a2",
				}}
			/>

			<CardHeader
				sx={{
					minHeight: "230px",
					display: "flex",
					alignItems: "center",
					padding: "16px",
					justifyContent: "center",
					flexDirection: "column",
					flexWrap: "wrap",
					alignContent: "flex-start",
				}}
				action={
					<span
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
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
										<Discount color="error" />
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
										<EditCalendar color="info" />
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

			<CardContent
				sx={{
					minHeight: "190px",
					height: "250px",
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

			{/* <CardContent sx={{ minHeight: "190px" }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					{descProdSmall}
				</Typography>
			</CardContent> */}

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
						onClick={() => callProductPage(product.id)}
						variant="contained"
						style={{ width: 240 }}
					>
						<StorefrontIcon style={{ marginRight: 20 }} />
						ACQUISTA
					</Button>
				</div>
			</div>

			{/* <Typography
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
			</Typography> */}
		</Card>
	);
};

export default ProductCard;
