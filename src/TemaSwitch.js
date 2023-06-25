import * as React from "react";
import {ThemeContext} from "../src/ThemeContext";
import ModSwitch from "./ModSwitch";
const TemaSwitch = () => {
	const {toggleThemeMode} = React.useContext(ThemeContext);
	//console.log(toggleThemeMode);

	const handleChange = () => {
		console.log("handleChange");
		toggleThemeMode(); // Chiamata a toggleThemeMode per cambiare il tema
	};

	return <ModSwitch onChange={handleChange} />;
};

export default TemaSwitch;
