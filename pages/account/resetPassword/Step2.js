import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  AppBar,
  Toolbar,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "/src/store/actions";
//*-----*//
import Layout from "/src/components/layout/LayoutLogin";
import Image from "next/image";
import { styled } from "@mui/material/styles";

import CookieManager from "/src/components/cookie/CookieManager";
import Router from "next/router";

const Step2 = () => {
  return (
    <Container
      maxWidth={"md"}
      component={Paper}
      sx={{ padding: 3, marginTop: 3 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: 3 }}
        textAlign={"center"}
      >
        Password Dimenticata
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        È stata inviata una mail di recupero
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
