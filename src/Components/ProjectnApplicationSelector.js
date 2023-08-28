import { Autocomplete, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { getApplicationOfProject } from "../Services/ApplicationService";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";
export default function ProjectnApplicationSelector({
    isTestset,
    isApplication,
    selectorDisabled,
}) {
    const {
        globalProject,
        setglobalProject,
        globalApplication,
        setglobalApplication,
        projectsList,
        setProjectList,
        applicationList,
        setapplicationList,
        selectedApplication,
        setSelectedApplication,
        subApplicationList,
        setSubApplicationList,
        selectedSubApplication,
        setSelectedSubApplication
    } = useHead();

    const { auth } = useAuth();
    let [subApplication, setSubApplication] = useState([])


    useEffect(() => {
        projectsList?.length <= 0 && getProject(setProjectList, auth.userId);
    }, []);

    useEffect(() => {
        if (globalProject == null) {
            setglobalProject(projectsList[0]);
        }
    }, [projectsList]);

    useEffect(() => {
        setapplicationList([]);
        if (globalProject?.project_id !== undefined) {
            getApplicationOfProject(setapplicationList, globalProject?.project_id);
        }
    }, [globalProject]);

    //change from here
    //useEffect(() => {
    //    if (globalApplication == null) {
    //        setglobalApplication(applicationList[0]);
    //    }
    //}, [applicationList]);

    //useEffect(() => {
    //    console.log(globalApplication)
    //    setSubApplication(globalApplication?.sub_modules_list)
    //}, [globalApplication])

    useEffect(() => {
        setSelectedApplication(applicationList[0] ?? null)
    }, [applicationList])

    useEffect(() => {
        if (selectedApplication != null) {
            if (selectedApplication.sub_modules_list?.length > 0) {
                console.log(selectedApplication.sub_modules_list?.length)
                setSubApplicationList(selectedApplication.sub_modules_list)
            }
            else {
                setSubApplicationList([])
                setglobalApplication(selectedApplication)
            }
        }

    }, [selectedApplication])

    useEffect(() => {
        setSelectedSubApplication(subApplicationList[0])
    }, [subApplicationList])

    useEffect(() => {
        setglobalApplication(selectedSubApplication)
    }, [selectedSubApplication])

    return (
        <Grid
            container
            spacing={2}
            justifyContent={isApplication !== false ? "space-around" : "flex-end"}
            direction="row"
        >
            <Grid item md={subApplicationList?.length > 0 ? 4 : 6}>
                <label>Projects</label>
                <Autocomplete
                    disabled={selectorDisabled === true}
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
            {isApplication != false && (
                <Grid item md={subApplicationList?.length > 0 ? 4 : 6}>
                    <label>Applications</label>
                    <Autocomplete
                        disabled={selectorDisabled === true}
                        disablePortal
                        disableClearable
                        id="application_id"
                        options={applicationList}
                        value={selectedApplication || null}
                        // sx={{ width: "100%" }}
                        fullWidth
                        getOptionLabel={(option) => option.module_name}
                        onChange={(e, value) => {
                            setSelectedApplication(value);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Grid>
            )}

            {subApplicationList?.length > 0 && <Grid item md={4}>
                <label>Sub Applications</label>
                <Autocomplete
                    disabled={selectorDisabled === true}
                    disablePortal
                    disableClearable
                    id="application_id"
                    options={subApplicationList}
                    value={selectedSubApplication || null}
                    // sx={{ width: "100%" }}
                    fullWidth
                    getOptionLabel={(option) => option.module_name}
                    onChange={(e, value) => {
                        selectedSubApplication(value);
                        
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
            </Grid>}
        </Grid>
    );
}
