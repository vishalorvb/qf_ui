import { Button, Divider, Grid, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import { CreateTestCaseService } from "../../Services/TestCaseService"
import { validateFormbyName } from "../../CustomComponent/FormValidation"
import { useEffect, useState } from "react"
import { MapAPiTestCaseData } from "./apiTestcase/MapApiTestCase"
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";

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
                        <Typography variant="p" component="p">
                            TestCase Name
                        </Typography>
                        <input type="text" name="name"
                            onChange={e => {
                                data.testcase_name = e.target.value;
                            }}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={12} md={12}>
                        <label for="">Description</label>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <textarea rows="4" cols="58"
                            name="desc"
                            onChange={e => {
                                data.testcase_description = e.target.value;
                            }}
                        ></textarea>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Button variant="outlined">Cancel</Button>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Button variant="contained" onClick={handleSubmit}>Save & Continue</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateTestCase
