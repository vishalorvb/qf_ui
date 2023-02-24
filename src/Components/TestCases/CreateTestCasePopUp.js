import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { getApplication } from '../../Services/TestCaseService';
import { validateFormbyName } from '../../CustomComponent/FormValidation';
import { createNewtestCase } from '../../Services/TestCaseService';
export let testcaseData = {
    "application_id": "",
    "project_id": "",
    "testcase_name": "",
    "testcase_description": "",
    "testcase_id": 0,
    "testcase_sprints": [

    ],
    "screens_in_testcase": [

    ]
}
export function resetTestCaseData() {
    testcaseData = {
        "application_id": "",
        // "project_id": "",
        "testcase_name": "",
        "testcase_description": "",
        "testcase_id": 0,
        "testcase_sprints": [

        ],
        "screens_in_testcase": [

        ]
    }
}

function CreateTestCasePopUp(props) {

    let [application, setApplication] = useState([])


    function handleSave(e) {
        if (validateFormbyName(["testName", "appid"], "error") && testcaseData.project_id != "") {
            console.log("Valid form")
            // console.log(testcaseData)
            createNewtestCase(testcaseData)
        }
        else {
            console.log("invalid form")
            console.log(testcaseData)
        }
    }

    useEffect(() => {
        console.log(testcaseData)
        getApplication(setApplication)
        return () => {
            console.log(testcaseData)
            console.log("clean up create testcase")
        }
    }, [])

    return (
        <div>
            <Dialog open={props.open} maxWidth='md'>
                <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                    padding: 0.5,
                    backgroundColor: "rgba(137,196,244,1)",
                }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                        <Typography sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }} variant="inherit">Create Test Case </Typography>
                        <IconButton sx={{ marginLeft: "auto" }} className="btn-close " onClick={e => {
                            props.setOpen(false)

                        }

                        }>
                            <ClearOutlinedIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent className="AddUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                    <div >
                        <form>
                            <div>

                                <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} >
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} spacing={2} >
                                        <Grid item xs={3} sm={3} md={3}>
                                            <label for="">Select Application:</label>
                                            <select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                                name='appid'
                                                onChange={e => {
                                                    testcaseData.application_id = e.target.value;
                                                }}

                                            >
                                                <option value="">Select</option>
                                                {application.map(val => <option value={val.application_id}>{val.application_name}</option>)}

                                            </select>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Test Case Name <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <input type="text" name="testName" placeholder="  Enter test case name"
                                                onChange={e => {
                                                    testcaseData.testcase_name = e.target.value;
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Description <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <textarea rows="3" cols="20" name="description"
                                                onChange={e => {
                                                    testcaseData.testcase_description = e.target.value;
                                                    console.log(e.target.value);
                                                }}
                                            ></textarea>
                                        </Grid>
                                    </Grid>


                                </Container>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" startIcon={<SaveOutlinedIcon />}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default CreateTestCasePopUp
