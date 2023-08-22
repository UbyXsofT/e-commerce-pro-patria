import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import "dayjs/locale/it";

import { AppBar, CssBaseline, Paper, Step, StepLabel, Stepper, Toolbar } from "@mui/material";

import Step1 from "./register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "./register/Step2";
import Step3 from "./register/Step3";
import Router from "next/router";
import { PrivacyTip } from "@mui/icons-material";

import eCommerceConf from "./../../eCommerceConf.json";
import Genitore from "./register/Genitore";
import CodiceFiscale from "codice-fiscale-js";
import dayjs from "dayjs";

export default function SignUp() {
  const theme = useTheme();

  const StyledImageLogo = styled(Image)({
    padding: "10px",
    maxWidth: 300,
  });
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ["Dati Personali", "Utente", "Finalizza"];
  const underageSteps = ["Dati Personali", "Dati Genitore", "Utente", "Finalizza"];

  const [underage, setUnderage] = React.useState(true);

  const [codiceFiscale, setCodiceFiscale] = React.useState("");
  const [codiceFiscaleInvalid, setCodiceFiscaleInvalid] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [parentCodiceFiscale, setParentCodiceFiscale] = React.useState("");
  const [parentFirstName, setParentFirstName] = React.useState("");
  const [parentLastName, setParentLastName] = React.useState("");

  const [gender, setGender] = React.useState("male");
  const [dateOfBirth, setDateOfBirth] = React.useState({});
  const [placeOfBirth, setPlaceOfBirth] = React.useState();
  const [selectedComune, setSelectedComune] = React.useState(null);
  const [provinceOfBirth, setProvinceOfBirth] = React.useState("");

  const [parentGender, setParentGender] = React.useState("male");
  const [parentDateOfBirth, setParentDateOfBirth] = React.useState("");
  const [parentPlaceOfBirth, setParentPlaceOfBirth] = React.useState();
  const [parentProvinceOfBirth, setParentProvinceOfBirth] = React.useState("");

  const [address, setAddress] = React.useState("");
  const [comuneResidenza, setComuneResidenza] = React.useState(null);
  const [city, setCity] = React.useState();
  const [cap, setCap] = React.useState("");
  const [province, setProvince] = React.useState("");

  const [parentAddress, setParentAddress] = React.useState("");
  const [parentCity, setParentCity] = React.useState();
  const [parentCap, setParentCap] = React.useState("");
  const [parentProvince, setParentProvince] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("+39");

  const [parentEmail, setParentEmail] = React.useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = React.useState("+39");

  const [privacy, setPrivacy] = React.useState(false);

  const [parentPrivacy, setParentPrivacy] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [comuni, setComuni] = React.useState([]);

  const stringUpperCase = (string) => {
    const arr = string.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  const updateCodiceFiscale = (e) => {
    setCodiceFiscale(e.target.value.trim().toUpperCase());
    if (CodiceFiscale.check(e.target.value)) {
      setCodiceFiscaleInvalid(false);
      const cf = new CodiceFiscale(e.target.value);
      const placeOfBirth = stringUpperCase(cf.birthplace.nome.trim().toLocaleLowerCase());
      const comune = comuni.find((comune) => comune.nome.toLocaleLowerCase() === placeOfBirth.toLocaleLowerCase());
      setGender(cf.gender === "M" ? "male" : "female");
      setPlaceOfBirth(placeOfBirth);
      setSelectedComune(comune);
      setProvinceOfBirth(comune.provincia.nome);
      updateDate(dayjs(cf.birthday));
    } else {
      setCodiceFiscaleInvalid(true);
    }
  };

  const updateDate = (e) => {
    const currentDate = new Date();
    setDateOfBirth(e);

    switch (true) {
      case currentDate.getFullYear() - e.$y >= 19:
        setUnderage(false);
        break;

      case currentDate.getFullYear() - e.$y === 18:
        switch (true) {
          case currentDate.getMonth() - e.$M > 0:
            setUnderage(false);
            break;

          case currentDate.getMonth() - e.$M === 0:
            if (currentDate.getDate() - e.$D >= 0) {
              setUnderage(false);
            } else {
              setUnderage(true);
            }
            break;

          default:
            setUnderage(true);
            break;
        }
        break;

      default:
        setUnderage(true);
        break;
    }
  };

  const privacyLabel = (
    <Typography>
      Iscrivendoti dichiari di aver preso visione dell'
      {
        <span>
          <Link href={eCommerceConf.LinkPrivacy} sx={{ color: (theme) => (theme.palette.mode === "light" ? "black" : "white") }}>
            Informativa sulla Privacy {<PrivacyTip sx={{ fontSize: "1rem", color: (theme) => theme.palette.primary.main }}></PrivacyTip>}
          </Link>
        </span>
      }
    </Typography>
  );

  const getComuni = async () => {
    try {
      const response = await fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni");
      const jsonData = await response.json();
      setComuni(jsonData);
    } catch (error) {
      alert(error);
    }
  };

  function getStepContent(step) {
    if (underage) {
      switch (step) {
        case 0:
          return (
            <Step1
              comuni={comuni}
              setComuni={setComuni}
              comuneResidenza={comuneResidenza}
              setComuneResidenza={setComuneResidenza}
              getComuni={getComuni}
              selectedComune={selectedComune}
              setSelectedComune={setSelectedComune}
              stringUpperCase={stringUpperCase}
              codiceFiscale={codiceFiscale}
              codiceFiscaleInvalid={codiceFiscaleInvalid}
              setCodiceFiscale={setCodiceFiscale}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              gender={gender}
              setGender={setGender}
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              placeOfBirth={placeOfBirth}
              setPlaceOfBirth={setPlaceOfBirth}
              provinceOfBirth={provinceOfBirth}
              setProvinceOfBirth={setProvinceOfBirth}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              cap={cap}
              setCap={setCap}
              province={province}
              setProvince={setProvince}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              privacy={privacy}
              setPrivacy={setPrivacy}
              updateCodiceFiscale={updateCodiceFiscale}
              updateDate={updateDate}
              privacyLabel={privacyLabel}
            />
          );
        case 1:
          return (
            <Genitore
              parentCodiceFiscale={parentCodiceFiscale}
              setParentCodiceFiscale={setParentCodiceFiscale}
              parentFirstName={parentFirstName}
              setParentFirstName={setParentFirstName}
              parentLastName={parentLastName}
              setParentLastName={setParentLastName}
              parentGender={parentGender}
              setParentGender={setParentGender}
              parentDateOfBirth={parentDateOfBirth}
              setParentDateOfBirth={setParentDateOfBirth}
              parentPlaceOfBirth={parentPlaceOfBirth}
              setParentPlaceOfBirth={setParentPlaceOfBirth}
              parentProvinceOfBirth={parentProvinceOfBirth}
              setParentProvinceOfBirth={setParentProvinceOfBirth}
              parentAddress={parentAddress}
              setParentAddress={setParentAddress}
              parentCity={parentCity}
              setParentCity={setParentCity}
              parentCap={parentCap}
              setParentCap={setParentCap}
              parentProvince={parentProvince}
              setParentProvince={setParentProvince}
              parentEmail={parentEmail}
              setParentEmail={setParentEmail}
              parentPhoneNumber={parentPhoneNumber}
              setParentPhoneNumber={setParentPhoneNumber}
              parentPrivacy={parentPrivacy}
              setParentPrivacy={setParentPrivacy}
              privacyLabel={privacyLabel}
            />
          );
        case 2:
          return <Step2 email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />;
        case 3:
          return (
            <Step3
              codiceFiscale={codiceFiscale}
              firstName={firstName}
              lastName={lastName}
              gender={gender}
              dateOfBirth={dateOfBirth}
              placeOfBirth={placeOfBirth}
              provinceOfBirth={provinceOfBirth}
              address={address}
              city={city}
              cap={cap}
              province={province}
              email={email}
              phoneNumber={phoneNumber}
              privacy={privacy}
              username={username}
              privacyLabel={privacyLabel}
              underage={underage}
              parentCodiceFiscale={parentCodiceFiscale}
              parentFirstName={parentFirstName}
              parentLastName={parentLastName}
              parentGender={parentGender}
              parentDateOfBirth={parentDateOfBirth}
              parentPlaceOfBirth={parentPlaceOfBirth}
              parentProvinceOfBirth={parentProvinceOfBirth}
              parentAddress={parentAddress}
              parentCity={parentCity}
              parentCap={parentCap}
              parentProvince={parentProvince}
              parentEmail={parentEmail}
              parentPhoneNumber={parentPhoneNumber}
              parentPrivacy={parentPrivacy}
            />
          );
        default:
          throw new Error("Unknown step");
      }
    } else {
      switch (step) {
        case 0:
          return (
            <Step1
              comuni={comuni}
              setComuni={setComuni}
              getComuni={getComuni}
              selectedComune={selectedComune}
              setSelectedComune={setSelectedComune}
              comuneResidenza={comuneResidenza}
              setComuneResidenza={setComuneResidenza}
              stringUpperCase={stringUpperCase}
              codiceFiscale={codiceFiscale}
              codiceFiscaleInvalid={codiceFiscaleInvalid}
              setCodiceFiscale={setCodiceFiscale}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              gender={gender}
              setGender={setGender}
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              placeOfBirth={placeOfBirth}
              setPlaceOfBirth={setPlaceOfBirth}
              provinceOfBirth={provinceOfBirth}
              setProvinceOfBirth={setProvinceOfBirth}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              cap={cap}
              setCap={setCap}
              province={province}
              setProvince={setProvince}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              privacy={privacy}
              setPrivacy={setPrivacy}
              updateCodiceFiscale={updateCodiceFiscale}
              updateDate={updateDate}
              privacyLabel={privacyLabel}
            />
          );
        case 1:
          return <Step2 email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />;
        case 2:
          return (
            <Step3
              codiceFiscale={codiceFiscale}
              firstName={firstName}
              lastName={lastName}
              gender={gender}
              dateOfBirth={dateOfBirth}
              placeOfBirth={placeOfBirth}
              provinceOfBirth={provinceOfBirth}
              address={address}
              city={city}
              cap={cap}
              province={province}
              email={email}
              phoneNumber={phoneNumber}
              privacy={privacy}
              username={username}
              privacyLabel={privacyLabel}
            />
          );
        default:
          throw new Error("Unknown step");
      }
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Toolbar>
            <StyledImageLogo src="/images/LogoO.png" alt="Logo" width={200} height={70} priority={true} />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: 3 }}>
        {/* Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
        <Stepper activeStep={activeStep} sx={{ pt: 3 }}>
          {underage
            ? underageSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))
            : steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
        </Stepper>
        {activeStep === (underage ? underageSteps.length : steps.length) ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }} textAlign={"center"}>
              Registrazione Completata
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              Il tuo account è stato registrato con successo
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => Router.push("/account/login")}
              sx={{
                mt: 3,
                mb: 2,
                width: 500,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}
            >
              Accedi
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "space-between",
                marginTop: "2em",
              }}
            >
              {activeStep == 0 && (
                <Link
                  onClick={() => Router.push("/account/login")}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: (theme) => (theme.palette.mode === "light" ? "black" : "white"),

                    marginRight: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  Hai già un account? Accedi
                </Link>
              )}
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: "auto", ml: 1, marginRight: "auto" }}>
                  Precedente
                </Button>
              )}

              <Button variant="contained" onClick={handleNext} sx={{ mt: "auto", ml: 1 }}>
                {activeStep === steps.length - 1 ? "Finalizza" : "Successivo"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </ThemeProvider>
  );
}
