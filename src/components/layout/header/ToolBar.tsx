//ToolBar.js
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Badge, Box, Toolbar, Popper, Typography } from "@mui/material";
import Image from "next/image";
import { IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Router from "next/router";

const menuId = "up-account-menu";
const StyledImageLogo = styled(Image)({
  padding: "5px",
  maxWidth: 190,
  maxHeight: 60,
  marginLeft: -30,
});

type ToolBarProps = {
  drawerDxOpen: boolean;
  setDrawerDxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tipoContesto: string;
  setTipoContesto: React.Dispatch<React.SetStateAction<string>>;
  alerts: number;
  cartAlerts: number;
};

export const ToolBar = ({ drawerDxOpen, setDrawerDxOpen, tipoContesto, setTipoContesto, alerts, cartAlerts }: ToolBarProps) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handlePopperOpen = (event: React.BaseSyntheticEvent) => {
    if (!event.currentTarget) {
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const openPopper = Boolean(anchorEl);

  const handleButtonClick = (target: string) => {
    if (target !== tipoContesto && drawerDxOpen) {
      setTipoContesto(target);
    } else {
      setTipoContesto(target);
      setDrawerDxOpen(!drawerDxOpen);
    }

    //toggleDrawerDx(!drawerDxOpen); // Inverte il valore di drawerDxOpen
  };

  return (
    <>
      <Toolbar>
        <StyledImageLogo
          src="/images/LogoO.png"
          alt="Logo"
          width={190}
          height={70}
          priority={true}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            Router.push("/auth/home");
          }}
        />
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label={alerts !== 0 ? `Mostra ${alerts} nuovi Messaggi` : "Non ci sono Messaggi"}
            color="inherit"
            onMouseEnter={handlePopperOpen}
            onMouseLeave={handlePopperClose}
            onClick={() => {
              Router.push("/auth/notifiche");
            }}
          >
            <Badge badgeContent={alerts} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popper
            sx={{
              backgroundColor: theme.palette.mode !== "dark" ? "#1B1B1B" : "#F2F2F2",
              color: theme.palette.mode !== "dark" ? "#F2F2F2" : "#1B1B1B",
              borderRadius: 1,
              padding: 1,
              zIndex: 1201,
            }}
            placement="bottom"
            disablePortal={false}
            open={openPopper}
            anchorEl={anchorEl}
            modifiers={[
              {
                name: "flip",
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: true,
                  tether: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "arrow",
                enabled: false,
                options: {
                  // Se hai bisogno di una freccia, puoi specificare un elemento qui.
                  // element: arrowRef,
                },
              },
            ]}
          >
            {/* Contenuto del Popper */}
            <Typography sx={{ p: 1 }}>Visualizza messaggi e avvisi</Typography>
          </Popper>

          <IconButton
            size="large"
            aria-label={cartAlerts !== 0 ? `${cartAlerts} elementi nel Carrello` : "Il Carrello è Vuoto"}
            color="inherit"
            onClick={() => handleButtonClick("carrello")} // Chiamata corretta alla funzione
            // onMouseEnter={() => {
            //   setTipoContesto("carrello");
            //   handleMouseEnter();
            // }}
            // onMouseLeave={() => {
            //   setTipoContesto("carrello");
            //   handleMouseLeave();
            // }}
          >
            <Badge badgeContent={cartAlerts} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={() => handleButtonClick("utente")} // Chiamata corretta alla funzione
            // onMouseEnter={() => {
            //   setTipoContesto("utente");
            //   handleMouseEnter();
            // }}
            // onMouseLeave={() => {
            //   setTipoContesto("utente");
            //   handleMouseLeave();
            // }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </>
  );
};
