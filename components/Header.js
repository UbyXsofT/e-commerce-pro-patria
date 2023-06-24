import {useContext, useState, useEffect} from "react";
import Link from "next/link";
import styled from "styled-components";
import ThemeContext from "../contexts/ThemeContext";
import HomeIcon from "@material-ui/icons/Home";
import MaterialUISwitch from "./MaterialUISwitch ";
import FormControlLabel from "@mui/material/FormControlLabel";

const StyledHeader = styled.header`
	color: ${(props) => props.theme.text};
	background-color: ${(props) => props.theme.header};
	padding: 1em;
`;

const NavLink = styled(Link)`
	text-decoration: none;
	color: ${(props) => props.theme.text};
`;

export default function Header() {
	const {toggleTheme, theme} = useContext(ThemeContext);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleThemeChange = () => {
		toggleTheme();
		console.log("THEME: ", theme);
	};

	return (
		<StyledHeader>
			<Link href={"/"}>Ecommerce</Link>

			<nav>
				<NavLink href={"/"}>
					<HomeIcon />
				</NavLink>
				<NavLink href={"/carrello"}>Carrello (0)</NavLink>
			</nav>

			{isMounted && (
				<FormControlLabel
					control={
						<MaterialUISwitch
							onChange={handleThemeChange}
							color='primary'
							checked={theme.mode === "dark"}
						/>
					}
					label={theme.mode === "dark" ? "Dark Mode" : "Light Mode"}
				/>
			)}
		</StyledHeader>
	);
}
