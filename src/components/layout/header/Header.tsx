// Header.js
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { ToolBar } from "./ToolBar";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	width: "100%",
}));

type HeaderProps = {
	drawerDxOpen: boolean;
	setDrawerDxOpen?: React.Dispatch<React.SetStateAction<boolean>> | null;
	tipoContesto: string;
	setTipoContesto?: React.Dispatch<React.SetStateAction<string>> | null;
	alerts: number;
	cartAlerts: number;
	isMobile: boolean;
};

export const Header = ({
	drawerDxOpen,
	setDrawerDxOpen,
	tipoContesto,
	setTipoContesto,
	alerts,
	cartAlerts,
	isMobile,
}: HeaderProps) => {
	const theme = useTheme();

	return (
		<>
			<AppBar
				id="header"
				position="fixed"
				sx={{
					backgroundColor: (
						theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as {
							backgroundColor?: string;
						}
					)?.backgroundColor,
				}}
			>
				<ToolBar
					drawerDxOpen={drawerDxOpen}
					tipoContesto={tipoContesto}
					setTipoContesto={setTipoContesto}
					setDrawerDxOpen={setDrawerDxOpen}
					alerts={alerts}
					cartAlerts={cartAlerts}
					isMobile={isMobile}
					noAuth={false}
				/>
			</AppBar>
		</>
	);
};
