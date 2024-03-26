import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Invia l'errore al server
		console.error(
			"***** ERRORE ******* AND SEND THIS TO SERVER ***: Uncaught error:",
			error,
			errorInfo
		);
		this.sendErrorToServer(error, errorInfo);
	}

	sendErrorToServer = (error: Error, errorInfo: ErrorInfo) => {
		// Implementa la logica per inviare l'errore al server
		// Ad esempio, utilizzando fetch per una chiamata API
		// fetch('/api/logError', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify({ error, errorInfo }),
		// });
	};

	public render() {
		if (this.state.hasError) {
			return <h1>Sorry.. there was an error</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
