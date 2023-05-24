import { createContext, useEffect, useState } from "react";

const HeadContext = createContext({});

export const HeaderProvider = ({ children }) => {
  const [header, setHeader] = useState({
    name: "",
    plusButton: false,
    buttonName: "",
    plusCallback: () => console.log("null"),
    browser: "custom",
  });
  const [globalProject, setglobalProject] = useState(null);
  const [globalApplication, setglobalApplication] = useState(null);
  const [showLoader, setShowloader] = useState(false);

  return (
    <HeadContext.Provider
      value={{
        header,
        setHeader,
        globalProject,
        setglobalProject,
        globalApplication,
        setglobalApplication,
        showLoader,
        setShowloader,
      }}
    >
      {children}
    </HeadContext.Provider>
  );
};

export default HeadContext;
