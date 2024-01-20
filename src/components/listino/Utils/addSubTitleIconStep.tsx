import { Groups } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import chiaveRandom from "src/components/utils/chiaveRandom";
// const indexToRemove = 3; /* indice dall'inizio da cui iniziare a rimuovere */
// console.log(
//   "Original state before slice:",
//   storyStep_SubTitleComp
// );
// console.log("Index to remove:", indexToRemove);
// console.log(
//   "Array length:",
//   storyStep_SubTitleComp.length
// );
// let newStateStoryTitle =
//   storyStep_SubTitleComp.slice(indexToRemove);
// console.log("New state:", newStateStoryTitle);
// setStoryStep_SubTitleComp(newStateStoryTitle);

export default function addSubTitleIconStep(
	stepSelectOby: {
		stepId: number;
		endNavStepId: number;
		endStep: number;
		codice: string;
		isClickNext: boolean;
	},
	setStepSelectOby: React.Dispatch<
		React.SetStateAction<{
			stepId: number;
			endNavStepId: number;
			endStep: number;
			codice: string;
			isClickNext: boolean;
		}>
	>,
	storyStep_SubTitleComp: JSX.Element[],
	setStoryStep_SubTitleComp: React.Dispatch<
		React.SetStateAction<JSX.Element[]>
	>,
	percorsoDesc: string,
	stepId: number,
	icona: any
): any {
	setStoryStep_SubTitleComp((prevState) => [
		...prevState,
		<div
			key={chiaveRandom()}
			style={{
				marginRight: "5px",
				marginLeft: "20px",
				display: "flex",
			}}
		>
			<Tooltip
				title={
					<span style={{ display: "flex", flexDirection: "column" }}>
						<Typography
							textAlign={"center"}
							variant="subtitle2"
						>
							Torna a questa scelta
						</Typography>
					</span>
				}
			>
				<IconButton
					onClick={() => {
						setStepSelectOby((prevStepSelectOby) => ({
							...prevStepSelectOby,
							stepId: stepSelectOby.stepId !== null ? stepId : 1,
						}));
					}}
				>
					{icona}
				</IconButton>
			</Tooltip>

			<Typography
				variant="subtitle1"
				style={{ display: "flex", alignItems: "center" }}
			>
				{percorsoDesc}
			</Typography>
		</div>,
	]);

	return null;
}
