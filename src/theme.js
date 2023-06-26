import {Roboto} from "next/font/google";
import {createTheme} from "@mui/material/styles";
import {ThemeManager} from "./ThemeManager";
const {currTema} = ThemeManager();

export const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

const transitionStyle = {
	transition: "all 0.50s ease-in-out",
};

// Create a theme instance.
const lightTheme = createTheme({
	palette: {
		...currTema?.Light?.palette, // Unisci le opzioni del tema corrente
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        body {
          ${Object.entries(transitionStyle)
						.map(([prop, value]) => `${prop}: ${value};`)
						.join(" ")}
        }
      `,
		},
	},
});

// Aggiungi un oggetto per la palette dei colori nel tema scuro
const darkTheme = createTheme({
	palette: {
		...currTema?.Dark?.palette, // Unisci le opzioni del tema corrente
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			body {
			  ${Object.entries(transitionStyle)
					.map(([prop, value]) => `${prop}: ${value};`)
					.join(" ")}
			}
		  `,
		},
	},
});

export {lightTheme, darkTheme};
