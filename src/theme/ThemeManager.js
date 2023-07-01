import eCommerceConfig from "../../eCommerceConfig.json";

const listaTemi = [
	{
		key: "Default",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#ff5701",
					},
					secondary: {
						main: "#ffba00",
						contrastText: "#000000",
					},
					background: {
						default: "#eeeeee",
						paper: "#eeeeee",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#ff5701",
								color: "#fff",
							},
						},
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#ffba00",
					},
					secondary: {
						main: "#f57c00",
						contrastText: "#000000",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
					text: {
						primary: "#f1f1f1",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#ff5701",
								color: "#fff",
							},
						},
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
						main: "#ff5701",
					},
					secondary: {
						main: "#ffba00",
						contrastText: "#000000",
					},
					background: {
						default: "#eeeeee",
						paper: "#eeeeee",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#689f38",
								color: "#fff",
							},
						},
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#ffba00",
					},
					secondary: {
						main: "#f57c00",
						contrastText: "#000000",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
					text: {
						primary: "#f1f1f1",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#385C9F",
								color: "#fff",
							},
						},
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
						main: "#ff5701",
					},
					secondary: {
						main: "#ffba00",
						contrastText: "#000000",
					},
					background: {
						default: "#eeeeee",
						paper: "#eeeeee",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#689f38",
								color: "#fff",
							},
						},
					},
				},
			},
			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#ffba00",
					},
					secondary: {
						main: "#f57c00",
						contrastText: "#000000",
					},
					background: {
						default: "#121212",
						paper: "#121212",
					},
					text: {
						primary: "#f1f1f1",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#385C9F",
								color: "#fff",
							},
						},
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
