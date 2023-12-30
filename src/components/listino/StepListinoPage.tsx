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

import GroupsIcon from "@mui/icons-material/Groups";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import BtnStepStore from "./BtnStepListino";
import {
	Abbonamento,
	Area,
	Gruppo,
	Item,
	Sede,
	StoreState,
} from "../CommonTypesInterfaces";
import ListinoCard from "./ListinoCard";
import ListinoErrorBox from "./ListinoErrorBox";

interface StepListinoPageProps {
	activeStepPageId: number;
	setActiveStepPageId: any;
}

const StepListinoPage: React.FC<StepListinoPageProps> = ({
	activeStepPageId,
	setActiveStepPageId,
}) => {
	const router = useRouter();
	const [endStep, setEndStep] = React.useState(
		Object.keys(eCommerceConf.StepStorePage).length
	);
	const theme = useTheme();
	//TODO MODIFICARE CENTRI E fetchListino PERCHè PRENDEREMO TUTTI I DATI DELLO STORE IN UN UNICO FETCH
	const listinoState = useSelector((state: StoreState) => state.listino);
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { showAlert } = useAlertMe();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const [cardComponent, setCardComponent] = React.useState([]);

	const [tagTipo, setTagTipo] = React.useState("GRUPPO");
	type StepStorePageType = {
		[key: number]: {
			TitoloPage: string;
		};
	};

	// Utilizzo del tipo dichiarato
	const eCommerceConfType: { StepStorePage: StepStorePageType } = {
		StepStorePage: eCommerceConf.StepStorePage,
	};

	// Funzioni di verifica del tipo
	function isGruppo(item: Item): item is Gruppo {
		return (item as Gruppo).CODGRUPPO !== undefined;
	}
	function isSede(item: Item): item is Sede {
		return (item as Sede).IDSEDE !== undefined;
	}
	function isArea(item: Item): item is Area {
		return (item as Area).CODAREA !== undefined;
	}
	function isAbbonamento(item: Item): item is Abbonamento {
		return (item as Abbonamento).CODABB !== undefined;
	}

	function setTipo(tipo: number) {
		switch (tipo) {
			case 1:
				setTagTipo("GRUPPO");
			case 2:
				setTagTipo("SEDE");
			case 3:
				setTagTipo("AREA");
			case 4:
				setTagTipo("ABBONAMENTO");
		}
	}

	React.useEffect(() => {
		createCardComponents(activeStepPageId);
	}, [activeStepPageId]);

	const createCardComponents = (tipo: number) => {
		let cardComponents = [] as any;
		setTipo(tipo);
		console.log("tipo: ", tipo);
		console.log("tagTipo: ", tagTipo);
		console.log(
			"listinoState.listino[tagTipo]: ",
			listinoState.listino[tagTipo]
		);

		if (
			listinoState &&
			listinoState.listino &&
			`listinoState.listino.${tagTipo}`
		) {
			listinoState.listino[tagTipo].forEach((item) => {
				// Usa item come un elemento generico, puoi controllare il tipo specifico all'interno del loop
				if (isGruppo(item)) {
					// Tratta item come Gruppo
					cardComponents.push(
						<ListinoCard
							key={item.CODGRUPPO}
							itemsCard={{
								tipo: tagTipo,
								codice: item.CODGRUPPO,
								descrizione: item.DESGRUPPO,
								aSede: item.SEDE.length > 1 ? true : false,
							}}
							tipo={1}
						/>
					);
				} else if (isSede(item)) {
					// Tratta item come Sede
					cardComponents.push(
						<ListinoCard
							key={item.IDSEDE}
							itemsCard={{
								tipo: tagTipo,
								codice: item.IDSEDE,
								descrizione: item.DESCSEDE,
								note: item.NOTESEDE,
							}}
							tipo={1}
						/>
					);
				} else if (isArea(item)) {
					// Tratta item come Area
					cardComponents.push(
						<ListinoCard
							key={item.CODAREA}
							itemsCard={{
								tipo: tagTipo,
								codice: item.CODAREA,
								descrizione: item.DESAREA,
							}}
							tipo={1}
						/>
					);
				} else if (isAbbonamento(item)) {
					// Tratta item come Abbonamento
					cardComponents.push(
						<ListinoCard
							key={item.CODABB}
							itemsCard={{
								tipo: tagTipo,
								codice: item.CODABB,
								descrizione: item.DESABB, //descrizione
								importo: item.IMPORTO, //importo a listino
								promozione: item.PROMO, //0=nessuna offerta, 1=in promozione, 2=in convenzione
								importoScontato: item.IMPORTOS, //importo scontato, 0 se non c’è sconto
								sceltaFine: item.SCELTAF, //0=abbonamento non prevede scelta attività ad orario, >0 abbonamento con scelta attività ad orario
								noSospensione: item.NOSOSP, //0=abbonamento sospendibile, <>0 abbonamento non sospendibile
								dataIniziale: item.DATAINI, //data proposta come inizio abbonamento
								periodoAttivabile: item.PERIODOATT, //giorni disponibili per l’attivazione (se =0 vale la dataini)
								frequenzaSedute: item.FREQUENZAS, //frequenza settimanale (per scegliere gli orari deve essere >0)
							}}
							tipo={1}
						/>
					);
				}

				console.log("Item:", item);
			});
		} else {
			console.log("Dati non presenti o struttura non corretta.");
		}

		console.log("ListinoCard cardComponents: ", cardComponents);
		setCardComponent(cardComponents);
	};

	// Logica per la gestione della selezione del gruppo
	const handleSelection = (selectedId: number) => {};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Pagina selezione prodotti | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce products select page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				{listinoState.error ? (
					<ListinoErrorBox />
				) : (
					<>
						<Typography variant="h4">
							{activeStepPageId === 1 ? (
								<GroupsIcon style={{ marginRight: "20px" }} />
							) : (
								<WorkspacesIcon style={{ marginRight: "20px" }} />
							)}
							{eCommerceConfType.StepStorePage[activeStepPageId]?.TitoloPage}
						</Typography>
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
								}}
							>
								{isMobile ? (
									// Contenuto per dispositivi mobili
									<>
										<BtnStepStore
											activeStepPageId={activeStepPageId}
											setActiveStepPageId={setActiveStepPageId}
											endStep={endStep}
										/>
										{cardComponent}
										<BtnStepStore
											activeStepPageId={activeStepPageId}
											setActiveStepPageId={setActiveStepPageId}
											endStep={endStep}
										/>
									</>
								) : (
									<>
										{cardComponent}
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
