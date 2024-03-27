import React, { Component } from "react";
import { Typography, Box, Button } from "@mui/material";
import router from "next/router";
import eCommerceConf from "eCommerceConf.json";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		//Rileva gli errori in tutti i componenti seguenti ed esegui nuovamente il rendering con un messaggio di errore
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
		// Puoi anche registrare i messaggi di errore in un servizio di segnalazione errori qui
	}

	render() {
		if (this.state.errorInfo === null) {
			// Percorso dell'errore
			return (
				// <div>
				// 	<h2>Qualcosa è andato storto.</h2>
				// 	<details style={{ whiteSpace: "pre-wrap" }}>
				// 		{this.state.error && this.state.error.toString()}
				// 		<br />
				// 		{this.state.errorInfo.componentStack}
				// 	</details>
				// </div>

				<Box
					textAlign={"center"}
					// marginTop={12}
				>
					<Typography
						gutterBottom
						variant="h4"
					>
						<strong>Qualcosa è andato storto</strong>
					</Typography>
					<Button
						variant="contained"
						onClick={async () => {
							router.push(
								`/blockPage?titolo=CARICAMENTO DATI LISTINO&descrizione=Si è verificato un errore durante il recupero dei dati necessari. Se il problema persiste si prega di cottattare il proprio centro fitness.. &desc_azione=${eCommerceConf.MsgErrGenerico}&redirectTo=/`
							);
						}}
					>
						Prova a Ricaricare
					</Button>
				</Box>
			);
		}
		// Normalmente, rendi solo i bambini
		return this.props.children;
	}
}

export default ErrorBoundary;
