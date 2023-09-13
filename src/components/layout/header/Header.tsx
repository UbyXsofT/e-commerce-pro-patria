// Header.js
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { ToolBar } from "./ToolBar";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
}));

type HeaderProps = {
  drawerDxOpen: boolean;
  setDrawerDxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tipoContesto: string;
  setTipoContesto: React.Dispatch<React.SetStateAction<string>>;
  alerts: number;
  cartAlerts: number;
};

export const Header = ({ drawerDxOpen, setDrawerDxOpen, tipoContesto, setTipoContesto, alerts, cartAlerts }: HeaderProps) => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: (theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as { backgroundColor?: string })?.backgroundColor,
        }}
      >
        <ToolBar drawerDxOpen={drawerDxOpen} tipoContesto={tipoContesto} setTipoContesto={setTipoContesto} setDrawerDxOpen={setDrawerDxOpen} alerts={alerts} cartAlerts={cartAlerts} />
      </AppBar>
    </>
  );
};
