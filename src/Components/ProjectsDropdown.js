import { Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getProject } from "../Services/ProjectService";
export default function ProjectsDropdown({ setSelectedProject }) {
  const [projectsList, setProjectList] = useState([]);

  useEffect(() => {
    getProject(setProjectList);
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="subtitle1">Project:</Typography>
      <Autocomplete
        disablePortal
        id="project_id"
        options={projectsList}
        sx={{ width: "20%" }}
        getOptionLabel={(option) => option.project_name}
        onChange={(e, value) => {
          console.log(value);
          value &&
            axios
              .get(`/qfservice/getprojectmodules/${value?.project_id}`)
              .then((res) => {
                setSelectedProject(res?.data?.data);
              });
        }}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </Stack>
  );
}
