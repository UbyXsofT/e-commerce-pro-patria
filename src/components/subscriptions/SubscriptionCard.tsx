import { Button, Card, Divider, Typography } from "@mui/material";
import { Subscription } from "../CommonTypesInterfaces";
import { useTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";

type SubscriptionCardProps = {
	card: Subscription;
};

const SubscriptionCard = ({
	card: { name, cost, description, minMonths, characteristics, highlighted },
}: SubscriptionCardProps) => {
	const theme = useTheme();

	return (
		<Card
			sx={{
				maxWidth: "300px",
				height: "450px",
				padding: 3,
			}}
		>
			<div
				style={{
					backgroundColor: highlighted ? green[800] : grey[800],
					borderRadius: 7,
					padding: 5,
					paddingTop: 15,
					marginBottom: 10,
				}}
			>
				<Typography
					variant={"h5"}
					textAlign={"center"}
				>
					{name}
				</Typography>
				<Typography
					variant={"h4"}
					textAlign={"center"}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "baseline",
					}}
				>
					<strong>{cost}</strong>
				</Typography>
				<Typography
					variant="subtitle1"
					textAlign={"center"}
				>
					€ al Mese per almeno
					<strong>{minMonths === 1 ? ` 1 mese` : ` ${minMonths} mesi`}</strong>
				</Typography>
				<Typography
					variant="h6"
					marginBottom={3}
				>
					{description}
				</Typography>
				<Button
					variant="contained"
					sx={{ marginBottom: 2 }}
				>
					Scegli
				</Button>
			</div>
			{characteristics.map((characteristic) => (
				<Typography>{characteristic}</Typography>
			))}
		</Card>
	);
};

export default SubscriptionCard;
