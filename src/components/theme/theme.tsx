//theme.tsx
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ThemeManager } from "src/theme/ThemeManager";
import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
	interface Palette {
		primary: string;
		secondary: string;
		background: object;
		text: object;
		paper: string;
	}
}

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

const joyLightTheme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: currTema?.Light?.palette.primary.main,
				secondary: currTema?.Light?.palette.secondary.main,
				background: {
					body: currTema?.Light?.palette.background.default,
					surface: currTema?.Light?.palette.background.paper,
				},
				text: {
					primary: currTema?.Light?.palette.text.primary,
					secondary: currTema?.Light?.palette.text.secondary,
				},

				mode: "light",
			},
		},
	},
	fontFamily: {
		display: roboto.style.fontFamily, // applies to `h1`–`h4`
		body: roboto.style.fontFamily, // applies to `title-*` and `body-*`
	},
	components: {
		JoyButton: {
			styleOverrides: {
				root: ({ ownerState, theme }: any) => ({
					...(ownerState.variant === "contained" && {
						backgroundColor: theme.vars.palette.primary.main,
						color: theme.vars.palette.common.white,
					}),
				}),
			},
		},
	},
});

const joyDarkTheme = extendTheme({
	colorSchemes: {
		dark: {
			palette: {
				primary: currTema?.Dark?.palette.primary.main,
				secondary: currTema?.Dark?.palette.secondary.main,
				background: {
					body: currTema?.Dark?.palette.background.default,
					surface: currTema?.Dark?.palette.background.paper,
				},
				text: {
					primary: currTema?.Dark?.palette.text.primary,
					secondary: currTema?.Dark?.palette.text.secondary,
				},

				mode: "dark",
			},
		},
	},
	fontFamily: {
		display: roboto.style.fontFamily, // applies to `h1`–`h4`
		body: roboto.style.fontFamily, // applies to `title-*` and `body-*`
	},
	components: {
		JoyButton: {
			styleOverrides: {
				root: ({ ownerState, theme }: any) => ({
					...(ownerState.variant === "contained" && {
						backgroundColor: theme.vars.palette.primary.main,
						color: theme.vars.palette.common.white,
					}),
				}),
			},
		},
	},
});

export { lightTheme, darkTheme, joyLightTheme, joyDarkTheme };
