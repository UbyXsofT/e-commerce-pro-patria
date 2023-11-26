import {
	Box,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	List,
	Avatar,
	Divider,
	Theme,
	Stack,
} from "@mui/material";
import * as React from "react";
import { ThemeSettings } from "src/components/theme/ThemeSettings";
import { MenuItem, StoreState } from "src/components/CommonTypesInterfaces";
import CreateMenu from "src/menu/CreateMenu";
import { useSelector } from "react-redux";
import { setStripeKeys } from "src/store/actions";
import Router from "next/router";

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string | undefined) {
	if (!name) {
		return {
			sx: {
				bgcolor: "",
			},
			children: "",
		};
	}

	const nameParts = name.split(" ");
	const firstNameInitial = nameParts[0]?.[0] || "";
	const lastNameInitial = nameParts[1]?.[0] || "";

	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${firstNameInitial}${lastNameInitial}`,
	};
}

const handleDrawerItemClick = (menuItem: MenuItem) => {
	console.log("handleDrawerItemClick : ", menuItem);
};

type UserDrawerContentDxType = {
	theme?: Theme;
	username: string;
};

export const UserDrawerContentDx = ({
	theme,
	username,
}: UserDrawerContentDxType) => {
	const menuItems = React.useMemo(() => CreateMenu("menuUtenteDx"), []);

	const stripeLinkPortale = useSelector(
		(state: StoreState) => state.stripeKeys?.STRIPE_PORTALE_CLIENTE_LINK ?? "/"
	);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					padding: "15px",
				}}
			>
				<Typography
					variant="body1"
					noWrap
					component="div"
					sx={{ display: "block", marginBottom: "20px" }}
				>
					Ciao {username}
				</Typography>
				<Avatar {...stringAvatar(username ?? "N.D.")} />
			</Box>
			<List>
				{menuItems.map((item: MenuItem) => (
					<React.Fragment key={item.id}>
						{item.control ? (
							<ListItem>{item.control}</ListItem>
						) : (
							<ListItem
								key={item.id}
								disablePadding
							>
								<ListItemButton
									onClick={(e) =>
										item.label === "I miei ordini" && stripeLinkPortale
											? Router.push(stripeLinkPortale)
											: item.onClick
											? item.onClick(e)
											: handleDrawerItemClick(item)
									}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											width: "100%",
											justifyContent: "space-between",
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.label} />
										</Box>
									</Box>
								</ListItemButton>
							</ListItem>
						)}
					</React.Fragment>
				))}
			</List>
			<>
				<ThemeSettings />
			</>
		</>
	);
};
