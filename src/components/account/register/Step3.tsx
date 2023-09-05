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
import PrivacyLabel from "src/components/utils/PrivacyLabel";
import { Focus, Sex, Date } from "src/components/CommonTypesInterfaces";

type Step3Props = {
  focus: React.MutableRefObject<Focus>;
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
  underage: boolean;
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
};

const Step3 = ({
  focus,
  codiceFiscale,
  firstName,
  lastName,
  gender,
  dateOfBirth,
  placeOfBirth,
  provinceOfBirth,
  address,
  city,
  cap,
  province,
  email,
  phoneNumber,
  privacy,
  username,
  underage,
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
}: Step3Props) => {
  const handleSubmit = () => {};

  const [codeFocus, setCodeFocus] = React.useState(true);

  React.useEffect(() => {
    setCodeFocus(false);
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
        <Typography autoFocus component="h1" variant="h5" sx={{ marginRight: "auto" }}>
          Controlla i tuoi dati
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField value={codiceFiscale} disabled={!codeFocus} fullWidth id="codiceFiscale" label="Codice Fiscale" name="codiceFiscale" ref={focus} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={firstName} disabled name="firstName" fullWidth id="firstName" label="Nome" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={lastName} disabled fullWidth id="lastName" label="Cognome" name="lastName" />
              </Grid>

              <Grid item xs={12}>
                <FormControl disabled>
                  <FormLabel id="sesso">Sesso</FormLabel>
                  <RadioGroup value={gender} aria-labelledby="sesso" name="gender" row>
                    <FormControlLabel value="female" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="male" control={<Radio />} label="Maschio" />
                    <FormControlLabel value="other" control={<Radio />} label="Altro" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    disabled
                    value={dateOfBirth}
                    label="Data di Nascita"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField value={placeOfBirth} disabled fullWidth id="placeOfBirth" label="Luogo di Nascita" name="placeOfBirth" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={provinceOfBirth} disabled fullWidth id="provinceOfBirth" label="Provincia" name="provinceOfBirth" />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sm={12} md={6}>
              <Grid item xs={12}>
                <TextField value={address} disabled fullWidth id="address" label="Indirizzo" name="address" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField value={city} disabled fullWidth id="city" label="Città" name="city" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField value={cap} disabled fullWidth id="cap" label="CAP" name="cap" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={province} disabled fullWidth id="province" label="Provincia di Residenza" name="province" />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput value={phoneNumber} disabled sx={{ width: "100%" }} defaultCountry="IT" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField value={email} disabled fullWidth id="email" label="Indirizzo Email" name="email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField value={username} disabled name="username" fullWidth id="username" label="Nome Utente" />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel checked={privacy} disabled control={<Checkbox color="primary" />} label={<PrivacyLabel />} />
            </Grid>
          </Grid>
        </Box>
        {underage ? (
          <div>
            <Typography component="h1" variant="h5" sx={{ marginRight: "auto", marginTop: 1 }}>
              Controlla i Dati del Genitore
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid container item spacing={2} sm={12} md={6}>
                  <Grid item xs={12}>
                    <TextField value={parentCodiceFiscale} disabled required fullWidth id="parentCodiceFiscale" label="Codice Fiscale" name="parentCodiceFiscale" autoComplete="parentCodiceFiscale" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField value={parentFirstName} disabled autoComplete="parentFirstName" name="parentFirstName" required fullWidth id="parentFirstName" label="Nome" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField value={parentLastName} disabled required fullWidth id="parentLastName" label="Cognome" name="parentLastName" autoComplete="family-name" />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl required>
                      <FormLabel disabled id="sesso">
                        Sesso
                      </FormLabel>
                      <RadioGroup value={parentGender} aria-labelledby="parentGender" name="parentGender" row>
                        <FormControlLabel disabled value="female" control={<Radio />} label="Femmina" />
                        <FormControlLabel disabled value="male" control={<Radio />} label="Maschio" />
                        <FormControlLabel disabled value="other" control={<Radio />} label="Altro" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                      <DatePicker
                        value={parentDateOfBirth}
                        disabled
                        label="Data di Nascita"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField disabled value={parentPlaceOfBirth} required fullWidth id="parentPlaceOfBirth" label="Luogo di Nascita" name="parentPlaceOfBirth" autoComplete="parentPlaceOfBirth" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField disabled value={parentProvinceOfBirth} required fullWidth id="parentProvinceOfBirth" label="Provincia" name="parentProvinceOfBirth" autoComplete="ProvinceOfBirth" />
                  </Grid>
                </Grid>

                <Grid container item spacing={2} sm={12} md={6}>
                  <Grid item xs={12}>
                    <TextField disabled value={parentAddress} required fullWidth id="parentAddress" label="Indirizzo" name="parentAddress" autoComplete="parentAddress" />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField disabled value={parentCity} required fullWidth id="parentCity" label="Città" name="parentCity" autoComplete="parentCity" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField disabled value={parentCap} required fullWidth id="parentCap" label="CAP" name="parentCap" autoComplete="parentCap" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField disabled value={parentProvince} required fullWidth id="parentProvince" label="Provincia" name="parentProvince" autoComplete="parentProvince" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField disabled value={parentEmail} required fullWidth id="parentEmail" label="Indirizzo Email" name="parentEmail" autoComplete="parentEmail" />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput disabled sx={{ width: "100%" }} defaultCountry="IT" value={parentPhoneNumber} />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <FormControlLabel disabled required control={<Checkbox checked={parentPrivacy} color="primary" />} label={<PrivacyLabel />} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>
        ) : (
          <div></div>
        )}
      </Box>
    </Container>
  );
};

export default Step3;
