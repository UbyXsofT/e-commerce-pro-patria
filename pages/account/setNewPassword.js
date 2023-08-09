import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import Step1 from "./setNewPassword/Step1";
import Step2 from "./setNewPassword/Step2";

const StyledImageLogo = styled(Image)({
  padding: "10px",
  maxWidth: 300,
});

const setNewPassword = () => {
  const theme = useTheme();

  const [done, setDone] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Layout
    //digitare il titolo della pagina e la descrizione della pagina.
    title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
    description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
  > */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
        }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Toolbar>
            <StyledImageLogo src="/images/LogoO.png" alt="Logo" width={200} height={70} priority={true} />
          </Toolbar>
        </Container>
      </AppBar>
      {done ? <Step2 /> : <Step1 setDone={setDone} />}
    </ThemeProvider>
  );
};

export default setNewPassword;
