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
            }}
        >
            {children}
        </HeadContext.Provider>
    );
};

export default HeadContext;
