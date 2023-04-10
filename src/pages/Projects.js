import { useEffect } from "react";
import useHead from "../hooks/useHead";
import React, { useState } from "react";
import ProjectTable from "../Components/ProjectComponents/ProjectTable";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

function Projects() {
  const location = useLocation();
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name:
          location?.state === "recentProjects"
            ? "Recent Projects"
            : "Search Projects",
      };
    });
  }, [location?.state]);
  return <ProjectTable location={location} />;
}

export default Projects;
