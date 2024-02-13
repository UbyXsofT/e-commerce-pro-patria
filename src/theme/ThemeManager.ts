//ThemeManager.ts
import eCommerceConf from "eCommerceConf.json";

const listaTemi = [
	{
		key: "Default",
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
];

export function ThemeManager() {
	const projectTema = eCommerceConf.Tema;
	// console.log("projectTema: ", projectTema);

	const currTema = listaTemi.find((tema) => tema.key === projectTema);

	//console.log(currTema?.value);

	return { currTema: currTema?.value || null };
}
