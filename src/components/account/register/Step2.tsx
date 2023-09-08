import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "dayjs/locale/it";
import SecurePassword from "src/components/account/SecurePassword";
import { Focus, PasswordSafety } from "src/components/CommonTypesInterfaces";
import PasswordInput from "src/components/utils/PasswordInput";

type Step2Props = {
  focus: React.MutableRefObject<Focus>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordSafety: PasswordSafety;
  setPasswordSafety: React.Dispatch<React.SetStateAction<PasswordSafety>>;
};

const Step2 = ({ focus, email, setEmail, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, passwordSafety, setPasswordSafety }: Step2Props) => {
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
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <TextField value={email} onBlur={(e) => setEmail(e.target.value.trim())} onChange={(e) => setEmail(e.target.value)} required fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" ref={focus} />
              </Grid>
              <Grid item xs={12}>
                <TextField value={username} onBlur={(e) => setUsername(e.target.value.trim())} onChange={(e) => setUsername(e.target.value)} autoComplete="username" name="username" required fullWidth id="username" label="Nome Utente" />
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <PasswordInput value={password} setValue={setPassword} name="password" fullWidth id="password" label="Password" error={!passwordSafety.correct && password.length > 0} />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
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
                />                 */}
                <PasswordInput value={confirmPassword} setValue={setConfirmPassword} name="confirmPassword" fullWidth id="confirmPassword" label="Conferma Password" error={password !== confirmPassword && password.length > 0} />
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
