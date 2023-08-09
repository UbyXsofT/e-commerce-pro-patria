import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, AppBar, Toolbar, Paper, Box, Avatar, Link, CssBaseline } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "/src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/LayoutLogin";
import eCommerceConf from "../../eCommerceConf.json";
import Image from "next/image";

import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CookieManager from "/src/components/cookie/CookieManager";
// import TemaSwitch from "../../src/components/theme/TemaSwitch";
import login from "../api/login";
import Router from "next/router";

import { PartitaIva } from "../../src/components/layout/footer/PartitaIva";
import Copyright from "../../src/components/layout/footer/Copyright";

import { useAlertMe } from "../../src/components/layout/alert/AlertMeContext";
import { AlertMe } from "../../src/components/layout/alert/AlertMe";

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

  const [captchaValue, setCaptchaValue] = React.useState(null);
  const { showAlert } = useAlertMe();

  const handleLogin = async () => {
    // Controlla se il captchaValue è valido prima di procedere con il login
    if (!captchaValue) {
      console.log("Si prega di completare il reCAPTCHA.");
      const textAlert = (
        <React.Fragment>
          <h3>
            <strong>Si prega di completare il reCAPTCHA.</strong>
          </h3>
        </React.Fragment>
      );
      await showAlert(null, "error", "ATTENZIONE!", textAlert, true);
      return;
    }

    const { token, error, success } = await login(username, password, rememberMe);
    console.log("token: ", token);
    console.log("error: ", error);
    console.log("success: ", success);
    //Router.push("/auth/home");

    //Client gestisce il token e i cookie qui
    if (success) {
      // Salva il token di accesso come cookie o nello stato dell'applicazione
      CookieManager.setCookie("token", token, { expires: 7 });
      // Esegui altre azioni dopo il login
      Router.push("/auth/home");
    } else {
      // Gestisci l'errore di autenticazione o l'errore di connessione
      const textAlert = (
        <React.Fragment>
          <h3>
            <strong>{error}</strong>
          </h3>
        </React.Fragment>
      );
      showAlert(null, "error", "ATTENZIONE!", textAlert, true);
    }
  };
  const StyledImageLogo = styled(Image)({
    padding: "5px",
    maxWidth: 190,
    maxHeight: 60,
    marginLeft: -30,
  });

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
        title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <AlertMe />
        <AppBar
          position="static"
          sx={{
            display: isMobile ? "block" : "none",
            backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
          }}
        >
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Toolbar>
              <StyledImageLogo
                // src='/images/LogoO.png'
                // alt='Logo'
                // width={200}
                // height={70}
                // priority={true}
                // style={{padding: "10px", maxWidth: 300}}
                src="/images/LogoO.png"
                alt="Logo"
                width={190}
                height={70}
                priority={true}
                sx={{ cursor: "pointer" }}
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
                backgroundImage: "url(/images/wallpaper.jpg)",
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

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nome Utente"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#121212",
                      },
                    }}
                  />
                  <TextField
                    value={password}
                    onChange={(event) => {
                      console.log(event.target.value);
                      return setPassword(event.target.value);
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel control={<Checkbox value="remember" color="primary" checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} />} label="Ricordati di me" />

                  {/* Add the reCAPTCHA component */}
                  <ReCAPTCHA sitekey={eCommerceConf.YOUR_RECAPTCHA_SITE_KEY} onChange={(value) => setCaptchaValue(value)} />

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
                        onClick={() => Router.push("/account/resetPassword")}
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: (theme) => (theme.palette.mode === "light" ? "black" : "white"),
                        }}
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
                          color: (theme) => (theme.palette.mode === "light" ? "black" : "white"),
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

            <Box style={{ width: "100%", marginTop: 30 }}>
              {/* <Box style={{paddingLeft: "20px"}}>
							<PrivacyCookie>
								<ScrollToTopBtn />
							</PrivacyCookie>
						</Box> */}
              {/* <Divider sx={{mb: "1rem", mt: "1rem"}} /> */}
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  borderRadius: 1,
                  p: 2,
                  m: 2,
                }}
              >
                <Typography variant="body2" align="center" sx={{ color: "white" }}>
                  <PartitaIva />
                </Typography>

                <Typography variant="body2" align="center" sx={{ color: "white" }}>
                  <Copyright />
                </Typography>
              </Box>
            </Box>
            {/* <CookieConsent /> */}
          </Grid>
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
