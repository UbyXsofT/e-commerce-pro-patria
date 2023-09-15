import React from "react";
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	FormControl,
	FormHelperText,
	Link,
	Fade,
	AppBar,
	Toolbar,
	Collapse,
	Switch,
	Box,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/Layout";
import eCommerceConf from "../../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import CookieManager from "../../src/components/cookie/CookieManager";
import { ContactPageOutlined } from "@mui/icons-material";
//*-- API---*//

type TerminiCondizioniProps = {
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};

const TerminiCondizioni = ({ setLoading }: TerminiCondizioniProps) => {
	const theme = useTheme();

	// Rendi visibile il loading impostando setLoading su true
	// React.useEffect(() => {
	//   setLoading(true);
	//   // Effettua le operazioni di caricamento, se necessario
	//   // Qui puoi fare richieste API, ottenere i dati, ecc.
	//   // Quando hai completato il caricamento, imposta isLoading su false:
	//   setTimeout(() => {
	//     console.log("Esempio ritardo nel caricare i dati di secondi");
	//     setLoading(false);
	//   }, 3000);
	// }, []);

	return (
		<ThemeProvider theme={theme}>
			<Layout
			//digitare il titolo della pagina e la descrizione della pagina.
			// title={`Condizioni Generali di Uso e Vendita | E-Commerce ${eCommerceConf.NomeEcommerce}`}
			// description="This is a E-Commerce Info-Privacy page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<div>
					<Typography
						variant="h5"
						component="h5"
						gutterBottom
					>
						Condizioni Generali di Uso e Vendita
					</Typography>
					<Typography
						component="p"
						paragraph={true}
					>
						Benvenuto su {eCommerceConf.NomeEcommerce}! Ti invitiamo a leggere
						attentamente le seguenti Condizioni Generali di Uso e Vendita,
						poiché l'utilizzo del nostro sito e l'acquisto dei nostri prodotti
						implicano l'accettazione di queste condizioni.
					</Typography>

					<Typography
						variant="h5"
						component="h3"
					>
						1. Uso del Sito
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`1.1 Accettazione delle Condizioni: Utilizzando il nostro sito web, confermi di accettare senza riserve le presenti Condizioni Generali di Uso e Vendita. Se non sei d'accordo con una qualsiasi parte di queste condizioni, ti invitiamo a non utilizzare il sito.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`1.2 Uso Responsabile: L'utente si impegna a utilizzare il sito web in modo responsabile e a rispettare tutte le leggi e i regolamenti applicabili.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`1.3 Proprietà Intellettuale: Tutti i contenuti del sito, inclusi testi, grafica, loghi, immagini, video, sono di proprietà esclusiva di ${eCommerceConf.NomeEcommerce} e sono protetti dalle leggi sulla proprietà intellettuale.`}
								/>
							</ListItem>
						</List>
					</Box>

					<Typography
						variant="h5"
						component="h3"
					>
						2. Account Utente
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`2.1 Creazione dell'Account: Per effettuare acquisti sul nostro sito, potrebbe essere necessario creare un account utente. L'utente è responsabile di mantenere la sicurezza delle informazioni del proprio account.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`2.3 Accesso e Sospensione: Ci riserviamo il diritto di sospendere o disattivare un account utente in caso di violazione delle Condizioni Generali o di qualsiasi comportamento inappropriato.`}
								/>
							</ListItem>
						</List>
					</Box>

					<Typography
						variant="h5"
						component="h3"
						gutterBottom
					>
						3. Acquisto e Vendita
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`3.1 Disponibilità dei Prodotti: Tutti i prodotti offerti sul sito sono soggetti a disponibilità. Ci riserviamo il diritto di modificare o interrompere i prodotti senza preavviso.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`3.2 Prezzi e Pagamenti: I prezzi dei prodotti sono indicati in Euro e sono soggetti a modifiche senza preavviso. Il pagamento dei prodotti avviene attraverso metodi di pagamento sicuri e autorizzati.`}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={`3.3 Spedizioni: Effettuiamo le spedizioni dei prodotti entro i tempi indicati sul sito. I costi di spedizione possono variare in base alla destinazione e alla modalità di spedizione scelta.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`3.4 Politica di Reso e Rimborso: Per la nostra politica di reso e rimborso, ti invitiamo a consultare la pagina dedicata sul nostro sito.`}
								/>
							</ListItem>
						</List>
					</Box>

					<Typography
						variant="h5"
						component="h3"
						gutterBottom
					>
						4. Limitazione di Responsabilità
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`4.1 Non forniamo garanzie esplicite o implicite riguardo ai prodotti offerti sul sito, fatta eccezione per quelle espressamente dichiarate.`}
								/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary={`4.2 In nessun caso ${eCommerceConf.NomeEcommerce} o i suoi rappresentanti saranno responsabili per danni diretti, indiretti, speciali o consequenziali derivanti dall'utilizzo o dall'incapacità di utilizzare i nostri prodotti.`}
								/>
							</ListItem>
						</List>
					</Box>

					<Typography
						variant="h5"
						component="h3"
					>
						5. Modifiche alle Condizioni
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`5.1 Ci riserviamo il diritto di modificare le presenti Condizioni Generali di Uso e Vendita in qualsiasi momento senza preavviso. Le modifiche saranno effettive dalla data di pubblicazione sul sito.`}
								/>
							</ListItem>
						</List>
					</Box>

					<Typography
						variant="h5"
						component="h3"
					>
						6. Legge Applicabile e Foro Competente
					</Typography>

					<Box sx={{ marginLeft: 2 }}>
						<List>
							<ListItem>
								<ListItemText
									primary={`6.1 Le presenti Condizioni Generali di Uso e Vendita sono regolate dalla legge in ${eCommerceConf.PaeseRegione}. Eventuali controversie saranno devolute alla competenza esclusiva dei tribunali di ${eCommerceConf.CittaGiurisdizione}.`}
								/>
							</ListItem>
						</List>
					</Box>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
// Assicurati di includere setLoading tra le azioni mapDispatchToProps
const mapDispatchToProps = {
	setLoading,
};

// Wrappa il componente Home con connect per collegarlo al Redux store
export default connect(null, mapDispatchToProps)(TerminiCondizioni);
