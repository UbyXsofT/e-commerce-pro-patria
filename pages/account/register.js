import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import "dayjs/locale/it";

import { AppBar, CssBaseline, Paper, Step, StepLabel, Stepper, Toolbar } from "@mui/material";

import Step1 from "/src/components/account/register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "/src/components/account/register/Step2";
import Step3 from "/src/components/account/register/Step3";
import Router from "next/router";
import { PrivacyTip } from "@mui/icons-material";

import eCommerceConf from "/eCommerceConf.json";
import Genitore from "/src/components/account/register/Genitore";
import CodiceFiscale from "codice-fiscale-js";

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
  const [parentCodiceFiscaleInvalid, setParentCodiceFiscaleInvalid] = React.useState(false);

  const [parentFirstName, setParentFirstName] = React.useState("");
  const [parentLastName, setParentLastName] = React.useState("");

  const [gender, setGender] = React.useState(null);
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const [placeOfBirth, setPlaceOfBirth] = React.useState(null);
  const [selectedComune, setSelectedComune] = React.useState(null);
  const [provinceOfBirth, setProvinceOfBirth] = React.useState("");

  const [parentGender, setParentGender] = React.useState(null);
  const [parentDateOfBirth, setParentDateOfBirth] = React.useState(null);
  const [parentSelectedComune, setParentSelectedComune] = React.useState(null);
  const [parentPlaceOfBirth, setParentPlaceOfBirth] = React.useState(null);
  const [parentProvinceOfBirth, setParentProvinceOfBirth] = React.useState("");

  const [address, setAddress] = React.useState("");
  const [comuneResidenza, setComuneResidenza] = React.useState(null);
  const [city, setCity] = React.useState();
  const [cap, setCap] = React.useState("");
  const [province, setProvince] = React.useState("");

  const [parentAddress, setParentAddress] = React.useState("");
  const [parentComuneResidenza, setParentComuneResidenza] = React.useState(null);
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

  const updateUnderage = (e) => {
    const currentDate = new Date();

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
      let response = await fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni");
      let jsonData = await response.json();

      let keyFulData = jsonData.map((comune, idx) => {
        let updatedComune = { ...comune, key: idx };
        return updatedComune;
      });

      setComuni(keyFulData);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getComuni();
  }, []);

  function getStepContent(step) {
    if (underage) {
      switch (step) {
        case 0:
          return (
            <Step1
              comuni={comuni}
              comuneResidenza={comuneResidenza}
              setComuneResidenza={setComuneResidenza}
              selectedComune={selectedComune}
              setSelectedComune={setSelectedComune}
              stringUpperCase={stringUpperCase}
              codiceFiscale={codiceFiscale}
              codiceFiscaleInvalid={codiceFiscaleInvalid}
              setCodiceFiscale={setCodiceFiscale}
              setCodiceFiscaleInvalid={setCodiceFiscaleInvalid}
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
              privacyLabel={privacyLabel}
            />
          );
        case 1:
          return (
            <Step1
              comuni={comuni}
              comuneResidenza={parentComuneResidenza}
              setComuneResidenza={setParentComuneResidenza}
              selectedComune={parentSelectedComune}
              setSelectedComune={setParentSelectedComune}
              stringUpperCase={stringUpperCase}
              codiceFiscale={parentCodiceFiscale}
              codiceFiscaleInvalid={parentCodiceFiscaleInvalid}
              setCodiceFiscale={setParentCodiceFiscale}
              setCodiceFiscaleInvalid={setParentCodiceFiscaleInvalid}
              firstName={parentFirstName}
              setFirstName={setParentFirstName}
              lastName={parentLastName}
              setLastName={setParentLastName}
              gender={parentGender}
              setGender={setParentGender}
              dateOfBirth={parentDateOfBirth}
              setDateOfBirth={setParentDateOfBirth}
              placeOfBirth={parentPlaceOfBirth}
              setPlaceOfBirth={setParentPlaceOfBirth}
              provinceOfBirth={parentProvinceOfBirth}
              setProvinceOfBirth={setParentProvinceOfBirth}
              address={parentAddress}
              setAddress={setParentAddress}
              city={parentCity}
              setCity={setParentCity}
              cap={parentCap}
              setCap={setParentCap}
              province={parentProvince}
              setProvince={setParentProvince}
              email={parentEmail}
              setEmail={setParentEmail}
              phoneNumber={parentPhoneNumber}
              setPhoneNumber={setParentPhoneNumber}
              privacy={parentPrivacy}
              setPrivacy={setParentPrivacy}
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
              selectedComune={selectedComune}
              setSelectedComune={setSelectedComune}
              comuneResidenza={comuneResidenza}
              setComuneResidenza={setComuneResidenza}
              stringUpperCase={stringUpperCase}
              codiceFiscale={codiceFiscale}
              codiceFiscaleInvalid={codiceFiscaleInvalid}
              setCodiceFiscale={setCodiceFiscale}
              setCodiceFiscaleInvalid={setCodiceFiscaleInvalid}
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

  React.useEffect(() => {
    if (dateOfBirth) {
      updateUnderage(dateOfBirth);
    }
  }, [dateOfBirth]);

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
        {/* TODO: Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
        {/* TODO: Icons are not centered properly */}
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
                {underage ? (activeStep === underageSteps.length - 1 ? "Finalizza" : "Successivo") : activeStep === steps.length - 1 ? "Finalizza" : "Successivo"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </ThemeProvider>
  );
}
