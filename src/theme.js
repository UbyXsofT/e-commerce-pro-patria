import {Roboto} from "next/font/google";
import {createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";

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
		mode: "light", // Imposta la modalità predefinita su "light"
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
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
		mode: "dark", // Imposta la modalità su "dark"
		primary: {
			main: "#90caf9", // Colori personalizzati per il tema scuro
		},
		secondary: {
			main: "#a5d6a7",
		},
		error: {
			main: red.A400,
		},
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
