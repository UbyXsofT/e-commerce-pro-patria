import React, { Fragment, ReactNode, useEffect, useState } from "react";
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
	NativeSelect,
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
// import ProductCard from "src/components/product/ProductCard";
import ProductCard from "src/components/product/ProductCard";
import { Box, Stack } from "@mui/system";
import { Search } from "@mui/icons-material";
import { fetchCentri } from "pages/_app";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import chiaveRandom from "src/components/utils/chiaveRandom";

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
		prices.discountedPrice = 24.99;
	}

	if (abbonamento.promozione.isPromo) {
		prices.discountedPrice = 20.99;
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
	// const [selectedCentri, setSelectedCentri] = useState<undefined | number[]>(
	// 	undefined
	// );

	const [selectedCentro, setSelectedCentro] = useState<number>(0);
	const [isAllSelectCenter, setIsAllSelectCenter] = React.useState(false);

	const [filteredAbbonamenti, setFilteredAbbonamenti] = useState<Abbonamento[]>(
		[]
	);

	//FILTRI
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
	//FILTRI

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
		console.log("@@@ centri.centri", centri.centri);

		if (centri.centri.length === 0) {
			return;
		}

		setCentroList(centri.centri);
		setSelectedCentro(0 as number);

		let minMax = calculateMinMax(centri.centri);

		setMinMax(minMax);
		setPriceRange([minMax.min, minMax.max]);
		setPlaceholder(findRandomString(centri.centri));

		//console.log("@@@ centroList: ", centroList);
		setFilteredAbbonamenti(centri.centri[selectedCentro].subscriptions);
	}, [centri]);

	const updateSelectedCentro = (newValue: number) => {
		console.log("@@@ updateSelectedCentro: ", newValue);
		setSelectedCentro(newValue);
		setFilteredAbbonamenti(centri.centri[newValue].subscriptions);
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
							<strong>Qualcosa è andato storto</strong>
						</Typography>
						<Button
							variant="contained"
							onClick={async () => {
								dispatch(setCentri(await fetchCentri()));
							}}
						>
							Prova a Ricaricare
						</Button>
					</Box>
				) : (
					<>
						{/* HEADER */}
						<Grid
							item
							xs={12}
							md={12}
							lg={12}
							sx={{ mb: 3 }}
						>
							<Typography variant="h4">
								<strong>Lista Prodotti</strong>
							</Typography>
						</Grid>
						<Grid
							container
							justifyContent={"space-between"}
							spacing={2}
						>
							<Grid
								item
								xs={12}
								md={3}
								lg={3}
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

							{selectedCentro !== undefined ? (
								<>
									{isMobile ? (
										// Contenuto per dispositivi mobili
										<>
											<Grid
												container
												item
												xs={12}
												md={12}
												lg={8}
												sx={{
													display: "block",
													flexDirection: "row",
													flexWrap: "nowrap",
													justifyContent: "space-between",
													marginBottom: "40px",
												}}
												// sx={{ display: "block" }}
											>
												<Grid item>
													<FormControl fullWidth>
														<InputLabel
															variant="standard"
															htmlFor="uncontrolled-native"
															shrink={true} // Impostato su true se c'è un valore selezionato
														>
															Seleziona Centro:
														</InputLabel>

														<NativeSelect
															inputProps={{
																name: "centro",
																id: "uncontrolled-native",
															}}
															onChange={(event) => {
																const newValue = event.target.value
																	? parseFloat(event.target.value)
																	: 0;
																updateSelectedCentro(newValue);
															}}
														>
															{centroList?.map((centro) => (
																<option
																	key={centro.id}
																	value={centro.id}
																>
																	{centro.name}
																</option>
															))}
														</NativeSelect>
													</FormControl>
												</Grid>
											</Grid>
											<Grid
												container
												item
												xs={12}
												md={12}
												lg={8}
												sx={{
													display: "flex",
													flexDirection: "row",
													flexWrap: "nowrap",
													justifyContent: "space-between",
													marginBottom: "40px",
												}}
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
										</>
									) : (
										// Contenuto per desktop
										<>
											<Grid
												container
												item
												xs={12}
												md={12}
												lg={8}
												sx={{
													// display: "flex",
													// flexDirection: "row",
													// flexWrap: "nowrap",
													// justifyContent: "space-between",
													marginBottom: "50px",
													display: "flex",
													justifyContent: "space-evenly",
													flexWrap: "nowrap",
													alignItems: "center",
												}}
											>
												<Grid item>
													<FormControl
														fullWidth
														sx={{ width: "100%" }}
													>
														<InputLabel
															variant="standard"
															htmlFor="uncontrolled-native"
															shrink={true} // Impostato su true se c'è un valore selezionato
														>
															Seleziona Centro:
														</InputLabel>

														<NativeSelect
															inputProps={{
																name: "centro",
																id: "uncontrolled-native",
															}}
															onChange={(event) => {
																const newValue = event.target.value
																	? parseFloat(event.target.value)
																	: 0;
																updateSelectedCentro(newValue);
															}}
														>
															{centroList?.map((centro) => (
																<option
																	key={centro.id}
																	value={centro.id}
																>
																	{centro.name}
																</option>
															))}
														</NativeSelect>
													</FormControl>
												</Grid>
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
										</>
									)}
								</>
							) : (
								<></>
							)}
						</Grid>
						{!centroList ? (
							<p>Caricamento...</p>
						) : (
							<>
								<Typography
									variant="h4"
									paddingBottom={2}
								>
									<WorkspacesIcon style={{ marginRight: "20px" }} />
									{centroList[selectedCentro].name}
								</Typography>

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
									<div key={chiaveRandom()}>
										{filteredAbbonamenti.length === 0 ? (
											<Card
												sx={{ width: isMobile ? "auto" : "auto", height: 110 }}
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
												{filteredAbbonamenti
													.filter((abbonamento) => {
														if (isInRange(getPrice(abbonamento), priceRange)) {
															return true;
														}
														return false;
													})
													.filter((abbonamento) => {
														if (
															abbonamento.nome.search(
																new RegExp(search, "i")
															) !== -1
														) {
															return true;
														}
														return false;
													})
													.sort((abbonamento1, abbonamento2) => {
														if (orderByPrice) {
															return (
																getPrice(abbonamento1) - getPrice(abbonamento2)
															);
														}
														return 0;
													})
													.map((abbonamento, index) => {
														console.log("abbonamento: ", abbonamento);
														return (
															<ProductCard
																key={chiaveRandom()}
																product={abbonamento}
															/>
														);
													})}
											</div>
										)}
									</div>
								</div>
							</>
						)}
					</>
				)}
			</Layout>
		</ThemeProvider>
	);
};

export default Store;
