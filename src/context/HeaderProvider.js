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
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);
  const [showLoader, setShowloader] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  let [selectedApplication, setSelectedApplication] = useState(null)
  let [subApplicationList, setSubApplicationList] = useState([])
  let [selectedSubApplication,setSelectedSubApplication] = useState(null)

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
        snackbarData,
        setSnackbarData,
        projectsList,
        setProjectList,
        applicationList,
        setapplicationList,

        selectedApplication, 
        setSelectedApplication,
        subApplicationList, 
        setSubApplicationList,
        selectedSubApplication,
        setSelectedSubApplication
      }}
    >
      {children}
    </HeadContext.Provider>
  );
};

export default HeadContext;
