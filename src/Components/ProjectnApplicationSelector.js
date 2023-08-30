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
        selectedApplication,
        setSelectedApplication,
        subApplicationList,
        setSubApplicationList,
        selectedSubApplication,
        setSelectedSubApplication
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
        setapplicationList([]);
        if (globalProject?.project_id !== undefined) {
            getApplicationOfProject(setapplicationList, globalProject?.project_id);
        }
    }, [globalProject]);

    //change from here


    useEffect(() => {
        setSubApplicationList([])

        setSelectedApplication(applicationList[0] ?? null)
    }, [applicationList])

    useEffect(() => {
        setglobalApplication(selectedApplication)
        setSubApplicationList([])

        if (selectedApplication != null) {
            if (selectedApplication.sub_modules_list?.length > 0) {
                setSubApplicationList(selectedApplication.sub_modules_list)
            }

        }

    }, [selectedApplication])

    useEffect(() => {
        setSelectedSubApplication(null)
    }, [subApplicationList])

    useEffect(() => {

    }, [selectedSubApplication])

    useEffect(() => {
        setSearchWord(globalApplication?.module_name)
        console.log(globalApplication)
    }, [globalApplication])

    useEffect(() => {
        let temp = applicationList.filter(app => app.module_name?.toLowerCase().includes(searchWord?.toLowerCase()))
        //console.log(temp)
    }, [searchWord])
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
                                    setSearchWord(globalApplication?.module_name)
                                    setShow(false)
                                }, 1000);
                            }}
                        />
                        {/*<Autocomplete
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
                        />*/}
                        {show && <div className="applist">
                            <ul>
                                {applicationList.map(app => {

                                    return (
                                        <li key={app.module_id}
                                            onClick={e => {
                                                console.log(app)
                                                setglobalApplication(app)
                                                e.stopPropagation()
                                            }} >
                                            {app.module_name}
                                            {/*{app.sub_modules_list.length > 0 && <KeyboardArrowRightIcon></KeyboardArrowRightIcon>}*/}
                                            <ul>

                                                {app?.sub_modules_list?.map(subapp => {
                                                    return (
                                                        <li key={subapp.module_id}
                                                            onClick={e => {
                                                                console.log(subapp)
                                                                setglobalApplication(subapp)

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

                        {/*<div className="subapp">
                            <ul>
                                {subApplicationList.map(subapp => <li key={subapp.module_id}
                                    onClick={e => {
                                        setSelectedSubApplication(subapp);
                                        setglobalApplication(subapp)
                                    }} >
                                    {subapp.module_name}
                                </li>)}
                            </ul>
                        </div>*/}
                    </div>
                </Grid>
            )
            }

            {/*{subApplicationList?.length > 0 && <Grid item md={4}>
                <div>
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
                            setSelectedSubApplication(value);
                            console.log(value)
                            setglobalApplication(value)
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />

                </div>

            </Grid>}*/}
        </Grid >
    );
}
