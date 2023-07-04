import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Link,
  Fade,
  AppBar,
  Toolbar,
  Collapse,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "/src/store/actions";
//*-----*//
import Layout from "/src/components/layout/Layout";
import eCommerceConfig from "./../../ecommerceConfig.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import CookieManager from "/src/components/cookie/CookieManager";

//*-- API---*//
//import home from "../api/home";

const Home = (setLoading) => {
  //setLoading(true); rende visibile il loading
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Home | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
        description="This is a E-Commerce home page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Typography variant="h4" component="h1" gutterBottom>
          HOME PAGE
        </Typography>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(Home);
