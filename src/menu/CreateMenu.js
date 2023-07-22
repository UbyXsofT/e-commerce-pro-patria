import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UtilityIcon from "@mui/icons-material/Construction";
import DocumentIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/BorderBottom";
import HomeIcon from "@mui/icons-material/Home";
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
				Router.push("/auth/home");
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

	const menuUtenteDx = [
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
		generateMenuItem(
			"1",
			"Home",
			() => {
				Router.push("/auth/home");
			},
			<HomeIcon />,
			null,
			null,
			[]
		),
	];

	const menuOptions = {
		menuDriverSX: menuDriverSX,
		menuUtenteDx: menuUtenteDx,
	};

	const selectedMenu = menuOptions[tipoMenu];
	console.log(`${tipoMenu}: `, selectedMenu);
	return selectedMenu;
}
