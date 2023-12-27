import React from "react";
import { useRouter } from "next/router";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCart, setLoading, setListino } from "src/store/actions";
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
import fetchListino from "src/components/utils/fetchListino";
import BtnStepStore from "./BtnStepListino";
import { StoreState } from "../CommonTypesInterfaces";

const StepListinoPage = (stepPageId: any) => {
	const router = useRouter();
	const [activeStepPageId, setActiveStepPageId] = React.useState(
		stepPageId.stepId
	);
	const [endStep, setEndStep] = React.useState(
		Object.keys(eCommerceConf.StepStorePage).length
	);
	const theme = useTheme();

	//TODO MODIFICARE CENTRI E fetchListino PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const listino = useSelector((state: StoreState) => state.listino);
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

				{listino.error ? (
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
								console.log("****** CHECK LISTINO: ", listino.listino);
								if (listino.listino === null) {
									const data = await fetchListino(authUser?.USERID, 0);
									dispatch(setListino({ listino: data.listino, error: null }));
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
							{/* "StepStorePage": {"1": {"TitoloPage": "Seleziona gruppo attività / servizio"},
																	"2": {"TitoloPage": "Seleziona sedi"},
																	"3": {"TitoloPage": "Seleziona aree"},
																	"4": {"TitoloPage": "Lista abbonamenti"},
																	"5": {"TitoloPage": "Orari"},
																	"6": {"TitoloPage": "Acquista riepilogo"} */}
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

export default StepListinoPage;
