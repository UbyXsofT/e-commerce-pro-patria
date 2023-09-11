import React, { Dispatch, SetStateAction } from "react";
import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, FormHelperText, Link, Fade, AppBar, Toolbar, Collapse, Switch, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../store/actions";
//*-----*//
import Layout from "../layout/Layout";
import eCommerceConf from "../../../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import CookieManager from "./CookieManager";
import { ContactPageOutlined } from "@mui/icons-material";
import { AnyAction } from "redux";
import PrivacyLabel from "../utils/PrivacyLabel";
import { Box } from "@mui/system";
//*-- API---*//

type ManageCookiesType = {
  setLoading: any;
  checkedTheme: boolean;
  setCheckedTheme: React.Dispatch<SetStateAction<boolean>>;
};

const ManageCookies = ({ setLoading, checkedTheme, setCheckedTheme }: ManageCookiesType) => {
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

  const handleTheme = () => {
    setCheckedTheme(!checkedTheme);
  };

  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box maxHeight={smUp ? "600px" : "450px"} overflow="auto" padding={2}>
        <Typography variant="h4" component="h4" gutterBottom>
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
        <FormControlLabel control={<Switch checked={true} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Questi cookie sono essenziali per il funzionamento del nostro sito web. Ci aiutano a memorizzare le tue preferenze e garantire il corretto funzionamento del sito.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Supporto Al Tema:
        </Typography>
        <FormControlLabel control={<Switch checked={checkedTheme} onChange={handleTheme} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Il Tema viene salvato Localmente, è fortemente raccomandato che questo sia abilitato.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Cookie di Analisi:
        </Typography>
        <FormControlLabel control={<Switch checked={false} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Non utilizziamo Cookie di Analisi.
        </Typography>

        <Typography variant="h5" component="h3">
          Cookie di Personalizzazione:
        </Typography>
        <FormControlLabel control={<Switch checked={false} />} label="Consenti" />
        <Typography component="p" paragraph={true}>
          Non utilizziamo Cookie di Personalizzazione.
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
          Per ulteriori dettagli sulla nostra politica sulla privacy, ti invitiamo a leggere
          <PrivacyLabel invert={true} />
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          Grazie per la tua fiducia e per aver scelto di visitare il nostro sito.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

//REDUX-STORE
// Assicurati di includere setLoading tra le azioni mapDispatchToProps
const mapDispatchToProps = {
  setLoading,
};

// Wrappa il componente Home con connect per collegarlo al Redux store
export default connect(null, mapDispatchToProps)(ManageCookies);
