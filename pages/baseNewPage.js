import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "@mui/material/styles";
import {Container} from "@mui/material";
//REDUX-STORE
import {connect} from "react-redux";
import {setLoading} from "../src/store/actions";

const AnotherPage = (setLoading) => {
	//setLoading(true); rende visibile il loading
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Container>{/* Contenuto della pagina */}</Container>
		</ThemeProvider>
	);
};

//REDUX-STORE
const mapDispatchToProps = {
	setLoading,
};
export default connect(null, mapDispatchToProps)(AnotherPage);
