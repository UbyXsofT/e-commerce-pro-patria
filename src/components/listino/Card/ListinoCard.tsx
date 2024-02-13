import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import renderPrice from "src/components/utils/renderPrice";
import { Box, Button, Divider, IconButton, useMediaQuery } from "@mui/material";
import CardHeadTitle from "src/components/listino/card/CardHeadTitle";
import {
	StoreState,
	ListinoCardProps,
	itemsCard,
	ActualProduct,
} from "src/components/CommonTypesInterfaces";
import CardContentData from "src/components/listino/card/CardContentData";
import CardActionsData from "src/components/listino/card/CardActionsData";
import {
	addToCart,
	isInCart,
	removeFromCart,
} from "src/components/listino/utils/functionsCart";
import myIcons from "src/theme/IconsDefine";
import { color } from "@mui/system";
import Calendario from "src/components/utils/Calendario";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/it";
import isoWeek from "dayjs/plugin/isoWeek";
import { Dialog, DialogTitle } from "@mui/material";

//dayjs.extend(isoWeek);

const ListinoCard = ({
	itemsCard,
	setStepSelectOby,
	stepSelectOby,
}: ListinoCardProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);
	// //-- calendario --//
	// const [openCalendario, setOpenCalendario] = React.useState(false);
	// const [selectedValueCalendario, setSelectedValueCalendario] = React.useState(
	// 	dayjs("1970-01-01").locale("it").format("DD-MM-YYYY")
	// );

	// const handleClickOpenCalendario = () => {
	// 	setOpenCalendario(true);
	// };

	// const handleCloseCalendario = (value: any) => {
	// 	console.log("@@@ --- handleCloseCalendario", value);
	// 	setOpenCalendario(false);
	// 	setSelectedValueCalendario(value);
	// };

	let actualProduct: ActualProduct = {
		codice: itemsCard.codice,
		nome: itemsCard.descrizione,
		prezzo: Number(itemsCard.abbonamento.IMPORTO),
		prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
		immagine: [],
		info: "informazioni",
		quantity: 1,
	};

	// const handleClickConferma = (itemsCard: itemsCard) => {
	// 	console.log("handleClickConferma");
	// 	//(tag SCELTAF>0 e FREQUENZAS>0)
	// 	if (
	// 		Number(itemsCard.abbonamento.SCELTAF) > 0 &&
	// 		Number(itemsCard.abbonamento.FREQUENZAS) > 0
	// 	) {
	// 		//
	// 		console.log("VISUALIZZARE IL COMPONENTE PER SCEGLIERE GLI ORARI");
	// 	} else {
	// 		console.log("ANDIAMO AL RIEPILOGO");
	// 	}
	// };

	const handleClickBtnCart = (itemsCard: itemsCard) => {
		console.log("handleClickBtnCart");
		actualProduct = {
			codice: itemsCard.codice,
			nome: itemsCard.descrizione,
			prezzo: Number(itemsCard.abbonamento.IMPORTO),
			prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
			immagine: [],
			info: "informazioni",
			quantity: 1,
		}; //itemsCard as unknown as ActualProduct;
		if (actualProduct?.codice !== null) {
			if (isInCart(actualProduct, cart, dispatch)) {
				removeFromCart(actualProduct, cart, dispatch);
			} else {
				addToCart(actualProduct, cart, dispatch, authUser);
			}
		}
	};

	React.useEffect(() => {
		console.log("@+@+@+@+@++++ useEffect ListinoCard - itemsCard", itemsCard);
		// const formattedDate = dayjs().locale("it").format("DD-MM-YYYY");
		// setSelectedValueCalendario(formattedDate);
		actualProduct = {
			codice: itemsCard.codice,
			nome: itemsCard.descrizione,
			prezzo: Number(itemsCard.abbonamento.IMPORTO),
			prezzoScontato: Number(itemsCard.abbonamento.IMPORTOS),
			immagine: [],
			info: "informazioni",
			quantity: 1,
		}; //itemsCard as unknown as ActualProduct;
	}, []);

	// const handleClick = (itemData: itemsCard) => {
	// 	const step = itemsCard;
	// 	if (step?.codice !== null) {
	// 		let newStepId = (step.stepId += 1);

	// 		setStepSelectOby((prevStepSelectOby) => ({
	// 			...prevStepSelectOby,
	// 			stepId: newStepId,
	// 			endStep: 1,
	// 			codice: step?.codice,
	// 			isClickNext: true,
	// 		}));
	// 	}
	// };

	return (
		<>
			{/* <Calendario
				open={openCalendario}
				onClose={handleCloseCalendario}
				minDate={dayjs(itemsCard?.abbonamento?.DATAINI)}
				maxDate={dayjs(itemsCard?.abbonamento?.DATAINI).add(
					itemsCard?.abbonamento?.PERIODOATT,
					"day"
				)}
			/> */}

			<Card
				sx={{
					maxWidth: isMobile ? "290px" : "350px",
					width: isMobile ? "290px" : "350px",
					marginTop: "25px",
					marginBottom: "25px",
					height: "auto",
					//cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
				}}
				//onClick={() => callProductPage(product.codice)}
			>
				<CardHeader
					sx={{
						minheight: "70px",
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
						minHeight: "120px",
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

				<CardActionsData
					itemsCard={itemsCard}
					setStepSelectOby={setStepSelectOby}
					stepSelectOby={stepSelectOby}
				/>
			</Card>
		</>
	);
};

export default ListinoCard;
