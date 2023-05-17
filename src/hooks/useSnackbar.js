import { useContext } from "react";
import SnackbarProvider from "../context/SnackbarProvider";

const useSnackbar = () => {
  return useContext(SnackbarProvider);
};

export default useSnackbar;
