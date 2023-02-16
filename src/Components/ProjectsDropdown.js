import { Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useProject from "../hooks/useProject";
export default function ProjectsDropdown({ setSelectedProject }) {
  const [projectsList, setProjectList] = useState([]);
  const { auth } = useAuth();
  const { project, setProject, projectModules, setprojectModules } =
    useProject();

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      console.log(res.data.result.projects_list);
      setProjectList(res.data.result.projects_list);
    });
    setSelectedProject(projectModules);
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      mb={1}
    >
      <Typography variant="subtitle1">Project:</Typography>
      <Autocomplete
        disablePortal
        id="project_id"
        options={projectsList}
        sx={{ width: "20%" }}
        getOptionLabel={(option) => option.project_name}
        value={project}
        onChange={(e, value) => {
          console.log(value);
          setProject(value);
          value &&
            axios
              .get(`/qfservice/getprojectmodules/${value?.project_id}`)
              .then((res) => {
                setSelectedProject(res?.data?.data);
                setprojectModules(res?.data?.data);
              });
        }}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </Stack>
  );
}
