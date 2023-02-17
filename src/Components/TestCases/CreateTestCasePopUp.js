import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { getModules, getProject } from '../../Services/ProjectService';
import { validateForm } from '../../CustomComponent/FormValidation';
import { createWebTestCase } from '../../Services/TestCaseService';



function CreateTestCasePopUp(props) {

    let [projects, setProejcts] = useState([])
    let [modules, setModules] = useState([])
    let [data, setData] = useState(
        {
            "module_id": 0,
            "testcase_name": "",
            "testcase_description": "",
            "testcase_id": 0,
            "testcase_sprints": [

            ],
            "screens_in_testcase": [

            ]
        }
    )
    let testName = useRef()
    let description = useRef()


    function handleSave(e) {
        console.log("Handle save")
        if (validateForm(
            [testName, description], [], [], [], [], ["moduleid"], "error"
        )) {
            console.log("Valid form")
            createWebTestCase(data).then(res => {
                console.log(res)
                if (res == "SUCCESS") {
                    props.snackbar(true)
                    props.setOpen(false)

                }
            })
        }
        else {
            console.log("Error in form")
        }
    }

    useEffect(() => {
        getProject(setProejcts)
    }, [])
    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        console.log("Props open changed")
        setData({
            "module_id": 0,
            "testcase_name": "",
            "testcase_description": "",
            "testcase_id": 0,
            "testcase_sprints": [

            ],
            "screens_in_testcase": [

            ]
        })
        setModules([])
    }, [props.open])
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
                                            <label for="">Select Project:</label>
                                            <select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                                name='projectid'
                                                onChange={e => {
                                                    getModules(setModules, e.target.value)

                                                }}
                                            >
                                                <option value="0">Select</option>
                                                {projects.map(val => <option value={val.project_id}>{val.project_name}</option>)}

                                            </select>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3}>
                                            <label for="">Type:</label>
                                            <select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                                name='moduleid'
                                                onChange={e => {
                                                    console.log(e.target)
                                                    setData((ps) => { return { ...ps, module_id: e.target.value } })
                                                }}
                                            >
                                                <option value="0">Select</option>
                                                {modules.map(val => <option value={val.module_id}>{val.module_name}</option>)}

                                            </select>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Test Case Name <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <input ref={testName} type="text" name="testName" placeholder="Enter test case name"
                                                onChange={e => {
                                                    setData((ps) => { return { ...ps, testcase_name: e.target.value } })
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Description <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <textarea ref={description} rows="3" cols="20" name='description'
                                                onChange={e => {
                                                    setData((ps) => { return { ...ps, testcase_description: e.target.value } })
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
