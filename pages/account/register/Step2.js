import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import { width } from "@mui/system";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const Step2 = () => {
  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginRight: "auto" }}>
          Crea l'Utente
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} xs={12}>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Indirizzo Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nome Utente"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  type="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Conferma Password"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default Step2;
