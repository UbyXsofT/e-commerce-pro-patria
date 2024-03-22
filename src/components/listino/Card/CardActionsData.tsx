import Place from "@mui/icons-material/Place";
import {
	Box,
	Button,
	CardActions,
	Divider,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import {
	ActualProduct,
	itemsCard,
	ListinoCardProps,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import myIcons from "src/theme/IconsDefine";
import renderPrice from "src/components/utils/renderPrice";
import Calendario from "src/components/utils/Calendario";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/it";
import isoWeek from "dayjs/plugin/isoWeek";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	isInCart,
	removeFromCart,
} from "src/components/listino/utils/functionsCart";
import { Router, useRouter } from "next/router";
dayjs.extend(isoWeek);

const CardActionsData = ({
	itemsCard,
	setStepSelectOby,
	stepSelectOby,
}: ListinoCardProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const router = useRouter();

	//-- calendario --//
	const [openCalendario, setOpenCalendario] = React.useState(false);
	const [selectedValueCalendario, setSelectedValueCalendario] = React.useState(
		dayjs("1970-01-01").locale("it").format("DD-MM-YYYY")
	);

	const handleClickOpenCalendario = () => {
		setOpenCalendario(true);
	};

	const handleCloseCalendario = (value: any) => {
		setOpenCalendario(false);
		setSelectedValueCalendario(value);
	};

	const handleClick = (itemData: itemsCard) => {
		const step = itemsCard;

		console.log("---- >>  STEP: ", step);

		if (step?.codice !== null) {
			//console.log("step?.codice", step?.codice);
			let newStepId = (step.stepId += 1);
			//console.log("newStepId", newStepId);
			setStepSelectOby((prevStepSelectOby) => ({
				...prevStepSelectOby,
				stepId: newStepId,
				endStep: 1,
				codice: step?.codice,
				isClickNext: true,
			}));
		}
	};

	const handleClickConferma = (itemsCard: itemsCard) => {
		console.log("handleClickConferma");
		console.log("CHIAMO IL SERVIZIO PER LA CONFERMA");

		//TODO SE ESITO E' POSITIVO PROSEGUO NELLA PAGINA SUCCESSIVA
		//ATRIMENTI VISUALIZZO IL MESSAGGIO DI ERRORE DI RITORNO DALLA CONFERMA

		const items = itemsCard as itemsCard;
		items.abbonamento.DATAINI =
			selectedValueCalendario.toString() === "01-01-1970"
				? dayjs(itemsCard?.abbonamento?.DATAINI)
						.locale("it")
						.format("DD-MM-YYYY")
				: selectedValueCalendario.toString();
		itemsCard = items;
		//console.log("@@@ DATA INI itemsCard: ", itemsCard);

		router.replace({
			pathname: "/auth/acquista/conferma",
			query: { itemsCard: JSON.stringify(itemsCard) },
		});
	};

	return (
		<>
			<Calendario
				open={openCalendario}
				onClose={handleCloseCalendario}
				minDate={dayjs(itemsCard?.abbonamento?.DATAINI)}
				maxDate={dayjs(itemsCard?.abbonamento?.DATAINI).add(
					itemsCard?.abbonamento?.PERIODOATT,
					"day"
				)}
			/>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "nowrap",
					// alignItems: "stretch",
					padding: "10px",
				}}
			>
				<CardActions disableSpacing>
					{itemsCard?.abbonamento?.IMPORTOS !== "0.00" &&
					itemsCard?.abbonamento?.IMPORTOS !== "0" ? (
						<span
							style={{
								display: "grid",
								padding: "2px",
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
							padding={"2px"}
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
						marginBottom: "10px",
						marginTop: "20px",
					}}
				>
					{itemsCard?.tipo === "ABBONAMENTO" ? (
						Number(itemsCard?.abbonamento?.PERIODOATT) > 0 ? ( //BISOGNA INSERIRE LA DATA DI ATTIVAZIONE
							<>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",

										height: "70px",
										// backgroundColor: (theme) =>
										// 	theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
										flexWrap: "nowrap",
										justifyContent: "center",
										alignItems: "center",
										marginBottom: "40px",
									}}
								>
									<Typography
										variant="subtitle1"
										textAlign={"center"}
										color={(theme) =>
											theme.palette.mode === "light" ? "#323232" : "#dfdfdf"
										}
									>
										Data inizio abbonamento:
									</Typography>
									<Typography
										variant="body1"
										textAlign={"center"}
										color={(theme) => theme.palette.success.main}
									>
										{selectedValueCalendario.toString() === "01-01-1970"
											? dayjs(itemsCard?.abbonamento?.DATAINI)
													.locale("it")
													.format("DD-MM-YYYY")
											: selectedValueCalendario.toString()}
									</Typography>

									{itemsCard?.abbonamento?.DATAFIN !== undefined ? (
										<>
											<Typography
												variant="subtitle1"
												textAlign={"center"}
												color={(theme) =>
													theme.palette.mode === "light" ? "#323232" : "#dfdfdf"
												}
											>
												Data fine abbonamento:
											</Typography>
											<Typography
												variant="body1"
												textAlign={"center"}
												color={(theme) => theme.palette.warning.main}
											>
												{dayjs(itemsCard.abbonamento.DATAFIN)
													.locale("it")
													.format("DD-MM-YYYY")}
											</Typography>
										</>
									) : (
										<></>
									)}
								</Box>
								<div
									style={{
										display: "flex",
									}}
								>
									<Button
										style={{
											width: "100%",
											backgroundColor: theme.palette.warning.main,
											marginRight: "5px",
										}}
										onClick={() => {
											handleClickOpenCalendario();
											//handleClickBtnCart(itemsCard);
										}}
										variant="contained"
									>
										<div>
											{/* {!isMobile && (
												<Box sx={{ color: "#dfdfdf" }}>
													{React.cloneElement(myIcons.DataCalendarIcon, {
														color: "#dfdfdf",
													})}
												</Box>
											)} */}
											SCEGLI DATA INIZIO
										</div>
									</Button>
									<Box sx={{ mb: "5px", mt: "5px" }} />
									<Button
										style={{
											width: "100%",
											backgroundColor: theme.palette.primary.main,
										}}
										onClick={() => {
											handleClickConferma(itemsCard);
											//handleClickBtnCart(itemsCard);
										}}
										variant="contained"
									>
										<div>
											{!isMobile && (
												<Box sx={{ color: "#dfdfdf" }}>
													{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
														color: "#dfdfdf",
													})}
												</Box>
											)}
											CONFERMA
										</div>
									</Button>
								</div>
							</>
						) : (
							<>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										height: "70px",
										flexWrap: "nowrap",
										justifyContent: "center",
										alignItems: "center",
										marginBottom: "40px",
									}}
								>
									<Typography
										variant="subtitle1"
										textAlign={"center"}
										color={(theme) =>
											theme.palette.mode === "light" ? "#323232" : "#dfdfdf"
										}
									>
										Data inizio abbonamento:
									</Typography>
									<Typography
										variant="body1"
										textAlign={"center"}
										color={(theme) => theme.palette.success.main}
									>
										{dayjs(itemsCard.abbonamento.DATAINI)
											.locale("it")
											.format("DD-MM-YYYY")}
									</Typography>
									{itemsCard?.abbonamento?.DATAFIN !== undefined ? (
										<>
											<Typography
												variant="subtitle1"
												textAlign={"center"}
												color={(theme) =>
													theme.palette.mode === "light" ? "#323232" : "#dfdfdf"
												}
											>
												Data fine abbonamento:
											</Typography>
											<Typography
												variant="body1"
												textAlign={"center"}
												color={(theme) => theme.palette.warning.main}
											>
												{dayjs(itemsCard.abbonamento.DATAFIN)
													.locale("it")
													.format("DD-MM-YYYY")}
											</Typography>
										</>
									) : (
										<></>
									)}
								</Box>
								<Button
									style={{
										width: "100%",
										backgroundColor: theme.palette.primary.main,
									}}
									onClick={() => {
										//handleClickBtnCart(itemsCard);
										handleClickConferma(itemsCard);
									}}
									variant="contained"
								>
									<div>
										{!isMobile && (
											<Box sx={{ color: "#dfdfdf" }}>
												{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
													color: "#dfdfdf",
												})}
											</Box>
										)}
										CONFERMA
									</div>
								</Button>
							</>
						)
					) : (
						//NON E' ABBONAMENTO

						<Button
							onClick={() => handleClick(itemsCard)}
							variant="contained"
							style={{ width: "100%" }}
						>
							<div>
								{!isMobile && (
									<Box sx={{ color: "#dfdfdf" }}>
										{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
											color: "#dfdfdf",
										})}
									</Box>
								)}
								SELEZIONA
							</div>
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default CardActionsData;
