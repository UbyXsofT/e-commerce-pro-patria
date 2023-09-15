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
} from "@mui/material";
import * as React from "react";
import { ThemeSettings } from "src/components/theme/ThemeSettings";
import { MenuItem } from "src/components/CommonTypesInterfaces";
import CreateMenu from "src/menu/CreateMenu";

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
				<Avatar
					alt="Ubaldo Formichetti"
					src="/images/utente.jpg"
					sx={{ width: 56, height: 56 }}
				/>
			</Box>
			<List>
				{menuItems.map((item: MenuItem) =>
					item.control ? (
						<ListItem key={item.id}>{item.control}</ListItem>
					) : (
						<ListItem
							key={item.id}
							disablePadding
						>
							<ListItemButton
								onClick={(e) =>
									item.onClick ? item.onClick(e) : handleDrawerItemClick(item)
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
					)
				)}
			</List>

			<>
				<ThemeSettings />
			</>
		</>
	);
};
