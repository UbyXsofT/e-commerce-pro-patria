// AlertMe.js

import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AlertMeContext from "./AlertMeContext";

export function AlertMe() {
	const {alertInfo, setAlertInfo} = React.useContext(AlertMeContext);
	const {variant, severity, title, desc, openAlertMe} = alertInfo;
	const theme = useTheme();
	//variant: filled - outlined
	//severity: error - warning - info - success
	return (
		<div
			style={{
				position: "fixed",
				top: `calc(${theme.mixins.toolbar.minHeight + 20}px)`,
				left: 0,
				right: 0,
				bottom: 0,
				display: openAlertMe ? "flex" : "none", // Imposta display su "flex" quando openAlertMe è true, altrimenti su "none"
				alignItems: "flex-start",
				justifyContent: "center",
				zIndex: theme.zIndex.drawer + 1,
			}}
		>
			<Stack
				sx={{
					width: "80%",
					marginBottom: "20px",
				}}
				spacing={2}
			>
				<Collapse in={openAlertMe}>
					<Alert
						variant={variant}
						severity={severity}
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setAlertInfo({
										...alertInfo,
										openAlertMe: false,
									});
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
					>
						<AlertTitle>{title}</AlertTitle>
						{desc}
					</Alert>
				</Collapse>

				{/* <Button
				disabled={openAlertMe}
				variant='outlined'
				onClick={() => {
							setAlertInfo({
								...alertInfo,
								variant: "filled",
								severity: "success",
								title: "Titolo prova",
								desc: (
									<React.Fragment>
										Questo è un avviso di {alertInfo.severity}: — <strong>dai un'occhiata!</strong>
									</React.Fragment>
								),
								openAlertMe: true,
							});
						}}
			>
				Re-open Alert
			</Button> */}
			</Stack>
		</div>
	);
}
