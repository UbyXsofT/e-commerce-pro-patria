import React from "react";
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
  Paper,
  Box,
  Avatar,
  Link,
  CssBaseline,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "/src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/LayoutLogin";
import eCommerceConfig from "../../ecommerceConfig.json";
import Image from "next/image";

import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CookieManager from "/src/components/cookie/CookieManager";
// import TemaSwitch from "../../src/components/theme/TemaSwitch";
import login from "../api/login";
import Router from "next/router";

import { PrivacyCookie } from "../../src/components/layout/footer/PrivacyCookie";
import { ScrollToTopBtn } from "../../src/components/layout/footer/ScrollToTopBtn";
import { PartitaIva } from "../../src/components/layout/footer/PartitaIva";
import Copyright from "../../src/components/layout/footer/Copyright";

import CookieConsent from "../../src/components/cookie/CookieConsent";

const Login = (setLoading) => {
  //setLoading(true); rende visibile il loading
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = React.useState("Admin");
  const [password, setPassword] = React.useState("Psw");
  const [rememberMe, setRememberMe] = React.useState(true);

  const [paddingTop, setPaddingTop] = React.useState(0);
  React.useEffect(() => {
    const calculatePaddingTop = () => {
      const windowHeight = window.innerHeight;
      const mainHeight = document.getElementById("main").offsetHeight;
      const calculatedPaddingTop = (windowHeight - mainHeight) / 2;
      setPaddingTop(calculatedPaddingTop);
    };

    calculatePaddingTop();
    window.addEventListener("resize", calculatePaddingTop);

    return () => {
      window.removeEventListener("resize", calculatePaddingTop);
    };
  }, []);

  const handleLogin = async () => {
    const { token, error, success } = await login(
      username,
      password,
      rememberMe
    );
    console.log("token: ", token);
    console.log("error: ", error);
    console.log("success: ", success);

    Router.push("/auth/home");
    //Client gestisce il token e i cookie qui
    if (success) {
      // Salva il token di accesso come cookie o nello stato dell'applicazione
      CookieManager.setCookie("token", token, { expires: 7 });
      // Esegui altre azioni dopo il login
      Router.push("/auth/home");
    } else {
      // Gestisci l'errore di autenticazione o l'errore di connessione
    }
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Imposta il colore grigio e l'opacità desiderati
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const handleSubmit = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Login | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
        description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <AppBar
          position="static"
          sx={{
            display: isMobile ? "block" : "none",
            backgroundColor:
              theme.components.MuiAppBar.styleOverrides.colorInherit,
          }}
        >
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Toolbar>
              <Image
                src="/images/LogoO.png"
                alt="Logo"
                width={200}
                height={70}
                priority={true}
                style={{ padding: "10px", maxWidth: 300 }}
              />
            </Toolbar>
          </Container>
        </AppBar>

        <Box id="main" sx={{ paddingTop: `${paddingTop}px` }}>
          <Grid container component="main" sx={{ py: 2, px: 2 }}>
            {/* TODO There has to be a better way to implement this */}
            <CssBaseline />
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={false}
              sm={4}
              md={7}
              component={Paper}
              elevation={6}
              square
              sx={{
                backgroundImage:
                  "url(https://upload.wikimedia.org/wikipedia/commons/3/36/Gym_Free-weights_Area.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                //display: !isMobile ? "block" : "none",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "50%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/images/LogoQ.png"
                  alt="Logo"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "contain" }}
                  //objectFit='contain'
                  priority={true}
                />
              </div>
              <Box sx={overlayStyle} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Accedi
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nome Utente"
                    name="username"
                    autoComplete="username"
                    InputProps={{
                      style: {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#121212" : "#ffffff",
                        color: "#ffffff",
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Ricordati di me"
                  />
                  <Button
                    //   type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                  >
                    Accedi
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href=""
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: (theme) =>
                            theme.palette.mode === "light" ? "black" : "white",
                        }}
                        onClick={() => Router.push("/account/resetPassword")}
                      >
                        Password dimenticata?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        onClick={() => Router.push("/account/register")}
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: (theme) =>
                            theme.palette.mode === "light" ? "black" : "white",
                        }}
                      >
                        Non hai un account? Iscriviti
                      </Link>
                    </Grid>
                  </Grid>
                  {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box style={{ bottom: 0, position: "relative" }}>
            <Box style={{ paddingLeft: "20px" }}>
              <PrivacyCookie>
                <ScrollToTopBtn />
              </PrivacyCookie>
            </Box>
            {/* <Divider sx={{mb: "1rem", mt: "1rem"}} /> */}
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: 1,
                p: 2,
                m: 2,
              }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "white" }}
              >
                <PartitaIva />
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: "white" }}
              >
                <Copyright />
              </Typography>
            </Box>
          </Box>
          {/* <CookieConsent /> */}
        </Box>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(Login);
