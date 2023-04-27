import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { getApplicationOfProject } from "../Services/ApplicationService";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";
export default function ProjectnApplicationSelector({ isTestset }) {
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();

  const { auth } = useAuth();

  useEffect(() => {
    getProject(setProjectList, auth.userId);
  }, []);

  useEffect(() => {
    if (globalProject == null) {
      setglobalProject(projectsList[0]);
    }
  }, [projectsList]);

  useEffect(() => {
    if (globalProject?.project_id !== undefined) {
      setglobalApplication(null);
      getApplicationOfProject(setapplicationList, globalProject?.project_id);
    }
  }, [globalProject]);
  useEffect(() => {
    if (globalApplication == null) {
      setglobalApplication(applicationList[0]);
    }
  }, [applicationList]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      mb={1}
    >
      <Autocomplete
        disablePortal
        disableClearable
        id="project_id"
        options={projectsList}
        value={globalProject || null}
        sx={{ width: "100%" }}
        getOptionLabel={(option) => option.project_name ?? ""}
        onChange={(e, value) => {
          setglobalProject(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Projects" size="small" />
        )}
      />

      <Autocomplete
        disablePortal
        disableClearable
        id="application_id"
        options={applicationList}
        value={globalApplication || null}
        sx={{ width: "100%" }}
        getOptionLabel={(option) => option.module_name}
        onChange={(e, value) => {
          // console.log(value);
          setglobalApplication(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Applications" size="small" />
        )}
      />
    </Stack>
  );
}
