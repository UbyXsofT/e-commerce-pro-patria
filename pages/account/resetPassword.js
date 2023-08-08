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
import eCommerceConfig from "./../../ecommerceConfig.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

import CookieManager from "/src/components/cookie/CookieManager";
import login from "../api/login";
import Router from "next/router";
import Step1 from "./resetPassword/Step1";
import Step2 from "./resetPassword/Step2";

const StyledImageLogo = styled(Image)({
  padding: "10px",
  maxWidth: 300,
});

const resetPassword = (setLoading) => {
  //setLoading(true); rende visibile il loading
  const theme = useTheme();

  const [done, setDone] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Login | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
        description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      > */}
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.components.MuiAppBar.styleOverrides.colorInherit,
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Toolbar>
            <StyledImageLogo
              src="/images/LogoO.png"
              alt="Logo"
              width={200}
              height={70}
              priority={true}
            />
          </Toolbar>
        </Container>
      </AppBar>
      {done ? <Step2 /> : <Step1 setDone={setDone} />}
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(resetPassword);
