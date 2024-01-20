import React from "react";
import {
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import eCommerceConf from "eCommerceConf.json";
import { Info } from "@mui/icons-material";
import LegendaIcone from "../utils/LegendaIcone";
import myIcons from "src/theme/IconsDefine";

const HeadListinoPage = ({
	stepSelectOby,
	setStepSelectOby,
	storyStep_SubTitleComp,
}: {
	stepSelectOby: any;
	setStepSelectOby: any;
	storyStep_SubTitleComp: any;
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	type StepStorePageType = {
		[key: number]: {
			TitoloPage: string;
		};
	};
	// Utilizzo del tipo dichiarato
	const eCommerceConfType: { StepStorePage: StepStorePageType } = {
		StepStorePage: eCommerceConf.StepStorePage,
	};

	return (
		<>
			<Grid
				container
				style={{
					justifyContent: "space-between",
					paddingRight: "0px",
				}}
			>
				<Typography
					variant="h4"
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "nowrap",
						alignItems: "center",
					}}
				>
					{stepSelectOby.stepId === 1 ? (
						React.cloneElement(myIcons.GruppoIcon, {
							fontSize: "large",
							style: { marginRight: "20px" },
						})
					) : stepSelectOby.stepId === 2 ? (
						React.cloneElement(myIcons.SedeIcon, {
							fontSize: "large",
							style: { marginRight: "20px" },
						})
					) : stepSelectOby.stepId === 3 ? (
						React.cloneElement(myIcons.AreaIcon, {
							fontSize: "large",
							style: { marginRight: "20px" },
						})
					) : stepSelectOby.stepId === 4 ? (
						React.cloneElement(myIcons.AbbIcon, {
							fontSize: "large",
							style: { marginRight: "20px" },
						})
					) : (
						<></>
					)}

					{eCommerceConfType.StepStorePage[stepSelectOby.stepId]?.TitoloPage}
				</Typography>

				<Tooltip
					title={
						<span style={{ display: "flex", flexDirection: "column" }}>
							<Typography
								textAlign={"center"}
								variant="subtitle2"
							>
								Visualizza legenda icone
							</Typography>
						</span>
					}
				>
					<IconButton
						onClick={() => {
							openModal();
						}}
					>
						<Info color="info" />
					</IconButton>
				</Tooltip>
				<LegendaIcone
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</Grid>

			{isMobile ? (
				<Grid
					style={{
						display: "flex",
						flexDirection: "column",
						flexWrap: "nowrap",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						minHeight: "50px",
					}}
				>
					{storyStep_SubTitleComp.map((element: any, index: any) => {
						// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^ element: ", element);
						// console.log("index: ", index);
						return <React.Fragment key={index}>{element}</React.Fragment>;
					})}
				</Grid>
			) : (
				<Grid
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "nowrap",
						alignItems: "center",
						justifyContent: "flex-start",
						minHeight: "50px",
					}}
				>
					{storyStep_SubTitleComp.map((element: any, index: any) => {
						// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^ element: ", element);
						// console.log("index: ", index);
						return <React.Fragment key={index}>{element}</React.Fragment>;
					})}
				</Grid>
			)}
		</>
	);
};

export default HeadListinoPage;
