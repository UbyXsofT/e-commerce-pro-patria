import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import ecommerceConfig from "../ecommerceConfig.json";
function Copyright() {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
		>
			{"Copyright © "}
			<Link
				color='inherit'
				href={ecommerceConfig.LinkHomeCenter}
			>
				{ecommerceConfig.Copyright}
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

function PartitaIva() {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
		>
			Partita IVA: {ecommerceConfig.PartitaIva}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
			}}
		>
			<Box
				component='footer'
				sx={{
					py: 3,
					px: 2,
					mt: "auto",
					backgroundColor: (theme) =>
						theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
				}}
			>
				<Container
					maxWidth='sm'
					style={{
						display: "flex",
						alignSelf: "center",
						alignContent: "space-between",
						justifyContent: "space-evenly",
						flexDirection: "row",
					}}
				>
					<Copyright />
					<PartitaIva />
				</Container>
			</Box>
		</Box>
	);
}
