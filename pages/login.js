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
import {setLoading} from "../src/store/actions";
//*-----*//
import Layout from "../src/components/layout/LayoutLogin";
import eCommerceConfig from "../eCommerceConfig.json";
import Image from "next/image";
import {styled} from "@mui/material/styles";

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const Login = (setLoading) => {
	//setLoading(true); rende visibile il loading
	const theme = useTheme();
	const [isRegister, setIsRegister] = useState(false);

	const handleSwitchMode = () => {
		setIsRegister(!isRegister);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Gestisci la logica di autenticazione o registrazione qui
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
