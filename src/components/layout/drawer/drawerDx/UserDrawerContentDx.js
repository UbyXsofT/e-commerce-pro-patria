import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, List, Avatar, Divider } from "@mui/material";
import * as React from "react";
import { CreateMenu } from "../../../../menu/CreateMenu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { IconButton } from "@mui/material";
import { TemaControls } from "/src/components/theme/TemaControls";

const handleDrawerItemClick = (menuItem) => {
  console.log("handleDrawerItemClick : ", menuItem);
};

export const UserDrawerContentDx = ({ theme }) => {
  const menuItems = React.useMemo(() => CreateMenu("menuUtenteDx"), []);
  console.log(menuItems);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "15px" }}>
        <Typography variant="body1" noWrap component="div" sx={{ display: "block", marginBottom: "20px" }}>
          Ciao Ubaldo Formichetti
        </Typography>
        <Avatar alt="Ualdo Formichetti" src="/images/utente.jpg" sx={{ width: 56, height: 56 }} />
      </Box>
      <List>
        {menuItems.map((item) =>
          item.control ? (
            <ListItem key={item.id}>{item.control}</ListItem>
          ) : (
            <ListItem key={item.id} disablePadding>
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
        <TemaControls />
      </>
    </>
  );
};
