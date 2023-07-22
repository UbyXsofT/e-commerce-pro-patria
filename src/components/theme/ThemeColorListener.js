import * as React from "react";

const ThemeColorListener = ({setThemeMode}) => {
	React.useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e) => {
			const newThemeMode = e.matches ? "dark" : "light";
			setThemeMode(newThemeMode);
			localStorage.setItem("themeMode", newThemeMode);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [setThemeMode]);

	return null;
};

export default ThemeColorListener;
