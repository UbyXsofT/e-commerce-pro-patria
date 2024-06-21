import { useRouter } from "next/router";
import React, { Component, ErrorInfo, ReactNode } from "react";
import eCommerceConf from "eCommerceConf.json";
import { Box, useTheme, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import callNodeService from "pages/api/callNodeService";
import {
	obyPostErrore,
	responseCall,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import { useSelector } from "react-redux";

const ComponenteFunzione = () => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
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
				È possibile che si sia verificato un errore temporaneo. Per favore,
				clicca sul bottone per procedere.
			</Typography>
			<Typography
				variant="body1"
				align="center"
				sx={{
					marginBottom: 3,
				}}
			>
				Si potrebbe verificare un blocco della pagina in alcuni casi. Se
				succede, prova a ricaricare la pagina nel browser. Grazie per la tua
				comprensione!
			</Typography>
			<Button
				variant="contained"
				onClick={async () => {
					//router.push(`/auth/home`);
					//router.push("/account/login");
					router.push("/account/login");
					router.push("/auth/home");
				}}
			>
				Vai alla home page
			</Button>
		</Box>
	);
};

//questo è ok
const fetchData = async (error: Error, errorInfo: ErrorInfo) => {
	if (eCommerceConf.ModalitaSviluppo === true) {
		console.log("fetchData ERR", "START");
	}
	//const user = useSelector((state: StoreState) => state.authUser);

	const errorInfoSend = errorInfo?.componentStack
		? errorInfo.componentStack
		: "NESSUNA INFORMAZIONE ERRORE";

	const errorUSERID = "NESSUN CODICE UTENTE";

	const obyPostErrore: obyPostErrore = {
		clienteKey: eCommerceConf.ClienteKey,
		IDCliente: errorUSERID,
		IDCentro: "0",
		Errore: errorInfoSend,
	};

	try {
		const respCall: responseCall = await callNodeService(
			"rec-error",
			obyPostErrore,
			null
		);
		if (eCommerceConf.ModalitaSviluppo === true) {
			console.log("handleSuccess", respCall);
		}
	} catch (error) {
		if (eCommerceConf.ModalitaSviluppo === true) {
			console.log("handleError", error);
		}
	} finally {
		if (eCommerceConf.ModalitaSviluppo === true) {
			console.log("handleFinally", "FINE");
		}
	}
};

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Errore catturato da componentDidCatch:", error, errorInfo);
		// Puoi anche inviare l'errore a un servizio di logging
		fetchData(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Personalizza il messaggio di errore qui
			return <ComponenteFunzione />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
