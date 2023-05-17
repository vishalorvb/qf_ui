import { createContext, useState } from "react";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    status: false,
    message: "",
    severity: "",
  });

  return (
    <SnackbarContext.Provider value={{ snackbarData, setSnackbarData }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
