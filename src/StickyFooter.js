import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import {PartitaIva} from "./PartitaIva";
import Divider from "@mui/material/Divider";
import {Typography} from "@mui/material";
import ScrollToTopButton from "../src/ScrollToTopButton";

export default function StickyFooter() {
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
			<Divider />
			<Box
				component='footer'
				sx={{
					py: 3,
					px: 2,

					//backgroundColor: (theme) => theme.palette.background.paper,
				}}
			>
				<Container
					maxWidth='sm'
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
