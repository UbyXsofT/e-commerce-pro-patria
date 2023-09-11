import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, AppBar, Toolbar, Paper, Box, Avatar, Link, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../src/store/actions";
//*-----*//
import Layout from "../src/components/layout/LayoutLogin";
import eCommerceConf from "../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useRouter } from "next/router";

import { PrivacyCookie } from "../src/components/layout/footer/PrivacyCookie";
import { ScrollToTopBtn } from "../src/components/layout/footer/ScrollToTopBtn";
import { PartitaIva } from "../src/components/layout/footer/PartitaIva";
import Copyright from "../src/components/layout/footer/Copyright";
import { AlertMe } from "../src/components/layout/alert/AlertMe";
import logOutUser from "../src/components/utils/logOutUser";
import { useDispatch } from "react-redux";
const BlockPage = () => {
  const Router = useRouter();
  const { titolo, descrizione, desc_azione, redirectTo } = Router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [paddingTop, setPaddingTop] = React.useState(100);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //TODO qui forzo la rimozione dei cookie per non avere problemi, costringo l'utente ad un nuovo login
    try {
      logOutUser(dispatch);
    } catch (error) {
      console.log("logoutSuccess error: ", error);
    }
  }, []);

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
  return (
    <ThemeProvider theme={theme}>
      <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Block Page | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        description="This is a E-Commerce block page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <AlertMe />
        <AppBar
          position="static"
          sx={{
            display: "block",
            backgroundColor: (theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as { backgroundColor?: string })?.backgroundColor,
          }}
        >
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Toolbar>
              <StyledImageLogo src="/images/LogoO.png" alt="Logo" width={190} height={70} priority={true} sx={{ cursor: "pointer" }} />
            </Toolbar>
          </Container>
        </AppBar>

        <Box id="main" sx={{ paddingTop: `${paddingTop}px`, height: 400 }}>
          <Grid container component="main" sx={{ py: 2, px: 2 }}>
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
              }}
            >
              <div style={{ width: "50%", height: "50%", position: "relative", zIndex: 1 }}>
                <Image src="/images/LogoQ.png" alt="Logo" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} />
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
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                  {/* CONVALIDA ECOMMERCE */}
                  {titolo}
                </Typography>
                <br />

                <Grid container>
                  <Typography variant="h5" align="center" sx={{ color: "red" }}>
                    {descrizione}
                  </Typography>

                  <Link
                    onClick={() => (redirectTo ? Router.push(typeof redirectTo === "string" ? redirectTo : redirectTo[0]) : {})}
                    variant="h6"
                    sx={{ mt: 2, textAlign: "center", cursor: "pointer", color: (theme) => (theme.palette.mode === "light" ? "black" : "white") }}
                  >
                    {desc_azione}
                  </Link>
                </Grid>
              </Box>
            </Grid>

            <Box style={{ width: "100%", marginTop: 30 }}>
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
export default connect(null, mapDispatchToProps)(BlockPage);
