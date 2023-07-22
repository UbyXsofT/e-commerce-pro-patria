//DrawerDx.js
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {Typography} from "@mui/material";

export const DrawerDx = ({children, drawerDxOpen, toggleDrawerDx, tipoContesto}) => {
	return (
		<>
			<Drawer
				anchor='right'
				open={drawerDxOpen}
				onClose={() => toggleDrawerDx()} // Chiama la callback toggleDrawerDx quando il drawer viene chiuso
				variant='persistent' // Imposta il comportamento del Drawer su "persistent"
			>
				<Box
					sx={{
						width: 300,
						padding: 1,
						paddingTop: (theme) => `calc(${theme.mixins.toolbar.minHeight + 10}px)`,
					}}
					// role='presentation'
				>
					{children}
				</Box>
			</Drawer>
		</>
	);
};
