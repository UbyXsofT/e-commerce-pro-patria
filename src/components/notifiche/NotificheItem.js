import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { styled, useTheme } from "@mui/material/styles";

function NotificheItem({ id, text, read, onDelete, onMarkAsRead, index }) {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";

  return (
    <ListItem
      sx={{
        backgroundColor: index % 2 === 0 ? (isLightMode ? theme.palette.grey[300] : "#1B1B1B") : "transparent",
        // Apply style based on index
        borderRadius: 2,
        pb: 3,
      }}
    >
      <ListItemText primary={text} sx={{ textDecoration: read ? "line-through" : "none", color: read ? "red" : "inherit", paddingRight: "4rem" }} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" sx={{ marginRight: "auto", color: theme.palette.error.main }} onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
        {!read && (
          <IconButton edge="end" aria-label="mark as read" sx={{ marginRight: "auto" }} onClick={() => onMarkAsRead(id)}>
            <DoneIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default NotificheItem;
