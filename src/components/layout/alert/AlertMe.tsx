// AlertMe.js

import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertMeContext from "./AlertMeContext";

export function AlertMe() {
  const { alertParams, setAlertParams } = React.useContext(AlertMeContext);
  const { variant, severity, title, desc, openAlertMe } = alertParams;
  const theme = useTheme();
  //variant: filled - outlined
  //severity: error - warning - info - success
  return (
    <div
      style={{
        position: "fixed",
        top: `calc(${theme.mixins.toolbar.minHeight ? (theme.mixins.toolbar.minHeight as number) + 60 : 60}px)`,
        left: 0,
        right: 0,
        bottom: 0,
        display: openAlertMe ? "flex" : "none", // Imposta display su "flex" quando openAlertMe è true, altrimenti su "none"
        justifyContent: "center",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Stack
        sx={{
          width: "80%",
          marginBottom: "20px",
          flexDirection: "row",
          justifyContent: "center",
        }}
        spacing={2}
      >
        <Collapse in={openAlertMe}>
          <Alert
            variant={variant}
            severity={severity}
            sx={{ color: theme.palette.mode === "dark" ? "#EAEAEA" : "#EAEAEA" }}
            action={
              <IconButton
                aria-label="close"
                size="small"
                color="inherit"
                onClick={() => {
                  setAlertParams({
                    ...alertParams,
                    openAlertMe: false,
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>{title}</AlertTitle>
            {desc}
          </Alert>
        </Collapse>
      </Stack>
    </div>
  );
}
