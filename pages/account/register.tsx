import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import "dayjs/locale/it";

import { AppBar, CssBaseline, Paper, Step, StepLabel, Stepper, Toolbar, useMediaQuery } from "@mui/material";

import Step1 from "src/components/account/register/Step1";
import styled from "@emotion/styled";
import Image from "next/image";
import Step2 from "src/components/account/register/Step2";
import Step3 from "src/components/account/register/Step3";
import Router from "next/router";
import { useEffect, useState, useRef } from "react";

import eCommerceConf from "eCommerceConf.json";
import dayjs, { Dayjs } from "dayjs";

import { Sex, Focus, AutocompleteSelected, Date, Comune } from "src/components/CommonTypesInterfaces";
import PrivacyLabel from "src/components/utils/PrivacyLabel";

const SignUp = () => {
  const theme = useTheme();

  const focus = useRef<Focus>(null);

  const StyledImageLogo = styled(Image)({
    padding: "10px",
    maxWidth: 300,
  });
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Dati Personali", "Utente", "Finalizza"];
  const underageSteps = ["Dati Personali", "Dati Genitore", "Utente", "Finalizza"];

  const [underage, setUnderage] = useState(true);

  const [codiceFiscale, setCodiceFiscale] = useState("");
  const [codiceFiscaleInvalid, setCodiceFiscaleInvalid] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [parentCodiceFiscale, setParentCodiceFiscale] = useState("");
  const [parentCodiceFiscaleInvalid, setParentCodiceFiscaleInvalid] = useState(false);

  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");

  const [gender, setGender] = useState<Sex>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(null);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [selectedComune, setSelectedComune] = useState<AutocompleteSelected>(null);
  const [provinceOfBirth, setProvinceOfBirth] = useState("");

  const [parentGender, setParentGender] = useState<Sex>(null);
  const [parentDateOfBirth, setParentDateOfBirth] = useState<Date>(null);
  const [parentSelectedComune, setParentSelectedComune] = useState<AutocompleteSelected>(null);
  const [parentPlaceOfBirth, setParentPlaceOfBirth] = useState("");
  const [parentProvinceOfBirth, setParentProvinceOfBirth] = useState("");

  const [address, setAddress] = useState("");
  const [comuneResidenza, setComuneResidenza] = useState<AutocompleteSelected>(null);
  const [city, setCity] = useState("");
  const [cap, setCap] = useState("");
  const [province, setProvince] = useState("");

  const [parentAddress, setParentAddress] = useState("");
  const [parentComuneResidenza, setParentComuneResidenza] = useState<AutocompleteSelected>(null);
  const [parentCity, setParentCity] = useState("");
  const [parentCap, setParentCap] = useState("");
  const [parentProvince, setParentProvince] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+39");

  const [parentEmail, setParentEmail] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("+39");

  const [privacy, setPrivacy] = useState(false);

  const [parentPrivacy, setParentPrivacy] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSafety, setPasswordSafety] = useState({ correct: false, detail: "" });

  const [readyToSend, setReadyToSend] = useState<ReadyToSend>({ status: false, data: null });
  interface ReadyToSend {
    status: boolean;
    data: UserData | null;
  }

  const [disableButton, setDisablebutton] = useState(false);

  const [comuni, setComuni] = useState<Comune[]>([]);

  const stringUpperCase = (string: string) => {
    const arr = string.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  const updateUnderage = (date: Dayjs) => {
    const minDate = dayjs().subtract(18, "year");

    if (date > minDate) {
      setUnderage(true);
    } else {
      setUnderage(false);
    }
  };

  const getComuni = async () => {
    try {
      let response = await fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni");
      let jsonData = await response.json();

      // let keyFulData = jsonData.map((comune, idx) => {
      //   let updatedComune = { ...comune, key: idx };
      //   return updatedComune;
      // });

      setComuni(jsonData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getComuni();
  }, []);

  const Step1User = (
    <Step1
      focus={focus}
      parent={false}
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
    />
  );

  const Step1Parent = (
    <Step1
      focus={focus}
      parent={true}
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
    />
  );

  const Step2User = (
    <Step2
      focus={focus}
      email={email}
      setEmail={setEmail}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      passwordSafety={passwordSafety}
      setPasswordSafety={setPasswordSafety}
    />
  );

  const Step3User = (
    <Step3
      focus={focus}
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

  function getStepContent(step: number) {
    if (underage) {
      switch (step) {
        case 0:
          return Step1User;
        case 1:
          return Step1Parent;
        case 2:
          return Step2User;
        case 3:
          return Step3User;
        default:
          throw new Error("Unknown step");
      }
    } else {
      switch (step) {
        case 0:
          return Step1User;
        case 1:
          return Step2User;
        case 2:
          return Step3User;
        default:
          throw new Error("Unknown step");
      }
    }
  }

  const mdUp = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: false,
  });

  useEffect(() => {
    if (dateOfBirth) {
      updateUnderage(dateOfBirth);
    }
  }, [dateOfBirth]);

  const sendData = (data: UserData) => {
    console.log("YES!");
  };

  // TODO: Handle dateOfBirth and Cap

  interface UserData {
    user: {
      codiceFiscale: string;
      firstName: string;
      lastName: string;
      gender: Sex;
      dateOfBirth: Date;
      placeOfBirth: string;
      provinceOfBirth: string;
      address: string;
      city: string;
      cap: string;
      province: string;
      email: string;
      phoneNumber: string;
      privacy: boolean;
      username: string;
      password: string;
    };
    parent: {
      parentCodiceFiscale: string;
      parentFirstName: string;
      parentLastName: string;
      parentGender: Sex;
      parentDateOfBirth: Date;
      parentPlaceOfBirth: string;
      parentProvinceOfBirth: string;
      parentAddress: string;
      parentCity: string;
      parentCap: string;
      parentProvince: string;
      parentEmail: string;
      parentPhoneNumber: string;
      parentPrivacy: boolean;
    } | null;
  }

  const handleNext = () => {
    if ((underage && activeStep === 2) || (!underage && activeStep === 1)) {
      const data: UserData = {
        user: { codiceFiscale, firstName, lastName, gender, dateOfBirth, placeOfBirth, provinceOfBirth, address, city, cap, province, email, phoneNumber, privacy, username, password },
        parent: underage
          ? {
              parentCodiceFiscale,
              parentFirstName,
              parentLastName,
              parentGender,
              parentDateOfBirth,
              parentPlaceOfBirth,
              parentProvinceOfBirth,
              parentAddress,
              parentCity,
              parentCap,
              parentProvince,
              parentEmail,
              parentPhoneNumber,
              parentPrivacy,
            }
          : null,
      };

      const userCheckPassed = Object.values(data.user).every((value) => value !== null && value !== "" && value !== false);
      const parentCheckPassed = data.parent ? Object.values(data.parent).every((value) => value !== null && value !== "" && value !== false) : true;

      if (underage ? userCheckPassed && parentCheckPassed : userCheckPassed) {
        setReadyToSend({ status: true, data });
      } else {
        setReadyToSend({ status: false, data });
      }

      setActiveStep(activeStep + 1);
    } else if ((underage && activeStep === 3) || (!underage && activeStep === 2)) {
      if (!readyToSend.data) {
        return;
      }
      sendData(readyToSend.data);
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    let correctStep = (underage && activeStep === 2) || (!underage && activeStep === 1);
    (password !== confirmPassword || (passwordSafety && !passwordSafety.correct)) && correctStep ? setDisablebutton(true) : setDisablebutton(false);

    if (correctStep) {
      return;
    }

    let correctStepFinalize = (underage && activeStep === 3) || (!underage && activeStep === 2);
    !readyToSend.status && correctStepFinalize ? setDisablebutton(true) : setDisablebutton(false);
  }, [password, confirmPassword, passwordSafety, activeStep]);

  useEffect(() => {
    // TODO: Fix focus Type shit
    // console.log(typeof focus?.current?.children[1].children[0].focus);
    // if (!focus.current) {
    //   return;
    // }
    // focus?.current?.children[1].children[0].focus();
    // focus.current.children[1].children[0].focus();
  }, [activeStep]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: (theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as { backgroundColor?: string })?.backgroundColor,
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Toolbar>
            <StyledImageLogo src="/images/LogoO.png" alt="Logo" width={200} height={70} priority={true} />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: mdUp ? 3 : 0 }}>
        {/* TODO: Questo meccanismo dovrebbe funzionare insieme alle sub-pagine in maniera tale da poter usare la navigazione/gesture di sistema */}
        {/* TODO: Icons are not centered properly */}
        <Stepper activeStep={activeStep} alternativeLabel>
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
                    userSelect: "none",
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

              <Button variant="contained" disabled={disableButton} onClick={handleNext} sx={{ mt: "auto", ml: 1 }}>
                {underage ? (activeStep === underageSteps.length - 1 ? "Finalizza" : "Successivo") : activeStep === steps.length - 1 ? "Finalizza" : "Successivo"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
