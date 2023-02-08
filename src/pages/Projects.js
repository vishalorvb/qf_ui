import { useEffect } from "react";
import useHead from "../hooks/useHead";
import React, { useState } from "react";
import ProjectTable from "./ProjectTable";
import CreateProject from "./CreateProject";
import { useNavigate, Outlet } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Projects",
        plusButton: true,
        plusCallback: () => navigate("/projects/createProject"),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);
  return (
    <div>
      <ProjectTable />
     
    </div>
  );
}

export default Projects;
