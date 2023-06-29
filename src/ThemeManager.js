import eCommerceConfig from "../eCommerceConfig.json";

const listaTemi = [
	{
		key: "Default",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#ffffff",
					},
					secondary: {
						main: "#e2a300",
						contrastText: "#000000",
					},
					background: {
						default: "#ffffff",
						paper: "#f5f5f5",
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#FECA16",
					},
					secondary: {
						main: "#ff9400",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
				},
			},
		},
	},
	{
		key: "Tema1",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#2d2d2d",
					},
					secondary: {
						main: "#feca16",
					},
					background: {
						default: "#ffffff",
						paper: "#f5f5f5",
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#FECA16",
					},
					secondary: {
						main: "#ff9400",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
				},
			},
		},
	},
	{
		key: "Tema2",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#2d2d2d",
					},
					secondary: {
						main: "#feca16",
					},
					background: {
						default: "#ffffff",
						paper: "#f5f5f5",
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#FECA16",
					},
					secondary: {
						main: "#ff9400",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
				},
			},
		},
	},
];

export function ThemeManager() {
	const projectTema = eCommerceConfig.Tema;
	console.log("projectTema: ", projectTema);

	const currTema = listaTemi.find((tema) => tema.key === projectTema);

	//console.log(currTema?.value);

	return {currTema: currTema?.value || null};
}
