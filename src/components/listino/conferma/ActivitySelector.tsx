// components/ActivitySelector.tsx
import {
	Autocomplete,
	TextField,
	List,
	ListItem,
	Checkbox,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import {
	Activity,
	ActivitySelected,
	ORARIO,
} from "src/components/CommonTypesInterfaces";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";

interface ActivitySelectorProps {
	activities: Activity[];
	handleActivitySelection: (activity: Activity | null) => void;
	handleClear: () => void;
	islimiteAttivitaSuperato: boolean;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
	activities,
	handleActivitySelection,
	handleClear, // Passa la funzione di gestione dell'evento clear
	islimiteAttivitaSuperato,
}) => {
	const { showAlert } = useAlertMe();

	React.useEffect(() => {
		if (islimiteAttivitaSuperato) {
			const msgErroreLimite =
				"E' stato raggiunto il limite massimo selezionabile delle attività per questo abbonamento";
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>{msgErroreLimite}</strong>
					</h3>
				</React.Fragment>
			);
			showAlert("filled", "warning", "ATTENZIONE!", textAlert, true);
		}
	}, [islimiteAttivitaSuperato]);

	// const customClearButton = (
	// 	<div onClick={() => console.log("Custom clear button clicked")}>
	// 		Personalizzato
	// 	</div>
	// );
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Autocomplete
			sx={{
				maxWidth: "98%",
				marginBottom: "20px",
				"& .MuiAutocomplete-inputRoot, & .MuiAutocomplete-option": {
					fontSize: isMobile ? "small !important" : "normal",
				},
			}}
			options={activities}
			getOptionLabel={(activity) => activity.DESATT}
			onChange={(_, value) => handleActivitySelection(value)}
			onInputChange={(_, value, reason) => {
				if (reason === "clear") {
					handleClear();
				}
			}}
			clearText="Cancella gli orari di questa attività"
			renderInput={(params) => (
				<TextField
					{...params}
					label="Seleziona un'attività"
					variant="outlined"
				/>
			)}
		/>
	);
};

interface TimeListProps {
	attivitaSelezionata: ActivitySelected;
	orariSelezionati: string[];
	handleTimeSelection: (timeId: ORARIO) => void;
}

const TimeList: React.FC<TimeListProps> = ({
	attivitaSelezionata,
	orariSelezionati,
	handleTimeSelection,
}) => {
	console.log("orariSelezionati: ", orariSelezionati);
	console.log("attivitaSelezionata: ", attivitaSelezionata);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	console.log(
		"attivitaSelezionata.ORARI.ORARIO[0]: ",
		attivitaSelezionata.ORARI.ORARIO[0]
	);
	{
		if (attivitaSelezionata.ORARI.ORARIO[0] !== undefined) {
			return (
				<div style={{ overflowX: "auto" }}>
					<table style={{ width: "100%" }}>
						<thead>
							<tr>
								<th
									style={{
										width: "33%",
										fontSize: isMobile ? "small" : "normal",
									}}
								>
									Giorno/Orario
								</th>
								<th
									style={{
										width: "33%",
										fontSize: isMobile ? "small" : "normal",
									}}
								>
									Livello
								</th>
								<th
									style={{
										width: "33%",
										fontSize: isMobile ? "small" : "normal",
									}}
								>
									Fascia d'età
								</th>
							</tr>
						</thead>
						<tbody>
							{attivitaSelezionata.ORARI.ORARIO?.map((ORARIO: ORARIO) => (
								<tr key={ORARIO.IDORARIO}>
									<td style={{ width: "33%" }}>
										<ListItem>
											<Checkbox
												checked={
													orariSelezionati?.includes(ORARIO.IDORARIO) || false
												}
												onChange={() => handleTimeSelection(ORARIO)}
											/>
											<Typography
												style={{ fontSize: isMobile ? "small" : "normal" }}
											>{`${ORARIO.GIORNO} ${ORARIO.ORAINIZIO}-${ORARIO.ORAFINE}`}</Typography>
										</ListItem>
									</td>
									<td style={{ width: "33%" }}>
										<ListItem>
											<Typography
												style={{ fontSize: isMobile ? "small" : "normal" }}
											>{`${
												ORARIO.LIVELLO ? ORARIO.LIVELLO : "n.i."
											}`}</Typography>
										</ListItem>
									</td>
									<td style={{ width: "33%" }}>
										<ListItem>
											<Typography
												style={{ fontSize: isMobile ? "small" : "normal" }}
											>{`${
												ORARIO.FASCIA ? ORARIO.FASCIA : "n.i."
											}`}</Typography>
										</ListItem>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		} else {
			return (
				<div style={{ overflowX: "auto" }}>
					<Typography
						style={{ fontSize: isMobile ? "small" : "normal" }}
					>{`NESSUN ORARIO DISPONIBILE`}</Typography>
				</div>
			);
		}
	}
};

export { ActivitySelector, TimeList };
