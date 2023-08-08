// Layout.js
import React from "react";
import { Box, Toolbar, Button } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { DrawerSx } from "./drawer/drawerSx/DrawerSx";
import { DrawerDx } from "./drawer/drawerDx/DrawerDx";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { AlertMe } from "./alert/AlertMe";
import { Typography } from "@mui/material";
import { UserDrawerContentDx } from "./drawer/drawerDx/UserDrawerContentDx";
import { CarrelloDrawerContentDx } from "./drawer/drawerDx/CarrelloDrawerContentDx";
import CookieConsent from "../cookie/CookieConsent";

const Layout = ({ children }) => {
  const [drawerDxOpen, setDrawerDxOpen] = React.useState(false);
  const [tipoContesto, setTipoContesto] = React.useState("utente"); //carrello
  const [drawerSxOpen, setDrawerSxOpen] = React.useState(false);
  const pLeftDrawerOpen = "88px";
  const pLeftDrawerClose = "24px";

  const toggleDrawerDx = () => {
    setDrawerDxOpen((prevDrawerDxOpen) => !prevDrawerDxOpen); // Inverte il valore di drawerDxOpen utilizzando la funzione di callback di useState
  };
  const handleDrawerSxOpen = (open) => {
    console.log("handleDrawerSxOpen: ", open);
    if (open) {
      // Chiudi il DrawerDx se DrawerSx viene espanso
      setDrawerDxOpen(false);
      setDrawerSxOpen(true);
    } else {
      setDrawerSxOpen(false);
    }
  };

  const mainAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  return (
    <animated.main style={mainAnimation}>
      <Box sx={{ display: "flex" }}>
        <Header drawerDxOpen={drawerDxOpen} toggleDrawerDx={toggleDrawerDx} setTipoContesto={setTipoContesto} setDrawerDxOpen={setDrawerDxOpen} />
        <DrawerSx onOpen={handleDrawerSxOpen} /> {/* Passa la funzione al componente DrawerSx */}
        <DrawerDx drawerDxOpen={drawerDxOpen} toggleDrawerDx={toggleDrawerDx} tipoContesto={tipoContesto}>
          {tipoContesto === "utente" ? <UserDrawerContentDx /> : <CarrelloDrawerContentDx />}
        </DrawerDx>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pr: 3,
            pt: 3,
            pb: 3,
            marginTop: (theme) => `calc(${theme.mixins.toolbar.minHeight + 5}px)`,
            paddingLeft: drawerSxOpen ? pLeftDrawerOpen : pLeftDrawerClose,
          }}
        >
          <AlertMe />
          {children}
          <Footer />
        </Box>
        {/* Componente CookieConsent */}
        <CookieConsent />
      </Box>
    </animated.main>
  );
};

export default Layout;
