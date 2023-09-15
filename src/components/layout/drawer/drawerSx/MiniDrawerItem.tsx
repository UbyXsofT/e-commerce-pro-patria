import React from "react";
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuItem } from "src/components/CommonTypesInterfaces";

// Componente DrawerItem
type MiniDrawerItemProps = {
	item: MenuItem;
	openDrawer: boolean;
	handleDrawerItemClick: (menuItem: MenuItem) => void;
	expandedDrawerItem: null | any;
};

export function MiniDrawerItem({
	item,
	openDrawer,
	handleDrawerItemClick,
	expandedDrawerItem,
}: MiniDrawerItemProps) {
	return (
		<ListItem
			key={item.id}
			disablePadding
			sx={{
				backgroundColor: expandedDrawerItem
					? expandedDrawerItem.id === item.id
						? (theme) => theme.palette.primary.main
						: "inherit"
					: null,
			}}
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
						{item.subItems.length > 0 && (
							<ChevronRightIcon
								sx={{ fontSize: "small", marginLeft: "-0.8rem" }}
							/>
						)}
						<ListItemIcon>{item.icon}</ListItemIcon>

						<ListItemText
							primary={item.label}
							sx={{ opacity: openDrawer ? 1 : 0 }}
						/>
					</Box>
				</Box>
			</ListItemButton>
		</ListItem>
	);
}
