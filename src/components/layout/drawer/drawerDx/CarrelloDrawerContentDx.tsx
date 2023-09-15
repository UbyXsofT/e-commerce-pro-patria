import * as React from "react";
import { Theme, Typography } from "@mui/material";

type CarrelloDrawerContentDxProps = {
	theme?: Theme;
};

export const CarrelloDrawerContentDx = ({
	theme,
}: CarrelloDrawerContentDxProps) => {
	return (
		<>
			<Typography
				variant="h6"
				noWrap
				component="div"
				sx={{ display: "block" }}
			>
				MENU CARRELLO
			</Typography>
		</>
	);
};
