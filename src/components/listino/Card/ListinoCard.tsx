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
import CardHeadTitle from "./CardHeadTitle";
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
} from "src/components/CommonTypesInterfaces";
import CardContentData from "./CardContentData";
import { StepListino, StepListinoData } from "src/store/interfaces";
import { setStepListino } from "src/store/actions";

const ListinoCard = ({
	itemsCard,
	stepSelectOby,
	setStepSelectOby,
}: ListinoCardProps) => {
	const [discountedPrice, setDiscountedPrice] = React.useState<null | number>(
		null
	);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const stateStepListino = useSelector(
		(state: StoreState) => state.stepListino
	);
	const dispatch = useDispatch();

	React.useEffect(() => {
		//console.log("@+@+@+@+@++++ useEffect ListinoCard - itemsCard", itemsCard);
	}, []);

	const handleClick = (itemData: any) => {
		//console.log("@+<>@+<>@+handleClick<>@<>+@+<>+<>+<>+ ListinoCard - itemsCard",itemData);

		const step = itemsCard;

		const newStep: StepListinoData = {
			stepId: step?.stepId,
			tipo: step?.tipo,
			codice: step?.codice,
			descrizione: step?.descrizione,
			onPrevStep: step?.onPrevStep,
			onNextStep: step?.onNextStep,
			aPromozioni: step?.aPromozioni,
			aConvenzioni: step?.aConvenzioni,
			aSospensioni: step?.aSospensioni,
			aSceltaOrario: step?.aSceltaOrario,
			numeroSedi: step?.numeroSedi,
			numeroAree: step?.numeroAree,
			numeroAbbonamenti: step?.numeroAbbonamenti,
			abbonamento: {
				CODABB: step?.abbonamento?.CODABB,
				DESABB: step?.abbonamento?.DESABB,
				IMPORTO: step?.abbonamento?.IMPORTO,
				PROMO: step?.abbonamento?.PROMO,
				IMPORTOS: step?.abbonamento?.IMPORTOS,
				SCELTAF: step?.abbonamento?.SCELTAF,
				NOSOSP: step?.abbonamento?.NOSOSP,
				DATAINI: step?.abbonamento?.DATAINI,
				PERIODOATT: step?.abbonamento?.PERIODOATT,
				FREQUENZAS: step?.abbonamento?.FREQUENZAS,
			},
		};

		const updatedStepListino = [
			...stateStepListino.stepListino,
			newStep as StepListinoData,
		];

		dispatch(setStepListino({ stepListino: updatedStepListino } as any));
		console.log(
			"@@@@@@@@@@@@@@@@@@@@@@@ CHECK STATUS ---- >>>>>>>> stateStepListino: ",
			stateStepListino
		);
		if (newStep.codice !== null) {
			let newStepId = newStep.stepId;
			// switch (newStep.tipo) {
			// 	case "GRUPPO":
			// 		if (newStep.onNextStep === true) {
			// 			//vado a sede
			// 			newStepId += 1;
			// 		} else {
			// 			//salto la sede
			// 			newStepId += 2;
			// 		}
			// 		break;
			// 	case "SEDE":
			// 		break;
			// 	case "AREA":
			// 		break;

			// 	default:
			// 		break;
			// }
			if (newStep.onNextStep === true) {
				//vado a sede
				newStepId += 1;
			} else {
				//salto la sede
				newStepId += 2;
			}
			setStepSelectOby({
				stepId: newStepId,
				endStep: 1,
				codice: newStep.codice,
			});
		}

		// stepSelectOby.codice !== null
		// 	? setStepSelectOby((prevStepSelectOby) => ({
		// 			...prevStepSelectOby,
		// 			codice: itemsCard.codice,
		// 			stepId:
		// 				itemsCard.tipo === "GRUPPO"
		// 					? itemsCard.aSede === true
		// 						? prevStepSelectOby.stepId + 1 //vado a sede
		// 						: prevStepSelectOby.stepId + 2 //salto la sede
		// 					: itemsCard.tipo === "SEDE"
		// 					? itemsCard.aArea === true
		// 						? prevStepSelectOby.stepId + 1 //vado a area
		// 						: prevStepSelectOby.stepId + 2 //salto l'Area
		// 					: itemsCard.tipo === "AREA"
		// 					? itemsCard.aAbbonamento === true
		// 						? prevStepSelectOby.stepId + 1 //vado a l'abbonamento
		// 						: 0 //ERRORE NON HO ABBONAMENTO ???
		// 					: 0,
		// 	  }))
		// 	: "NESSUN CODICE";
	};

	// 	stepSelectOby.codice !== null
	// 		? setStepSelectOby((prevStepSelectOby) => ({
	// 				...prevStepSelectOby,
	// 				codice: itemsCard.codice,
	// 				stepId:
	// 					itemsCard.tipo === "GRUPPO"
	// 						? itemsCard.aSede === true
	// 							? prevStepSelectOby.stepId + 1 //vado a sede
	// 							: prevStepSelectOby.stepId + 2 //salto la sede
	// 						: itemsCard.tipo === "SEDE"
	// 						? itemsCard.aArea === true
	// 							? prevStepSelectOby.stepId + 1 //vado a area
	// 							: prevStepSelectOby.stepId + 2 //salto l'Area
	// 						: itemsCard.tipo === "AREA"
	// 						? itemsCard.aAbbonamento === true
	// 							? prevStepSelectOby.stepId + 1 //vado a l'abbonamento
	// 							: 0 //ERRORE NON HO ABBONAMENTO ???
	// 						: 0,
	// 		  }))
	// 		: "NESSUN CODICE";
	// };

	return (
		<Card
			sx={{
				maxWidth: isMobile ? "290px" : "350px",
				width: isMobile ? "290px" : "350px",
				marginTop: "25px",
				marginBottom: "25px",
				//cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
			}}
			//onClick={() => callProductPage(product.id)}
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
					<Button
						onClick={() => {
							handleClick(itemsCard);
						}}
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
