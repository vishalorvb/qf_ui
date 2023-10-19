import { createContext, useState } from "react";

const ProjectnApplicationContext = createContext({});

export const ProjectnApplicationProvider = ({ children }) => {
  const [project, setProject] = useState({ project_name: "select Project" });
  const [application, setApplication] = useState({});

  return (
    <ProjectnApplicationContext.Provider
      value={{ project, setProject, application, setApplication }}
    >
      {children}
    </ProjectnApplicationContext.Provider>
  );
};

export default ProjectnApplicationContext;
