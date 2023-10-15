import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Button,
	Card,
	CardContent,
	Chip,
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	SelectChangeEvent,
	Slider,
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
import { Box, Stack } from "@mui/system";

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

	const [minMax, setMinMax] = useState<{
		min: number | undefined;
		max: number | undefined;
	}>({
		min: undefined,
		max: undefined,
	});

	const [priceRange, setPriceRange] = useState<
		[undefined, undefined] | [number, number]
	>([undefined, undefined]);

	const isInRange = (
		price: number,
		priceRange: [number, number] | [undefined, undefined]
	): boolean => {
		if (priceRange[0] === undefined || priceRange[1] === undefined) {
			return false;
		}

		if (price >= priceRange[0] && price <= priceRange[1]) {
			return true;
		} else {
			return false;
		}
	};

	const getPrice = (abbonamento: Abbonamento): number => {
		if (abbonamento.convenzione.isConv) {
			return 24;
		}

		if (abbonamento.promozione.isPromo) {
			return 20;
		}

		return abbonamento.prezzo;
	};

	const calculateMinMax = (
		centroList: Centro[]
	): { min: number; max: number } => {
		let min = Infinity;
		let max = 0;

		centroList.forEach((centro) => {
			centro.subscriptions.forEach((abbonamento) => {
				const price = getPrice(abbonamento);

				if (price > max) {
					max = price;
				}

				if (price < min) {
					min = price;
				}
			});
		});

		return { min, max };
	};

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

				setCentroList(centri);
				selectAll(centri.length);

				let minMax = calculateMinMax(centri);

				setMinMax(minMax);
				setPriceRange([minMax.min, minMax.max]);
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
									style={{
										display: "flex",
										gap: "2rem",
										flexWrap: "wrap",
										justifyContent: isMobile ? "" : "flex-end",
									}}
								>
									<Box width={"200px"}>
										<Typography>Range di Prezzo</Typography>
										<Stack
											spacing={2}
											direction="row"
											sx={{ mb: 1 }}
											alignItems="center"
										>
											<Typography>{`${minMax.min}€`}</Typography>
											<Slider
												valueLabelDisplay="auto"
												min={minMax.min}
												max={minMax.max}
												value={
													priceRange[0] !== undefined &&
													priceRange[1] !== undefined
														? priceRange
														: [
																minMax.min ? minMax.min : 0,
																minMax.max ? minMax.max : 300,
														  ]
												}
												onChange={(_, newRange) =>
													setPriceRange(newRange as [number, number])
												}
											/>
											<Typography>{`${minMax.max}€`}</Typography>
										</Stack>
									</Box>
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
									selectedCentri.map((selectedCentro) => {
										const filteredAbbonamenti = centroList[
											selectedCentro
										].subscriptions.filter((abbonamento) => {
											if (isInRange(getPrice(abbonamento), priceRange)) {
												return abbonamento;
											}
										});

										return (
											<div>
												<Typography
													variant="h4"
													paddingBottom={2}
												>
													{centroList[selectedCentro].name}
												</Typography>
												{filteredAbbonamenti.length === 0 ? (
													<Card sx={{ width: 510, height: 510 }}>
														<CardContent
															sx={{
																height: "100%",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																flexDirection: "column",
															}}
														>
															<Typography
																textAlign={"center"}
																variant="h5"
															>
																Nessun Abbonamento tra i
															</Typography>
															<Typography
																textAlign={"center"}
																variant="h5"
															>
																<strong>{`${priceRange[0]}€ - ${priceRange[1]}€`}</strong>
															</Typography>
														</CardContent>
													</Card>
												) : (
													<div
														style={{
															display: "flex",
															gap: "3em",
															flexWrap: "wrap",
															justifyContent: "center",
															alignContent: "center",
														}}
													>
														{filteredAbbonamenti.map((abbonamento) => (
															<ProductCard
																key={abbonamento.id}
																product={abbonamento}
															/>
														))}
													</div>
												)}
											</div>
										);
									})
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
