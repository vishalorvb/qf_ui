import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { getApplicationOfProject } from "../Services/ApplicationService";
export default function ProjectnApplicationSelector({
  setSelectedProject,
  selectedProject,
  selectedApplication,
  setSelectedApplication,
  isTestset,
}) {
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);

  const { auth } = useAuth();
  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
  }, []);

  useEffect(() => {
    setSelectedApplication(applicationList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationList]);

  useEffect(() => {
    selectedProject?.project_id &&
      getApplicationOfProject(setapplicationList, selectedProject?.project_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

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
        disableClearable
        id="project_id"
        options={projectsList}
        value={selectedProject || null}
        sx={{ width: "20%" }}
        getOptionLabel={(option) => option.project_name}
        onChange={(e, value) => {
          setSelectedProject(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Projects" size="small" />
        )}
      />
      {selectedProject?.automation_framework_type !== 6 && (
        <Autocomplete
          disablePortal
          disableClearable
          id="application_id"
          options={applicationList}
          value={selectedApplication || null}
          sx={{ width: "20%" }}
          getOptionLabel={(option) => option.module_name}
          onChange={(e, value) => {
            // console.log(value);
            setSelectedApplication(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Applications" size="small" />
          )}
        />
      )}
    </Stack>
  );
}
