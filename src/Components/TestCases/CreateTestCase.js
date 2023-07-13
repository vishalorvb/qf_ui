import { Autocomplete, Button, Divider, Grid, TextField } from "@mui/material"
import { useNavigate } from "react-router"
import { validateFormbyName } from "../../CustomComponent/FormValidation"
import { useEffect, useRef, useState } from "react"
import { Stack } from "@mui/system"
import useHead from "../../hooks/useHead"
import { getProject } from "../../Services/ProjectService"
import { getApplicationOfProject } from "../../Services/ApplicationService"
import useAuth from "../../hooks/useAuth"
import SnackbarNotify from "../../CustomComponent/SnackbarNotify"
import { getSprint, getIssues, createApitestcase } from "../../Services/TestCaseService"
import MapScreen from "./webTestcase/MapScreen"
import { CreateTestCaseService } from "../../Services/TestCaseService"
import MapApiTestCase from "./apiTestcase/MapApiTestCase"
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
    const [reportFailMsg, setReportFailMsg] = useState(false);
    let [project, setProject] = useState([])
    let [application, setApplication] = useState([])
    const { auth } = useAuth();
    const { setHeader, globalProject, setglobalProject, globalApplication, setglobalApplication, setSnackbarData } = useHead();
    let [jiraSprint, setJiraSprint] = useState([]);
    let [jiraIssue, setJiraIssue] = useState([]);
    let [snackbarError, setSnackbarError] = useState(false);
    let [selectedApiList, setSelectedApiList] = useState([]);
    let screens = useRef()

    const navigate = useNavigate();


    function WebTestcase(data) {
        CreateTestCaseService(data).then(res => {
            if (res) {
                setSnackbarData({
                    status: true,
                    message: res,
                    severity: "success",
                })
                navigate("/Testcase/Recent")
            }
            else {
                snackbarErrorMsg = "Error, Make sure Testcase Name is Unique"
                setSnackbarError(true)
            }
        }
        )
    }

    function ApiTestcase(data) {
        if (TCdata.apis_list.length < 1) {
            setSnackbarData({
                status: true,
                message: "Select Atleast One Api",
                severity: "warning",
            })
            return 0;
        }

        createApitestcase(data).then(res => {
            if (res) {
                setSnackbarData({
                    status: true,
                    message: TCdata.testcase_id === undefined ? res : "TestCase Updated Successfully",
                    severity: "success",
                })
                navigate("/Testcase/Recent")
            }
            else {
                snackbarErrorMsg = "Error, Make sure Testcase Name is Unique"
                setSnackbarError(true)
            }
        }
        )
    }

    function handleSubmit(e) {
        if ((globalApplication?.module_type) === 19) {
            setReportFailMsg(true);
            setTimeout(() => {
                setReportFailMsg(false);
            }, 3000);
        }
        else {
            if (sprintData.sprint_id !== 0) {
                TCdata.testcase_sprints.push(sprintData)
            }

            if (validateFormbyName(["name", "desc"], "error")) {
                if (!TCdata.testcase_name.startsWith("TC_")) {
                    TCdata.testcase_name = "TC_" + TCdata.testcase_name
                }
                if (globalApplication?.module_type != 1) {
                    let scr = []
                    screens.current.forEach(sc => {
                        sc.screenList.forEach(screen => {
                            let temp = { screen_id: screen?.screen_id }
                            scr.push(temp)
                        })
                    })
                    TCdata.screens_in_testcase = scr
                    WebTestcase(TCdata)
                }
                if (globalApplication?.module_type == 1) {
                    let desc = TCdata.testcase_description
                    delete TCdata.testcase_description
                    TCdata.testcase_desc = desc
                    TCdata.apis_list = selectedApiList?.map(api => {
                        return { api_id: api }
                    })
                    ApiTestcase(TCdata)
                }

            }
            else {
                console.log("Invalid form")
                snackbarErrorMsg = "Fill all required fields"
                setSnackbarError(true)
            }
        }
    }
    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: TCdata.testcase_id === undefined ? "Create Testcase" : "Update TestCase",
                plusButton: false,
                plusCallback: () => {

                },
            };
        });
    }, []);

    useEffect(() => {
        try {
            TCdata.module_id = globalApplication.module_id
            TCdata.project_id = globalProject.project_id
        } catch (error) { }
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
                        fullWidth
                        disabled={TCdata.testcase_id === undefined ? false : true}
                        getOptionLabel={(option) => option?.project_name}
                        onChange={(e, value) => {
                            setglobalApplication(null);
                            setglobalProject(value);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} size="small" fullWidth />
                        )}
                    />
                </Grid>
                <Grid item md={3}>
                    <label htmlFor="">Applications</label>
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="model_id"
                        options={application}
                        value={globalApplication || null}
                        fullWidth
                        disabled={TCdata.testcase_id === undefined ? false : true}
                        getOptionLabel={(option) => option.module_name}
                        onChange={(e, value) => {
                            setglobalApplication(value);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} size="small" fullWidth />
                        )}
                    />

                </Grid>
                <Grid item md={3}>
                    <label>Sprint</label>
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
                <Grid item xs={6} md={6}>
                    <Stack spacing={1}>
                        <label htmlFor="">Testcase Name <span className="importantfield">*</span></label>
                        <TextField
                            size="small"
                            placeholder="Testcase Name"
                            name="name"
                            defaultValue={TCdata.testcase_name}
                            onChange={e => {
                                TCdata.testcase_name = e.target.value.trim();
                            }}
                        />
                    </Stack>

                </Grid>
                <br />
                <Grid item xs={6} md={6}>
                    <Stack spacing={1}>
                        <label htmlFor="">Description <span className="importantfield">*</span></label>
                        <TextField
                            size="small"
                            placeholder="Testcase Description"
                            name="desc"
                            defaultValue={TCdata.testcase_description}
                            onChange={e => {
                                TCdata.testcase_description = e.target.value;
                            }}
                        />
                    </Stack>
                </Grid>

            </Grid >
            <br />
            <Divider></Divider>
            {globalApplication?.module_type !== 1 && <MapScreen
                projectId={globalProject?.project_id}
                moduleId={globalApplication?.module_id}
                testcaseId={TCdata.testcase_id}
                callback={val => screens.current = val}
            ></MapScreen>}

            {globalApplication?.module_type === 1 && <MapApiTestCase
                testcaseId={TCdata.testcase_id}
                moduleId={globalApplication.module_id}
                preSelectedElement={selectedApiList}
                setPreSelectedElement={setSelectedApiList}
            ></MapApiTestCase>}
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Button onClick={e => navigate("/Testcase/Recent")} sx={{ color: "grey", textDecoration: "underline" }}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>{TCdata.testcase_id === undefined ? "Save & Continue" : "Update"} </Button>
                {/*<Button variant="contained" onClick={handleSubmit}>Cancel </Button>*/}
            </Stack>
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
