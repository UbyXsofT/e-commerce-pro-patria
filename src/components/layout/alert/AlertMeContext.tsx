//AlertMeContext.js
import { AlertColor } from "@mui/material";
import React, { ReactElement, createContext, useState } from "react";

const AlertMeContext = createContext<AlerMeContext>({
	alertParams: {
		variant: "standard",
		severity: "success",
		title: "",
		desc: undefined,
		openAlertMe: false,
	},
	setAlertParams: () => {},
	showAlert: () => {},
});

type AlertMeProviderProps = {
	children: ReactElement[];
};

//type CloseHandler = () => void;
interface alertParams {
	variant: "standard" | "filled" | "outlined";
	severity: AlertColor;
	title: string;
	desc?: React.JSX.Element;
	openAlertMe: boolean;
	route?: string;
	//onClose?: CloseHandler;
}

interface AlerMeContext {
	alertParams: alertParams;
	setAlertParams: React.Dispatch<React.SetStateAction<alertParams>>;
	showAlert: (
		variant: "standard" | "filled" | "outlined",
		severity: AlertColor,
		title: string,
		desc: React.JSX.Element,
		openAlertMe: boolean,
		route?: string // Aggiungi la route come parametro opzionale
		//onClose?: () => void
	) => void;
}

export const AlertMeProvider = ({ children }: AlertMeProviderProps) => {
	const [alertParams, setAlertParams] = useState<alertParams>({
		variant: "filled",
		severity: "error",
		title: "",
		desc: undefined,
		openAlertMe: false,
	});

	// Function to trigger the display of the alert with custom parameters
	const showAlert = (
		variant: "standard" | "filled" | "outlined",
		severity: AlertColor,
		title: string,
		desc: React.JSX.Element,
		openAlertMe: boolean,
		route?: string
		//onClose?: CloseHandler
	) => {
		// Set the desired parameters for the alert
		setAlertParams((prevParams) => ({
			...prevParams,
			variant: variant !== null ? variant : "filled",
			severity: severity !== null ? severity : "success",
			title: title !== null ? title : "Titolo",
			desc: desc !== null ? desc : undefined,
			openAlertMe: openAlertMe !== null ? openAlertMe : true,
			route: route !== null ? route : undefined,
			//onClose: onClose, // Memorizza la funzione di chiusura nel nuovo stato dell'alert
		}));
	};

	return (
		<AlertMeContext.Provider value={{ alertParams, setAlertParams, showAlert }}>
			{children}
		</AlertMeContext.Provider>
	);
};

export const useAlertMe = () => {
	const context = React.useContext(AlertMeContext);
	if (!context) {
		throw new Error(
			"useAlertMe deve essere utilizzato all'interno di un AlertMeProvider"
		);
	}
	return context;
};

export default AlertMeContext;
