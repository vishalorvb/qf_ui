import { createContext, useState } from "react";

const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState({ project_name: "select Project" });
  const [projectModules, setprojectModules] = useState([]);

  return (
    <ProjectContext.Provider
      value={{ project, setProject, projectModules, setprojectModules }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
