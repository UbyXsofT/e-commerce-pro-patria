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
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const Step3 = () => {
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
          Controlla i tuoi dati
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField disabled fullWidth id="codiceFiscale" label="Codice Fiscale" name="codiceFiscale" autoComplete="codiceFiscale" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField disabled autoComplete="given-name" name="firstName" fullWidth id="firstName" label="Nome" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField disabled fullWidth id="lastName" label="Cognome" name="lastName" autoComplete="family-name" />
              </Grid>

              <Grid item xs={12}>
                <FormControl disabled>
                  <FormLabel id="sesso">Sesso</FormLabel>
                  <RadioGroup aria-labelledby="sesso" defaultValue="female" name="sesso" row>
                    <FormControlLabel value="femmina" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="maschio" control={<Radio />} label="Maschio" />
                    <FormControlLabel value="altro" control={<Radio />} label="Altro" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    disabled
                    label="Data di Nascita"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField disabled fullWidth id="luogoNascita" label="Luogo di Nascita" name="luogoNascita" autoComplete="luogoNascita" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField disabled fullWidth id="provinciaNascita" label="Provincia" name="provinciaNascita" autoComplete="provinciaNascita" />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField disabled fullWidth id="indirizzo" label="Indirizzo" name="indirizzo" autoComplete="indirizzo" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField disabled fullWidth id="città" label="Città" name="città" autoComplete="città" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField disabled fullWidth id="cap" label="CAP" name="cap" autoComplete="cap" />
              </Grid>
              <Grid item xs={12}>
                <TextField disabled fullWidth id="provincia" label="Provincia di Residenza" name="provincia" autoComplete="provincia" />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput disabled sx={{ width: "100%" }} defaultCountry="it" value="+39" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled autoComplete="username" name="username" fullWidth id="username" label="Nome Utente" autoFocus />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel disabled control={<Checkbox value="accettaPrivacy" color="primary" />} label="Iscrivendoti dichiari di aver preso visione dell'Informativa sulla Privacy" />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default Step3;
