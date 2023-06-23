import { Autocomplete, Grid } from "@mui/material";
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
      getApplicationOfProject(setapplicationList, globalProject?.project_id);
    }
  }, [globalProject]);
  useEffect(() => {
    if (globalApplication == null) {
      setglobalApplication(applicationList[0]);
    }
  }, [applicationList]);

  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent="space-around"
      direction="row"
    >
      <Grid item md={6}>
        <label htmlFor="">Projects</label>
        <Autocomplete
          disablePortal
          disableClearable
          id="project_id"
          options={projectsList}
          value={globalProject || null}
          fullWidth
          getOptionLabel={(option) => option.project_name ?? ""}
          onChange={(e, value) => {
            setglobalApplication(null);
            setglobalProject(value);
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input type="text" {...params.inputProps} />
            </div>
          )}
        />
      </Grid>
      <Grid item md={6}>
        <label htmlFor="">Applications</label>
        <Autocomplete
          disablePortal
          disableClearable
          id="application_id"
          options={applicationList}
          value={globalApplication || null}
          // sx={{ width: "100%" }}
          fullWidth
          getOptionLabel={(option) => option.module_name}
          onChange={(e, value) => {
            // console.log(value);
            setglobalApplication(value);
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input type="text" {...params.inputProps} />
            </div>
          )}
        />
      </Grid>
    </Grid>
  );
}
