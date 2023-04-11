import { Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useProject from "../hooks/useProject";
export default function ProjectsDropdown({
  selectedProject,
  setSelectedProject,
}) {
  const [projectsList, setProjectList] = useState([]);
  const { auth } = useAuth();
  const { project, setProject, projectModules, setprojectModules } =
    useProject();

  // useEffect(() => {
  //   axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
  //     console.log(res.data.result.projects_list);
  //     setProjectList(res.data.result.projects_list);
  //   });
  //   setSelectedProject(projectModules);
  // }, []);

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
    });
  }, []);

  console.log(selectedProject);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      mb={1}
    >
      <Autocomplete
        disablePortal
        id="project_id"
        options={projectsList || null}
        value={selectedProject || null}
        sx={{ width: "20%" }}
        getOptionLabel={(option) => option.project_name || ""}
        onChange={(e, value) => {
          console.log(value);
          setSelectedProject(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Projects" size="small" />
        )}
      />
    </Stack>
  );
}
