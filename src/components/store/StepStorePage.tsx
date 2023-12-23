import React from "react";
import { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCart, setLoading, setCentri } from "src/store/actions";
//*-----*//
import {
	Box,
	Button,
	Container,
	Grid,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import callNodeService from "pages/api/callNodeService";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import fetchCentri from "src/components/utils/fetchCentri";
import BtnStepStore from "./BtnStepStore";
import { StoreState } from "../CommonTypesInterfaces";

const StepStorePage = (stepPageId: any) => {
	const router = useRouter();
	const [activeStepPageId, setActiveStepPageId] = React.useState(
		stepPageId.stepId
	);
	const [endStep, setEndStep] = React.useState(
		Object.keys(eCommerceConf.StepStorePage).length
	);
	const theme = useTheme();

	//TODO MODIFICARE CENTRI E fetchCentri PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const centri = useSelector((state: StoreState) => state.centri);
	const authUser = useSelector((state: StoreState) => state.authUser);

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	// Dichiarazione del tipo per StepStorePage
	type StepStorePageType = {
		[key: number]: {
			TitoloPage: string;
		};
	};

	// Utilizzo del tipo dichiarato
	const eCommerceConfType: { StepStorePage: StepStorePageType } = {
		StepStorePage: eCommerceConf.StepStorePage,
	};

	React.useEffect(() => {
		console.log("@@@@ xxxx StepStorePage stepPageId: ", stepPageId);
		dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading
		dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
	}, [dispatch]);

	React.useEffect(() => {
		if (stepPageId !== activeStepPageId) {
			router.push(`/auth/store/${activeStepPageId}`);
		}
	}, [activeStepPageId]);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina del prodotto | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce product page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				{centri.error ? (
					<Box
						textAlign={"center"}
						marginTop={12}
					>
						<Typography
							gutterBottom
							variant="h4"
						>
							<strong>Qualcosa è andato storto</strong>
						</Typography>
						<Button
							variant="contained"
							onClick={async () => {
								if (centri.centri.length === 0) {
									const data = await fetchCentri(authUser?.USERID, 0);
									dispatch(setCentri(data));
								}
							}}
						>
							Prova a Ricaricare
						</Button>
					</Box>
				) : (
					<>
						<Typography variant="h4">
							<WorkspacesIcon style={{ marginRight: "20px" }} />
							{eCommerceConfType.StepStorePage[activeStepPageId]?.TitoloPage}
						</Typography>
						<Container
							style={{
								marginTop: "1em",
								marginBottom: "1em",
							}}
						>
							<Grid container>
								{isMobile ? (
									// Contenuto per dispositivi mobili
									<>
										<BtnStepStore
											activeStepPageId={activeStepPageId}
											setActiveStepPageId={setActiveStepPageId}
											endStep={endStep}
										/>
										<BtnStepStore
											activeStepPageId={activeStepPageId}
											setActiveStepPageId={setActiveStepPageId}
											endStep={endStep}
										/>
									</>
								) : (
									<>
										<BtnStepStore
											activeStepPageId={activeStepPageId}
											setActiveStepPageId={setActiveStepPageId}
											endStep={endStep}
										/>
									</>
								)}
							</Grid>
						</Container>
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default StepStorePage;
