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
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "@mui/material/styles";
//REDUX-STORE
import {connect} from "react-redux";
import {setLoading} from "/src/store/actions";
//*-----*//
import Layout from "/src/components/layout/LayoutLogin";
import eCommerceConfig from "/eCommerceConfig.json";
import Image from "next/image";
import {styled} from "@mui/material/styles";
import CookieManager from "/src/components/cookie/CookieManager";

//*-- API---*//
import login from "../api/login";
import Router from "next/router";

const Login = (setLoading) => {
	//setLoading(true); rende visibile il loading
	const theme = useTheme();
	const [username, setUsername] = React.useState("Admin");
	const [password, setPassword] = React.useState("Psw");
	const [rememberMe, setRememberMe] = React.useState(true);

	const handleLogin = async () => {
		const {token, error, success} = await login(username, password, rememberMe);
		console.log("token: ", token);
		console.log("error: ", error);
		console.log("success: ", success);

		//Client gestisce il token e i cookie qui
		if (success) {
			// Salva il token di accesso come cookie o nello stato dell'applicazione
			CookieManager.setCookie("token", token, {expires: 7});
			// Esegui altre azioni dopo il login
			Router.push("/auth/home");
		} else {
			// Gestisci l'errore di autenticazione o l'errore di connessione
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Login | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
				description='This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl.'
			>
				{/* // Esempio di utilizzo del metodo handleLogin al click del bottone */}
				<button onClick={handleLogin}>Login: </button>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(Login);
