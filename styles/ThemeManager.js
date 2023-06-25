import {createGlobalStyle} from "styled-components";
import themeConfig from "./themeConfig.json";

const {projectTema, colors, typography} = themeConfig;

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    font-family: ${typography.fontFamily};
    transition: all 0.50s ease-in-out;
	width: 100%;
		height: 100%;
  }
  html {
		width: 100%;
		height: 100%;
  }
`;

export const lightTheme = {
	text: colors[projectTema].light.text1,
	body: colors[projectTema].light.body,
	header: colors[projectTema].light.header,
	mode: "light",
	...colors[projectTema].light, // Utilizza i colori chiari specifici per il progettoTema corrente
};

export const darkTheme = {
	text: colors[projectTema].dark.text1,
	body: colors[projectTema].dark.body,
	header: colors[projectTema].dark.header,
	mode: "dark",
	...colors[projectTema].dark, // Utilizza i colori scuri specifici per il progettoTema corrente
};
