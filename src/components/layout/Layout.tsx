// Layout.js
import React, { ReactChild, ReactElement, ReactNode } from "react";
import { Box, Toolbar, Button } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { DrawerDx } from "./drawer/drawerDx/DrawerDx";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { AlertMe } from "./alert/AlertMe";
import { Typography } from "@mui/material";
import { UserDrawerContentDx } from "src/components/layout/drawer/drawerDx/UserDrawerContentDx";
import { CarrelloDrawerContentDx } from "src/components/layout/drawer/drawerDx/CarrelloDrawerContentDx";
import CookieConsent from "src/components/cookie/CookieConsent";
import DrawerSx from "./drawer/drawerSx/DrawerSx";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const [drawerDxOpen, setDrawerDxOpen] = React.useState(false);
  const [tipoContesto, setTipoContesto] = React.useState("utente"); //carrello
  const [drawerSxOpen, setDrawerSxOpen] = React.useState(false);
  const pLeftDrawerOpen = "88px";
  const pLeftDrawerClose = "24px";

  const handleDrawerSxOpen = (open: boolean) => {
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
        <Header drawerDxOpen={drawerDxOpen} tipoContesto={tipoContesto} setTipoContesto={setTipoContesto} setDrawerDxOpen={setDrawerDxOpen} />
        <DrawerSx onOpen={handleDrawerSxOpen} /> {/* Passa la funzione al componente DrawerSx */}
        <DrawerDx drawerDxOpen={drawerDxOpen} setDrawerDxOpen={setDrawerDxOpen} tipoContesto={tipoContesto}>
          {tipoContesto === "utente" ? <UserDrawerContentDx /> : <CarrelloDrawerContentDx />}
        </DrawerDx>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pr: 3,
            pt: 3,
            pb: 3,
            marginTop: (theme) => `calc(${theme.mixins.toolbar.minHeight ? (theme.mixins.toolbar.minHeight as number) + 5 : 0}px)`,
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
