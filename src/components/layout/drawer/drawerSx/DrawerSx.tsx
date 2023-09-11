import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { styled, useTheme } from "@mui/material/styles";
import CreateMenu from "src/menu/CreateMenu";
import { MiniDrawer } from "./MiniDrawer";
import { TreeViewComp } from "./TreeViewComp";
import { MenuItem } from "src/components/CommonTypesInterfaces";

type DrawerSxProps = {
  onOpen: (open: boolean) => void;
};

const DrawerSx = ({ onOpen }: DrawerSxProps) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [curDrawerWidth, setCurDrawerWidth] = useState(205);
  const [expandedDrawerItem, setExpandedDrawerItem] = useState<MenuItem | null>(null);
  const [showBox, setShowBox] = useState(false);
  const menuItems = React.useMemo(() => CreateMenu("menuDriverSX"), []);
  const boxWidth = 300;
  const boxContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [curItemSelect, setCurItemSelect] = React.useState("0");

  React.useEffect(() => {
    const handleClickOutsideBox = (event: MouseEvent) => {
      if (boxContainerRef.current && !boxContainerRef.current.contains(event.target as Node)) {
        setExpandedDrawerItem(null);
        setShowBox(false);
        setOpenDrawer(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedDrawerItem(null);
        setShowBox(false);
        setCurItemSelect("0");
      }
    };
    document.addEventListener("mousedown", handleClickOutsideBox);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBox);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  React.useEffect(() => {
    openDrawer ? setCurDrawerWidth(185) : setCurDrawerWidth(65);
    onOpen(openDrawer); // Imposta la funzione onOpen per impostare manualmente il valore a true
  }, [openDrawer]);

  const handleDrawerOpen = () => {
    // console.log("Opening Drawer.. Current openDrawer state:", openDrawer);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    // console.log("Closing Drawer.. Current openDrawer state:", openDrawer);
    setOpenDrawer(false);
  };

  const handleDrawerItemClick = (menuItem: MenuItem) => {
    if (expandedDrawerItem ? expandedDrawerItem : null === menuItem) {
      setExpandedDrawerItem(null);
      setShowBox(false);
      setCurItemSelect("0");
    } else {
      if (curItemSelect !== menuItem.id) {
        setExpandedDrawerItem(menuItem);
        setShowBox(true);

        setCurItemSelect(menuItem.id);
      } else {
        setExpandedDrawerItem(null);
        setShowBox(false);
        setCurItemSelect("0");
      }
    }
  };

  const StyledTitleBoxSubItem = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  }));

  const BoxSubItems = styled(animated.div)(({ theme }) => ({
    width: boxWidth,
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    position: "fixed",
    top: theme.mixins.toolbar.minHeight ? (theme.mixins.toolbar.minHeight as number) + 10 : 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
    maxWidth: `calc(100% - ${curDrawerWidth}px)`,
    padding: 5,
    zIndex: theme.zIndex.drawer - 1,
  }));

  const BoxSubItemsAnimation = useSpring({
    left: showBox ? curDrawerWidth : -boxWidth - curDrawerWidth,
    config: {
      duration: 200,
    },
  });

  return (
    <>
      {menuItems && (
        <>
          <MiniDrawer
            menuItems={menuItems}
            openDrawer={openDrawer}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerItemClick={handleDrawerItemClick}
            expandedDrawerItem={expandedDrawerItem}
            titleDrawer="MENU"
            drawerWidth="auto"
          />

          {showBox && (
            <BoxSubItems style={{ ...BoxSubItemsAnimation }} ref={boxContainerRef}>
              <StyledTitleBoxSubItem variant="subtitle1">{expandedDrawerItem ? expandedDrawerItem.label : ""}</StyledTitleBoxSubItem>
              <Divider />
              {expandedDrawerItem ? <TreeViewComp menuItem={expandedDrawerItem} /> : null}
            </BoxSubItems>
          )}
        </>
      )}
    </>
  );
};

export default DrawerSx;
