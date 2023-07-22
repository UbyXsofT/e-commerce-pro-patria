import TemaSwitch from "/src/components/theme/TemaSwitch";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {Typography} from "@mui/material";

export const UserDrawerContentDx = ({theme}) => {
	return (
		<>
			{" "}
			<Typography
				variant='h6'
				noWrap
				component='div'
				sx={{display: "block"}}
			>
				MENU UTENTE
			</Typography>
			<TemaSwitch />
		</>
	);
};
