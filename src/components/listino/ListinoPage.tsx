import React from "react";
//REDUX-STORE
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setListino, setLoading } from "src/store/actions";
//*-----*//
import { Container, Grid, Skeleton, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import ListinoErrorBox from "src/components/listino/utils/ListinoErrorBox";
import { StoreState } from "src/components/CommonTypesInterfaces";
import fetchListino from "src/components/listino/utils/fetchListino";
import { useSpring } from "react-spring";
import HeadListinoPage from "src/components/listino/layout/HeadListinoPage";
import CreateCard from "src/components/listino/card/createCard";
import router from "next/router";

const ListinoPage = () => {
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

	const [isFetchingData, setIsFetchingData] = React.useState(
		useSelector((state: StoreState) => state.loading)
	);
	React.useEffect(() => {
		isFetchingData ? dispatch(setLoading(true)) : dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
	}, [isFetchingData]);

	const aggiornaListino = async () => {
		//if (listinoState.listino === null) {
		setIsFetchingData(true); // Utilizza dispatch per inviare l'azione di setLoading
		try {
			// Effettua la richiesta asincrona
			const data = await fetchListino(authUser?.USERID);
			console.log("****** 2) DATA: ", data);
			// Aggiorna lo stato Redux utilizzando la tua azione setListino
			if (data.listino === null) {
				setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
				router.push(
					`/blockPage?titolo=CARICAMENTO DATI LISTINO&descrizione=Si è verificato un errore durante il recupero dei dati necessari. Se il problema persiste si prega di cottattare il proprio centro fitness.. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
				);
			} else {
				dispatch(setListino({ listino: data.listino, error: null }));
			}

			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
		} catch (error) {
			// Gestisci eventuali errori durante la richiesta
			console.error("Errore durante il fetch del listino:", error);
			dispatch(
				setListino({
					listino: null,
					error: error || "Errore sconosciuto",
				})
			);
			setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
		}
		//}
	};

	const aggiornaDatiStepInSessionStorage = (step: any) => {
		///////////// ----------------
		// Recuperare i dati dell'attività e i suoi orari da sessionStorage
		const storedData = sessionStorage.getItem("STEP");
		const parsedData = storedData ? JSON.parse(storedData) : [];

		console.log("---- >> STEP parsedData LUNGHEZZA: ", parsedData.length);
		console.log("---- >> STEP parsedData: ", parsedData);
		if (Number(step.stepId) <= Number(parsedData.length)) {
			console.log("*********** STO TORNANDO INDIETROOOO");
			return;
		}

		// Verificare se lo stepId è già presente nell'array
		const existingStepIndex = parsedData.findIndex(
			(item: any) => item.stepId === step.stepId
		);

		if (existingStepIndex !== -1) {
			// Se lo stepId è già presente, aggiornare l'oggetto corrispondente
			parsedData[existingStepIndex] = {
				stepId: step.stepId,
				stepCodice: step.codice,
			};
		} else {
			// Altrimenti, inserire il nuovo Step nell'array
			parsedData.push({
				stepId: step.stepId,
				stepCodice: step.codice,
			});
		}

		console.log("---- >> STEP parsedData after update: ", parsedData);

		// Salvare i dati aggiornati in sessionStorage
		sessionStorage.setItem("STEP", JSON.stringify(parsedData));
		///////////// ----------------
	};

	const resettaDatiStepInSessionStorage = () => {
		///////////// ----------------
		// Salvare i dati aggiornati in sessionStorage
		sessionStorage.setItem("STEP", JSON.stringify([]));
		///////////// ----------------
	};

	React.useEffect(() => {
		console.log("******* CAMBIO STEP SELECT OBY ***********");
		console.log("@@@@@@ stepSelectOby: ", stepSelectOby);

		aggiornaDatiStepInSessionStorage(stepSelectOby);

		if (stepSelectOby.stepId < stepSelectOby.endNavStepId) {
			CreateCard(
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
			console.log("*********** STO TORNANDO INDIETROOOO");
			setStepSelectOby((prev) => ({
				...prev,
				stepId: prev.stepId - 1,
			}));
		}

		if (stepSelectOby.stepId === 1) {
			resettaDatiStepInSessionStorage();
			//CANCELLO I DATI MEMORIZZATI DEGLI STEP
			setStoryStep_SubTitleComp([]);
			console.log("****** 0) ---- CHECK LISTINO: ", listinoState);
			if (listinoState.listino === null) {
				router.push(`/auth/acquista/prodotti`);
				//aggiornaListino();
			} else {
				setIsFetchingData(false); // Utilizza dispatch per inviare l'azione di setLoading
				// router.push(`/auth/home`);
			}
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
								{cardComponent && cardComponent.length !== 0 ? (
									isMobile ? (
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
									)
								) : (
									<></>
								)}
							</Grid>
						</Container>
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default ListinoPage;
