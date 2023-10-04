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
//import home from "../api/home";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import HomeProducts from "data/products.json";
import ProductList from "src/components/product/ProductList";
import { AlertMe } from "src/components/layout/alert/AlertMe";

type HomeProps = {
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};

const Home = ({ setLoading }: HomeProps) => {
	const { showAlert } = useAlertMe();

	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Home | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce home page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<div>
					<h1>E-Commerce in Next.js and Snipcart</h1>
					<span className="snipcart-items-count">COUNT</span>
					<span className="snipcart-total-price">€ 0,00</span>

					<div>
						<ProductList products={HomeProducts} />
					</div>
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
