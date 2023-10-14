import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import Layout from "src/components/layout/Layout";
import {
	responseCall,
	obyPostProdotti,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import ProductCard from "src/components/product/ProductCard";

export interface Abbonamento {
	id: string;
	nome: string;
	prezzo: number;
	immagine: string | null;
	descrizione: string;
	convenzione: {
		isConv: boolean;
		descConve: string;
	};
	promozione: {
		isPromo: boolean;
		descPromo: string;
	};
	sceltaOrari: {
		isOrari: boolean;
		daOrari: string;
		aOrari: string;
	};
}

const Store = () => {
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const router = useRouter();

	const [productList, setProductList] = React.useState<
		undefined | Abbonamento[]
	>(undefined);

	useEffect(() => {
		//dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading
		const fetchData = async () => {
			const handleSuccess = (msg_Resp: any) => {
				//success data
				console.log(msg_Resp.messageCli.message.prodotti);
				// Imposta lo stato locale dei prodotti con i dati ottenuti dalla chiamata API

				setProductList(msg_Resp.messageCli.message.prodotti);
			};
			const handleError = (error: any) => {
				//ERROR data
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{error}</strong>
						</h3>
					</React.Fragment>
				);
				showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			const obyPostProdotti: obyPostProdotti = {
				clienteKey: eCommerceConf.ClienteKey,
				IDCliente: "CLABKM5",
				IDCentro: 0,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"prodotti",
					obyPostProdotti,
					null
				);
				handleSuccess(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		fetchData();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Layout
				title={`Store | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce store page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<div>
					<Typography
						variant="h5"
						component="h1"
						gutterBottom
					>
						Benvenuto Nello Store
					</Typography>
					<Button
						onClick={() => {
							router.push({
								pathname: "/auth/carrello",
								query: { origin: "/auth" },
							});
						}}
					>
						Vai al Carrello
					</Button>

					<div>
						<h1>Lista Prodotti</h1>
						{!productList ? (
							<p>Caricamento...</p>
						) : (
							<div
								style={{
									display: "flex",
									gap: "3em",
									padding: "1rem",
									flexWrap: "wrap",
									justifyContent: "center",
								}}
							>
								{productList.map((abbonamento) => (
									<ProductCard
										key={abbonamento.id}
										product={abbonamento}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default Store;
