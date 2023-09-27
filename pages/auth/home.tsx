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
import { setLoading } from "../../src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/Layout";
import eCommerceConf from "../../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";

//*-- API---*//
//import home from "../api/home";
import { useAlertMe } from "../../src/components/layout/alert/AlertMeContext";

import Product from "../../src/components/product/Product";
import Products from "../../data/products.json";
import { AlertMe } from "src/components/layout/alert/AlertMe";

type HomeProps = {
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
};

const Home = ({ setLoading }: HomeProps) => {
	const { showAlert } = useAlertMe();
	// const textAlert = (
	//   <React.Fragment>
	//     Orari segreteria: Dal lunedì al venerdì dalle 8.30-13.00 ; 14.00-20.30 <br />
	//     Orari estivi segreteria (Giugno- Luglio) 9.30-12.30 ; 14.30-16.30 <br />
	//     <h3>
	//       <strong>Agosto chiuso</strong>
	//       <br />
	//       <br />
	//       <Link color="inherit" href={eCommerceConf.LinkHomeCenter}>
	//         Per maggiori informazioni clicca qui!
	//       </Link>
	//     </h3>
	//     <div style={{ width: "60px", height: "60px", position: "relative", zIndex: 1 }}>
	//       <Image src="/images/LogoQ.png" alt="Logo" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} priority={true} />
	//     </div>
	//   </React.Fragment>
	// );

	// React.useEffect(() => {
	//   showAlert("filled", "warning", "Orari segreteria Example", textAlert, true);
	// }, []);

	// Rendi visibile il loading impostando setLoading su true
	// React.useEffect(() => {
	//   setLoading(true);
	//   // Effettua le operazioni di caricamento, se necessario
	//   // Qui puoi fare richieste API, ottenere i dati, ecc.
	//   // Quando hai completato il caricamento, imposta isLoading su false:
	//   setTimeout(() => {
	//     console.log("Esempio ritardo nel caricare i dati di secondi");
	//     setLoading(false);
	//   }, 3000);
	// }, []);

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
						{Products.map((product, i) => (
							<Product
								{...product}
								key={i}
							/>
						))}
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
