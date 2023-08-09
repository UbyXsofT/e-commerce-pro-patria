import React, { Fragment, useState } from "react";
import { Container, Grid, Typography, TextField, Button, Paper, Link, CssBaseline } from "@mui/material";

import Router from "next/router";

const Step1 = ({ setDone }) => {
  return (
    <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: 3 }}>
      <CssBaseline />

      <Grid container spacing={2}>
        <Typography variant="h4" sx={{ margin: "auto", padding: 3 }}>
          Password Dimenticata
        </Typography>
        <Grid item xs={12}>
          <Typography variant="subtitle">Ti verrà inviata una mail per il recupero</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="codiceFiscale" label="Codice Fiscale" name="codiceFiscale" autoComplete="codiceFiscale" />
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
              Invia
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Step1;
