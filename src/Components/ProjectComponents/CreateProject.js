import { Button, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { resetClassName } from "../../CustomComponent/FormValidation";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { createformData } from "./ProjectData";
import { clearProjectData } from "./ProjectData";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import {
    getUsers,
    createProject,
    updateProject,
    getUserOfProject,
    getJiraProject
} from "../../Services/ProjectService";
import {
    getApplicationOfProject,
    getApplication,
} from "../../Services/ApplicationService";
import TransferList from "../../CustomComponent/TransferList";


let snackbarmasg = ""
let jiraProjectdata = {
    url: "",
    username: "",
    password: "",
    itstype: 1,
}

let filterApplication = {
    // "automation_type": "module type list"
    1: [1, 2],
    3: [1, 2],
    4: [3, 4, 13],
    6: [19]
}
let automationType = [
    { "Name": "Selenium", "Val": 1 },
    { "Name": "BDD", "Val": 2 },
    { "Name": "Cucumber Automation", "Val": 3 },
    { "Name": "Link Project", "Val": 6 },
    { "Name": "Mobile", "Val": 4 }
]

let errorMsg = ""

function CreateProject() {
    const { setHeader } = useHead();
    const { auth } = useAuth();
    const usertoken = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: createformData.sqeProjectId == "" ? "Create Project" : "Edit Project",
            };
        });
    }, []);

    let [snackbarerror, setSnackbarerror] = useState(false);
    let [snackbarsuccess, setSnackbarsuccess] = useState(false);
    let [users, setUsers] = useState([]);
    let [leftuser, setLeftuser] = useState([]);
    let [rigthtuser, setRightuser] = useState([]);
    let [leftApplication, setLeftApplication] = useState([]);
    let [rightApplication, setRightApplication] = useState([]);
    let [applications, setApplications] = useState([]);
    let [jiraProject, setJiraproject] = useState(null);
    let [automation_type, setAutomationType] = useState("1")

    function getUserlist() {
        let userlist = [];
        rigthtuser.forEach((user) => {
            let temp = {
                user_id: user.id.toString(),
                grafana_role: "4",
            };
            userlist.push(temp);
        });
        return userlist;
    }
    function getApplicationlist() {
        let applist = [];
        rightApplication.forEach((app) => {
            applist.push(app.module_id);
        });
        return applist;
    }
    function submitHandler() {
        let x = getUserlist();
        x = JSON.stringify(x);
        let app = getApplicationlist();
        app = app.toString();
        createformData.userAccessPermissions = x;
        createformData.applicationsProjectMapping = "[" + app + "]";
        createformData.userId = auth.info.id;
        if (
            validateFormbyName(
                ["projectname", "automation_framework_type", "desc",],
                "error"
            ) == true
        ) {
            if (createformData.sqeProjectId == "") {
                createProject(createformData).then((res) => {
                    if (res == "SUCCESS") {
                        snackbarmasg = "Project created successfully"
                        setSnackbarsuccess(true);
                        setTimeout(() => {
                            navigate("/Projects/Recent");
                        }, 1000);
                    } else {
                        errorMsg = "Project Name already exists"
                        setSnackbarerror(true);
                    }
                });
            } else {
                updateProject(createformData).then((res) => {
                    if (res == "SUCCESS") {
                        snackbarmasg = "Project updated successfully"
                        setSnackbarsuccess(true);
                        setTimeout(() => {
                            navigate("/Projects/Recent");
                        }, 1000);
                    } else {

                        setSnackbarerror(true);
                    }
                });
            }
        } else {
            errorMsg = "Fill Required Fields"
            setSnackbarerror(true);
        }
    }

    useEffect(() => {
        let rightlist = rigthtuser.map(user => user.id)
        setLeftuser(users.filter(user => !rightlist.includes(user.id)))
    }, [rigthtuser])



    function handleJiraProject() {
        getJiraProject(setJiraproject, jiraProjectdata.url, jiraProjectdata.username, jiraProjectdata.password, jiraProjectdata.itstype, "prolifics", auth.info.organization_id)
    }
    useEffect(() => {
        getUsers(setUsers, auth.info.organization_id, auth.info.ssoId, usertoken);
        getApplication(setApplications, auth.info.id);
        if (createformData.sqeProjectId != "") {
            getApplicationOfProject(setRightApplication, createformData.sqeProjectId);
        }
        if (createformData.sqeProjectId != "") {
            getUserOfProject(setRightuser, createformData.sqeProjectId, auth.info.id).then(res => {
                let ids = res?.map(pro => pro.id)
                getUsers(
                    (val) => { },
                    auth.info.organization_id,
                    auth.info.ssoId,
                    usertoken
                ).then(resp => setLeftuser(resp.filter(pro => !ids.includes(pro.id))))
            })
        }
        else {
            getUsers(
                setLeftuser,
                auth.info.organization_id,
                auth.info.ssoId,
                usertoken
            );
        }
    }, []);

    useEffect(() => {
        let selectApp = rightApplication.map(app => app.module_id)
        let x = applications.filter(a => {
            if (filterApplication[automation_type]?.includes(a.module_type) && !selectApp.includes(a.module_id)) {
                return a
            }
        })
        setLeftApplication(x)
    }, [automation_type, applications, rightApplication])

    useEffect(() => {
        return () => {
            ref?.current?.reset();
            clearProjectData();

            jiraProjectdata = {
                url: "",
                username: "",
                password: "",
                itstype: 1,
            }
        };
    }, []);



    const ref = useRef(null);
    return (
        <form ref={ref}>
            <div className="accordionParent" >
                <SnackbarNotify
                    open={snackbarerror}
                    close={setSnackbarerror}
                    msg={errorMsg}
                    severity="error"
                />
                <SnackbarNotify
                    open={snackbarsuccess}
                    close={setSnackbarsuccess}
                    msg={snackbarmasg}
                    severity="success"
                />
                <AccordionTemplate defaultState={true} name="Project Information">
                    <Grid container spacing={2} sx={{ marginBottom: "10px" }} >
                        <Grid item xs={6} sm={6} md={6}>
                            <label>
                                Project Name <span className="importantfield">*</span>:
                            </label>
                            <input
                                defaultValue={createformData.projectName}
                                type="text"
                                name="projectname"
                                onChange={(e) => {
                                    createformData.projectName = e.target.value.trim();
                                }}
                                disabled={createformData.sqeProjectId == "" ? false : true}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>
                                Automation Framework Type{" "}
                                <span className="importantfield">*</span>:
                            </label>
                            <select
                                onChange={(e) => {
                                    createformData.automation_framework_type = e.target.value;
                                    setAutomationType(e.target.value);
                                }}
                                name="automation_framework_type"
                                defaultValue={1}
                                disabled={createformData.sqeProjectId == "" ? false : true}
                            >
                                {automationType.map(opt => <option key={opt.Val}
                                    value={opt.Val}
                                >
                                    {opt.Name}
                                </option>)}
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <label>
                                Description <span className="importantfield">*</span>:
                            </label>
                            <input
                                onChange={(e) => {
                                    createformData.projectDesc = e.target.value;
                                }}
                                defaultValue={createformData.projectDesc}
                                name="desc"

                            />
                        </Grid>
                    </Grid>
                </AccordionTemplate>
                <AccordionTemplate name="Repository">

                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ marginBottom: "10px" }}
                        spacing={2}
                    >
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Git URL :</label>
                            <input
                                defaultValue={createformData.repository_url}
                                type="text"
                                onChange={(e) => {
                                    createformData.repository_url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Git Access Token :</label>
                            <input
                                defaultValue={createformData.repository_token}
                                type="text"
                                onChange={(e) => {
                                    createformData.repository_token = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <label>Branch :</label>
                            <input
                                type="text"
                                defaultValue={createformData.repository_branch}
                                onChange={(e) => {
                                    createformData.repository_branch = e.target.value;
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionTemplate>

                <AccordionTemplate name="CICD Pipeline">
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        spacing={2}
                        sx={{ marginBottom: "10px" }}
                    >
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins URL :</label>
                            <input
                                defaultValue={createformData.jenkins_url}
                                type="text"
                                onChange={(e) => {
                                    createformData.jenkins_url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins Token :</label>
                            <input
                                defaultValue={createformData.jenkins_token}
                                type="text"
                                name="jenkins_token"

                                onChange={(e) => {
                                    createformData.jenkins_token = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins UserName :</label>
                            <input
                                defaultValue={createformData.jenkins_user_name}
                                autoComplete="off"
                                type="text"
                                onChange={(e) => {
                                    createformData.jenkins_user_name = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins Password :</label>
                            <input
                                defaultValue={createformData.jenkins_password}
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    createformData.jenkins_password = e.target.value;
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionTemplate>

                <AccordionTemplate name="Database">

                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ marginBottom: "10px" }}
                        spacing={2}
                    >
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Database Type :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_type = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Database Name :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_name = e.target.value;
                                }}
                            />

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Host Name :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_name = e.target.value;
                                }}
                            />

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>DB UserName :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_user_name = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Port Number :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_port = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>DB Password :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    createformData.db_password = e.target.value;
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionTemplate>
                <AccordionTemplate name="Collaboration">

                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ marginBottom: "10px" }}
                        spacing={2}

                    >
                        <Grid item xs={4} sm={4} md={4}>
                            <label>
                                Select Issue Tracker <span className="importantfield">*</span>
                                :
                            </label>
                            <select
                                // defaultValue={createformData.issueTrackerType}
                                onChange={(e) => {
                                    // createformData.issueTrackerType = e.target.value;
                                    jiraProjectdata.itstype = e.target.value;

                                }}
                                name="issueTracker"
                            >
                                <option value={1}>Jira</option>
                                <option value={2}>Azure</option>
                            </select>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>URL :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    // createformData.jenkins_url = e.target.value;
                                    jiraProjectdata.url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>User Name :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    // createformData.jenkins_user_name = e.target.value;
                                    jiraProjectdata.username = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Token :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    // createformData.jenkins_token = e.target.value;
                                    jiraProjectdata.password = e.target.value;
                                }}
                            />
                        </Grid>
                        {jiraProject != null && <Grid item xs={4} sm={4} md={4}>
                            <label>Projects :</label>
                            {/* <input type="text" /> */}
                            <select>
                                {jiraProject.map(v => <option value={v.jira_project_id}>{v.name}</option>)}
                            </select>
                        </Grid>}
                        <Grid item xs={4} sm={4} md={4} justifyContent="center">
                            <br />
                            <Button variant="contained"
                                onClick={handleJiraProject}
                            >
                                Verify
                            </Button>
                        </Grid>
                    </Grid>

                </AccordionTemplate>

                <AccordionTemplate name="Add User">
                    <TransferList
                        left={leftuser}
                        setLeft={setLeftuser}
                        right={rigthtuser}
                        setRight={setRightuser}
                        name='firstName'
                    ></TransferList>
                </AccordionTemplate>

                <AccordionTemplate name="Add Application">
                    <TransferList
                        left={leftApplication}
                        setLeft={setLeftApplication}
                        right={rightApplication}
                        setRight={setRightApplication}
                        name='module_name'
                    ></TransferList>
                </AccordionTemplate>
                <Grid item xs={12} md={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button variant="contained" onClick={submitHandler} >Save & Continue</Button>
                    </Stack>
                </Grid>

            </div>

        </form>
    );
}

export default CreateProject;
