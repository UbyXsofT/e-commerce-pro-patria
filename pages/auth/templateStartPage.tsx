import React from "react";
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	FormControl,
	FormHelperText,
	Link,
	Fade,
	AppBar,
	Toolbar,
	Collapse,
	Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "src/store/actions";
//*-----*//
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

//*-- API---*//
//import esempio from "../api/esempio";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";

type EsempioProps = {
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};

const Esempio = ({ setLoading }: EsempioProps) => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Esempio | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce esempio page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />

				<Typography
					variant="h5"
					component="h1"
					gutterBottom
				>
					ESEMPIO
				</Typography>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
// Assicurati di includere setLoading tra le azioni mapDispatchToProps
const mapDispatchToProps = {
	setLoading,
};

// Wrappa il componente Esempio con connect per collegarlo al Redux store
export default connect(null, mapDispatchToProps)(Esempio);
