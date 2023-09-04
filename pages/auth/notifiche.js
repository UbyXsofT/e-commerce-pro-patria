import React from "react";
import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, FormHelperText, Link, Fade, AppBar, Toolbar, Collapse, List } from "@mui/material";
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
import NotificationItem from "../../src/components/notifiche/NotificheItem";

//*-- API---*//
//import home from "../api/home";

const Notifiche = ({ setLoading }) => {
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
  const theme = useTheme();

  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 1</strong>
          </p>
          Questo è un avviso di prova: — <strong>dai un'occhiata!</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 2,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 2</strong>
          </p>
          Questo è un MESSAGGIO di prova: — <strong>prova stile messaggio</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 3,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 3</strong>
          </p>
          Questo è un altro MESSAGGIO di prova: — <strong>prova stile messaggio 3</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 4,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 4</strong>
          </p>
          Questo è un altro AVVISO di prova: — <strong>prova stile Avviso 4</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 5,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 5</strong>
          </p>
          Questo è un avviso di prova: — <strong>dai un'occhiata!</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 6,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 6</strong>
          </p>
          Questo è un MESSAGGIO di prova: — <strong>prova stile messaggio</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 7,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 7</strong>
          </p>
          Questo è un altro MESSAGGIO di prova: — <strong>prova stile messaggio 7</strong>
        </React.Fragment>
      ),
      read: false,
    },
    {
      id: 8,
      text: (
        <React.Fragment>
          <p>
            <strong>TITOLO NOTIFICA 8</strong>
          </p>
          Questo è un altro AVVISO di prova: — <strong>prova stile Avviso 8</strong>
        </React.Fragment>
      ),
      read: false,
    },
    // Add more notifications here
  ]);
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)));
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Avvisi | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        description="This is a E-Commerce Avvisi page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Typography variant="h5" component="h1" gutterBottom>
          NOTIFICHE PAGE (avvisi e messaggi)
        </Typography>

        <List>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              index={index} // Pass index here
              {...notification}
              onDelete={handleDelete}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </List>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(Notifiche);
