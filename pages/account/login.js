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
import TemaSwitch from "../../src/theme/TemaSwitch";

const StyledImageLogo = styled(Image)({
  padding: "10px",
  maxWidth: 300,
});

const Login = (setLoading) => {
  //setLoading(true); rende visibile il loading
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Esegui la logica di autenticazione e ottieni il token di accesso

    // Salva il token di accesso come cookie
    CookieManager.setCookie("token", "valore-del-token", { expires: 7 });

    // Esegui altre azioni dopo il login
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
            backgroundColor:
              theme.components.MuiAppBar.styleOverrides.colorInherit,
          }}
        >
          <Container>
            <Grid container direction={"row"}>
              <Grid item>
                <Toolbar>
                  <StyledImageLogo
                    src="/images/LogoO.png"
                    alt="Logo"
                    width={200}
                    height={70}
                    priority={true}
                  />
                </Toolbar>
                <Grid item>
                  <TemaSwitch />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
        <Grid container component="main" sx={{ height: "94.5vh" }}>
          {/* TODO There has to be a better way to implement this */}
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              //   backgroundImage:
              // "url()",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Accedi
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Password dimenticata?
                    </Link>
                  </Grid>
                  <Grid item>
					{/* TODO: React Router? */}
                    <Link href="register" variant="body2">
                      Non hai un account? Iscriviti
                    </Link>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(Login);
