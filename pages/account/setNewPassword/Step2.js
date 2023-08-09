import React from "react";
import { Container, Typography, Button, Paper } from "@mui/material";

import Router from "next/router";

const Step2 = () => {
  return (
    <Container maxWidth={"md"} component={Paper} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }} textAlign={"center"}>
        Password Modificata
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        È possibile fare il Login
      </Typography>
      <Button
        fullWidth
        variant="contained"
        onClick={() => Router.push("/account/login")}
        sx={{
          mt: 3,
          mb: 2,
          width: 500,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
        }}
      >
        Accedi
      </Button>
    </Container>
  );
};

export default Step2;
