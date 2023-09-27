import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import Step1 from "src/components/account/setNewPassword/Step1";
import Step2 from "src/components/account/setNewPassword/Step2";
import LayoutGeneral from "src/components/layout/LayoutGeneral";
import eCommerceConf from "eCommerceConf.json";

const StyledImageLogo = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const setNewPassword = () => {
	const theme = useTheme();

	const [done, setDone] = useState(false);

	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: false,
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<LayoutGeneral
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Modifica password | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce password change, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<Step1
					smUp={smUp}
					setDone={setDone}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					confirmNewPassword={confirmNewPassword}
					setConfirmNewPassword={setConfirmNewPassword}
				/>
			</LayoutGeneral>
		</ThemeProvider>
	);
};

export default setNewPassword;
