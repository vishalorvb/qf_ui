import { createContext, useState } from "react";

const HeadContext = createContext({});

export const HeaderProvider = ({ children }) => {
  const [header, setHeader] = useState({
    name: "aa",
    plusButton: false,
    plusCallback: () => console.log("null"),
  });

  return (
    <HeadContext.Provider value={{ header, setHeader }}>
      {children}
    </HeadContext.Provider>
  );
};

export default HeadContext;
