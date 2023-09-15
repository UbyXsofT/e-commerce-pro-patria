import React, { useState } from "react";
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	AppBar,
	Toolbar,
	CssBaseline,
	Paper,
	Box,
	Avatar,
	Link,
	useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "src/store/actions";

import Image from "next/image";
import { styled } from "@mui/material/styles";

import Step1 from "src/components/account/resetPassword/Step1";
import Step2 from "src/components/account/resetPassword/Step2";
import { useRouter } from "next/router";

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const resetPassword = (_setLoading: any) => {
	const router = useRouter();
	const { origin } = router.query;

	//setLoading(true); rende visibile il loading
	const theme = useTheme();

	const [done, setDone] = useState(false);

	const [email, setEmail] = useState("");
	const [codiceFiscale, setCodiceFiscale] = useState("");

	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: false,
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <Layout
        //digitare il titolo della pagina e la descrizione della pagina.
        title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      > */}
			<AppBar
				position="static"
				sx={{
					// Specify the type of backgroundColor
					backgroundColor: (
						theme?.components?.MuiAppBar?.styleOverrides?.colorInherit as {
							backgroundColor?: string;
						}
					)?.backgroundColor,
				}}
			>
				<Container sx={{ display: "flex", alignItems: "center" }}>
					<Toolbar>
						<StyledImageLogo
							src="/images/LogoO.png"
							alt="Logo"
							width={200}
							height={70}
							priority={true}
						/>
					</Toolbar>
				</Container>
			</AppBar>
			{done ? (
				<Step2 smUp={smUp} />
			) : (
				<Step1
					origin={origin}
					smUp={smUp}
					setDone={setDone}
					email={email}
					setEmail={setEmail}
					codiceFiscale={codiceFiscale}
					setCodiceFiscale={setCodiceFiscale}
				/>
			)}
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(resetPassword);
