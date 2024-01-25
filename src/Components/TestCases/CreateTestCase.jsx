import { Button, Divider, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import {
    getSprint,
    getIssues,
    getTestcaseDetails,
    CreateTestCaseService,
    createApitestcase,
} from "../../Services/QfService";
import { getSprint_in_testcase } from "../../Services/QfService";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { useLocation, useNavigate } from "react-router";
import Web from "./webTestcase/Web";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import MapApiTestCase from "./apiTestcase/MapApiTestCase";
function CreateTestCase() {
    let location = useLocation();
    const { auth } = useAuth();
    const { setHeader, globalProject, globalApplication, setSnackbarData } =
        useHead();
    const navigate = useNavigate();

    let [basicDetails, setBasicDetails] = useState({
        testcaseName: "",
        testcaseDescription: "",
    });
    let [jiraSprint, setJiraSprint] = useState([]);
    let [jiraIssue, setJiraIssue] = useState(null);
    let TC_ID = location.state.testcaseId ?? 0;
    let isCopy = location.state.isCopy ?? false;
    let [selectedScreen, setSelectedScreen] = useState([]);
    let [selectedApiList, setSelectedApiList] = useState([]);
    let [sprintData, setSprintData] = useState({
        sprint_id: "",
        sprint_name: "",
        issue_id: "",
    });

    function WebTestcase() {
        if (selectedScreen?.length === 0) {
            setSnackbarData({
                status: true,
                message: "Error, Select Atleast one screen",
                severity: "error",
            });
            return;
        }
        let data = {
            module_id: globalApplication.module_id,
            testcase_name: basicDetails.testcaseName.startsWith("TC_")
                ? basicDetails.testcaseName
                : "TC_" + basicDetails.testcaseName,
            testcase_description: basicDetails.testcaseDescription,
            project_id: globalProject.project_id,
            testcase_sprints: [sprintData],
            screens_in_testcase: selectedScreen?.map((s) => {
                return {
                    screen_id: s.screen_id,
                };
            }),
        };
        if (TC_ID !== 0 && isCopy === false) {
            data.testcase_id = TC_ID;
        }
        CreateTestCaseService(data).then((res) => {
            if (res) {
                setSnackbarData({
                    status: true,
                    message: res,
                    severity: "success",
                });
                navigate("/Recent-Testcases");
            } else {
                setSnackbarData({
                    status: true,
                    message: "Error, Make sure Testcase Name is Unique",
                    severity: "error",
                });
            }
        });
    }

    function ApiTestcase() {
        if (selectedApiList?.length === 0) {
            setSnackbarData({
                status: true,
                message: "Error, Select Atleast one Api",
                severity: "error",
            });
            return;
        }
        let data = {
            module_id: globalApplication.module_id,
            testcase_name: basicDetails.testcaseName,
            testcase_description: basicDetails.testcaseDescription,
            project_id: globalProject.project_id,
            testcase_sprints: [sprintData],
            apis_list: selectedApiList?.map((api) => {
                return { api_id: api };
            }),
        };
        if (TC_ID !== 0 && isCopy === false) {
            data.testcase_id = TC_ID;
        }
        createApitestcase(data).then((res) => {
            if (res) {
                setSnackbarData({
                    status: true,
                    message: TC_ID === 0 ? res : "TestCase Updated Successfully",
                    severity: "success",
                });
                navigate("/Recent-Testcases");
            } else {
                setSnackbarData({
                    status: true,
                    message: "Error, Make sure Testcase Name is Unique",
                    severity: "error",
                });
            }
        });
    }
    function handleSubmit() {
        if (globalApplication?.module_type === 19) {
            setSnackbarData({
                status: true,
                message: "Error, Make sure Testcase Name is Unique",
                severity: "error",
            });
            return;
        }
        if (validateFormbyName(["name", "desc"], "error") === false) {
            return;
        }
        if (globalApplication?.module_type !== 1) {
            WebTestcase();
        }
        if (globalApplication?.module_type === 1) {
            ApiTestcase();
        }
    }
    useEffect(() => {
        setJiraIssue(null);
        if (TC_ID !== 0) {
            //To Updtae  testcase
            getTestcaseDetails(TC_ID).then((res) => {
                setBasicDetails({
                    testcaseName: res.name,
                    testcaseDescription: res.description,
                });
            });
            getSprint_in_testcase(globalProject?.project_id, TC_ID).then((res) => {
                setJiraSprint(res);
            });
        } else {
            //To create new testcase
            globalProject?.project_id !== undefined &&
                getSprint(setJiraSprint, globalProject?.project_id).then((res) => { });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalProject]);

    useEffect(() => {
        if (jiraIssue === null && jiraSprint?.length > 0) {
            let data = {
                sprint_name: jiraSprint[0]?.name,
            };
            getIssues(setJiraIssue, auth.userId, globalProject?.project_id, data);
        }
        setSprintData({
            ...sprintData,
            sprint_id: jiraSprint[0]?.id ?? "",
            sprint_name: jiraSprint[0]?.name ?? "",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jiraSprint]);

    useEffect(() => {
        setSprintData({
            ...sprintData,
            issue_id: jiraIssue === null ? "" : jiraIssue[0]?.id ?? "",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jiraIssue]);

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: TC_ID === 0 ? "Create Testcase" : "Update TestCase",
                plusButton: false,
                plusCallback: () => { },
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <Grid item container spacing={2} justifyContent="left">
                <Grid item md={6}>
                    <ProjectnApplicationSelector selectorDisabled={TC_ID !== 0} />
                </Grid>
                <Grid item md={3}>
                    <label>Sprint</label>
                    <select
                        onChange={(e) => {
                            //auth.userId
                            let sprintName =
                                e.target.options[e.target.selectedIndex].innerText;
                            let data = {
                                sprint_name: sprintName,
                            };
                            setSprintData({
                                ...sprintData,
                                sprint_id: e.target.value,
                                sprint_name: sprintName,
                            });

                            getIssues(
                                setJiraIssue,
                                auth.userId,
                                globalProject?.project_id,
                                data
                            );
                        }}
                    >
                        {jiraSprint?.map((s) => (
                            <option key={s.id} value={s.sprint_id}>
                                {s?.name}
                            </option>
                        ))}
                    </select>
                </Grid>
                <Grid item md={3}>
                    <label>Issues</label>
                    <select
                        onChange={(e) => {
                            setSprintData({ ...sprintData, issue_id: e.target.value });
                        }}
                    >
                        {jiraIssue?.map((s) => (
                            <option key={s.id} value={s.issue_id}>
                                {s.key}
                            </option>
                        ))}
                    </select>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Stack spacing={1}>
                        <label htmlFor="">
                            Testcase Name <span className="importantfield">*</span>
                        </label>
                        <TextField
                            size="small"
                            placeholder="Testcase Name"
                            name="name"
                            value={basicDetails.testcaseName}
                            onChange={(e) => {
                                let val = e.target.value;
                                setBasicDetails({
                                    ...basicDetails,
                                    testcaseName: val,
                                });
                            }}
                        />
                    </Stack>
                </Grid>
                <br />
                <Grid item xs={6} md={6}>
                    <Stack spacing={1}>
                        <label htmlFor="">
                            Description <span className="importantfield">*</span>
                        </label>
                        <TextField
                            size="small"
                            placeholder="Testcase Description"
                            name="desc"
                            value={basicDetails.testcaseDescription}
                            onChange={(e) => {
                                setBasicDetails({
                                    ...basicDetails,
                                    testcaseDescription: e.target.value,
                                });
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <br />
            <Divider></Divider>
            <br />
            {globalApplication?.module_type !== 1 ? (
                <div className="web">
                    <Web
                        project={globalProject}
                        application={globalApplication}
                        testcaseId={TC_ID}
                        setScreen={(s) => {
                            setSelectedScreen(s);
                        }}
                    ></Web>
                </div>
            ) : (
                <div className="api">
                    <MapApiTestCase
                        testcaseId={TC_ID}
                        moduleId={globalApplication.module_id}
                        setApiList={setSelectedApiList}
                    ></MapApiTestCase>
                </div>
            )}
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Button
                    onClick={(e) => navigate("/Recent-Testcases")}
                    sx={{ color: "grey", textDecoration: "underline" }}
                >
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {TC_ID === 0 ? "Save & Continue" : "Update"}{" "}
                </Button>
            </Stack>
        </div>
    );
}

export default CreateTestCase;
