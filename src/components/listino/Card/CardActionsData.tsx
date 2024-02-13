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
dayjs.extend(isoWeek);

const handleClickConferma = (itemsCard: itemsCard) => {
	console.log("handleClickConferma");
	//(tag SCELTAF>0 e FREQUENZAS>0)
	if (
		Number(itemsCard.abbonamento.SCELTAF) > 0 &&
		Number(itemsCard.abbonamento.FREQUENZAS) > 0
	) {
		//
		console.log("VISUALIZZARE IL COMPONENTE PER SCEGLIERE GLI ORARI");
	} else {
		console.log("ANDIAMO AL RIEPILOGO");
	}
};

const CardActionsData = ({
	itemsCard,
	setStepSelectOby,
	stepSelectOby,
}: ListinoCardProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const dispatch = useDispatch();
	const authUser = useSelector((state: StoreState) => state.authUser);
	const cart = useSelector((state: StoreState) => state.cart);
	//-- calendario --//
	const [openCalendario, setOpenCalendario] = React.useState(false);
	const [selectedValueCalendario, setSelectedValueCalendario] = React.useState(
		dayjs("1970-01-01").locale("it").format("DD-MM-YYYY")
	);

	const handleClickOpenCalendario = () => {
		setOpenCalendario(true);
	};

	const handleCloseCalendario = (value: any) => {
		console.log("@@@ --- handleCloseCalendario", value);
		setOpenCalendario(false);
		setSelectedValueCalendario(value);
	};

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
					}}
				>
					{itemsCard?.tipo === "ABBONAMENTO" ? (
						Number(itemsCard?.abbonamento?.PERIODOATT) > 0 ? ( //BISOGNA INSERIRE LA DATA DI ATTIVAZIONE
							<>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										marginBottom: "20px",
										height: "70px",
										// backgroundColor: (theme) =>
										// 	theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
										flexWrap: "nowrap",
										justifyContent: "center",
										alignItems: "center",
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
										color={(theme) => theme.palette.warning.main}
									>
										{selectedValueCalendario.toString() === "01-01-1970"
											? dayjs(itemsCard?.abbonamento?.DATAINI)
													.locale("it")
													.format("DD-MM-YYYY")
											: selectedValueCalendario.toString()}
										{/* 
                {dayjs(itemsCard?.abbonamento?.DATAINI)
                  .locale("it")
                  .format("DD-MM-YYYY")} */}
									</Typography>
								</Box>
								<div
									style={{
										display: "flex",
										// flexDirection: "column",
									}}
								>
									<Button
										style={{
											width: "100%",
											backgroundColor: theme.palette.warning.main,
											marginRight: "5px",
											height: "60px",
										}}
										onClick={() => {
											handleClickOpenCalendario();
											//handleClickBtnCart(itemsCard);
										}}
										variant="contained"
									>
										{isMobile ? (
											<></>
										) : (
											<IconButton sx={{ color: "#dfdfdf" }}>
												{React.cloneElement(myIcons.OrarioAtvIcon, {
													color: "#dfdfdf",
												})}
											</IconButton>
										)}
										SCEGLI DATA INIZIO
									</Button>
									<Box sx={{ mb: "5px", mt: "5px" }} />
									<Button
										style={{
											width: "100%",
											backgroundColor: theme.palette.primary.main,
											height: "60px",
										}}
										onClick={() => {
											handleClickConferma(itemsCard);
											//handleClickBtnCart(itemsCard);
										}}
										variant="contained"
									>
										{isMobile ? (
											<></>
										) : (
											<IconButton sx={{ color: "#dfdfdf" }}>
												{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
													color: "#dfdfdf",
												})}
											</IconButton>
										)}
										CONFERMA
									</Button>
								</div>
							</>
						) : (
							<>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										marginBottom: "20px",
										height: "70px",
										// backgroundColor: (theme) =>
										// 	theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
										flexWrap: "nowrap",
										justifyContent: "center",
										alignItems: "center",
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
										color={(theme) => theme.palette.warning.main}
									>
										{dayjs(itemsCard.abbonamento.DATAINI)
											.locale("it")
											.format("DD-MM-YYYY")}
									</Typography>
								</Box>
								<Button
									style={{
										width: "100%",
										backgroundColor: theme.palette.primary.main,
										height: "60px",
									}}
									onClick={() => {
										//handleClickBtnCart(itemsCard);
										handleClickConferma(itemsCard);
									}}
									variant="contained"
								>
									{isMobile ? (
										<></>
									) : (
										<IconButton sx={{ color: "#dfdfdf" }}>
											{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
												color: "#dfdfdf",
											})}
										</IconButton>
									)}
									CONFERMA
								</Button>
							</>
						)
					) : (
						//NON E' ABBONAMENTO
						<Button
							onClick={() => {
								handleClick(itemsCard);
							}}
							variant="contained"
							style={{ width: "100%" }}
						>
							{isMobile ? (
								<></>
							) : (
								<IconButton sx={{ color: "#dfdfdf" }}>
									{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
										color: "#dfdfdf",
									})}
								</IconButton>
							)}
							SELEZIONA
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default CardActionsData;
