import * as React from "react";
import Typography from "@mui/material/Typography";
import eCommerceConf from "./../../../../eCommerceConf.json";

export function PartitaIva() {
  return <Typography variant="caption">Partita IVA: {eCommerceConf.PartitaIva}</Typography>;
}
