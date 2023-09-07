import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Theme, Typography } from "@mui/material";

type CarrelloDrawerContentDxProps = {
  theme?: Theme;
};

export const CarrelloDrawerContentDx = ({ theme }: CarrelloDrawerContentDxProps) => {
  return (
    <>
      {" "}
      <Typography variant="h6" noWrap component="div" sx={{ display: "block" }}>
        MENU CARRELLO
      </Typography>
    </>
  );
};
