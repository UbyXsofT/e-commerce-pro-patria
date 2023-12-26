//eBtnStepStore.tsx
import { Button, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";

type Props = {
	activeStepPageId: number;
	setActiveStepPageId: any;
	endStep: number;
};

// export const BtnStepStore = ({
// 	activeStepPageId,
// 	setActiveStepPageId,
// 	endStep,
// }: Props) => {
// 	// Stato per il valore di disabilitazione del pulsante precedente
// 	const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
// 		React.useState(activeStepPageId === 1);

// 	// Calcola il valore di disabilitazione del pulsante successivo
// 	const isNextButtonDisabled = activeStepPageId >= endStep;

// 	// Effetto per controllare e aggiornare il valore iniziale del pulsante precedente
// 	React.useEffect(() => {
// 		console.log(
// 			"BtnStepStore useEFFECT : activeStepPageId: ",
// 			activeStepPageId
// 		);
// 		const chkBlock = activeStepPageId - 1 === 0 ? true : false;
// 		setIsPreviousButtonDisabled(chkBlock);
// 	}, [activeStepPageId]);

// 	return (
// 		<Grid
// 			container
// 			spacing={3}
// 			style={{
// 				display: "flex",
// 				flexFlow: "row",
// 				justifyContent: "space-between",
// 				alignItems: "center",
// 				marginTop: "20px",
// 			}}
// 		>
// 			<Button
// 				variant="contained"
// 				disabled={isPreviousButtonDisabled}
// 				onClick={() =>
// 					activeStepPageId !== null
// 						? setActiveStepPageId(activeStepPageId - 1)
// 						: 1
// 				}
// 				sx={{ mt: "auto", ml: 1 }}
// 			>
// 				<ArrowBackIosNewIcon /> Precedente
// 			</Button>
// 			<Button
// 				variant="contained"
// 				disabled={isNextButtonDisabled}
// 				onClick={() =>
// 					activeStepPageId !== null
// 						? setActiveStepPageId(activeStepPageId + 1)
// 						: 1
// 				}
// 				sx={{ mt: "auto", ml: 1 }}
// 			>
// 				Successivo <ArrowForwardIosIcon />
// 			</Button>
// 		</Grid>
// 	);
// };

export const BtnStepStore = ({
	activeStepPageId,
	setActiveStepPageId,
	endStep,
}: Props) => {
	// Stato per il valore di disabilitazione del pulsante precedente
	const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
		React.useState(activeStepPageId === 1);

	// Calcola il valore di disabilitazione del pulsante successivo
	const isNextButtonDisabled = activeStepPageId >= endStep;

	// Effetto per controllare e aggiornare il valore iniziale del pulsante precedente
	React.useEffect(() => {
		// Controlla se activeStepPageId è una stringa e convertila in un numero
		const parsedActiveStepPageId =
			typeof activeStepPageId === "string"
				? parseInt(activeStepPageId, 10)
				: activeStepPageId;

		setIsPreviousButtonDisabled(parsedActiveStepPageId === 1);
	}, [activeStepPageId]);

	return (
		<Grid
			container
			spacing={3}
			style={{
				display: "flex",
				flexFlow: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginTop: "20px",
			}}
		>
			<Button
				variant="contained"
				disabled={isPreviousButtonDisabled}
				onClick={() =>
					activeStepPageId !== null
						? setActiveStepPageId(activeStepPageId - 1)
						: 1
				}
				sx={{ mt: "auto", ml: 1 }}
			>
				<ArrowBackIosNewIcon /> Precedente
			</Button>
			<Button
				variant="contained"
				disabled={isNextButtonDisabled}
				onClick={() =>
					activeStepPageId !== null
						? setActiveStepPageId(
								typeof activeStepPageId === "string"
									? parseInt(activeStepPageId, 10) + 1
									: activeStepPageId + 1
						  )
						: 1
				}
				sx={{ mt: "auto", ml: 1 }}
			>
				Successivo <ArrowForwardIosIcon />
			</Button>
		</Grid>
	);
};

export default BtnStepStore;
