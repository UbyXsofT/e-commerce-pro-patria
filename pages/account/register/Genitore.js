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
import { FormControl, FormLabel, Link, Radio, RadioGroup } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const Genitore = ({
  parentCodiceFiscale,
  setParentCodiceFiscale,
  parentFirstName,
  setParentFirstName,
  parentLastName,
  setParentLastName,
  parentGender,
  setParentGender,
  parentDateOfBirth,
  setParentDateOfBirth,
  parentPlaceOfBirth,
  setParentPlaceOfBirth,
  parentProvinceOfBirth,
  setParentProvinceOfBirth,
  parentAddress,
  setParentAddress,
  parentCity,
  setParentCity,
  parentCap,
  setParentCap,
  parentProvince,
  setParentProvince,
  parentEmail,
  setParentEmail,
  parentPhoneNumber,
  setParentPhoneNumber,
  parentPrivacy,
  setParentPrivacy,
  privacyLabel,
}) => {
  const handleSubmit = () => {};

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
          Inserisci Dati Personali
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField value={parentCodiceFiscale} onChange={(e) => setParentCodiceFiscale(e.target.value)} required fullWidth id="parentCodiceFiscale" label="Codice Fiscale" name="parentCodiceFiscale" autoComplete="parentCodiceFiscale" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={parentFirstName} onChange={(e) => setParentFirstName(e.target.value)} autoComplete="parentFirstName" name="parentFirstName" required fullWidth id="parentFirstName" label="Nome" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={parentLastName} onChange={(e) => setParentLastName(e.target.value)} required fullWidth id="parentLastName" label="Cognome" name="parentLastName" autoComplete="family-name" />
              </Grid>

              <Grid item xs={12}>
                <FormControl required>
                  <FormLabel id="sesso">Sesso</FormLabel>
                  <RadioGroup value={parentGender} onChange={(e) => setParentGender(e.target.value)} aria-labelledby="parentGender" name="parentGender" row>
                    <FormControlLabel value="female" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="male" control={<Radio />} label="Maschio" />
                    <FormControlLabel value="other" control={<Radio />} label="Altro" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    value={parentDateOfBirth}
                    onChange={(e) => {
                      setParentDateOfBirth(e);
                    }}
                    required
                    label="Data di Nascita"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField value={parentPlaceOfBirth} onChange={(e) => setParentPlaceOfBirth(e.target.value)} required fullWidth id="parentPlaceOfBirth" label="Luogo di Nascita" name="parentPlaceOfBirth" autoComplete="parentPlaceOfBirth" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={parentProvinceOfBirth} onChange={(e) => setParentProvinceOfBirth(e.target.value)} required fullWidth id="parentProvinceOfBirth" label="Provincia" name="parentProvinceOfBirth" autoComplete="ProvinceOfBirth" />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField value={parentAddress} onChange={(e) => setParentAddress(e.target.value)} required fullWidth id="parentAddress" label="Indirizzo" name="parentAddress" autoComplete="parentAddress" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField value={parentCity} onChange={(e) => setParentCity(e.target.value)} required fullWidth id="parentCity" label="Città" name="parentCity" autoComplete="parentCity" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={parentCap} onChange={(e) => setParentCap(e.target.value)} required fullWidth id="parentCap" label="CAP" name="parentCap" autoComplete="parentCap" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={parentProvince} onChange={(e) => setParentProvince(e.target.value)} required fullWidth id="parentProvince" label="Provincia" name="parentProvince" autoComplete="parentProvince" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required fullWidth id="parentEmail" label="Indirizzo Email" name="parentEmail" autoComplete="parentEmail" />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput sx={{ width: "100%" }} defaultCountry="it" value={parentPhoneNumber} onChange={(e) => setParentPhoneNumber(e)} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <FormControlLabel value={parentPrivacy} onChange={() => setParentPrivacy(!parentPrivacy)} required control={<Checkbox value="accettaPrivacy" color="primary" />} label={privacyLabel} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default Genitore;
