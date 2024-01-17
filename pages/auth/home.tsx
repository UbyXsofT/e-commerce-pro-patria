import React from "react";
import { useRouter } from "next/router";
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
	Paper,
	Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect, useSelector } from "react-redux";
import { setLoading } from "src/store/actions";
//*-----*//
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

//*-- API---*//
//import home from "../api/home";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import { StoreState } from "src/components/CommonTypesInterfaces";

type HomeProps = {
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};
const overlayStyle = {
	backgroundColor: "rgba(255, 255, 255, 0.5)", // Imposta il colore grigio e l'opacità desiderati
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
};
const Home = ({ setLoading }: HomeProps) => {
	const { showAlert } = useAlertMe();
	const router = useRouter();
	const theme = useTheme();
	const authUser = useSelector((state: StoreState) => state.authUser);
	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Home | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce home page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<div
					id="contenitore"
					style={{
						// minHeight: "calc(100vh - 50vh)",
						paddingBottom: "60px",
						height:
							"60vh" /* o qualsiasi percentuale desiderata rispetto all'altezza della finestra */,
					}}
				>
					<Box id="main">
						<Grid
							container
							component="main"
							style={{
								// overflowY: "scroll",
								height:
									"40vh" /* o qualsiasi percentuale desiderata rispetto all'altezza della finestra */,
								// marginBottom: "200px",
							}}
						>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								item
								xs={false}
								sm={4}
								md={6}
								component={Paper}
								elevation={0}
								square
								sx={{
									// backgroundImage: "url(/images/wallpaper.jpg)",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundPosition: "center",
									position: "relative",
								}}
							>
								<div
									style={{
										width: "50%",
										height: "50%",
										position: "relative",
										zIndex: 1,
									}}
								>
									<Image
										src="/images/LogoQ.png"
										alt="Logo"
										fill={true}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ objectFit: "contain" }}
										//objectFit='contain'
										priority={true}
									/>
								</div>
								<Box sx={overlayStyle} />
							</Grid>

							<Grid
								item
								xs={12}
								sm={8}
								md={6}
								component={Paper}
								elevation={2}
								square
							>
								<Box
									sx={{
										my: 2,
										mx: 4,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Avatar sx={{ ml: 1, mr: 1, mb: 1, bgcolor: "primary.main" }}>
										<AccountCircle />
									</Avatar>
									<Typography
										component="h3"
										variant="h6"
										sx={{ textAlign: "center", fontSize: "3vh" }}
									>
										BENVENUTO {authUser?.NOMINATIVO}
									</Typography>
									<br />

									<Grid container>
										<Typography
											variant="h6"
											align="center"
											sx={{
												fontSize: "2vh", // Regola il valore in base alle tue esigenze
											}}
										>
											Esplora le varie opzioni di navigazione nel menu
											principale, nella barra superiore e inferiore. <br />
											<br />
											Per accedere alle tue opzioni utente, clicca sull'icona
											con le tue iniziali nella barra in alto a destra.
											<br />
											<br />
											Grazie per essere con noi!
										</Typography>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
// Assicurati di includere setLoading tra le azioni mapDispatchToProps
const mapDispatchToProps = {
	setLoading,
};

// Wrappa il componente Home con connect per collegarlo al Redux store
export default connect(null, mapDispatchToProps)(Home);
