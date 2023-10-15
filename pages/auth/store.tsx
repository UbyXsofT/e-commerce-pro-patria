import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Button,
	Chip,
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
	useMediaQuery,
} from "@mui/material";
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
import { Box } from "@mui/system";

interface Centro {
	id: number;
	name: string;
	principale?: true;
	subscriptions: Abbonamento[];
}

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

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [centroList, setCentroList] = useState<undefined | Centro[]>(undefined);
	const [selectedCentri, setSelectedCentri] = useState<undefined | number[]>(
		undefined
	);

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

				const centri: Centro[] = [
					{
						id: 0,
						name: "Principale",
						subscriptions: msg_Resp.messageCli.message.prodotti,
						principale: true,
					},
					{
						id: 1,
						name: "Secondario",
						subscriptions: msg_Resp.messageCli.message.prodotti.slice(0, 2),
					},
					{
						id: 2,
						name: "Terzo",
						subscriptions: msg_Resp.messageCli.message.prodotti.slice(1, 3),
					},
				];

				setProductList(msg_Resp.messageCli.message.prodotti);
				setCentroList(centri);
				selectAll(centri.length);
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

	const updateSelectedCentro = (newValue: SelectChangeEvent<number[]>) => {
		if (newValue.target.value.length === 0) {
			return;
		}

		setSelectedCentri(newValue.target.value as number[]);
	};

	const selectAll = (length?: number) => {
		if (length !== undefined) {
			setSelectedCentri(Array.from(Array(length).keys()));
		} else {
			setSelectedCentri(
				Array.from(Array(centroList ? centroList.length : 0).keys())
			);
		}
	};

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
						<span
							style={{
								display: isMobile ? "block" : "flex",
								gap: "2rem",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<h1>Lista Prodotti</h1>

							{selectedCentri !== undefined ? (
								<div
									style={{ display: "flex", gap: "2rem", alignItems: "center" }}
								>
									<Button
										variant="outlined"
										onClick={(_) => {
											selectAll();
										}}
									>
										Visualizza Tutti
									</Button>
									<FormControl sx={{ width: "300px" }}>
										<InputLabel id="centro">Centro</InputLabel>
										<Select
											labelId="centro"
											value={selectedCentri}
											label="Centro"
											multiple
											renderValue={(selected) => (
												<Box
													sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
												>
													{selected.map((value) => (
														<Chip
															key={value}
															label={centroList ? centroList[value].name : ""}
														/>
													))}
												</Box>
											)}
											onChange={(newValue) => updateSelectedCentro(newValue)}
										>
											<ListSubheader>In Sede</ListSubheader>
											{centroList
												?.filter((centro) => centro.principale)
												.map((centro) => (
													<MenuItem value={centro.id}>{centro.name}</MenuItem>
												))}
											<ListSubheader>Fuori Sede</ListSubheader>
											{centroList
												?.filter((centro) => centro.principale === undefined)
												.map((centro) => (
													<MenuItem value={centro.id}>{centro.name}</MenuItem>
												))}
										</Select>
									</FormControl>
								</div>
							) : (
								<></>
							)}
						</span>
						{!centroList ? (
							<p>Caricamento...</p>
						) : (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "3em",
									padding: "1rem",
									flexWrap: "wrap",
									justifyContent: "center",
									alignContent: "center",
								}}
							>
								{selectedCentri !== undefined ? (
									selectedCentri.map((selectedCentro) => (
										<div>
											<Typography
												variant="h4"
												paddingBottom={2}
											>
												{centroList[selectedCentro].name}
											</Typography>
											<div
												style={{
													display: "flex",
													gap: "3em",
													flexWrap: "wrap",
													justifyContent: "center",
													alignContent: "center",
												}}
											>
												{centroList[selectedCentro].subscriptions.map(
													(abbonamento) => (
														<ProductCard
															key={abbonamento.id}
															product={abbonamento}
														/>
													)
												)}
											</div>
										</div>
									))
								) : (
									<p>Nessun Centro</p>
								)}
							</div>
						)}
					</div>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default Store;
