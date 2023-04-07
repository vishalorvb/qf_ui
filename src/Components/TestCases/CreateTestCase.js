import { Button, Divider, Grid, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import { CreateTestCaseService } from "../../Services/TestCaseService"
import { validateFormbyName } from "../../CustomComponent/FormValidation"
import { useEffect, useState } from "react"
import { MapAPiTestCaseData } from "./apiTestcase/MapApiTestCase"
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { Stack } from "@mui/system"
import useHead from "../../hooks/useHead"

let initialval = {
    module_id: 0,
    testcase_name: "",
    testcase_description: "",
    project_id: 0,
}
let data = { ...initialval }

function CreateTestCase() {

    let navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const { setHeader } = useHead();
    let redirect_url = [" ", "/testcase/MapApiTestCase", "/testcase/CreateTestcase",]

    function handleSubmit(e) {

        if (validateFormbyName(["name", "desc"], "error")) {
            CreateTestCaseService(data).then(res => {
                if (res) {
                    console.log(res)
                    MapAPiTestCaseData.testcase_id = res
                    navigate(redirect_url[selectedApplication?.module_type])
                }
            })
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
        data.module_id = selectedApplication?.module_id
        data.project_id = selectedProject?.project_id
        MapAPiTestCaseData.module_id = selectedApplication?.module_id
        MapAPiTestCaseData.project_id = selectedProject?.project_id
    }, [selectedProject, selectedApplication])

    useEffect(() => {
        return () => {
            data = { ...initialval }
        };
    }, [])
    return (
        <div>
            <br />
            <Grid container columnSpacing={2} justifyContent="center">
                <Grid item xs={7} md={7}>
                    <Grid item md={12}>
                        <ProjectnApplicationSelector
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
                            selectedApplication={selectedApplication}
                            setSelectedApplication={setSelectedApplication}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {/* <Typography variant="p" component="p">
                            TestCase Name
                        </Typography> */}
                        <TextField  label="TestCase Name" name="name" variant="outlined" size="small" fullWidth
                            onChange={e => {
                                data.testcase_name = e.target.value;
                            }}
                        />
                    </Grid>
                    <br />
                    {/* <Grid item xs={12} md={12}>
                        <label for="">Description</label>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <TextField label="Description" multiline  variant="outlined" size="small" fullWidth
                        maxRows ={10}
                        minRows ={5}
                            name="desc"
                            required ={true}
                            onChange={e => {
                                data.testcase_description = e.target.value;
                            }}
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12} md={12}>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button variant="outlined">Cancel</Button>
                            <Button variant="contained" onClick={handleSubmit}>Save & Continue</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

export default CreateTestCase
