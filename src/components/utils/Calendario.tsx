// Calendario.tsx
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/it";
import isoWeek from "dayjs/plugin/isoWeek";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import myIcons from "src/theme/IconsDefine";
import { Date } from "../CommonTypesInterfaces";

dayjs.extend(isoWeek);

interface CalendarioProps {
	onClose: (value: any) => void;
	open: boolean;
	minDate: Date;
	maxDate: Date;
}

const Calendario: React.FC<CalendarioProps> = ({
	onClose,
	open,
	minDate,
	maxDate,
}) => {
	const handleClose = (newValue: any) => {
		onClose(newValue);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
		null
	);

	// const minDate = dayjs("2024-02-10");
	// const maxDate = dayjs("2024-02-18");

	const handleDateChange = (date: any) => {
		const dayjsDate = dayjs(date);
		setSelectedDate(dayjsDate);
	};

	const handleConfirm = () => {
		if (selectedDate) {
			const formattedDate = dayjs(selectedDate)
				.locale("it")
				.format("DD-MM-YYYY");
			console.log("@@@ --- handleConfirm", handleConfirm);
			setSelectedDate(null);
			handleClose(formattedDate);
		}
	};

	return (
		<Dialog open={open}>
			<DialogTitle>Seleziona una data</DialogTitle>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale="it"
			>
				<StaticDatePicker
					displayStaticWrapperAs="desktop"
					onChange={(newValue) => handleDateChange(newValue)}
					minDate={minDate}
					maxDate={maxDate}
					// renderInput={(startProps, endProps) => (
					// 	<>
					// 		{startProps.renderInput({ })}
					// 		{" - "}
					// 		{endProps.renderInput({ })}
					// 	</>
					// )}
				/>
			</LocalizationProvider>
			<DialogActions>
				<Button
					onClick={() => {
						handleConfirm();
					}}
					variant="contained"
					style={{ width: "100%" }}
				>
					{/* <div style={{ display: "flex", alignItems: "center" }}> */}
					<div>
						{!isMobile && (
							<Box sx={{ color: "#dfdfdf" }}>
								{React.cloneElement(myIcons.CheckCircleOutlineIcon, {
									color: "#dfdfdf",
								})}
							</Box>
						)}
						Conferma
					</div>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Calendario;
