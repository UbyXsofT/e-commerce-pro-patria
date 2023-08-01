import * as React from "react";
import Typography from "@mui/material/Typography";
import eCommerceConfig from "./../../../../eCommerceConfig.json";

export function PartitaIva() {
	return <Typography variant='caption'>Partita IVA: {eCommerceConfig.PartitaIva}</Typography>;
}
