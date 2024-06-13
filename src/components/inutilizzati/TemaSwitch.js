import * as React from "react";
import { ThemeContext } from "../theme/ThemeContext";
import ModSwitch from "./ModSwitch";

const TemaSwitch = () => {
	const { toggleThemeMode } = React.useContext(ThemeContext);
	const handleChange = () => {
		toggleThemeMode(); // Chiamata a toggleThemeMode per cambiare il tema
	};

	const handleClick = () => {
		const thumb = document.querySelector(".MuiSwitch-thumb");
		thumb.classList.add("is-clicked");

		// setTimeout(() => {
		// 	thumb.classList.remove("is-clicked");
		// }, 100); // Aggiungi un timeout per rimuovere la classe in ritardo
	};

	return (
		<ModSwitch
			onChange={handleChange}
			onClick={handleClick}
		/>
	);
};

export default TemaSwitch;
