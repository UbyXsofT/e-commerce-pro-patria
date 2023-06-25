import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";

const StyledBox = styled.div`
	width: 100%;
	height: 300px;
	color: ${(props) => props.theme.text};
`;

export default function ContDemosComp({userTheme}) {
	return <StyledBox style={{backgroundColor: userTheme.text}}></StyledBox>;
}
