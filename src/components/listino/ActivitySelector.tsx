// components/ActivitySelector.tsx
import {
	Autocomplete,
	TextField,
	List,
	ListItem,
	Checkbox,
	Typography,
} from "@mui/material";
import { Activity } from "src/components/CommonTypesInterfaces";
interface ActivitySelectorProps {
	activities: Activity[];
	handleActivitySelection: (activity: Activity | null) => void;
	handleClear: () => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
	activities,
	handleActivitySelection,
	handleClear, // Passa la funzione di gestione dell'evento clear
}) => {
	return (
		<Autocomplete
			options={activities}
			getOptionLabel={(activity) => activity.DESATT}
			onChange={(_, value) => handleActivitySelection(value)}
			onInputChange={(_, value, reason) => {
				if (reason === "clear") {
					// Se la barra di ricerca viene cancellata, chiama la funzione di gestione clear
					handleClear();
				}
			}}
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
	times: {
		IDORARIO: string;
		GIORNO: string;
		ORAINIZIO: string;
		ORAFINE: string;
		LIVELLO: string;
		FASCIA?: string | {};
	}[];
	selectedTimes: string[];
	handleTimeSelection: (timeId: string) => void;
}

const TimeList: React.FC<TimeListProps> = ({
	times,
	selectedTimes,
	handleTimeSelection,
}) => {
	console.log("selectedTimes: ", selectedTimes);
	console.log("times: ", times);
	return (
		<List>
			{times?.map((time) => (
				<ListItem key={time.IDORARIO}>
					<Checkbox
						checked={selectedTimes?.includes(time.IDORARIO) || false}
						onChange={() => handleTimeSelection(time.IDORARIO)}
					/>
					<Typography>{`${time.GIORNO} ${time.ORAINIZIO}-${time.ORAFINE}`}</Typography>
				</ListItem>
			))}
		</List>
	);
};

export { ActivitySelector, TimeList };
