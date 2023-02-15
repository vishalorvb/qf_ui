import { Snackbar, Alert } from "@mui/material";
import React from "react";

export default function SnackbarNotify(props) {
  const { open, close, msg, severity } = props;
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={() => close(false)}
    >
      <Alert
        onClose={() => close(false)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
