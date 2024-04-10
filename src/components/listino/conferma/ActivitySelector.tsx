// components/ActivitySelector.tsx
import {
	Autocomplete,
	TextField,
	List,
	ListItem,
	Checkbox,
	Typography,
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

	return (
		<Autocomplete
			options={activities}
			//disabled={islimiteAttivitaSuperato}
			getOptionLabel={(activity) => activity.DESATT}
			onChange={(_, value) => handleActivitySelection(value)}
			onInputChange={(_, value, reason) => {
				if (reason === "clear") {
					// Se la barra di ricerca viene cancellata, chiama la funzione di gestione clear
					handleClear();
				}
			}}
			clearText="cancella gli orari di questa attività"
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
	return (
		// <List>
		// 	{attivitaSelezionata.ORARI.ORARIO?.map((ORARIO: ORARIO) => (
		// 		<ListItem key={ORARIO.IDORARIO}>
		// 			<Checkbox
		// 				checked={orariSelezionati?.includes(ORARIO.IDORARIO) || false}
		// 				onChange={() => handleTimeSelection(ORARIO)}
		// 			/>
		// 			<Typography>{`${ORARIO.GIORNO} ${ORARIO.ORAINIZIO}-${ORARIO.ORAFINE}`}</Typography>
		// 		</ListItem>
		// 	))}
		// </List>
		<table>
			<thead>
				<tr>
					<th>Giorno/Orario</th>
					<th>Livello</th>
					<th>Fascia d'età</th>
				</tr>
			</thead>
			<tbody>
				{attivitaSelezionata.ORARI.ORARIO?.map((ORARIO: ORARIO) => (
					<tr key={ORARIO.IDORARIO}>
						<td>
							<ListItem>
								<Checkbox
									checked={orariSelezionati?.includes(ORARIO.IDORARIO) || false}
									onChange={() => handleTimeSelection(ORARIO)}
								/>
								<Typography>{`${ORARIO.GIORNO} ${ORARIO.ORAINIZIO}-${ORARIO.ORAFINE}`}</Typography>
							</ListItem>
						</td>
						{/* Aggiungi le informazioni dai tag desiderati nelle Colonne 2 e 3 */}
						<td>
							<ListItem>
								<Typography>{`${
									ORARIO.LIVELLO ? ORARIO.LIVELLO : "n.i."
								}`}</Typography>
							</ListItem>
						</td>
						<td>
							<ListItem>
								<Typography>{`${
									ORARIO.FASCIA ? ORARIO.FASCIA : "n.i."
								}`}</Typography>
							</ListItem>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export { ActivitySelector, TimeList };
