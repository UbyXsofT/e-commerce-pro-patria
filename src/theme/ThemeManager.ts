//ThemeManager.ts

const listaTemi = [
	{
		key: "Propatria",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#127bd1",
					},
					secondary: {
						main: "#b51b16",
						contrastText: "#000000",
					},
					background: {
						default: "#F3F3F3",
						paper: "#E6E6E6",
					},
					text: {
						primary: "#1A1A1A",
						secondary: "#373737",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#127bd1",
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
						main: "#127bd1",
					},
					secondary: {
						main: "#b51b16",
						contrastText: "#000000",
					},
					background: {
						default: "#202020",
						paper: "#2B2B2B",
					},
					text: {
						primary: "#f1f1f1",
						secondary: "#CFCFCF",
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorInherit: {
								backgroundColor: "#127bd1",
								color: "#fff",
							},
						},
					},
				},
			},
		},
	},
	{
		key: "Byteware",
		value: {
			Light: {
				palette: {
					mode: "light",
					primary: {
						main: "#424242",
					},
					secondary: {
						main: "#ffa000",
					},
					background: {
						default: "#fff",
						paper: "#fff",
					},
					text: {
						primary: "#1A1A1A",
						secondary: "#373737",
					},
				},
			},

			Dark: {
				palette: {
					mode: "dark",
					primary: {
						main: "#fbc02d",
					},
					secondary: {
						main: "#ff9800",
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

import eCommerceConf from "eCommerceConf.json";

export function ThemeManager() {
	const projectTema = eCommerceConf.Tema;
	const currTema = listaTemi.find((tema) => tema.key === projectTema);

	if (eCommerceConf.ModalitaSviluppo === true) {
		console.log("projectTema: ", projectTema);
		console.log(currTema?.value);
	}

	return { currTema: currTema?.value || null };
}
