// AlertMe.js

import React, { useContext } from "react";
import Router from "next/router";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertMeContext from "./AlertMeContext";
import hexToRGBA from "src/components/utils/hexToRGBA";
import { ThemeManager } from "src/theme/ThemeManager";
import eCommerceConf from "eCommerceConf.json"

export function AlertMe() {
	const { alertParams, setAlertParams } = React.useContext(AlertMeContext);
	const { variant, severity, title, desc, openAlertMe, route } = alertParams;
	const theme = useTheme();
	const { currTema } = ThemeManager();
	//variant: filled - outlined
	//severity: error - warning - info - success
	const backgroundColorWithOpacity =
		theme.palette.mode === "light"
			? currTema?.Dark?.palette?.background?.default
			: currTema?.Light?.palette?.background?.default;
	const backgroundColor = backgroundColorWithOpacity || "black";
	const backgroundColorWithOpacityValue = hexToRGBA("000000", 0.5);

	// Function to handle alert closure
	const handleCloseAlert = () => {
		// Logica di chiusura dell'alert
		// ...
		// Verifica se la proprietà 'route' è definita e, se sì, esegui un'azione basata su di essa
		if (route) {
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log(`Redirecting to ${route}`);
			}
			Router.push(route);
		}
		// Chiudi l'alert
		setAlertParams((prevParams) => ({ ...prevParams, openAlertMe: false }));
	};

	return (
		<div
			style={{
				position: "fixed",
				paddingTop: `calc(${
					theme.mixins.toolbar.minHeight
						? (theme.mixins.toolbar.minHeight as number) + 60
						: 60
				}px)`,
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: openAlertMe ? "flex" : "none", // Imposta display su "flex" quando openAlertMe è true, altrimenti su "none"
				justifyContent: "center",
				zIndex: theme.zIndex.drawer + 1,
				backgroundColor: backgroundColorWithOpacityValue,
			}}
		>
			<Stack
				sx={{
					width: "80%",
					marginBottom: "20px",
					flexDirection: "row",
					justifyContent: "center",
				}}
				spacing={2}
			>
				<Collapse in={openAlertMe}>
					<Alert
						variant={variant}
						severity={severity}
						sx={{
							color: theme.palette.mode === "dark" ? "#EAEAEA" : "#EAEAEA",
						}}
						action={
							<IconButton
								aria-label="close"
								size="small"
								color="inherit"
								onClick={() => {
									handleCloseAlert();
									// setAlertParams({
									// 	...alertParams,
									// 	openAlertMe: false,
									// });
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						<AlertTitle>{title}</AlertTitle>
						{desc}
					</Alert>
				</Collapse>
			</Stack>
		</div>
	);
}
