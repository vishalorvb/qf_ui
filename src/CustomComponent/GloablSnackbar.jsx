import { Snackbar, Alert } from "@mui/material";
import useHead from "../hooks/useHead";

export default function GlobalSnackbar(props) {
  const { snackbarData, setSnackbarData } = useHead();

  const severity =
    snackbarData?.severity?.toUpperCase() === "SUCCESS" ? "success" : "error";

  const handleClose = () => {
    setSnackbarData((ps) => {
      return { ...ps, status: false };
    });
  };

  return (
    <Snackbar
      open={snackbarData?.status}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {snackbarData?.message}
      </Alert>
    </Snackbar>
  );
}
