import React, {useState} from "react";
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

import CookieManager from "/src/components/coockie/CoockieManager";

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const Login = (setLoading) => {
	//setLoading(true); rende visibile il loading
	const theme = useTheme();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Esegui la logica di autenticazione e ottieni il token di accesso

		// Salva il token di accesso come cookie
		CookieManager.setCookie("token", "valore-del-token", {expires: 7});

		// Esegui altre azioni dopo il login
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Login | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
				description='This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl.'
			>
				<AppBar
					position='static'
					sx={{
						backgroundColor: theme.components.MuiAppBar.styleOverrides.colorInherit,
					}}
				>
					<Container>
						<Toolbar>
							<StyledImageLogo
								src='/images/LogoO.png'
								alt='Logo'
								width={200}
								height={70}
								priority={true}
							/>
						</Toolbar>
					</Container>
				</AppBar>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(Login);
