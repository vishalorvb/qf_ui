import { createContext, useState } from "react";

const HeadContext = createContext({});

export const HeaderProvider = ({ children }) => {
  const [header, setHeader] = useState({
    name: "",
    plusButton: false,
    buttonName: "",
    plusCallback: () => console.log("null"),
    browser: "custom",
  });

  return (
    <HeadContext.Provider value={{ header, setHeader }}>
      {children}
    </HeadContext.Provider>
  );
};

export default HeadContext;
