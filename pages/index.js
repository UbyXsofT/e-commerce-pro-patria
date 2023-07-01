// Index.js
import React from "react";
import Router from "next/router";
import {useSpring, animated} from "@react-spring/web";
import {Box, Container} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import LogoQ from "../src/components/index/LogoQ";

const AnimatedDiv = () => {
	const theme = useTheme();
	console.log("theme: ", theme);
	const animationProps = useSpring({
		from: {
			letterSpacing: "-0.5em",
			transform: "translateZ(-800px)",
			filter: "blur(12px)",
			opacity: 0,
		},
		to: {
			letterSpacing: "0",
			transform: "translateZ(0)",
			filter: "blur(0)",
			opacity: 1,
		},
		config: {
			duration: 800,
		},
	});

	return (
		<animated.div
			className='focus-in-expand-fwd'
			style={{
				...animationProps,
				fontSize: "3rem",
				fontFamily: theme.typography.fontFamily,
				fontWeight: theme.typography.fontWeightBold,
			}}
		>
			E-commerce
		</animated.div>
	);
};

export default function Index() {
	setTimeout(() => {
		Router.push("/login");
	}, 5000);

	return (
		<Container>
			<Box
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<Box
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						margin: "auto",
					}}
				>
					<AnimatedDiv />
					<LogoQ />
				</Box>
			</Box>
		</Container>
	);
}
