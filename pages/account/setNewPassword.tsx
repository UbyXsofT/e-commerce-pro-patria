import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import Step1 from "src/components/account/setNewPassword/Step1";
import Step2 from "src/components/account/setNewPassword/Step2";

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
			{/* <Layout
    //digitare il titolo della pagina e la descrizione della pagina.
    title={`Login | E-Commerce ${eCommerceConf.NomeEcommerce}`}
    description="This is a E-Commerce login page, using React.js Next.js and Material-UI. Powered by Byteware srl."
  > */}
			<AppBar
				position="static"
				sx={{
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
					smUp={smUp}
					setDone={setDone}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					confirmNewPassword={confirmNewPassword}
					setConfirmNewPassword={setConfirmNewPassword}
				/>
			)}
		</ThemeProvider>
	);
};

export default setNewPassword;
