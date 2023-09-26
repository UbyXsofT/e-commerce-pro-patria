//ThemeContext.tsx
import * as React from "react";

// Crea il contesto del tema
export const ThemeContext = React.createContext({
	themeMode: "light",
	setThemeMode: (mode: string) => {},
	autoMode: "true",
	setAutoMode: (mode: string) => {},
});

type ThemeProviderProps = {
	children: React.JSX.Element[];
	themeMode: string;
	setThemeMode: React.Dispatch<React.SetStateAction<string>>;
	autoMode: string;
	setAutoMode: React.Dispatch<React.SetStateAction<string>>;
};

// Esporta il provider del contesto del tema
export function ThemeProvider({
	children,
	themeMode,
	setThemeMode,
	autoMode,
	setAutoMode,
}: ThemeProviderProps) {
	return (
		<ThemeContext.Provider
			value={{ themeMode, setThemeMode, autoMode, setAutoMode }}
		>
			{children}
		</ThemeContext.Provider>
	);
}
