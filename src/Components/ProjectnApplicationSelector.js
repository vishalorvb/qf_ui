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
    const {
        globalProject,
        setglobalProject,
        globalApplication,
        setglobalApplication,
        projectsList,
        setProjectList,
        applicationList,
        setapplicationList,
    } = useHead();

    const { auth } = useAuth();

    useEffect(() => {
        projectsList.length <= 0 && getProject(setProjectList, auth.userId);
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
        <Grid container spacing={2} justifyContent="space-around" direction="row">
            <Grid item md={6}>
                <label>Projects</label>
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
                        <TextField {...params} size="small" fullWidth />
                    )}
                />
            </Grid>
            <Grid item md={6}>
                <label>Applications</label>
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
                        setglobalApplication(value);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
            </Grid>
        </Grid>
    );
}
