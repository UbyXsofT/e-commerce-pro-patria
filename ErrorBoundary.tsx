import { useRouter } from "next/router";
import React, { Component, ErrorInfo, ReactNode } from "react";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import { Box, useTheme, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
interface ErrorBoundaryProps {
	children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
	const [error, setError] = React.useState<Error | null>(null);
	const [errorInfo, setErrorInfo] = React.useState<ErrorInfo | null>(null);
	const theme = useTheme();
	const router = useRouter();

	const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
		// Rileva gli errori in tutti i componenti seguenti ed esegui nuovamente il rendering con un messaggio di errore
		setError(error);
		setErrorInfo(errorInfo);
		// Puoi anche registrare i messaggi di errore in un servizio di segnalazione errori qui
	};

	if (errorInfo !== null) {
		// Percorso dell'errore
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					// justifyContent: "center",
					height: "100vh",
					paddingTop: 4,
				}}
			>
				<ErrorOutlineIcon
					sx={{
						fontSize: 100,
						color: theme.palette.error.main,
						marginBottom: 3,
					}}
				/>

				<Typography
					variant="h4"
					align="center"
				>
					QUALCOSA E' ANDATO STORTO!
				</Typography>

				<Typography
					variant="body1"
					align="center"
					sx={{
						marginBottom: 3,
					}}
				>
					{eCommerceConf.MsgErrGenerico}
				</Typography>

				<Button
					variant="contained"
					onClick={async () => {
						router.push(`/auth/home`);
					}}
				>
					Vai alla home page
				</Button>
			</Box>
		);
	}
	// Normalmente, rendi solo i bambini
	return <>{children}</>;
};

export default ErrorBoundary;
