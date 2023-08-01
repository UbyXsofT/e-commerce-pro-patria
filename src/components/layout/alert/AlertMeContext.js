// AlertContext.js

import React, {createContext, useState} from "react";

const AlertMeContext = createContext();

export const AlertMeProvider = ({children}) => {
	const [alertInfo, setAlertInfo] = useState({
		variant: "filled",
		severity: "error",
		title: "",
		desc: "",
		openAlertMe: false,
	});

	return <AlertMeContext.Provider value={{alertInfo, setAlertInfo}}>{children}</AlertMeContext.Provider>;
};

export default AlertMeContext;
