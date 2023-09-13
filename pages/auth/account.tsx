import React, { useState } from "react";
import { Grid, Button, Typography, TextField, Divider, ButtonGroup } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/Layout";
import { useRouter } from "next/router";
import { Container } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import SettingsIcon from "@mui/icons-material/Settings";

type AccountSettingsProps = {
  _setLoading: (isLoading: boolean) => {
    type: string;
    payload: boolean;
  };
};

const AccountSettings = ({ _setLoading }: AccountSettingsProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [openCookies, setOpenCookies] = useState(false);
  const [modifyData, setModifyData] = useState(false);

  const name = "Mattia";
  const surname = "Formichetti";
  const fiscalCode = "FRMMTT04B08H282M";
  const address = "Via Principe di Piemonte 28";
  const city = "Colli Sul Velino";
  const province = "Rieti";
  const cap = "02010";
  const phoneNumber = "+39 347 288 5462";
  const email = "mattiaformichetti@gmail.com";

  return (
    <ThemeProvider theme={theme}>
      <Layout
        openSettings={openCookies}
        setOpenSettings={setOpenCookies}
        //digitare il titolo della pagina e la descrizione della pagina.
        // title={`Avvisi | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        // description="This is a E-Commerce Avvisi page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Container maxWidth="md">
          <Typography variant="h4" marginBottom={3}>
            Dati Utente
          </Typography>

          {modifyData ? (
            <div></div>
          ) : (
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  value={name}
                  label="Nome"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  value={surname}
                  label="Cognome"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={fiscalCode}
                  label="Codice Fiscale"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4.5}>
                <TextField
                  value={address}
                  label="Indirizzo"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={1.5}>
                <TextField
                  value={cap}
                  label="CAP"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  value={city}
                  label="Città"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  value={province}
                  label="Provincia"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  value={phoneNumber}
                  label="Telefono"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={email}
                  label="Email"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {modifyData ? (
            <></>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ButtonGroup fullWidth>
                    <Button onClick={() => setModifyData(!modifyData)} variant="contained">
                      <EditIcon style={{ marginRight: 5 }} />
                      Modifica Utente
                    </Button>
                    <Button
                      onClick={() => {
                        router.push({ pathname: "/account/resetPassword", query: { origin: "/auth/account" } });
                      }}
                    >
                      <KeyIcon style={{ marginRight: 5 }} />
                      Cambia Password
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ButtonGroup fullWidth>
                    <Button
                      onClick={() => {
                        setOpenCookies(true);
                      }}
                    >
                      <SettingsIcon style={{ marginRight: 5 }} />
                      Configura Cookie
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("cookieSettings");
                      }}
                      color="warning"
                    >
                      <DeleteIcon style={{ marginRight: 5 }} />
                      Rimuovi Cookie
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(AccountSettings);
