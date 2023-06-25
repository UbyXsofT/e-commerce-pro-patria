import * as React from "react";

// Crea il contesto del tema
export const ThemeContext = React.createContext();

// Esporta il provider del contesto del tema
export function ThemeProvider({children, toggleThemeMode}) {
	return <ThemeContext.Provider value={{toggleThemeMode}}>{children}</ThemeContext.Provider>;
}
