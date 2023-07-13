// Layout.js
import React from "react";
import {Box, Toolbar} from "@mui/material";
import {useSpring, animated} from "@react-spring/web";
import DrawerSx from "./menu/drawer/miniDrawer/DrawerSx";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children, title, description, ogImage, url}) => {
	const mainAnimation = useSpring({
		opacity: 1,
		from: {opacity: 0},
		config: {
			duration: 1000,
		},
	});

	return (
		<animated.main style={mainAnimation}>
			<Box sx={{display: "flex"}}>
				<Header />

				{/* INSERIAMO DRAWER */}
				<DrawerSx />

				<Box
					component='main'
					sx={{
						flexGrow: 1,
						p: 3,
						transition: "margin-left 0.2s ease-in-out",
						//marginLeft: open ? `${drawerWidth}px` : 0,
					}}
				>
					<Toolbar />
					{children}
					<Footer />
				</Box>
			</Box>
		</animated.main>
	);
};

export default Layout;
