import * as React from "react";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { PartitaIva } from "./PartitaIva";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery } from "@mui/material";
import { ScrollToTopBtn } from "./ScrollToTopBtn";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { PrivacyCookie } from "./PrivacyCookie";

export function Footer() {
	const [isFooterFixed, setIsFooterFixed] = React.useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleResize = () => {
		if (isMobile) {
			setIsFooterFixed(false);
		} else {
			const windowHeight = window.innerHeight;
			const header = document.getElementById("header");
			const footerElement = document.getElementById("footer"); // Replace with your footer's ID
			const contentElement = document.getElementById("content"); // Replace with your content's ID

			if (footerElement && contentElement) {
				const footerRect = footerElement.getBoundingClientRect();
				const contentRect = contentElement.getBoundingClientRect();

				const headerHeight = header?.clientHeight ? header?.clientHeight : 0;

				// Check for collision by comparing bottom position of the content and top position of the footer
				let isColliding =
					contentRect.height + footerRect.height + headerHeight + 24 >
					windowHeight;

				setIsFooterFixed(!isColliding);
			}
		}
	};

	React.useEffect(() => {
		// Add an event listener for the "resize" event
		window.addEventListener("resize", handleResize);

		// Call the initial handleResize to set the initial state
		handleResize();

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	React.useEffect(() => {
		handleResize();
	}, [typeof window !== "undefined" ? document.body.clientHeight : {}]);

	// Definiamo l'animazione per le proprietà di posizione con useSpring
	const positionAnimationProps = useSpring({
		bottom: isFooterFixed ? 0 : 0,

		config: { duration: 100 }, // Opzionale: personalizza la durata dell'animazione di posizione
	});

	return (
		<animated.footer
			id="footer"
			style={{
				...positionAnimationProps,
				left: isFooterFixed ? 100 : 0,
				right: isFooterFixed ? 50 : 0,
				position: isFooterFixed ? "fixed" : "relative",
			}}
		>
			<Container
				maxWidth={false}
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[200]
							: theme.palette.grey[900],
					color: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[600]
							: theme.palette.grey[400],
					borderRadius: "5px",

					pt: 3,
					pb: 3,
				}}
			>
				{/* <Divider sx={{mb: "1rem", mt: "1rem"}} /> */}
				<Grid
					container
					spacing={5}
				>
					<Grid
						item
						xs={12}
						sm={4}
					>
						<Box
							sx={{
								borderLeft: "4px solid",
								borderColor: (theme) => theme.palette.primary.main,
								paddingLeft: "1rem",
								height: "100%",
							}}
						>
							<Typography
								variant="h6"
								gutterBottom
								sx={{
									color: (theme) =>
										theme.palette.mode === "light" ? "black" : "white",
								}}
							>
								Chi siamo
							</Typography>
							<Typography variant="body2">
								We are XYZ company, dedicated to providing the best service to
								our customers.
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
					>
						<Box
							sx={{
								borderLeft: "4px solid",
								borderColor: (theme) => theme.palette.primary.main,
								paddingLeft: "1rem",
								height: "100%",
							}}
						>
							<Typography
								variant="h6"
								gutterBottom
								sx={{
									color: (theme) =>
										theme.palette.mode === "light" ? "black" : "white",
								}}
							>
								Contattaci
							</Typography>
							<Typography variant="body2">
								123 Main Street, Anytown, USA
							</Typography>
							<Typography variant="body2">Email: info@example.com</Typography>
							<Typography variant="body2">Phone: +1 234 567 8901</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
					>
						<Box
							sx={{
								borderLeft: "4px solid",
								borderColor: (theme) => theme.palette.primary.main,
								paddingLeft: "1rem",
								height: "100%",
							}}
						>
							<Typography
								variant="h6"
								gutterBottom
								sx={{
									color: (theme) =>
										theme.palette.mode === "light" ? "black" : "white",
								}}
							>
								Seguici
							</Typography>

							<Link
								href="https://www.facebook.com/"
								color="inherit"
							>
								<Facebook />
							</Link>
							<Link
								href="https://www.instagram.com/"
								color="inherit"
								sx={{ pl: 1, pr: 1 }}
							>
								<Instagram />
							</Link>
							<Link
								href="https://www.twitter.com/"
								color="inherit"
							>
								<Twitter />
							</Link>
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ mb: "1rem", mt: "1rem" }} />

				<PrivacyCookie />

				<Divider sx={{ mb: "1rem", mt: "1rem" }} />

				<Box
					sx={{
						backgroundColor: (theme) => theme.palette.primary.main,
						borderRadius: 1,
						p: 2,
					}}
				>
					<Typography
						variant="body2"
						align="center"
						sx={{ color: "white" }}
					>
						<PartitaIva />
					</Typography>

					<Typography
						variant="body2"
						align="center"
						sx={{ color: "white" }}
					>
						<Copyright />
					</Typography>
				</Box>

				<ScrollToTopBtn />
			</Container>
		</animated.footer>
	);
}
// Condizioni generali di uso e vendita
// Informativa sulla privacy
// Cookie
