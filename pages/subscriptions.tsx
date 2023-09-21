import { AppBar, Card, Grid, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import { Subscription } from "src/components/CommonTypesInterfaces";
import SubscriptionCard from "src/components/subscriptions/SubscriptionCard";
import StyledImageLogo from "src/components/utils/StyledImageLogo";

const Subscriptions = () => {
	const theme = useTheme();

	const subscriptions: Subscription[] = [
		{
			name: "Base",
			cost: "9,99",
			description: "Per chi Comincia",
			minMonths: 1,
			characteristics: ["Accesso Illimitato a Lezioni di Yoga"],
		},
		{
			name: "Intermedio",
			cost: "19,99",
			description: "Per i Non Novellini",
			minMonths: 3,
			characteristics: ["Accesso Illimitato a Lezioni di Danza"],
			highlighted: true,
		},
		{
			name: "Avanzato",
			cost: "29,99",
			description: "Per gli Esperti",
			minMonths: 6,
			characteristics: [
				"Accesso Illimitato a Lezioni di Bolero",
				"Cose",
				"Altre Cose Interessanti",
			],
		},
	];

	return (
		<ThemeProvider theme={theme}>
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
			<Typography
				variant="h2"
				textAlign={"center"}
				padding={2}
			>
				Abbonamenti
			</Typography>
			<Grid
				container
				flexDirection="row"
				spacing={2}
				justifyContent={"center"}
				padding={2}
			>
				{subscriptions.map((subscriptionOption) => {
					return (
						// TODO: Figure out why Align works but is considered incorrect...
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={subscriptionOption.name}
							align="center"
						>
							<SubscriptionCard card={subscriptionOption} />
						</Grid>
					);
				})}
			</Grid>
		</ThemeProvider>
	);
};

export default Subscriptions;
