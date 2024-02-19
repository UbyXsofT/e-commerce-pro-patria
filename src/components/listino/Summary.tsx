// components/Summary.tsx
import { Paper, Typography } from "@mui/material";

// Summary.tsx
interface SummaryProps {
	selectedTimesMap: { [activityCode: string]: string[] };
}

const Summary: React.FC<SummaryProps> = ({ selectedTimesMap }) => {
	return (
		<Paper sx={{ padding: "10px" }}>
			<Typography variant="h6">Riepilogo</Typography>
			{selectedTimesMap && Object.entries(selectedTimesMap).length > 0 ? (
				Object.entries(selectedTimesMap).map(
					([activityCode, selectedTimes], index) => (
						<div key={index}>
							<Typography variant="subtitle1">
								Attività: {activityCode}
							</Typography>
							{selectedTimes.map((time, timeIndex) => (
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
