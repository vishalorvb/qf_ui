import { Button, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getUsers,
    createProject,
    updateProject,
    getUserOfProject,
    getJiraProject,
    getProjectDetails,
} from "../../Services/ProjectService";
import {
    getApplicationOfProject,
    getApplication,
} from "../../Services/ApplicationService";
import TransferList from "../../CustomComponent/TransferList";
import useMaxChar from "../../hooks/useMaxChar";

let jiraProjectdata = {
    url: "",
    username: "",
    password: "",
    itstype: 1,
};

let filterApplication = {
    // "automation_type": "module type list"
    1: [1, 2],
    3: [1, 2],
    4: [3, 4, 13],
    6: [19],
};
let automationType = [
    { Name: "Selenium", Val: 1 },
    { Name: "BDD", Val: 2 },
    { Name: "Cucumber Automation", Val: 3 },
    { Name: "Link Project", Val: 6 },
    { Name: "Mobile", Val: 4 },
];

function CreateProject() {
    const { setHeader, setSnackbarData } = useHead();
    const { auth } = useAuth();
    const usertoken = localStorage.getItem("token");
    const navigate = useNavigate();
    let location = useLocation();
    let projectId = location.state.id;
    let [projectDetails, setProjectDetails] = useState([]);
    let [users, setUsers] = useState([]);
    let [leftuser, setLeftuser] = useState([]);
    let [rigthtuser, setRightuser] = useState([]);
    let [leftApplication, setLeftApplication] = useState([]);
    let [rightApplication, setRightApplication] = useState([]);
    let [applications, setApplications] = useState([]);
    let [jiraProject, setJiraproject] = useState(null);
    let [automation_type, setAutomationType] = useState("1");
    let maxLength = useMaxChar();
    let submitData = useRef({
        issueTrackerType: 1,
        jira_project_id: "",
        userId: auth.info.id,
        orgId: 1,
        automation_framework_type: 1,
        org_name: "",
        userAccessPermissions: "",
        gitOps: true,
        jira_project_key: "",
        sqeProjectId: "",
        db_type: "",
        db_name: "",
        db_host: "",
        db_user_name: "",
        db_port: "",
        db_password: "",
    });

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
        submitData.current.userAccessPermissions = x;
        submitData.current.applicationsProjectMapping = "[" + app + "]";
        submitData.current.userId = auth.info.id;
        if (
            validateFormbyName(
                ["projectname", "automation_framework_type", "desc"],
                "error"
            ) == true
        ) {
            if (projectId == undefined) {
                createProject(submitData.current).then((res) => {
                    if (res == "SUCCESS") {
                        setSnackbarData({
                            status: true,
                            message: "Project successfully created",
                            severity: "success",
                        });
                        navigate("/Projects/search");
                    } else {
                        setSnackbarData({
                            status: true,
                            message: "Project Name already exists",
                            severity: "error",
                        });
                    }
                });
            } else {
                updateProject(submitData.current).then((res) => {
                    if (res == "SUCCESS") {
                        setSnackbarData({
                            status: true,
                            message: "Project updated successfully",
                            severity: "success",
                        });
                        navigate("/Projects/search");
                    } else {
                        setSnackbarData({
                            status: true,
                            message: "Something went wrong",
                            severity: "error",
                        });
                    }
                });
            }
        } else {
            setSnackbarData({
                status: true,
                message: "Fill Required Fields",
                severity: "error",
            });
        }
    }

    useEffect(() => {
        let rightlist = rigthtuser.map((user) => user.id);
        setLeftuser(users.filter((user) => !rightlist.includes(user.id)));
    }, [rigthtuser]);

    function handleJiraProject() {
        getJiraProject(
            setJiraproject,
            jiraProjectdata.url,
            jiraProjectdata.username,
            jiraProjectdata.password,
            jiraProjectdata.itstype,
            "prolifics",
            auth.info.organization_id
        );
    }
    useEffect(() => {
        getUsers(setUsers, auth.info.organization_id, auth.info.ssoId, usertoken);
        getApplication(setApplications, auth.info.id);
        if (projectId != undefined) {
            getApplicationOfProject(setRightApplication, projectId);
            getUserOfProject(setRightuser, projectId, auth.info.id).then((res) => {
                let ids = res?.map((pro) => pro.id);
                getUsers(
                    (val) => { },
                    auth.info.organization_id,
                    auth.info.ssoId,
                    usertoken
                ).then((resp) =>
                    setLeftuser(resp.filter((pro) => !ids.includes(pro.id)))
                );
            });
        } else {
            getUsers(
                setLeftuser,
                auth.info.organization_id,
                auth.info.ssoId,
                usertoken
            );
        }
    }, []);

    useEffect(() => {
        let selectApp = rightApplication.map((app) => app.module_id);
        let x = applications.filter((a) => {
            if (
                filterApplication[automation_type]?.includes(a.module_type) &&
                !selectApp.includes(a.module_id)
            ) {
                return a;
            }
        });
        setLeftApplication(x);
    }, [automation_type, applications, rightApplication]);

    useEffect(() => {
        return () => {
            ref?.current?.reset();
            jiraProjectdata = {
                url: "",
                username: "",
                password: "",
                itstype: 1,
            };
        };
    }, []);
    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: projectId === undefined ? "Create Project" : "Edit Project",
            };
        });
    }, []);

    useEffect(() => {
        if (projectId !== undefined) {
            getProjectDetails(setProjectDetails, auth.info.id, projectId);
        }
    }, []);

    useEffect(() => {
        if (projectDetails.length != 0) {
            submitData.current.projectName = projectDetails.project_name;
            submitData.current.projectDesc = projectDetails.description;
            submitData.current.jira_project_id = projectDetails.jira_project_id;
            submitData.current.sqeProjectId = projectId;
            submitData.current.repository_url = projectDetails.repository_url;
            submitData.current.repository_token = projectDetails.repository_token;
            submitData.current.repository_branch = projectDetails.repository_branch;
            submitData.current.jenkins_token = projectDetails.jenkins_token;
            submitData.current.jenkins_url = projectDetails.jenkins_url;
            submitData.current.jenkins_user_name = projectDetails.jenkins_user_name;
            submitData.current.jenkins_password = projectDetails.jenkins_password;
            submitData.current.automation_framework_type =
                projectDetails.automation_framework_type;
            submitData.current.db_type = projectDetails.testdata_db_config?.db_type;
            submitData.current.db_name =
                projectDetails.testdata_db_config?.db_name.db_password;
            submitData.current.db_user_name =
                projectDetails.testdata_db_config?.db_user_name;
            submitData.current.db_password =
                projectDetails.testdata_db_config?.db_password;
            submitData.current.db_port = projectDetails.testdata_db_config?.db_port;
            submitData.current.db_host = projectDetails.testdata_db_config?.db_hosts;
        }
    }, [projectDetails]);

    const ref = useRef(null);
    return (
        <form ref={ref}>
            <div className="accordionParent">
                <AccordionTemplate defaultState={true} name="Project Information">
                    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>
                                Project Name <span className="importantfield">*</span>:
                            </label>
                            <input
                                defaultValue={projectDetails?.project_name}
                                type="text"
                                name="projectname"
                                onChange={(e) => {
                                    submitData.current.projectName = e.target.value.trim();
                                    maxLength(e,30)
                                }}
                                disabled={projectId == undefined ? false : true}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>
                                Automation Framework Type{" "}
                                <span className="importantfield">*</span>:
                            </label>
                            <select
                                onChange={(e) => {
                                    submitData.current.automation_framework_type = e.target.value;
                                    setAutomationType(e.target.value);
                                }}
                                name="automation_framework_type"
                                disabled={projectId == undefined ? false : true}
                            >
                                {automationType.map((opt) => (
                                    <option
                                        key={opt.Val}
                                        value={opt.Val}
                                        selected={
                                            projectDetails?.automation_framework_type == opt.Val
                                        }
                                    >
                                        {opt.Name}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <label>
                                Description <span className="importantfield">*</span>:
                            </label>
                            <input
                                onChange={(e) => {
                                    submitData.current.projectDesc = e.target.value;
                                    maxLength(e,50)
                                }}
                                defaultValue={projectDetails?.description}
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
                                defaultValue={projectDetails?.repository_url}
                                type="text"
                                onChange={(e) => {
                                    submitData.current.repository_url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Git Access Token :</label>
                            <input
                                defaultValue={projectDetails?.repository_token}
                                type="text"
                                onChange={(e) => {
                                    submitData.current.repository_token = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <label>Branch :</label>
                            <input
                                type="text"
                                defaultValue={projectDetails?.repository_branch}
                                onChange={(e) => {
                                    submitData.current.repository_branch = e.target.value;
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
                                defaultValue={projectDetails?.jenkins_url}
                                type="text"
                                onChange={(e) => {
                                    submitData.current.jenkins_url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins Token :</label>
                            <input
                                defaultValue={projectDetails?.jenkins_token}
                                type="text"
                                name="jenkins_token"
                                onChange={(e) => {
                                    submitData.current.jenkins_token = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins UserName :</label>
                            <input
                                defaultValue={projectDetails.jenkins_user_name}
                                autoComplete="off"
                                type="text"
                                onChange={(e) => {
                                    submitData.current.jenkins_user_name = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <label>Jenkins Password :</label>
                            <input
                                defaultValue={projectDetails.jenkins_password}
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    submitData.current.jenkins_password = e.target.value;
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
                                defaultValue={projectDetails?.testdata_db_config?.db_type}
                                onChange={(e) => {
                                    submitData.current.db_type = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Database Name :</label>
                            <input
                                type="text"
                                defaultValue={projectDetails?.testdata_db_config?.db_name}
                                onChange={(e) => {
                                    submitData.current.db_name = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Host Name :</label>
                            <input
                                type="text"
                                defaultValue={projectDetails?.testdata_db_config?.db_host}
                                onChange={(e) => {
                                    submitData.current.db_host = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>DB UserName :</label>
                            <input
                                type="text"
                                defaultValue={projectDetails?.testdata_db_config?.db_user_name}
                                onChange={(e) => {
                                    submitData.current.db_user_name = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Port Number :</label>
                            <input
                                type="text"
                                defaultValue={projectDetails?.testdata_db_config?.db_port}
                                onChange={(e) => {
                                    submitData.current.db_port = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>DB Password :</label>
                            <input
                                type="password"
                                defaultValue={projectDetails?.testdata_db_config?.db_password}
                                onChange={(e) => {
                                    submitData.current.db_password = e.target.value;
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
                                Select Issue Tracker <span className="importantfield">*</span>:
                            </label>
                            <select
                                onChange={(e) => {
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
                                    jiraProjectdata.url = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>User Name :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    jiraProjectdata.username = e.target.value;
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label>Token :</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    jiraProjectdata.password = e.target.value;
                                }}
                            />
                        </Grid>
                        {jiraProject != null && (
                            <Grid item xs={4} sm={4} md={4}>
                                <label>Projects :</label>
                                <select
                                onChange={e=>{
                                    submitData.current.jira_project_id = e.target.value;
                                }}
                                >
                                    {jiraProject.map((v) => (
                                        <option value={v.jira_project_id}>{v.name}</option>
                                    ))}
                                </select>
                            </Grid>
                        )}
                        <Grid item xs={4} sm={4} md={4} justifyContent="center">
                            <br />
                            <Button variant="contained" onClick={handleJiraProject}>
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
                        id="id"
                        name="firstName"
                        lastName = "lastName"
                        display ={value=>`${value.firstName} ${value.lastName} (${value.id})`}
                    ></TransferList>
                </AccordionTemplate>

                <AccordionTemplate name="Add Application">
                    <TransferList
                        left={leftApplication}
                        setLeft={setLeftApplication}
                        right={rightApplication}
                        setRight={setRightApplication}
                        id="module_id"
                        name="module_name"
                        display={value => `${value.module_name}`}
                    ></TransferList>
                </AccordionTemplate>
                <Grid item xs={12} md={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button variant="contained" onClick={submitHandler}>
                            Create & Continue
                        </Button>
                    </Stack>
                </Grid>
            </div>
        </form>
    );
}

export default CreateProject;
