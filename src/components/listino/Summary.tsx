// components/Summary.tsx
import { Paper, Typography } from "@mui/material";

// Summary.tsx
interface SummaryProps {
	selectedTimesMap: {
		[activityId: number]: {
			code: string;
			description: string;
			times: string[];
		};
	};
}

const Summary: React.FC<SummaryProps> = ({ selectedTimesMap }) => {
	// Filtra solo le attività con almeno un orario selezionato
	const activitiesWithTimes = Object.entries(selectedTimesMap).filter(
		([_, { times }]) => times && times.length > 0
	);

	return (
		<Paper sx={{ padding: "10px" }}>
			<Typography variant="h6">Riepilogo</Typography>
			{activitiesWithTimes.length > 0 ? (
				activitiesWithTimes.map(
					([activityId, { code, description, times }], index) => (
						<div key={index}>
							<Typography variant="subtitle1">
								Attività: {code} - {description}
							</Typography>
							{times.map((time, timeIndex) => (
								<Typography key={timeIndex}>{`Orario: ${time}`}</Typography>
							))}
						</div>
					)
				)
			) : (
				<Typography variant="body2">Nessun dato disponibile.</Typography>
			)}
		</Paper>
	);
};

export default Summary;
