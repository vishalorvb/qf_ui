import { Autocomplete, Fab, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { getApplicationOfProject } from "../Services/ApplicationService";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
    } = useHead();

    const { auth } = useAuth();

    let [searchWord, setSearchWord] = useState("")
    let [show, setShow] = useState(false)

    useEffect(() => {
        projectsList?.length <= 0 && getProject(setProjectList, auth.userId);
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

        globalApplication == null && setglobalApplication(applicationList[0] ?? null)
    }, [applicationList])

    //change from here

    useEffect(() => {
        setSearchWord(globalApplication?.module_name)
    }, [globalApplication])

    return (
        <Grid
            container
            spacing={2}
            justifyContent={isApplication !== false ? "space-around" : "flex-end"}
            direction="row"
        >
            <Grid item md={6}>
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
                <Grid item md={6}>
                    <div className="searchbox">
                        <label>Applications</label>
                        <input type="text" autoComplete="off" name="application" value={searchWord}
                            onChange={e => setSearchWord(e.target.value)}
                            onFocus={e => {
                                setShow(true)
                                setSearchWord("")
                            }}
                            onBlur={e => {
                                setTimeout(() => {
                                    setShow(false)
                                }, 1000);
                            }}
                        />
                        {show && <div className="applist">
                            <ul>
                                {applicationList.filter(app => app.module_name?.toLowerCase().includes(searchWord?.toLowerCase())).map(app => {

                                    return (
                                        <li key={app.module_id}
                                            onClick={e => {
                                                setglobalApplication(app)
                                                e.stopPropagation()
                                            }} >
                                            {app.module_name}
                                            <ul style={{ paddingLeft: "10px" }}>
                                                {app?.sub_modules_list?.filter(a => !a.is_deleted)?.map(subapp => {
                                                    return (
                                                        <li key={subapp.module_id}
                                                            onClick={e => {
                                                                setglobalApplication(subapp)
                                                                e.stopPropagation()
                                                            }}
                                                        >{subapp.module_name}</li>
                                                    )
                                                })}
                                            </ul>
                                        </li>

                                    )
                                })}
                            </ul>
                        </div>}
                    </div>
                </Grid>
            )
            }
        </Grid >
    );
}
