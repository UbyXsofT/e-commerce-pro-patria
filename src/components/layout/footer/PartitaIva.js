import * as React from "react";
import Typography from "@mui/material/Typography";
import eCommerceConfig from "./../../../../ecommerceConfig.json";

export function PartitaIva() {
  return (
    <Typography variant="caption">
      Partita IVA: {eCommerceConfig.PartitaIva}
    </Typography>
  );
}
