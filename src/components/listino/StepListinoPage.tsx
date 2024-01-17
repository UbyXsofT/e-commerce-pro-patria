import React from "react";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setListino } from "src/store/actions";
//*-----*//
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import BtnStepStore from "./stepper/BtnStepListino";
import ListinoCard from "src/components/listino/card/ListinoCard";
import ListinoErrorBox from "src/components/listino/utils/ListinoErrorBox";
import { Place, Groups, AutoAwesomeMosaic } from "@mui/icons-material";
import {
	Abbonamento,
	Area,
	Gruppo,
	Item,
	Sede,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import chiaveRandom from "src/components/utils/chiaveRandom";
import trovaCodice from "src/components/listino/utils/trovaCodice";
import trovaCodiceNextOby from "src/components/listino/utils/trovaCodiceNextOby";
import fetchListino from "src/components/utils/fetchListino";
import { animated, useSpring } from "react-spring";
import HeadListinoPage from "src/components/listino/layout/HeadListinoPage";
import findInfoAbb from "src/components/listino/utils/findInfoAbb";
import {
	isGruppo,
	isSede,
	isArea,
	isAbbonamento,
} from "src/components/listino/utils/checkTipo";
import createCard from "./card/createCard";

const StepListinoPage = () => {
	const springPropsCards = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: { duration: 500 }, // Imposta la durata dell'animazione in millisecondi
	});
	const [stepSelectOby, setStepSelectOby] = React.useState({
		stepId: 1,
		endNavStepId: 5,
		endStep: 1,
		codice: "0",
		isClickNext: true,
	});

	const theme = useTheme();
	//TODO MODIFICARE CENTRI E fetchListino PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const listinoState = useSelector((state: StoreState) => state.listino);
	const authUser = useSelector((state: StoreState) => state.authUser);
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const [btnStep, setBtnStep] = React.useState(<></>);
	const [cardComponent, setCardComponent] = React.useState([]);

	const [storyStep_SubTitleComp, setStoryStep_SubTitleComp] = React.useState(
		[] as JSX.Element[]
	);

	const aggiornaListino = async () => {
		//if (listinoState.listino === null) {
		try {
			// Effettua la richiesta asincrona
			const data = fetchListino(authUser?.USERID);
			console.log("****** 2) DATA: ", data);
			// Aggiorna lo stato Redux utilizzando la tua azione setListino
			dispatch(setListino({ listino: (await data).listino, error: null }));
		} catch (error) {
			// Gestisci eventuali errori durante la richiesta
			console.error("Errore durante il fetch del listino:", error);
			dispatch(
				setListino({
					listino: null,
					error: error || "Errore sconosciuto",
				})
			);
		}
		//}
	};

	React.useEffect(() => {
		if (stepSelectOby.stepId !== 1) {
		} else if (stepSelectOby.stepId === 1) {
			//CANCELLO I DATI MEMORIZZATI DEGLI STEP
			setStoryStep_SubTitleComp([]);
			console.log("****** 1) ---- CHECK LISTINO: ", listinoState);
			if (listinoState.listino === null) {
				aggiornaListino();
			}
		}

		if (stepSelectOby.stepId < stepSelectOby.endNavStepId) {
			createCard(
				stepSelectOby.stepId,
				listinoState,
				stepSelectOby,
				setStepSelectOby,
				storyStep_SubTitleComp,
				setStoryStep_SubTitleComp,
				aggiornaListino,
				setBtnStep,
				setCardComponent,
				springPropsCards
			);
		} else {
			setStepSelectOby((prev) => ({
				...prev,
				stepId: prev.stepId - 1,
			}));
		}
	}, [stepSelectOby.stepId, listinoState.listino]);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina selezione prodotti | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce products select page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				{/* Componente LegendaIcone con stato del modale controllato dal componente padre */}

				{listinoState.error ? (
					<ListinoErrorBox />
				) : (
					<>
						<HeadListinoPage
							stepSelectOby={stepSelectOby}
							setStepSelectOby={setStepSelectOby}
							storyStep_SubTitleComp={storyStep_SubTitleComp}
						/>

						<Container
							style={{
								marginTop: "1em",
								marginBottom: "3em",
								height: "auto",
							}}
						>
							<Grid
								container
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-around",
									minHeight: "660px",
								}}
							>
								{isMobile ? (
									<>
										{btnStep}
										{cardComponent}
										{btnStep}
									</>
								) : (
									<>
										{cardComponent}
										{btnStep}
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
