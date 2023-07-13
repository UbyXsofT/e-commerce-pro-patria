import React, {useState} from "react";
import {Divider, Typography} from "@mui/material";
import {useSpring, animated} from "@react-spring/web";
import {styled, useTheme} from "@mui/material/styles";
import CreateMenu from "../../CreateMenu";
import {MiniDrawer} from "./MiniDrawer";
import {TreeViewComp} from "./TreeViewComp";

export default function DrawerSx() {
	const theme = useTheme();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [curDrawerWidth, setCurDrawerWidth] = useState(200);
	const [expandedDrawerItem, setExpandedDrawerItem] = useState(null);
	const [showBox, setShowBox] = useState(false);
	const menuItems = CreateMenu("menuDriverSX");
	const boxWidth = 300;
	const boxContainerRef = React.useRef(false);

	React.useEffect(() => {
		const handleClickOutsideBox = (event) => {
			if (boxContainerRef.current && !boxContainerRef.current.contains(event.target)) {
				setExpandedDrawerItem(null);
				setShowBox(false);
			}
		};
		const handleEscapeKey = (event) => {
			if (event.key === "Escape") {
				setExpandedDrawerItem(null);
				setShowBox(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutsideBox);
		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("mousedown", handleClickOutsideBox);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);

	React.useEffect(() => {
		openDrawer ? setCurDrawerWidth(200) : setCurDrawerWidth(65);
	}, [openDrawer]);

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

	const handleDrawerItemClick = (menuItem) => {
		if (expandedDrawerItem ? expandedDrawerItem.id : null === menuItem.id) {
			setExpandedDrawerItem(null);
			setShowBox(false);
		} else {
			setExpandedDrawerItem(menuItem);
			setShowBox(true);
		}
	};

	const StyledTitleBoxSubItem = styled(Typography)(({theme}) => ({
		color: theme.palette.text,
		display: "flex",
		justifyContent: "center",
		backgroundColor: theme.palette.primary.main,
	}));

	const BoxSubItems = styled(animated.div)(({theme}) => ({
		width: boxWidth,
		height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
		position: "fixed",
		top: theme.mixins.toolbar.minHeight + 10,
		backgroundColor: theme.palette.background.paper,
		boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
		overflow: "auto",
		maxWidth: `calc(100% - ${curDrawerWidth}px)`,
		padding: 5,
		zIndex: theme.zIndex.drawer - 1,
	}));

	const BoxSubItemsAnimation = useSpring({
		left: showBox ? curDrawerWidth : -boxWidth - curDrawerWidth,
		config: {
			duration: 150,
		},
	});

	return (
		<>
			{menuItems && (
				<>
					<MiniDrawer
						menuItems={menuItems}
						openDrawer={openDrawer}
						handleDrawerClose={handleDrawerClose}
						handleDrawerOpen={handleDrawerOpen}
						handleDrawerItemClick={handleDrawerItemClick}
						expandedDrawerItem={expandedDrawerItem}
						titleDrawer='MENU'
					/>
					{showBox && (
						<BoxSubItems
							style={{...BoxSubItemsAnimation}}
							ref={boxContainerRef}
						>
							<StyledTitleBoxSubItem variant='subtitle1'>{expandedDrawerItem ? expandedDrawerItem.label : ""}</StyledTitleBoxSubItem>
							<Divider />
							{expandedDrawerItem ? <TreeViewComp menuItem={expandedDrawerItem} /> : null}
						</BoxSubItems>
					)}
				</>
			)}
		</>
	);
}
