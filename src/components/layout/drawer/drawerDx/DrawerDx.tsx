//DrawerDx.js
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

type DrawerDxProps = {
	children: React.ReactNode;
	drawerDxOpen: boolean;
	setDrawerDxOpen: React.Dispatch<React.SetStateAction<boolean>>;
	tipoContesto: string;
};

export const DrawerDx = ({
	children,
	drawerDxOpen,
	setDrawerDxOpen,
	tipoContesto,
}: DrawerDxProps) => {
	return (
		<>
			<Drawer
				anchor="right"
				open={drawerDxOpen}
				onClose={() => setDrawerDxOpen((prev) => !prev)} // Chiama la callback toggleDrawerDx quando il drawer viene chiuso
				variant="persistent" // Imposta il comportamento del Drawer su "persistent"
			>
				<Box
					sx={{
						width: 300,
						padding: 1,
						paddingTop: (theme) =>
							`calc(${
								theme.mixins.toolbar.minHeight
									? (theme.mixins.toolbar.minHeight as number) + 10
									: 10
							}px)`,
					}}
					// role='presentation'
				>
					{children}
				</Box>
			</Drawer>
		</>
	);
};
