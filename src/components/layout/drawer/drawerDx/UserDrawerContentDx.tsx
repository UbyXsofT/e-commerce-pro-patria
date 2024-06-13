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
import AvatarName from "src/components/account/AvatarName";
import eCommerceConf from "eCommerceConf.json"

const handleDrawerItemClick = (menuItem: MenuItem) => {
	if (eCommerceConf.ModalitaSviluppo === true){
	console.log("handleDrawerItemClick : ", menuItem);
	}
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
				<AvatarName />
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
