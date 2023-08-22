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
import { Autocomplete, FormControl, FormLabel, Link, Radio, RadioGroup } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import CodiceFiscale from "codice-fiscale-js";

const Step1 = ({
  comuni,
  setComuni,
  getComuni,
  selectedComune,
  setSelectedComune,
  comuneResidenza,
  setComuneResidenza,
  stringUpperCase,
  codiceFiscale,
  codiceFiscaleInvalid,
  setCodiceFiscale,
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
  updateCodiceFiscale,
  updateDate,
  privacyLabel,
}) => {
  const handleSubmit = () => {};

  React.useEffect(() => {
    getComuni();
  }, []);

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
                <TextField
                  error={codiceFiscaleInvalid}
                  value={codiceFiscale}
                  inputProps={{ minLength: 16, maxLength: 16 }}
                  onChange={(e) => updateCodiceFiscale(e)}
                  required
                  fullWidth
                  id="codiceFiscale"
                  label="Codice Fiscale"
                  name="codiceFiscale"
                  autoComplete="codiceFiscale"
                />
              </Grid>
              {/* TODO: "Advanced" trimming to allow inner spaces */}
              <Grid item xs={12} sm={6}>
                <TextField value={firstName} onChange={(e) => setFirstName(stringUpperCase(e.target.value))} inputProps={{ maxLength: 35 }} autoComplete="firstName" name="firstName" required fullWidth id="firstName" label="Nome" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={lastName} onChange={(e) => setLastName(stringUpperCase(e.target.value))} inputProps={{ maxLength: 40 }} required fullWidth id="lastName" label="Cognome" name="lastName" autoComplete="family-name" />
              </Grid>

              <Grid item xs={12}>
                <FormControl required>
                  <FormLabel id="sesso">Sesso</FormLabel>
                  <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)} aria-labelledby="gender" name="gender" row>
                    <FormControlLabel value="female" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="male" control={<Radio />} label="Maschio" />
                    <FormControlLabel value="other" control={<Radio />} label="Altro" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    value={dateOfBirth}
                    onChange={(e) => updateDate(e)}
                    required
                    label="Data di Nascita"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                {/* <TextField
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(stringUpperCase(e.target.value))}
                  inputProps={{ maxLength: 35 }}
                  required
                  fullWidth
                  id="placeOfBirth"
                  label="Luogo di Nascita"
                  name="placeOfBirth"
                  autoComplete="placeOfBirth"
                /> */}

                {/* TODO: Conflicts with setCodiceFiscale... */}
                <Autocomplete
                  value={selectedComune}
                  onChange={(_, comune) => {
                    if (!comune) {
                      return;
                    }
                    console.log(comune);
                    setSelectedComune(comune);
                    setPlaceOfBirth(comune.nome);
                    setProvinceOfBirth(comune.provincia.nome);
                  }}
                  freeSolo
                  inputProps={{ maxLength: 35 }}
                  required
                  id="placeOfBirth"
                  name="placeOfBirth"
                  autoComplete
                  getOptionLabel={(comune) => comune.nome}
                  options={comuni}
                  renderInput={(params) => <TextField {...params} label="Luogo Di Nascita" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={provinceOfBirth}
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
              <Grid item xs={12}>
                <TextField value={address} onChange={(e) => setAddress(stringUpperCase(e.target.value))} inputProps={{ maxLength: 60 }} required fullWidth id="address" label="Indirizzo" name="address" autoComplete="address" />
              </Grid>
              <Grid item xs={12} sm={8}>
                {/* <TextField value={city} onChange={(e) => setCity(stringUpperCase(e.target.value))} inputProps={{ maxLength: 35 }} required fullWidth id="city" label="Città" name="city" autoComplete="city" /> */}
                <Autocomplete
                  value={comuneResidenza}
                  onChange={(_, comune) => {
                    if (!comune) {
                      return;
                    }
                    console.log(comune);
                    setComuneResidenza(comune);
                    setCity(comune.nome);
                    setCap(comune.cap);
                    setProvince(comune.provincia.nome);
                  }}
                  freeSolo
                  autoComplete
                  getOptionLabel={(comune) => comune.nome}
                  options={comuni}
                  renderInput={(params) => <TextField {...params} label="Città" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={cap} onChange={(e) => setCap(e.target.value.trim().replace(/\D/g, ""))} inputProps={{ maxLength: 5 }} required fullWidth id="cap" label="CAP" name="cap" autoComplete="cap" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={province} onChange={(e) => setProvince(stringUpperCase(e.target.value))} inputProps={{ maxLength: 35 }} required fullWidth id="province" label="Provincia" name="province" autoComplete="province" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} inputProps={{ maxLength: 319 }} required fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput sx={{ width: "100%" }} defaultCountry="it" value={phoneNumber} onChange={(e) => setPhoneNumber(e)} inputProps={{ maxLength: 16 }} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <FormControlLabel value={privacy} onChange={() => setPrivacy(!privacy)} required control={<Checkbox value="accettaPrivacy" color="primary" />} label={privacyLabel} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default Step1;
