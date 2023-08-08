import React from "react";
import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, FormHelperText, Link, Fade, AppBar, Toolbar, Collapse, Switch } from "@mui/material";
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

const CookiePolicy = ({ setLoading }) => {
  const theme = useTheme();

  // Rendi visibile il loading impostando setLoading su true
  React.useEffect(() => {
    setLoading(true);
    // Effettua le operazioni di caricamento, se necessario
    // Qui puoi fare richieste API, ottenere i dati, ecc.
    // Quando hai completato il caricamento, imposta isLoading su false:
    setTimeout(() => {
      console.log("Esempio ritardo nel caricare i dati di secondi");
      setLoading(false);
    }, 3000);
  }, []);

  const [checkedCookie_Tecnici, setCheckedCookie_Tecnici] = React.useState(true); // Imposta lo stato iniziale a "true" (Checked)
  const [checkedCookie_Analisi, setCheckedCookie_Analisi] = React.useState(true); // Imposta lo stato iniziale a "true" (Checked)
  const [checkedCookie_Personali, setCheckedCookie_Personali] = React.useState(true); // Imposta lo stato iniziale a "true" (Checked)

  const handleChange_Cookie_Tecnici = (event) => {
    setCheckedCookie_Tecnici(event.target.checked);
    console.log("CoockieTecnici: ", event.target.checked);
    // cambia  lo stato (Checked o Non Checked)
  };
  const handleChange_Cookie_Analisi = (event) => {
    setCheckedCookie_Analisi(event.target.checked);
    console.log("CoockieAnalisi: ", event.target.checked);
    // cambia  lo stato (Checked o Non Checked)
  };
  const handleChange_Cookie_Personali = (event) => {
    setCheckedCookie_Personali(event.target.checked);
    console.log("CoockiePersonali: ", event.target.checked);
    // cambia  lo stato (Checked o Non Checked)
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Cookie-Policy | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        description="This is a E-Commerce Cookie-Policy page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Typography variant="h5" component="h5" gutterBottom>
          Informativa sulla Privacy e Gestione dei Cookie
        </Typography>
        <Typography component="p" paragraph={true}>
          Benvenuto sul nostro sito! Desideriamo informarti riguardo alla nostra politica sulla privacy e alla gestione dei cookie.
        </Typography>
        <Typography variant="h5" component="h3">
          I Cookie
        </Typography>
        <Typography component="p" paragraph={true}>
          I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti il nostro sito web. Essi ci aiutano a migliorare la tua esperienza di navigazione e personalizzare il contenuto per fornirti un servizio migliore.
        </Typography>
        <Typography variant="h5" component="h3">
          Tipologie di Cookie
        </Typography>
        <Typography component="p" paragraph={true}>
          Sul nostro sito web utilizziamo i seguenti tipi di cookie:
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          Cookie Tecnici:
        </Typography>
        <FormControlLabel control={<Switch checked={checkedCookie_Tecnici} onChange={handleChange_Cookie_Tecnici} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Questi cookie sono essenziali per il funzionamento del nostro sito web. Ci aiutano a memorizzare le tue preferenze e garantire il corretto funzionamento del sito.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Cookie di Analisi:
        </Typography>
        <FormControlLabel control={<Switch checked={checkedCookie_Analisi} onChange={handleChange_Cookie_Analisi} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Utilizziamo cookie di analisi per capire come gli utenti interagiscono con il nostro sito web. Questo ci permette di migliorare costantemente le nostre pagine e il contenuto offerto.
        </Typography>
        <Typography variant="h5" component="h3">
          Cookie di Personalizzazione:
        </Typography>
        <FormControlLabel control={<Switch checked={checkedCookie_Personali} onChange={handleChange_Cookie_Personali} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Cookie di Personalizzazione: Questi cookie ci consentono di personalizzare la tua esperienza di navigazione, mostrandoti contenuti pertinenti in base ai tuoi interessi e preferenze.
        </Typography>
        <Typography variant="h5" component="h3">
          La tua Scelta
        </Typography>
        <Typography component="p" paragraph={true}>
          Rispettiamo il tuo diritto di scegliere i cookie che desideri consentire. Puoi modificare le tue preferenze sui cookie in qualsiasi momento accedendo alle impostazioni del tuo browser.
        </Typography>

        <Typography variant="h5" component="h3">
          Informazioni Aggiuntive
        </Typography>
        <Typography component="p" paragraph={true}>
          Per ulteriori dettagli sulla nostra politica sulla privacy, ti invitiamo a leggere{" "}
          <Link href={eCommerceConf.LinkPrivacy} sx={{ color: (theme) => (theme.palette.mode === "light" ? "black" : "white") }}>
            la nostra Informativa sulla Privacy completa
          </Link>
          .
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          Grazie per la tua fiducia e per aver scelto di visitare il nostro sito.
        </Typography>
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
export default connect(null, mapDispatchToProps)(CookiePolicy);
