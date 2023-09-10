import * as React from "react";

// Crea il contesto del tema
export const ThemeContext = React.createContext();

// Esporta il provider del contesto del tema
export function ThemeProvider({ children, themeMode, setThemeMode, autoMode, setAutoMode }) {
  return <ThemeContext.Provider value={{ themeMode, setThemeMode, autoMode, setAutoMode }}>{children}</ThemeContext.Provider>;
}
