import { Button, Divider, Grid } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import { CreateTestCaseService } from "../../Services/TestCaseService"
import { validateFormbyName } from "../../CustomComponent/FormValidation"
import { useEffect } from "react"
let initialval = {
    module_id: 0,
    testcase_name: "",
    testcase_description: "",
    project_id: 0,
}
let data = { ...initialval }

function CreateTestCase() {
    let location = useLocation()
    let navigate = useNavigate();
    try {

        data.project_id = location.state.projectId;
        data.module_id = location.state.applicationId;
    } catch (error) {
        console.log(error)
        navigate("/testcase");
    }

    function handleSubmit(e) {

        if (validateFormbyName(["name", "desc"], "error")) {
            CreateTestCaseService(data).then(res => {
                if (res) {
                    console.log(res)
                    navigate("/testcase/CreateApiTestcase", {
                        state: {
                            applicationId: location.state.applicationId,
                            testcaseId: res,
                            projectId: location.state.projectId,
                        },
                    })
                }
            })
        }

    }

    useEffect(() => {
        return () => {
            data = { ...initialval }
        };
    }, [])
    return (
        <div>
            <h2>Create test case</h2>
            <br />
            <Divider></Divider>
            <br />
            <Grid container columnSpacing={2} justifyContent="flex-start">
                <Grid item xs={4} md={4}>
                    <label for="">TestCase Name</label>
                    <input type="text" name="name"
                        onChange={e => {
                            data.testcase_name = e.target.value;
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <label for="">Description</label>
                </Grid>
                <Grid item xs={12} md={12}>
                    <textarea rows="4" cols="120"
                        name="desc"
                        onChange={e => {
                            data.testcase_description = e.target.value;
                        }}
                    ></textarea>
                </Grid>
            </Grid>
            <br />
            <Grid container columnSpacing={1} justifyContent="flex-end">
                <Grid item xs={1.5} md={1.5}>
                    <Button variant="outlined">Cancel</Button>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Button variant="contained" onClick={handleSubmit}>Save & Continue</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateTestCase
