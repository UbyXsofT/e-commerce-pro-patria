import * as React from "react";
import UtilityIcon from "@mui/icons-material/Construction";
import DocumentIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/BorderBottom";
import HomeIcon from "@mui/icons-material/Home";
import Router from "next/router";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
import { MenuItem, StoreState } from "src/components/CommonTypesInterfaces";
import eCommerceConf from "eCommerceConf.json";

const CreateMenu = (tipoMenu: "menuDriverSX" | "menuUtenteDx") => {
	const generateMenuItem = (
		id: string,
		label: string | null,
		onClick: React.MouseEventHandler | null,
		icon: React.JSX.Element | null,
		badgeContent: null,
		badgeColor: null,
		subItems: any[],
		control?: React.JSX.Element | null
	): MenuItem => {
		return {
			id,
			label,
			onClick,
			icon,
			badgeContent,
			badgeColor,
			subItems,
			control,
		};
	};

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
			[],
			null
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
					[],
					null
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
					[],
					null
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
						[],
						null
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
						[],
						null
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
			[],
			null
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
					[],
					null
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
					[],
					null
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
			[],
			null
		),
		// Altri elementi del menu...
	];

	const menuUtenteDx = [
		generateMenuItem(
			"1",
			"Il mio account",
			() => {
				Router.push("/auth/account");
			},
			<ManageAccountsIcon />,
			null,
			null,
			[],
			null
		),
		generateMenuItem(
			"2",
			"I miei ordini",
			() => {
				Router.push("STRIPE_PORTALE_CLIENTE_LINK");
			},
			<ManageHistoryIcon />,
			null,
			null,
			[],
			null
		),
		generateMenuItem(
			"3",
			null,
			null,
			null,
			null,
			null,
			[],
			<Divider style={{ width: "100%" }} />
		),
		generateMenuItem(
			"4",
			"Esci",
			() => {
				Router.push("/account/login");
			},
			<LogoutIcon />,
			null,
			null,
			[],
			null
		),
		generateMenuItem(
			"5",
			null,
			null,
			null,
			null,
			null,
			[],
			<Divider style={{ width: "100%" }} />
		),
	];

	const menuOptions = {
		menuDriverSX: menuDriverSX,
		menuUtenteDx: menuUtenteDx,
	};

	const selectedMenu = menuOptions[tipoMenu];
	// console.log(`${tipoMenu}: `, selectedMenu);
	return selectedMenu;
};

export default CreateMenu;
