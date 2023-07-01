// Index.js
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/components/ProTip";
import Link from "../src/components/Link";
import StickyFooter from "../src/components/footer/StickyFooter";
import TemaSwitch from "../src/theme/TemaSwitch";

//REDUX-STORE
import {connect} from "react-redux";
import {setLoading} from "../src/store/actions";

const Index = ({setLoading}) => {
	const handleClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	return (
		<Container maxWidth='xl'>
			<Box sx={{my: 4}}>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
				>
					React - Next.js Tema & Config Manager
				</Typography>
				<Link
					href='/about'
					color='secondary'
				>
					Go to the about page
				</Link>
				<ProTip />
				<Link
					href='/home'
					color='secondary'
				>
					Go to the Home page
				</Link>
			</Box>
			<div>
				<button onClick={handleClick}>Set isLoading to true</button>
			</div>
			<TemaSwitch />
			<StickyFooter />
		</Container>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};

export default connect(null, mapDispatchToProps)(Index);
