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
import eCommerce from "eCommerceConf.json";

// Nel componente Footer
interface FooterProps {
	contentRef: React.RefObject<HTMLDivElement | null>;
}

export function Footer({ contentRef }: FooterProps) {
	const [isFooterFixed, setIsFooterFixed] = React.useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [bottomMobile, setBottomMobile] = React.useState(isMobile ? 40 : 0);

	const handleResize = React.useCallback(() => {
		const windowHeight = window.innerHeight;
		const header = document.getElementById("header");
		const footerElement = document.getElementById("footer");
		const contentElement = contentRef.current;
		setBottomMobile(isMobile ? 40 : 0);
		if (!header || !footerElement) {
			return;
		}
		if (footerElement && contentElement) {
			const contentRect = contentElement.getBoundingClientRect();
			const headerHeight = header?.clientHeight || 0;

			let isColliding =
				contentRect.height + headerHeight + bottomMobile > windowHeight;
			setIsFooterFixed(!isColliding);
		}
		//}
	}, [isMobile, contentRef]);

	React.useEffect(() => {
		if (typeof ResizeObserver === "function") {
			// Usa ResizeObserver
			const resizeObserver = new ResizeObserver(handleResize);

			const parentElement = contentRef.current;
			if (parentElement) {
				resizeObserver.observe(parentElement);
			}

			return () => {
				if (parentElement) {
					resizeObserver.unobserve(parentElement);
				}
			};
			// ...
		} else {
			// Fallback o messaggio di avviso
			console.warn("ResizeObserver non è supportato in questo ambiente.");
		}
	}, [handleResize, contentRef]);

	React.useEffect(() => {
	}, [isFooterFixed]);

	function throttle<T extends (...args: any[]) => void>(func: T, wait: number) {
		let timeout: NodeJS.Timeout | null;
		return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
			const context = this;
			if (!timeout) {
				timeout = setTimeout(function () {
					timeout = null;
					func.apply(context, args);
				}, wait);
			}
		};
	}

	React.useEffect(() => {
		const handleResizeThrottled = throttle(handleResize, 100);
		window.addEventListener("resize", handleResizeThrottled);
		handleResize(); // Chiamare handleResize iniziale per impostare lo stato iniziale
		return () => {
			window.removeEventListener("resize", handleResizeThrottled);
		};
	}, [handleResize]);

	// Definiamo l'animazione per le proprietà di posizione con useSpring
	const positionAnimationProps = useSpring({
		bottom: bottomMobile,
		marginTop: bottomMobile,
		config: { duration: 200 },
	});

	return (
		<animated.footer
			id="footer"
			style={{
				...positionAnimationProps,
				// left: isFooterFixed ? 100 : 0,
				// right: isFooterFixed ? 50 : 0,
				position: isFooterFixed ? "fixed" : "relative",
				left: isFooterFixed ? "24px" : "0px",
				right: isFooterFixed ? "24px" : "0px",
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
							<Typography variant="body2">{eCommerce.ChiSiamo}</Typography>
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
								{eCommerce.Contatti.indirizzo}
							</Typography>
							<Typography variant="body2">
								- {eCommerce.Contatti.telefono}
							</Typography>
							<Typography variant="body2">
								- e-mail: {eCommerce.Contatti.email}
							</Typography>
							<Typography variant="body2">
								- Inviare la corrispondenza in :{" "}
								{eCommerce.Contatti.indirizzoCorrispondenza}
							</Typography>
							<Typography variant="body2">
								{" "}
								<br></br>
							</Typography>
							<Typography variant="body2">
								- Orari segreteria:{" "}
								{eCommerce.Contatti.orariSegreteria.lunedì_venerdì}
							</Typography>
							<Typography variant="body2">
								- Orari estivi segreteria:{" "}
								{eCommerce.Contatti.orariSegreteria.orariEstivi}
							</Typography>
							<Typography variant="body2">
								- Agosto: {eCommerce.Contatti.orariSegreteria.agosto}
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
								Seguici
							</Typography>

							<Link
								href={eCommerce.Seguici.Facebook}
								color="inherit"
							>
								<Facebook />
							</Link>
							<Link
								href={eCommerce.Seguici.Instagram}
								color="inherit"
								sx={{ pl: 1, pr: 1 }}
							>
								<Instagram />
							</Link>
							<Link
								href={eCommerce.Seguici.Twitter}
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
