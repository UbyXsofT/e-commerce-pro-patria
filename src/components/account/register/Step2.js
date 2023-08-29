import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "dayjs/locale/it";
import SecurePassword from "/src/components/account/SecurePassword";
import { height } from "@mui/system";

const Step2 = ({ email, setEmail, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, passwordSafety, setPasswordSafety }) => {
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
          Crea l'Utente
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} xs={12} alignItems={"flex-start"}>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" name="username" required fullWidth id="username" label="Nome Utente" autoFocus />
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!passwordSafety.correct && password.length > 0}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  error={password !== confirmPassword && password.length > 0}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Conferma Password"
                />
              </Grid>
              <Grid item xs={12}>
                <SecurePassword password={password} passwordSafety={passwordSafety} setPasswordSafety={setPasswordSafety}></SecurePassword>
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
