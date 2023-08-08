import React from "react";
import { Divider, List, ListItem, ListItemButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { MiniDrawerItem } from "./MiniDrawerItem";
import { useSpring, animated } from "@react-spring/web";
// Componente Drawer
export function MiniDrawer({ menuItems, openDrawer, handleDrawerClose, handleDrawerOpen, handleDrawerItemClick, expandedDrawerItem, titleDrawer, drawerWidth }) {
  const theme = useTheme();

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  // const props = useSpring({
  // 	width: drawerWidth, // o qualsiasi valore tu voglia animare
  // 	from: {width: "0px"},
  // });

  // const AnimatedDrawer = animated(MuiDrawer);
  // const drawerRef = React.useRef(null);

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <List
        sx={{
          marginTop: (theme) => theme.mixins.toolbar.minHeight + "px",
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        {/* fix height: */}
      </List>
      <List>
        <ListItem disablePadding sx={{ justifyContent: "spaceBetween" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openDrawer ? "initial" : "center",
              px: 2.5,
            }}
            onClick={openDrawer ? handleDrawerClose : handleDrawerOpen}
          >
            {openDrawer ? (
              <>
                <ChevronLeftIcon />{" "}
                <Typography variant="subtitle1" sx={{ marginLeft: 3 }}>
                  {titleDrawer}{" "}
                </Typography>
              </>
            ) : (
              <ChevronRightIcon />
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <MiniDrawerItem key={item.id} item={item} openDrawer={openDrawer} handleDrawerItemClick={handleDrawerItemClick} expandedDrawerItem={expandedDrawerItem} />
        ))}
      </List>
    </Drawer>
  );
}
