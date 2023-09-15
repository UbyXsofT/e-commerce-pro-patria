import * as React from "react";

type ThemeColorListenerProps = {
	setThemeMode: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeColorListener = ({ setThemeMode }: ThemeColorListenerProps) => {
	React.useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
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
