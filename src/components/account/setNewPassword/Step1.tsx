import { Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import PasswordInput from "src/components/utils/PasswordInput";

type Step1Props = {
  smUp: boolean;
  setDone: Dispatch<SetStateAction<boolean>>;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  confirmNewPassword: string;
  setConfirmNewPassword: Dispatch<SetStateAction<string>>;
};

const Step1 = ({ smUp, setDone, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword }: Step1Props) => {
  return (
    <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: smUp ? 3 : 0 }}>
      <CssBaseline />

      <Grid container spacing={2}>
        <Typography variant="h4" sx={{ margin: "auto", padding: 3 }}>
          Imposta una Nuova Password
        </Typography>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Crea una Nuova Password per il tuo Account</Typography>
        </Grid>

        <Grid item xs={12}>
          <PasswordInput value={newPassword} setValue={setNewPassword} fullWidth id="newPassword" label="Nuova Password" name="newPassword" />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput value={confirmNewPassword} setValue={setConfirmNewPassword} fullWidth id="confirmNewPassword" label="Conferma Nuova Password" name="confirmNewPassword" />
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
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
              Annulla
            </Link>
            <Button variant="contained" sx={{ mt: "auto" }} onClick={() => setDone(true)}>
              Conferma
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Step1;
