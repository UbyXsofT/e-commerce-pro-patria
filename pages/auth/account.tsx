import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Divider,
  ButtonGroup,
  Paper,
  Card,
  Avatar,
  FormHelperText,
} from "@mui/material";
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
import stringUpperCase from "src/components/utils/stringUpperCase";
import VirtualizedAutocomplete from "src/components/account/register/VirtualizedAutocomplete";
import {
  AutocompleteSelected,
  ComunePaese,
} from "src/components/CommonTypesInterfaces";
import getComuni from "src/components/utils/getComuni";
import { MuiTelInput } from "mui-tel-input";
import PasswordInput from "src/components/utils/PasswordInput";
import { LockOutlined } from "@mui/icons-material";

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
  const [interfaceState, setInterfaceState] = useState<
    "read" | "authenticate" | "modify"
  >("read");

  const name = "Mattia";
  const surname = "Formichetti";
  const fiscalCode = "FRMMTT04B08H282M";
  const address = "Via Principe di Piemonte 28";
  const city = "Colli Sul Velino";
  const province = "Rieti";
  const cap = "02010";
  const phoneNumber = "+39 347 288 5462";
  const email = "mattiaformichetti@gmail.com";

  const [modifyAddress, setModifyAddress] = useState(address);
  const [modifyCity, setModifyCity] = useState(city);
  const [modifyProvince, setModifyProvince] = useState(province);
  const [modifyCap, setModifyCap] = useState(cap);
  const [modifyEmail, setModifyEmail] = useState(email);
  const [modifyPhoneNumber, setModifyPhoneNumber] = useState(phoneNumber);

  const [selectedComune, setSelectedComune] =
    useState<AutocompleteSelected>(null);
  const [comuni, setComuni] = useState<ComunePaese[]>([]);

  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    getComuni(setComuni);
  }, []);

  const sendData = (
    modifyAddress: string,
    modifyCity: string,
    modifyProvince: string,
    modifyCap: string,
    modifyEmail: string,
    modifyPhoneNumber: string
  ) => {
    setInterfaceState("read");
  };

  // TODO: Implement Password Checking
  const passwordCheck = (password: string) => true;

  const defineUI = (interfaceState: "read" | "authenticate" | "modify") => {
    switch (interfaceState) {
      case "read":
        return (
          <>
            <Typography variant="h4" marginBottom={3}>
              Dati Utente
            </Typography>
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
                  inputProps={{ maxLength: 319 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ButtonGroup fullWidth>
                  <Button
                    onClick={() => setInterfaceState("authenticate")}
                    variant="contained"
                  >
                    <EditIcon style={{ marginRight: 5 }} />
                    Modifica Utente
                  </Button>
                  <Button
                    onClick={() => {
                      router.push({
                        pathname: "/account/resetPassword",
                        query: { origin: "/auth/account" },
                      });
                    }}
                  >
                    <KeyIcon style={{ marginRight: 5 }} />
                    Cambia Password
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} md={6} marginBottom={3}>
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
        );
      case "authenticate":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                padding: 3,
                maxWidth: "350px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main", alignSelf: "center" }}
              >
                <LockOutlined />
              </Avatar>
              <Typography variant="h4" marginBottom={3} textAlign={"center"}>
                Autenticazione
              </Typography>
              <PasswordInput
                name="password"
                id="password"
                error={wrongPassword}
                value={password}
                setValue={setPassword}
                label="Password"
              />
              <FormHelperText>
                Inserisci la tua <strong>Password</strong> per{" "}
                <strong>Autenticarti</strong>
              </FormHelperText>
              <div
                style={{
                  marginTop: "10em",
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                  marginBottom: "1em",
                }}
              >
                <Button
                  onClick={() => {
                    setInterfaceState("read");
                    setWrongPassword(false);
                  }}
                >
                  Annulla
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (passwordCheck(password) === true) {
                      setInterfaceState("modify");
                      setWrongPassword(false);
                    } else {
                      setWrongPassword(true);
                    }
                  }}
                  disabled={!password}
                >
                  Autentica
                </Button>
              </div>
            </Card>
          </div>
        );
      case "modify":
        return (
          <>
            <Typography variant="h4" marginBottom={3}>
              Modifica Dati
            </Typography>
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  value={modifyAddress}
                  onChange={(e) => {
                    setModifyAddress(stringUpperCase(e.target.value));
                  }}
                  onBlur={(e) => {
                    setModifyAddress(e.target.value.trim());
                  }}
                  inputProps={{ maxLength: 60 }}
                  label="Indirizzo"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VirtualizedAutocomplete
                  label={"Residenza"}
                  comuni={comuni}
                  placeOfBirth={modifyCity}
                  setPlaceOfBirth={setModifyCity}
                  selectedComune={selectedComune}
                  setSelectedComune={setSelectedComune}
                  setProvinceOfBirth={setModifyProvince}
                  setCap={setModifyCap}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={modifyProvince}
                  onChange={(e) => {
                    setModifyProvince(e.target.value);
                  }}
                  onBlur={(e) => {
                    setModifyProvince(e.target.value.trim());
                  }}
                  inputProps={{ maxLength: 35 }}
                  label="Provincia"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={modifyCap}
                  onChange={(e) => {
                    setModifyCap(e.target.value.trim().replace(/\D/g, ""));
                  }}
                  inputProps={{ maxLength: 5, minLength: 5 }}
                  label="CAP"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={modifyEmail}
                  onChange={(e) => {
                    setModifyEmail(e.target.value.trim().toLowerCase());
                  }}
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiTelInput
                  label="Telefono"
                  sx={{ width: "100%" }}
                  defaultCountry="IT"
                  value={modifyPhoneNumber}
                  onChange={(e) => setModifyPhoneNumber(e)}
                  inputProps={{ maxLength: 16 }}
                  required
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
                marginBottom: "1em",
              }}
            >
              <Button
                onClick={() => {
                  setInterfaceState("read");
                }}
              >
                Annulla
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  sendData(
                    modifyAddress,
                    modifyCity,
                    modifyProvince,
                    modifyCap,
                    modifyEmail,
                    modifyPhoneNumber
                  );
                }}
                disabled={
                  !modifyAddress ||
                  !modifyCity ||
                  !modifyProvince ||
                  !modifyCap ||
                  modifyCap.length !== 5 ||
                  !modifyEmail ||
                  !modifyPhoneNumber
                }
              >
                Conferma
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout
        openSettings={openCookies}
        setOpenSettings={setOpenCookies}
        //digitare il titolo della pagina e la descrizione della pagina.
        // title={`Avvisi | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        // description="This is a E-Commerce Avvisi page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Container maxWidth="md">{defineUI(interfaceState)}</Container>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(AccountSettings);
