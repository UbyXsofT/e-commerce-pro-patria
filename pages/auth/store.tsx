import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	Grid,
	InputAdornment,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	SelectChangeEvent,
	Slider,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch dal react-redux
import { setCentri, setLoading } from "src/store/actions";
import eCommerceConf from "eCommerceConf.json";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import Layout from "src/components/layout/Layout";
import {
	responseCall,
	obyPostProdotti,
	Abbonamento,
	StoreState,
} from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";
import ProductCard from "src/components/product/ProductCard";
import { Box, Stack } from "@mui/system";
import { Search } from "@mui/icons-material";
import { fetchCentri } from "pages/_app";

export interface Centro {
	id: number;
	name: string;
	principale?: true;
	subscriptions: Abbonamento[];
}

export const getPrice = (abbonamento: Abbonamento): number => {
	if (abbonamento.convenzione.isConv) {
		return 24;
	}

	if (abbonamento.promozione.isPromo) {
		return 20;
	}

	return abbonamento.prezzo;
};

export type PriceInfo = { basePrice: number; discountedPrice: number | null };

export const getPrices = (abbonamento: Abbonamento): PriceInfo => {
	let prices: PriceInfo = {
		basePrice: abbonamento.prezzo,
		discountedPrice: null,
	};

	if (abbonamento.convenzione.isConv) {
		prices.discountedPrice = 24;
	}

	if (abbonamento.promozione.isPromo) {
		prices.discountedPrice = 20;
	}

	return prices;
};

const Store = () => {
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const router = useRouter();

	const centri = useSelector((state: StoreState) => state.centri);

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

	const [search, setSearch] = useState("");

	const [placeholder, setPlaceholder] = useState("");

	const [orderByPrice, setOrderByPrice] = useState(false);

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

	const randomIntFromInterval = (min: number, max: number): number => {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	const findRandomString = (centroList: Centro[]): string => {
		const centroIdx = randomIntFromInterval(0, centroList.length - 1);
		const subscriptionIdx = randomIntFromInterval(
			0,
			centroList[centroIdx].subscriptions.length - 1
		);

		return centroList[centroIdx].subscriptions[subscriptionIdx].nome;
	};

	useEffect(() => {
		if (centri.centri.length === 0) {
			return;
		}

		setCentroList(centri.centri);
		selectAll(centri.centri.length);

		let minMax = calculateMinMax(centri.centri);

		setMinMax(minMax);
		setPriceRange([minMax.min, minMax.max]);
		setPlaceholder(findRandomString(centri.centri));
	}, [centri]);

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
				{centri.error ? (
					<Box
						textAlign={"center"}
						marginTop={12}
					>
						<Typography
							gutterBottom
							variant="h4"
						>
							Qualcosa è andato storto
						</Typography>
						<Button
							onClick={async () => {
								dispatch(setCentri(await fetchCentri()));
							}}
						>
							Prova a Ricaricare
						</Button>
					</Box>
				) : (
					<div>
						<Grid
							container
							justifyContent={"space-between"}
							spacing={2}
						>
							<Grid
								item
								xs={12}
								md={12}
								lg={4}
							>
								<Typography variant="h4">
									<strong>Lista Prodotti</strong>
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
								lg={4}
							>
								<TextField
									fullWidth
									label="Cerca"
									value={search}
									onChange={(e) => setSearch(e.target.value.trimStart())}
									onBlur={(e) => setSearch(e.target.value.trim())}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Search />
											</InputAdornment>
										),
									}}
									placeholder={placeholder}
								/>
							</Grid>

							<Grid
								container
								item
								xs={12}
								md={6}
								lg={4}
							>
								{selectedCentri !== undefined ? (
									<Grid
										item
										container
										spacing={2}
									>
										<Grid
											container
											item
											md={12}
											lg={6}
										>
											<Grid item>
												<Button
													variant="text"
													onClick={(_) => {
														selectAll();
													}}
												>
													Tutti
												</Button>
											</Grid>
											<Grid item>
												<FormControl>
													<InputLabel id="centro">Centro</InputLabel>
													<Select
														labelId="centro"
														value={selectedCentri}
														label="Centro"
														multiple
														renderValue={(selected) => (
															<Box
																sx={{
																	display: "flex",
																	flexWrap: "wrap",
																	gap: 0.5,
																}}
															>
																{selected.map((value) => (
																	<Chip
																		key={value}
																		label={
																			centroList ? centroList[value].name : ""
																		}
																	/>
																))}
															</Box>
														)}
														onChange={(newValue) =>
															updateSelectedCentro(newValue)
														}
													>
														<ListSubheader>In Sede</ListSubheader>
														{centroList
															?.filter((centro) => centro.principale)
															.map((centro) => (
																<MenuItem value={centro.id}>
																	{centro.name}
																</MenuItem>
															))}
														<ListSubheader>Fuori Sede</ListSubheader>
														{centroList
															?.filter(
																(centro) => centro.principale === undefined
															)
															.map((centro) => (
																<MenuItem value={centro.id}>
																	{centro.name}
																</MenuItem>
															))}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
										<Grid
											container
											item
											md={12}
											lg={6}
										>
											<Grid item>
												<FormControlLabel
													control={
														<Checkbox
															value={orderByPrice}
															onChange={(e) => setOrderByPrice(!orderByPrice)}
														/>
													}
													label="Ordina Per Prezzo"
												/>
											</Grid>
											<Grid
												item
												width={"200px"}
											>
												<Typography>Range di Prezzo</Typography>
												<Stack
													spacing={3}
													direction="row"
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
											</Grid>
										</Grid>
									</Grid>
								) : (
									<></>
								)}
							</Grid>
						</Grid>
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
										let filteredAbbonamenti = centroList[
											selectedCentro
										].subscriptions
											.filter((abbonamento) => {
												if (isInRange(getPrice(abbonamento), priceRange)) {
													return abbonamento;
												}
											})
											.filter((abbonamento) => {
												if (
													abbonamento.nome.search(new RegExp(search, "i")) !==
													-1
												) {
													return abbonamento;
												}
											});

										if (orderByPrice) {
											filteredAbbonamenti.sort(
												(abbonamento1, abbonamento2) =>
													getPrice(abbonamento1) - getPrice(abbonamento2)
											);
										}

										return (
											<div>
												<Typography
													variant="h4"
													paddingBottom={2}
												>
													{centroList[selectedCentro].name}
												</Typography>
												{filteredAbbonamenti.length === 0 ? (
													<Card
														sx={{ width: isMobile ? "auto" : 510, height: 510 }}
													>
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
																gutterBottom
															>
																<strong>{`${priceRange[0]}€ - ${priceRange[1]}€`}</strong>
															</Typography>
															{search !== "" ? (
																<Typography
																	textAlign={"center"}
																	variant="h5"
																>
																	Contenente
																	<strong> {search}</strong>
																</Typography>
															) : (
																<></>
															)}
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
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default Store;
