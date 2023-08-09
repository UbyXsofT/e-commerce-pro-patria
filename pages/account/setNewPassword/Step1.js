import { Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Router from "next/router";

const Step1 = ({ setDone }) => {
  return (
    <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: 3 }}>
      <CssBaseline />

      <Grid container spacing={2}>
        <Typography variant="h4" sx={{ margin: "auto", padding: 3 }}>
          Imposta una Nuova Password
        </Typography>
        <Grid item xs={12}>
          <Typography variant="subtitle">Crea una Nuova Password per il tuo Account</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField required fullWidth id="newPassword" label="Nuova Password" name="newPassword" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="confirmNewPassword" label="Conferma Nuova Password" name="confirmNewPassword" />
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
