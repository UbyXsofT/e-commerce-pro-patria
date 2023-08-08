import React from "react";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Componente DrawerItem
export function MiniDrawerItem({ item, openDrawer, handleDrawerItemClick, expandedDrawerItem }) {
  return (
    <ListItem
      key={item.id}
      disablePadding
      sx={{
        backgroundColor: expandedDrawerItem ? (expandedDrawerItem.id === item.id ? (theme) => theme.palette.primary.main : "inherit") : null,
      }}
    >
      <ListItemButton onClick={() => (item.onClick ? item.onClick() : handleDrawerItemClick(item))}>
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
            {item.subItems.length > 0 && <ChevronRightIcon sx={{ fontSize: "small", marginLeft: "-0.8rem" }} />}
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.label} sx={{ opacity: openDrawer ? 1 : 0 }} />
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
