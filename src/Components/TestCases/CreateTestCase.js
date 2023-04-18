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



export let TCdata = {
    module_id: 0,
    testcase_name: "",
    testcase_description: "",
    project_id: 0,
}

function CreateTestCase() {
    console.log(TCdata)
    let navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    let [project, setProject] = useState([])
    let [application, setApplication] = useState([])
    const { auth } = useAuth();
    const { setHeader } = useHead();
    let redirect_url = [" ", "/Testcase/Recent/MapApiTestCase", "/Testcase/Recent/MapScreen",]

    console.log(selectedProject)
    function handleSubmit(e) {
        if (validateFormbyName(["name", "desc"], "error")) {
            if (TCdata.testcase_id === undefined) {
                CreateTestCaseService(TCdata).then(res => {
                    if (res) {
                        if (selectedApplication.module_type == 1) {
                            MapAPiTestCaseData.testcase_id = res
                            navigate(redirect_url[selectedApplication?.module_type])
                        }
                        else {
                            navigate(redirect_url[selectedApplication?.module_type], {
                                state:
                                {
                                    projectId: selectedProject.project_id,
                                    moduleId: selectedApplication.module_id,
                                    testcaseId: res
                                }
                            })
                        }

                    }
                })
            }
            else {
                UpdateTestcase(TCdata.testcase_id, TCdata.testcase_name, TCdata.testcase_description).then(res => {
                    if (res) {
                        console.log(res)
                        MapAPiTestCaseData.testcase_id = res
                        navigate(redirect_url[selectedApplication?.module_type])
                    }
                })
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
                    console.log("Clicked")
                },
            };
        });
        return () =>
            setHeader((ps) => {
                return {
                    ...ps,
                    name: "",
                    plusButton: false,
                    plusCallback: () => console.log("null"),
                };
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProject, selectedApplication]);

    useEffect(() => {
        try {
            TCdata.module_id = selectedApplication.module_id
            TCdata.project_id = selectedProject.project_id
        } catch (error) {
            console.log(error)
        }
        MapAPiTestCaseData.module_id = selectedApplication?.module_id
        MapAPiTestCaseData.project_id = selectedProject?.project_id
    }, [selectedProject, selectedApplication])


    useEffect(() => {
        getApplicationOfProject(setApplication, selectedProject?.project_id)
    }, [selectedProject])
    useEffect(() => {
        setSelectedApplication(application[0])
    }, [application])
    useEffect(() => {

        getProject(setProject, auth.userId)
        return () => {
            console.log("clean up run")
            TCdata = {
                module_id: 0,
                testcase_name: "",
                testcase_description: "",
                project_id: 0,
            }
        };
    }, [])
    return (
        <Grid item container spacing={2} justifyContent="left">
            <Grid item md={4}>
                <label for="">Projects</label>
                <Autocomplete
                    disablePortal
                    disableClearable
                    id="project_id"
                    options={project}
                    value={selectedProject || null}
                    sx={{ width: "100%" }}
                    getOptionLabel={(option) => option.project_name}
                    onChange={(e, value) => {
                        setSelectedProject(value);
                    }}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input type="text" {...params.inputProps} />
                        </div>
                    )}
                />
            </Grid>
            <Grid item md={4}>
                <label for="">Application</label>
                <Autocomplete
                    disablePortal
                    disableClearable
                    id="model_id"
                    options={application}
                    value={selectedApplication || null}
                    sx={{ width: "100%" }}
                    getOptionLabel={(option) => option.module_name}
                    onChange={(e, value) => {
                        setSelectedApplication(value);
                    }}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input type="text" {...params.inputProps} />
                        </div>
                    )}
                />

            </Grid>
            <Grid item xs={4} md={4}>
                <label for="">TestCase Name</label>
                <input
                    defaultValue={TCdata.testcase_name}
                    onChange={e => {
                        TCdata.testcase_name = e.target.value;
                    }}
                />
            </Grid>
            <br />
            <Grid item xs={12} md={12}>
                <label for="">Description</label>
                <input
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
        </Grid>

    )
}

export default CreateTestCase
