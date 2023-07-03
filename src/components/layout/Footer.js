import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "./footer/Copyright";
import {PartitaIva} from "./footer/PartitaIva";
import Divider from "@mui/material/Divider";
import {Typography} from "@mui/material";
import ScrollToTopButton from "./footer/ScrollToTopBtn";

export default function Footer() {
	//console.log("@@@@ theme : ", theme);
	return (
		<Box
			sx={{
				//position: "fixed",
				position: "relative",
				bottom: 0,
				left: 0,
				right: 0,
				mt: "2rem",
			}}
		>
			{/* <Divider /> */}
			<Box
				component='footer'
				sx={{
					py: 3,
					backgroundColor: (theme) => theme.palette.background.paper,
				}}
			>
				<Container
					maxWidth='xl'
					style={{
						display: "flex",
						flexDirection: "row",
						placeContent: "space-between space-evenly",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Copyright />
					<PartitaIva />
					<ScrollToTopButton />
				</Container>
			</Box>
		</Box>
	);
}
