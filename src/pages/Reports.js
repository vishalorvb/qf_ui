import React, { useState, useEffect, useRef } from "react";
import useHead from "../hooks/useHead";
import ReportFields from "../Components/TestSet/ReportFields";

function Reports() {
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Reports",
      };
    });
  }, []);

  return (
    <ReportFields
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      selectedApplication={selectedApplication}
      setSelectedApplication={setSelectedApplication}
    />
  );
}

export default Reports;
