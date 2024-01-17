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
import {
	Discount,
	EditCalendar,
	Handshake,
	ArrowRight,
	Place,
	AutoAwesomeMosaic,
	MotionPhotosAuto,
	Storefront,
} from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setActualProduct, setCart } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import renderPrice from "src/components/utils/renderPrice";
import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Tooltip,
	useMediaQuery,
} from "@mui/material";
import FormatString from "src/components/utils/FormatString";
import CardHeadTitle from "src/components/listino/card/CardHeadTitle";
import {
	Listino,
	Cart,
	CartProdotto,
	StoreState,
	StoreAction,
	Gruppo,
	Area,
	Sede,
	Abbonamento,
	ListinoCardProps,
	itemsCard,
	Prodotto,
	ActualProduct,
} from "src/components/CommonTypesInterfaces";
import CardContentData from "src/components/listino/card/CardContentData";
import { StepListino, StepListinoData } from "src/store/interfaces";
import { setStepListino } from "src/store/actions";
import trovaCodice from "../utils/trovaCodice";
import { red } from "@mui/material/colors";

const ListinoCard = ({
	itemsCard,
	stepSelectOby,
	setStepSelectOby,
}: ListinoCardProps) => {
	// const [prezzoScontato, setPrezzoScontato] = React.useState<null | number>(
	// 	null
	// );
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const listinoState = useSelector((state: StoreState) => state.listino);
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);

	const prodotto: Prodotto | null = useSelector(
		(state: StoreState) => state.actualProduct
	);

	const removeFromCart = (
		prodotto: Prodotto,
		cart: Cart,
		dispatch: Dispatch
	): void => {
		const user = cart.at(0);
		console.log("removeFromCart");
		let filteredCart = null;

		if (user) {
			filteredCart = user.cart.filter((inCartProdotto) => {
				if (inCartProdotto?.codice !== prodotto?.codice) {
					return inCartProdotto;
				}
			});
		} else {
			return;
		}

		dispatch(setCart([{ userId: user.userId, cart: filteredCart }]));
	};

	const addToCart = (prodotto: Prodotto): void => {
		const configurableProdotto: CartProdotto = {
			...prodotto,
			configuration: null,
		};

		let user = cart.at(0);
		console.log("addToCart");
		user
			? dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [...user.cart, configurableProdotto],
						},
					])
			  )
			: dispatch(
					setCart([
						{
							userId: authUser?.USERID ?? "null",
							cart: [configurableProdotto],
						},
					])
			  );
	};

	const isInCart = (prodotto: Prodotto): boolean => {
		let user = cart.at(0);

		console.log("^^^^^^^^^^^^^^^^^^^^^^^^ isInCart user:", user);
		if (!user) {
			return false;
		}

		let filteredCart = user.cart.filter((inCartProdotto) => {
			console.log(
				"^^^^^^^^^^^^^^^^^^^^^^^^ isInCart filteredCart inCartProdotto:",
				inCartProdotto
			);
			if (inCartProdotto?.codice === prodotto?.codice) {
				return inCartProdotto;
			}
		});

		if (filteredCart.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	//dispatch(setActualProduct(listProduct));

	//const [isInCartBtnStyle, setIsInCartBtnStyle] = React.useState("#127bd1");

	const handleClickBtnCart = (itemsCard: itemsCard) => {
		console.log("handleClickBtnCart");
		const actualProduct: ActualProduct = itemsCard as unknown as ActualProduct;
		if (actualProduct?.codice !== null) {
			if (isInCart(actualProduct)) {
				removeFromCart(actualProduct, cart, dispatch);
				//setIsInCartBtnStyle("#127bd1");
			} else {
				addToCart(actualProduct);
				//setIsInCartBtnStyle("red");
			}
		}
	};

	React.useEffect(() => {
		//console.log("@+@+@+@+@++++ useEffect ListinoCard - itemsCard", itemsCard);
	}, []);

	const handleClick = (itemData: itemsCard) => {
		const step = itemsCard;
		if (step?.codice !== null) {
			let newStepId = (step.stepId += 1);

			setStepSelectOby((prevStepSelectOby) => ({
				...prevStepSelectOby,
				stepId: newStepId,
				endStep: 1,
				codice: step?.codice,
				isClickNext: true,
			}));
		}
	};

	return (
		<Card
			sx={{
				maxWidth: isMobile ? "290px" : "350px",
				width: isMobile ? "290px" : "350px",
				marginTop: "25px",
				marginBottom: "25px",
				//cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
			}}
			//onClick={() => callProductPage(product.codice)}
		>
			<CardHeader
				sx={{
					minHeight: "70px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "stretch",
					padding: "16px",
				}}
				title={<CardHeadTitle itemsCard={itemsCard} />}
			></CardHeader>

			{/* {itemsCard.tipo !== "GRUPPO" ? ( // NON E' UN GRUPPO */}
			<CardContent
				sx={{
					marginTop: "-10px",
					minHeight: "300px",
					backgroundColor: (theme) =>
						theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
					display: "flex",
					flexDirection: "column",
					flexWrap: "nowrap",
					alignItems: "flex-start",
					justifyContent: "space-between",
					// margin: "10px",
				}}
			>
				<CardContentData itemsCard={itemsCard} />
			</CardContent>

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
					{/* {console.log(
						"@@@@@ IMPORTO SCONTATO:",
						itemsCard?.abbonamento?.IMPORTOS
					)} */}
					{itemsCard?.abbonamento?.IMPORTOS !== "0.00" &&
					itemsCard?.abbonamento?.IMPORTOS !== "0" ? (
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
								{itemsCard.tipo === "ABBONAMENTO"
									? itemsCard?.abbonamento?.IMPORTO
										? renderPrice(
												itemsCard?.abbonamento?.IMPORTO
													? itemsCard.abbonamento?.IMPORTO
													: 0.0
										  ) + "€"
										: ""
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
								{itemsCard.tipo === "ABBONAMENTO"
									? itemsCard?.abbonamento?.IMPORTOS
										? renderPrice(
												itemsCard?.abbonamento?.IMPORTOS
													? itemsCard?.abbonamento?.IMPORTOS
													: 0.0
										  ) + "€"
										: ""
									: ""}
							</Typography>
						</span>
					) : (
						<Typography
							variant="h5"
							textAlign={"center"}
							padding={"1rem"}
						>
							{itemsCard.tipo === "ABBONAMENTO"
								? itemsCard?.abbonamento?.IMPORTO
									? renderPrice(
											itemsCard?.abbonamento?.IMPORTO
												? itemsCard.abbonamento?.IMPORTO
												: 0.0
									  ) + "€"
									: ""
								: ""}
						</Typography>
					)}
				</CardActions>

				{/* STEPPER */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "30px",
						bottom: 0,
						position: "relative",
					}}
				>
					{itemsCard?.tipo === "ABBONAMENTO" ? (
						isInCart(itemsCard) ? (
							<Button
								style={{
									width: "100%",
									backgroundColor: "red",
								}}
								onClick={() => {
									handleClickBtnCart(itemsCard);
								}}
								variant="contained"
							>
								<ShoppingCartIcon style={{ marginRight: 20 }} />
								Rimuovi dal Carrello
							</Button>
						) : (
							<Button
								style={{
									width: "100%",
									backgroundColor: "#127bd1",
								}}
								onClick={() => {
									handleClickBtnCart(itemsCard);
								}}
								variant="contained"
							>
								<ShoppingCartIcon style={{ marginRight: 20 }} />
								Aggiungi Al Carrello
							</Button>
						)
					) : (
						<Button
							onClick={() => {
								handleClick(itemsCard);
							}}
							variant="contained"
							style={{ width: 240 }}
						>
							SELEZIONA
						</Button>
					)}
				</div>
			</div>
		</Card>
	);
};

export default ListinoCard;
