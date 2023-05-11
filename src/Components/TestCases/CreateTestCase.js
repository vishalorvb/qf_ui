import { Autocomplete, Button, Divider, Grid, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import { CreateTestCaseService } from "../../Services/TestCaseService"
import { validateFormbyName } from "../../CustomComponent/FormValidation"
import { useEffect, useState } from "react"
import { MapAPiTestCaseData } from "./apiTestcase/MapApiTestCase"
// import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { Stack } from "@mui/system"
import useHead from "../../hooks/useHead"
import { getProject } from "../../Services/ProjectService"
import { getApplicationOfProject } from "../../Services/ApplicationService"
import useAuth from "../../hooks/useAuth"
import { UpdateTestcase } from "../../Services/TestCaseService"
import SnackbarNotify from "../../CustomComponent/SnackbarNotify"
import ProjectnApplicationSelector from "../ProjectnApplicationSelector"
import { getSprint, getIssues } from "../../Services/TestCaseService"
export let TCdata = {
    module_id: 0,
    testcase_name: "",
    testcase_description: "",
    project_id: 0,
    testcase_sprints: []
}

let sprintData = {
    "sprint_id": 0,
    "sprint_name": "",
    "issue_id": 0
}
let snackbarErrorMsg = ""

function CreateTestCase() {
    let navigate = useNavigate();
    const [reportFailMsg, setReportFailMsg] = useState(false);
    let [project, setProject] = useState([])
    let [application, setApplication] = useState([])
    const { auth } = useAuth();
    const { setHeader, globalProject, setglobalProject, globalApplication, setglobalApplication } = useHead();
    let redirect_url = [" ", "/Testcase/Recent/MapApiTestCase", "/Testcase/Recent/MapScreen",]
    let [jiraSprint, setJiraSprint] = useState([]);
    let [jiraIssue, setJiraIssue] = useState([]);
    let [snackbarError, setSnackbarError] = useState(false);
    function handleSubmit(e) {
        if ((globalApplication?.module_type) == 19) {
            setReportFailMsg(true);
            setTimeout(() => {
                setReportFailMsg(false);
            }, 3000);
        }
        else {
            if (sprintData.sprint_id != 0) {
                TCdata.testcase_sprints.push(sprintData)
            }
            if (validateFormbyName(["name", "desc"], "error")) {
                if (TCdata.testcase_id === undefined) {
                    CreateTestCaseService(TCdata).then(res => {
                        if (res) {
                            if (globalApplication.module_type == 1) {
                                MapAPiTestCaseData.testcase_id = res
                                navigate(redirect_url[globalApplication?.module_type])
                            }
                            else {
                                navigate(redirect_url[2], {
                                    state:
                                    {
                                        projectId: globalProject.project_id,
                                        moduleId: globalApplication.module_id,
                                        testcaseId: res
                                    }
                                })
                            }
                        }
                        else {
                            snackbarErrorMsg = "Error, Make sure Testcase Name is Unique"
                            setSnackbarError(true)
                        }
                    }
                    )
                }
                else {
                    UpdateTestcase(TCdata.testcase_id, TCdata.testcase_name, TCdata.testcase_description).then(res => {
                        if (res) {
                            // MapAPiTestCaseData.testcase_id = res
                            // navigate(redirect_url[globalApplication?.module_type])
                            if (globalApplication.module_type == 1) {
                                MapAPiTestCaseData.testcase_id = res
                                navigate(redirect_url[globalApplication?.module_type])
                            }
                            else {
                                navigate(redirect_url[2], {
                                    state:
                                    {
                                        projectId: globalProject.project_id,
                                        moduleId: globalApplication.module_id,
                                        testcaseId: res
                                    }
                                })
                            }
                        }
                    })
                }

            }
            else {
                console.log("Invalid form")
            }
        }
    }
    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Create Testcases",
                plusButton: false,
                //   buttonName: "Create Testcase",
                plusCallback: () => {

                },
            };
        });
    }, []);

    useEffect(() => {
        try {
            TCdata.module_id = globalApplication.module_id
            TCdata.project_id = globalProject.project_id
        } catch (error) {

        }
        MapAPiTestCaseData.module_id = globalApplication?.module_id
        MapAPiTestCaseData.project_id = globalProject?.project_id
    }, [globalProject, globalApplication])


    useEffect(() => {
        if (globalProject?.project_id !== undefined) {
            getApplicationOfProject(setApplication, globalProject?.project_id)
            getSprint(setJiraSprint, globalProject?.project_id)
        }
    }, [globalProject])
    useEffect(() => {
        if (globalApplication == null) {
            setglobalApplication(application[0])
        }
    }, [application])
    useEffect(() => {

        getProject(setProject, auth.userId)
        return () => {
            TCdata = {
                module_id: 0,
                testcase_name: "",
                testcase_description: "",
                project_id: 0,
                testcase_sprints: []
            }
            sprintData = {
                "sprint_id": 0,
                "sprint_name": "2",
                "issue_id": 0
            }
        };
    }, [])
    useEffect(() => {
        if (globalProject == null) {
            setglobalProject(project[0])
        }
    }, [project])

    return (
        <>
            <Grid item container spacing={2} justifyContent="left">

                <Grid item md={3}>
                    <label htmlFor="">Projects</label>
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="project_id"
                        options={project}
                        value={globalProject || null}
                        sx={{ width: "100%" }}
                        getOptionLabel={(option) => option?.project_name}
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
                <Grid item md={3}>
                    <label htmlFor="">Application</label>
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="model_id"
                        options={application}
                        value={globalApplication || null}
                        sx={{ width: "100%" }}
                        getOptionLabel={(option) => option.module_name}
                        onChange={(e, value) => {
                            setglobalApplication(value);
                        }}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <input type="text" {...params.inputProps} />
                            </div>
                        )}
                    />

                </Grid>
                <Grid item md={3}>
                    <label >Sprint</label>
                    <select
                        onChange={e => {
                            getIssues(setJiraIssue, globalApplication.project_id, e.target.value)
                            sprintData.sprint_id = e.target.value
                        }}
                    >
                        {jiraSprint.map(s => <option key={s.id} value={s.sprint_name}>{s.sprint_name}</option>)}
                    </select>
                </Grid>
                <Grid item md={3}>
                    <label >Issues</label>
                    <select
                        onChange={e => {
                            sprintData.issue_id = e.target.value
                        }}
                    >
                        {jiraIssue.map(s => <option key={s.id} value={s.issue_id}>{s.key}</option>)}
                    </select>
                </Grid>
                {/* <ProjectnApplicationSelector
                    globalProject={globalProject}
                    setglobalProject={setglobalProject}
                    globalApplication={globalApplication}
                    setglobalApplication={setglobalApplication}
                /> */}
                <Grid item xs={4} md={4}>
                    <label htmlFor="">TestCase Name</label>
                    <input
                        name="name"
                        defaultValue={TCdata.testcase_name}
                        onChange={e => {
                            TCdata.testcase_name = e.target.value;
                        }}
                    />
                </Grid>
                <br />
                <Grid item xs={8} md={8}>
                    <label htmlFor="">Description</label>
                    <input
                        name="desc"
                        defaultValue={TCdata.testcase_description}
                        onChange={e => {
                            TCdata.testcase_description = e.target.value;
                        }}
                    />
                </Grid>
                <br />
                <Grid item xs={12} md={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button sx={{ color: "grey", textDecoration: "underline" }}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>Save & Continue</Button>
                    </Stack>
                </Grid>
            </Grid >
            <SnackbarNotify
                open={reportFailMsg}
                close={setReportFailMsg}
                msg="Testcases can't be created for this Application."
                severity="error"
            />
            <SnackbarNotify
                open={snackbarError}
                close={setSnackbarError}
                msg={snackbarErrorMsg}
                severity="error"
            />
        </>

    )
}

export default CreateTestCase
