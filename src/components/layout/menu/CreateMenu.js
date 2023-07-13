import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UtilityIcon from "@mui/icons-material/Construction";
import DocumentIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/BorderBottom";
import HomeIcon from "@mui/icons-material/Home";
import {styled, useTheme} from "@mui/material/styles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Router from "next/router";

export default function CreateMenu(tipoMenu) {
	function generateMenuItem(id, label, onClick, icon, badgeContent, badgeColor, subItems) {
		return {
			id,
			label,
			onClick,
			icon,
			badgeContent,
			badgeColor,
			subItems: subItems ? subItems.map((subItem) => generateMenuItem(...Object.values(subItem))) : [],
		};
	}

	const menuDriverSX = [
		generateMenuItem(
			"1",
			"Home",
			() => {
				Router.push("/");
			},
			<HomeIcon />,
			null,
			null,
			[]
		),
		generateMenuItem("2", "Area di lavoro", null, <WorkIcon />, null, null, [
			generateMenuItem("2_1", "WORKOUT", null, null, null, null, [
				generateMenuItem(
					"2_1_1",
					"Workout1",
					() => {
						Router.push("/");
					},
					null,
					null,
					null,
					[]
				),
				generateMenuItem(
					"2_1_2",
					"Workout2",
					() => {
						Router.push("/");
					},
					null,
					null,
					null,
					[]
				),
			]),
			generateMenuItem("2_2", "SPINNING", null, null, null, null, [
				generateMenuItem("2_2_1", "Spinning1", null, null, null, null, [
					generateMenuItem(
						"2_2_2_1",
						"sub-spinning-1",
						() => {
							Router.push("/");
						},
						null,
						null,
						null,
						[]
					),
					generateMenuItem(
						"2_2_2_2",
						"sub-spinning-2",
						() => {
							Router.push("/");
						},
						null,
						null,
						null,
						[]
					),
				]),
			]),
		]),
		generateMenuItem(
			"3",
			"Prodotti",
			() => {
				Router.push("/");
			},
			<CategoryIcon />,
			null,
			null,
			[]
		),
		generateMenuItem("4", "Documenti", null, <DocumentIcon />, null, null, [
			generateMenuItem("4_1", "Doc1", null, null, null, null, [
				generateMenuItem(
					"4_1_1",
					"sub-DOC-1",
					() => {
						Router.push("/");
					},
					null,
					null,
					null,
					[]
				),
				generateMenuItem(
					"4_1_2",
					"sub-DOC-2",
					() => {
						Router.push("/");
					},
					null,
					null,
					null,
					[]
				),
			]),
		]),
		generateMenuItem(
			"5",
			"Utility",
			() => {
				Router.push("/");
			},
			<UtilityIcon />,
			null,
			null,
			[]
		),
		// Altri elementi del menu...
	];

	const menuAppBar = [
		generateMenuItem(
			"1",
			"Test",
			() => {
				Router.push("/Test");
			},
			null,
			null,
			null,
			[]
		),
		// Altri elementi del menu...
	];

	if (tipoMenu === "menuDriverSX") {
		console.log("menuDriverSX: ", menuDriverSX);
		return menuDriverSX;
	} else if (tipoMenu === "menuAppBar") {
		console.log("menuAppBar: ", menuAppBar);
		return menuAppBar;
	}
}

// 	const menuItems = [
// 		generateMenuItem(
// 			"1",
// 			"Home",
// 			() => {
// 				Router.push("/");
// 			},
// 			<HomeIcon />,
// 			null,
// 			null,
// 			[]
// 		),
// 		generateMenuItem("2", "Area di lavoro", null, <WorkIcon />, null, null, [
// 			generateMenuItem("2_1", "WORKOUT", null, null, null, null, [
// 				generateMenuItem(
// 					"2_1_1",
// 					"Workout1",
// 					() => {
// 						Router.push("/");
// 					},
// 					null,
// 					null,
// 					null,
// 					[]
// 				),
// 				generateMenuItem(
// 					"2_1_2",
// 					"Workout2",
// 					() => {
// 						Router.push("/");
// 					},
// 					null,
// 					null,
// 					null,
// 					[]
// 				),
// 			]),
// 		]),
// 	];

// }
// 	const menu_DrawerSX = [
// 		{
// 			id: "1",
// 			label: "Home",
// 			icon: <HomeIcon />,
// 			onClick: () => {
// 				Router.push("/");
// 			},
// 			subItems: [],
// 		},
// 		{
// 			id: "2",
// 			label: "Area di lavoro",
// 			icon: <WorkIcon />,
// 			subItems: [
// 				{
// 					id: "2_1",
// 					label: "WORKOUT",
// 					subItems: [
// 						{
// 							id: "2_1_1",
// 							label: "Workout1",
// 							onClick: () => {
// 								Router.push("/");
// 							},
// 						},
// 						{
// 							id: "2_1_2",
// 							label: "Workout2",
// 							onClick: () => {
// 								Router.push("/");
// 							},
// 						},
// 					],
// 				},
// 				{
// 					id: "2_2",
// 					label: "SPINNING",
// 					subItems: [
// 						{
// 							id: "2_2_1",
// 							label: "Spinning1",
// 							onClick: () => {
// 								Router.push("/");
// 							},
// 						},
// 						{
// 							id: "2_2_2",
// 							label: "SUB-SPINNING",
// 							subItems: [
// 								{
// 									id: "2_2_2_1",
// 									label: "sub-spinning-1",
// 									onClick: () => {
// 										Router.push("/");
// 									},
// 								},
// 								{
// 									id: "2_2_2_2",
// 									label: "sub-spinning-2",
// 									onClick: () => {
// 										Router.push("/");
// 									},
// 								},
// 							],
// 						},
// 						{
// 							id: "2_2_3",
// 							label: "Spinning3",
// 							onClick: () => {
// 								Router.push("/");
// 							},
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			id: "3",
// 			label: "Prodotti",
// 			icon: <CategoryIcon />,
// 			onClick: () => {
// 				Router.push("/");
// 			},
// 			subItems: [],
// 		},
// 		{
// 			id: "4",
// 			label: "Documenti",
// 			icon: <DocumentIcon />,
// 			onClick: () => {
// 				Router.push("/");
// 			},
// 			subItems: [],
// 		},
// 		{
// 			id: "5",
// 			label: "Utility",
// 			icon: <UtilityIcon />,
// 			onClick: () => {
// 				Router.push("/");
// 			},
// 			subItems: [],
// 		},
// 	];

// 	const menu_DrawerDX = [
// 		{
// 			id: "1",
// 			label: "TEST",
// 			icon: <HomeIcon />,
// 			onClick: () => {
// 				Router.push("/");
// 			},
// 			subItems: [],
// 		},
// 	];
// }
// const Menu = {
// 	menu_DrawerSX,
// 	menu_DrawerDX,
// };

// export default Menu;
