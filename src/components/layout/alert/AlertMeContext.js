import React, {createContext, useState} from "react";

const AlertMeContext = createContext();

export const AlertMeProvider = ({children}) => {
	const [alertParams, setAlertParams] = useState({
		variant: "filled",
		severity: "error",
		title: "",
		desc: "",
		openAlertMe: false,
	});

	// Function to trigger the display of the alert with custom parameters
	const showAlert = (variant, severity, title, desc, openAlertMe) => {
		// Set the desired parameters for the alert
		setAlertParams({
			variant: variant !== null ? variant : "filled",
			severity: severity !== null ? severity : "success",
			title: title !== null ? title : "Titolo",
			desc: desc !== null ? desc : "",
			openAlertMe: openAlertMe !== null ? openAlertMe : true,
		});
	};

	return <AlertMeContext.Provider value={{alertParams, setAlertParams, showAlert}}>{children}</AlertMeContext.Provider>;
};

export const useAlertMe = () => {
	const context = React.useContext(AlertMeContext);
	if (!context) {
		throw new Error("useAlertMe deve essere utilizzato all'interno di un AlertMeProvider");
	}
	return context;
};

export default AlertMeContext;

// //AlertMeContext.js
// import React, {createContext, useState} from "react";

// const AlertMeContext = createContext();

// export const AlertMeProvider = ({children}) => {
// 	const [alertParams, setAlertParams] = useState({
// 		variant: "filled",
// 		severity: "error",
// 		title: "",
// 		desc: "",
// 		openAlertMe: false,
// 	});

// 	return <AlertMeContext.Provider value={{alertParams, setAlertParams}}>{children}</AlertMeContext.Provider>;
// };

// export const useAlertMe = () => {
// 	const context = React.useContext(AlertMeContext);
// 	if (!context) {
// 		throw new Error("useAlertMe deve essere utilizzato all'interno di un AlertMeProvider");
// 	}
// 	return context;
// };

// export default AlertMeContext;
