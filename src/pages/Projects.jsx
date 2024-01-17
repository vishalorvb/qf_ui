import { useEffect } from "react";
import useHead from "../hooks/useHead";
import ProjectTable from "../Components/ProjectComponents/ProjectTable";
import { useLocation } from "react-router-dom";

function Projects() {
  const location = useLocation();
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name:
          location?.state === "recentProjects"
            ? "Favourite Projects"
            : "Search Projects",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);
  return <ProjectTable location={location} />;
}

export default Projects;
