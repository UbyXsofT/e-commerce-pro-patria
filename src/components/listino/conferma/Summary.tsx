// components/Summary.tsx
import {
	Button,
	Divider,
	Paper,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import {
	Activity,
	ActivitySelected,
	itemsCard,
} from "src/components/CommonTypesInterfaces";
import myIcons from "src/theme/IconsDefine";

// Summary.tsx
interface SummaryProps {
	selectedTimesMap: {
		[activityId: number]: {
			activity: ActivitySelected;
			selectedOrari: string[];
		};
	};
	setSelectedTimesMap: React.Dispatch<
		React.SetStateAction<{
			[activityId: number]: {
				activity: ActivitySelected;
				selectedOrari: string[];
			};
		}>
	>;

	setQuantiOrarioScelti: React.Dispatch<React.SetStateAction<number>>;
	setQuanteAttivitaScelte: React.Dispatch<React.SetStateAction<number>>;
	itemsCard: itemsCard;
}
const Summary: React.FC<SummaryProps> = ({
	selectedTimesMap,
	setSelectedTimesMap,
	setQuantiOrarioScelti,
	setQuanteAttivitaScelte,
	itemsCard,
}) => {
	//console.log("SUMMARY selectedTimesMap: ", selectedTimesMap);
	const theme = useTheme();
	const handleCancel = () => {
		setSelectedTimesMap({});
	};

	const [dispAtvRim, setDispAtvRim] = React.useState(0);
	const [dispTimesRim, setDispTimesRim] = React.useState(0);

	// Filtra solo le attività con almeno un orario selezionato
	const activitiesWithTimes = Object.entries(selectedTimesMap).filter(
		([_, { selectedOrari }]) => selectedOrari.length > 0
	);

	//console.log("activitiesWithTimes: ", activitiesWithTimes);

	// Filtra solo le attività con almeno un orario selezionato
	const activitiesWithObyTimes = activitiesWithTimes.map(
		([_, { activity, selectedOrari }]) => {
			const orariCorrispondenti = selectedOrari
				.map((selectedOrario) =>
					activity.ORARI.ORARIO.find(
						(orario) => orario.IDORARIO === selectedOrario
					)
				)
				.filter((orario) => orario !== undefined);

			return {
				activity: activity,
				orariCorrispondenti: orariCorrispondenti,
			};
		}
	);

	//console.log("activitiesWithObyTimes: ", activitiesWithObyTimes);

	React.useEffect(() => {
		setDispAtvRim(Number(itemsCard?.abbonamento?.SCELTAF));
		setDispTimesRim(Number(itemsCard?.abbonamento?.FREQUENZAS));
	}, []);

	React.useEffect(() => {
		//console.log("USE EFFECT");
		// Calcola la lunghezza totale di tutti gli array 'orariCorrispondenti'
		const totalSelectedTimes = activitiesWithObyTimes?.reduce((acc, item) => {
			return (
				acc + (item.orariCorrispondenti ? item.orariCorrispondenti.length : 0)
			);
		}, 0);

		setDispAtvRim(
			Number(itemsCard?.abbonamento?.SCELTAF) - activitiesWithTimes.length
		);
		setDispTimesRim(
			Number(itemsCard?.abbonamento?.FREQUENZAS) - totalSelectedTimes
		);
		setQuantiOrarioScelti(totalSelectedTimes);
		setQuanteAttivitaScelte(activitiesWithTimes.length);
		// console.log("dispAtvRim: ", dispAtvRim);
		// console.log("dispTimesRim: ", dispTimesRim);
		// console.log("Numero totale di orari selezionati: ", totalSelectedTimes);
		// console.log(
		// 	"Numero totale di attività con orari selezionati: ",
		// 	activitiesWithTimes.length
		// );
	}, [activitiesWithObyTimes, selectedTimesMap]);

	return (
		<Paper
			elevation={0}
			sx={{ padding: "10px", minWidth: "min-content" }}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					color: theme.palette.grey[800],
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							color: theme.palette.error.main,
						}}
					>
						{myIcons.SummarizeIcon}
					</div>

					<Typography
						variant="h6"
						sx={{ ml: 1 }}
					>
						Riepilogo
					</Typography>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						color: theme.palette.success.main,
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							color:
								dispAtvRim > 0
									? theme.palette.success.main
									: theme.palette.error.main,
						}}
					>
						<Tooltip
							title={
								<span style={{ display: "flex", flexDirection: "column" }}>
									<Typography
										textAlign={"center"}
										variant="subtitle2"
									>
										Attività da scegliere
									</Typography>
								</span>
							}
						>
							{React.cloneElement(myIcons.AttivitaIcon, {
								fontSize: "medium",
								style: {
									color: theme.palette.grey[800],
								},
							})}
						</Tooltip>

						<Typography
							variant="h6"
							sx={{ ml: 0, mr: 2 }}
						>
							{dispAtvRim}
						</Typography>
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							color:
								dispTimesRim > 0
									? theme.palette.success.main
									: theme.palette.error.main,
						}}
					>
						<Tooltip
							title={
								<span style={{ display: "flex", flexDirection: "column" }}>
									<Typography
										textAlign={"center"}
										variant="subtitle2"
									>
										Numero frequenze consentite
									</Typography>
								</span>
							}
						>
							{React.cloneElement(myIcons.OrarioAtvIcon, {
								fontSize: "medium",
								style: {
									color: theme.palette.info.main,
								},
							})}
						</Tooltip>
						<Typography
							variant="h6"
							sx={{ ml: 0 }}
						>
							{dispTimesRim}
						</Typography>
					</div>
				</div>
			</div>
			<Divider sx={{ mb: 1 }} />
			{activitiesWithObyTimes.length > 0 ? (
				<>
					{activitiesWithObyTimes.map(
						({ activity, orariCorrispondenti }, atvIndex) => (
							<div key={atvIndex}>
								<Typography
									variant="body1"
									sx={{ fontWeight: "bold", textAlign: "center" }}
								>
									{activity.DESATT}
								</Typography>
								{orariCorrispondenti.map((orario, timeIndex) => (
									<Typography
										key={timeIndex}
										variant="body2"
										sx={{ marginLeft: 2 }}
									>{`${orario?.GIORNO} ${orario?.ORAINIZIO}-${orario?.ORAFINE}`}</Typography>
								))}
							</div>
						)
					)}

					<div style={{ display: "flex", flexDirection: "column" }}>
						<Button
							color="secondary"
							variant="outlined"
							onClick={handleCancel}
							sx={{ marginTop: 2 }}
						>
							{myIcons.HighlightOffIcon}
							<Typography
								variant="body2"
								sx={{ marginLeft: 2 }}
							>{`Cancella orari selezionati`}</Typography>
						</Button>
					</div>
				</>
			) : (
				<Typography variant="body2">Nessun dato disponibile.</Typography>
			)}
		</Paper>
	);
};

export default Summary;
