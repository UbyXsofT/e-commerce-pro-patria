import React from "react";
import {Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, FormHelperText, Link, Fade, AppBar, Toolbar, Collapse} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "@mui/material/styles";
//REDUX-STORE
import {connect} from "react-redux";
import {setLoading} from "/src/store/actions";
//*-----*//
import Layout from "/src/components/layout/Layout";
import eCommerceConfig from "../../ecommerceConfig.json";
import Image from "next/image";
import {styled} from "@mui/material/styles";
import CookieManager from "/src/components/cookie/CookieManager";

//*-- API---*//
//import home from "../api/home";

const Messaggi = (setLoading) => {
	//setLoading(true); rende visibile il loading
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Layout
				//digitare il titolo della pagina e la descrizione della pagina.
				title={`Messaggi | E-Commerce ${eCommerceConfig.NomeEcommerce}`}
				description='This is a E-Commerce Messaggi page, using React.js Next.js and Material-UI. Powered by Byteware srl.'
			>
				<Typography
					variant='h5'
					component='h1'
					gutterBottom
				>
					MESSAGGI PAGE
				</Typography>
				<Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper
					risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer
					quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
					varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
					sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus
					orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel
					facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography>
			</Layout>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(Messaggi);
