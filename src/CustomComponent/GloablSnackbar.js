import { Snackbar, Alert } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

export default function GlobalSnackbar(props) {
  const { snackbarData, setSnackbarData } = useSnackbar();

  const handleClose = () => {
    setSnackbarData({ status: false, message: "", severity: "" });
  };

  return (
    <Snackbar
      open={snackbarData?.status}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData?.severity}
        sx={{ width: "100%" }}
      >
        {snackbarData?.message}
      </Alert>
    </Snackbar>
  );
}
