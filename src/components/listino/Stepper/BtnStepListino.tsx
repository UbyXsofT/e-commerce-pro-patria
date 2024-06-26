//eBtnStepStore.tsx
import { Button, Grid } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import myIcons from "src/theme/IconsDefine";
import React from "react";
import { ListinoCardProps } from "src/components/CommonTypesInterfaces";

// type Props = {
// 	stepSelectOby: {
// 		stepId: number;
// 		endNavStepId: number;
// 		endStep: number;
// 		codice: string;
// 		isClickNext: boolean;
// 	};
// 	setStepSelectOby: React.Dispatch<
// 		React.SetStateAction<{
// 			stepId: number;
// 			endNavStepId: number;
// 			endStep: number;
// 			codice: string;
// 			isClickNext: boolean;
// 		}>
// 	>;
// };

export const BtnStepStore = ({
	stepSelectOby,
	setStepSelectOby,
}: ListinoCardProps) => {
	// Stato per il valore di disabilitazione del pulsante precedente
	const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
		React.useState(stepSelectOby.stepId === 1);

	// Calcola il valore di disabilitazione del pulsante successivo
	const isNextButtonDisabled = stepSelectOby.stepId >= stepSelectOby.endStep;

	// Effetto per controllare e aggiornare il valore iniziale del pulsante precedente
	React.useEffect(() => {
		// Controlla se stepSelectOby.stepId è una stringa e convertila in un numero
		const parsedActiveStepPageId =
			typeof stepSelectOby.stepId === "string"
				? parseInt(stepSelectOby.stepId, 10)
				: stepSelectOby.stepId;

		setIsPreviousButtonDisabled(parsedActiveStepPageId === 1);
	}, [stepSelectOby.stepId]);

	return (
		<>
			<Grid
				container
				// spacing={3}
				style={{
					display: "flex",
					flexFlow: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "20px",
					marginBottom: "20px",
				}}
			>
				<Button
					variant="contained"
					disabled={isPreviousButtonDisabled}
					onClick={() =>
						stepSelectOby.stepId !== null
							? setStepSelectOby((prevStepSelectOby) => ({
									...prevStepSelectOby,
									stepId: prevStepSelectOby.stepId - 1,
									isClickNext: false,
							  }))
							: 1
					}
					// sx={{ mt: "auto", ml: 1 }}
				>
					{myIcons.ArrowBackIosNewIcon} Precedente
				</Button>
				<Button
					variant="contained"
					disabled={isNextButtonDisabled}
					onClick={() =>
						stepSelectOby.stepId !== null
							? setStepSelectOby((prevStepSelectOby) => ({
									...prevStepSelectOby,
									stepId:
										typeof prevStepSelectOby.stepId === "string"
											? parseInt(prevStepSelectOby.stepId, 10) + 1
											: prevStepSelectOby.stepId + 1,
									isClickNext: true,
							  }))
							: 1
					}
					// sx={{ mt: "auto", ml: 1 }}
				>
					Successivo {myIcons.ArrowForwardIosIcon}
				</Button>
			</Grid>
		</>
	);
};

export default BtnStepStore;
