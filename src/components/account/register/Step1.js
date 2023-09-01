import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import { FormHelperText, FormControl, FormLabel, Radio, RadioGroup, useMediaQuery } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import CodiceFiscale from "codice-fiscale-js";
import dayjs from "dayjs";
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
import { useEffect, useRef } from "react";
import { ThemeProvider, useTheme } from "@emotion/react";

const Step1 = ({
  focus,
  parent,
  comuni,
  selectedComune,
  setSelectedComune,
  comuneResidenza,
  setComuneResidenza,
  stringUpperCase,
  codiceFiscale,
  codiceFiscaleInvalid,
  setCodiceFiscale,
  setCodiceFiscaleInvalid,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  gender,
  setGender,
  dateOfBirth,
  setDateOfBirth,
  placeOfBirth,
  setPlaceOfBirth,
  provinceOfBirth,
  setProvinceOfBirth,
  address,
  setAddress,
  city,
  setCity,
  cap,
  setCap,
  province,
  setProvince,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  privacy,
  setPrivacy,
  privacyLabel,
}) => {
  const theme = useTheme();

  const handleSubmit = () => {};

  const updateCodiceFiscale = (e) => {
    setCodiceFiscale(e.target.value.trim().toUpperCase());
    if (CodiceFiscale.check(e.target.value)) {
      const cf = new CodiceFiscale(e.target.value);
      const placeOfBirth = stringUpperCase(cf.birthplace.nome.trim().toLocaleLowerCase());
      const comune = comuni.find((comune) => comune.nome.toLocaleLowerCase() === placeOfBirth.toLocaleLowerCase());
      !gender ? setGender(cf.gender === "M" ? "male" : "female") : {};
      setPlaceOfBirth(placeOfBirth);
      setSelectedComune(comune);
      setProvinceOfBirth(comune.provincia.nome);
      !dateOfBirth ? setDateOfBirth(dayjs(cf.birthday)) : {};
    }
  };

  const isCodiceFiscaleInvalid = (codiceFiscale) => {
    if (CodiceFiscale.check(codiceFiscale)) {
      setCodiceFiscaleInvalid(false);
    } else {
      setCodiceFiscaleInvalid(true);
    }
  };

  useEffect(() => {
    isCodiceFiscaleInvalid(codiceFiscale);
  }, [codiceFiscale]);

  useEffect(() => {
    if (firstName && lastName !== "" && dateOfBirth !== null && Object.keys(dateOfBirth).length && (dateOfBirth.constructor === Object) !== 0 && selectedComune !== null) {
      const cf = new CodiceFiscale({
        name: firstName,
        surname: lastName,
        gender: gender === "male" ? "M" : "F",
        day: dateOfBirth.$D,
        month: dateOfBirth.$M + 1,
        year: dateOfBirth.$y,
        birthplace: selectedComune.nome,
      });

      setCodiceFiscale(cf.code);
    }
  }, [firstName, lastName, gender, dateOfBirth, selectedComune]);

  const mdUp = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: false,
  });

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginRight: "auto" }}>
          {parent ? "Inserisci i Dati di un Genitore" : "Inserisci Dati Personali"}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField
                  autoFocus={true}
                  autoComplete="codiceFiscale"
                  error={codiceFiscaleInvalid && codiceFiscale !== ""}
                  value={codiceFiscale}
                  inputProps={{ minLength: 16, maxLength: 16 }}
                  onChange={(e) => updateCodiceFiscale(e)}
                  required
                  fullWidth
                  id="codiceFiscale"
                  label="Codice Fiscale"
                  name="codiceFiscale"
                  ref={focus}
                />
                <FormHelperText>Il Codice Fiscale verrà completato automaticamente con gli altri dati</FormHelperText>
              </Grid>
              {/* TODO: "Advanced" trimming to allow inner spaces */}
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onBlur={(e) => setFirstName(e.target.value.trim())}
                  onChange={(e) => {
                    setFirstName(stringUpperCase(e.target.value));
                  }}
                  inputProps={{ maxLength: 35 }}
                  autoComplete="firstName"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onBlur={(e) => setLastName(e.target.value.trim())}
                  value={lastName}
                  onChange={(e) => setLastName(stringUpperCase(e.target.value))}
                  inputProps={{ maxLength: 40 }}
                  required
                  fullWidth
                  id="lastName"
                  label="Cognome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12} sx={{ height: "72px" }}>
                <FormControl required>
                  <FormLabel id="sesso">Sesso</FormLabel>
                  <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)} aria-labelledby="gender" name="gender" row>
                    <FormControlLabel value="female" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="male" control={<Radio />} label="Maschio" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    disableFuture
                    value={dateOfBirth}
                    maxDate={parent ? dayjs().subtract(18, "year") : null}
                    onChange={(e) => setDateOfBirth(e)}
                    required
                    label="Data di Nascita"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <VirtualizedAutocomplete
                  label={"Luogo di Nascita"}
                  comuni={comuni}
                  placeOfBirth={placeOfBirth}
                  setPlaceOfBirth={setPlaceOfBirth}
                  selectedComune={selectedComune}
                  setSelectedComune={setSelectedComune}
                  setProvinceOfBirth={setProvinceOfBirth}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={provinceOfBirth}
                  onBlur={(e) => setProvinceOfBirth(e.target.value.trim())}
                  onChange={(e) => setProvinceOfBirth(stringUpperCase(e.target.value))}
                  inputProps={{ maxLength: 35 }}
                  required
                  fullWidth
                  id="provinceOfBirth"
                  label="Provincia"
                  name="provinceOfBirth"
                  autoComplete="ProvinceOfBirth"
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sm={12} md={6}>
              {/* TODO: Hide FormHelperText on width <= sm  */}

              <Grid item xs={12}>
                <TextField
                  onBlur={(e) => setAddress(e.target.value.trim())}
                  value={address}
                  onChange={(e) => setAddress(stringUpperCase(e.target.value))}
                  inputProps={{ maxLength: 60 }}
                  required
                  fullWidth
                  id="address"
                  label="Indirizzo"
                  name="address"
                  autoComplete="address"
                />
                <FormHelperText>{mdUp ? " " : ""}</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={8}>
                <VirtualizedAutocomplete label={"Residenza"} comuni={comuni} placeOfBirth={city} setPlaceOfBirth={setCity} selectedComune={comuneResidenza} setSelectedComune={setComuneResidenza} setProvinceOfBirth={setProvince} setCap={setCap} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={cap} onChange={(e) => setCap(e.target.value.trim().replace(/\D/g, ""))} inputProps={{ maxLength: 5 }} required fullWidth id="cap" label="CAP" name="cap" autoComplete="cap" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={(e) => setProvince(e.target.value.trim())}
                  value={province}
                  onChange={(e) => setProvince(stringUpperCase(e.target.value))}
                  inputProps={{ maxLength: 35 }}
                  required
                  fullWidth
                  id="province"
                  label="Provincia"
                  name="province"
                  autoComplete="province"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={(e) => setEmail(e.target.value.trim())}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ maxLength: 319 }}
                  required
                  fullWidth
                  id="email"
                  label="Indirizzo Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput sx={{ width: "100%" }} defaultCountry="it" value={phoneNumber} onChange={(e) => setPhoneNumber(e)} inputProps={{ maxLength: 16 }} required />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <FormControlLabel required control={<Checkbox color="primary" checked={privacy} onChange={() => setPrivacy(!privacy)} />} label={privacyLabel} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Step1;
