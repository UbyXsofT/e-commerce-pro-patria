import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ThemeManager } from "src/theme/ThemeManager";
const { currTema } = ThemeManager();

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const transitionStyle = {
  transition: "all 0.50s ease-in-out",
};

const lightTheme = createTheme({
  palette: {
    ...currTema?.Light?.palette,
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...transitionStyle,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        ...currTema?.Light?.components?.MuiAppBar?.styleOverrides, // Estendi gli overrides esistenti
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    ...currTema?.Dark?.palette,
    mode: "dark",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...transitionStyle,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        ...currTema?.Dark?.components?.MuiAppBar?.styleOverrides, // Estendi gli overrides esistenti
      },
    },
  },
});

export { lightTheme, darkTheme };
