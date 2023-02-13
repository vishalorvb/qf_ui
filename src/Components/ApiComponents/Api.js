import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
import { createAPI } from '../../Services/ProjectService';
import { getApiModuleId } from '../../Services/ProjectService';
import { Apidata } from './Data';
import { validateForm } from '../../CustomComponent/FormValidation';
import SnackbarNotify from '../../CustomComponent/SnackbarNotify';
import { useNavigate } from 'react-router-dom';
import { updateAPI } from '../../Services/ProjectService';
import { getApibyid } from '../../Services/ProjectService';



function Api({ projectId, moduleId }) {

    console.log(projectId)
    console.log(moduleId)
    let namelist = ["apiname", "apidesc", "apiurl"]
    let [moduleid, setModuleid] = useState()
    let [moduledetails, setModuledetails] = useState()
    let [snackbarsuccess, setSnackbarsuccess] = useState(false);
    let navigate = useNavigate()

    function handleSave(e) {
        console.log(Apidata)
        console.log("handle submit")
        if (validateForm(
            [], [], [], [], [], namelist, "error"
        )) {
            console.log("Form submited")
            if (moduleId == null) {
                createAPI(Apidata).then(res => {
                    if (res == null) {
                        setSnackbarsuccess(true)
                        setTimeout(() => {
                            navigate("/application/apiApp/apiRequests", { state: { id: projectId } })
                        }, 1000);
                    }
                })
            }
            else{
                updateAPI(Apidata).then(res => {
                    if (res == null) {
                        setSnackbarsuccess(true)
                        setTimeout(() => {
                            navigate("/application/apiApp/apiRequests", { state: { id: projectId } })
                        }, 1000);
                    }
                })
            }
           
        }
        else {
            console.log("requird field")
        }

    }




    useEffect(() => {
        if (moduleId == null) {
            getApiModuleId(projectId, setModuleid)
            Apidata.module_id = moduleid
            console.log("create new")
            Apidata.api_url = " "
            Apidata.api_name = "  "
            Apidata.module_id = moduleid
            Apidata.request_type = " "
            Apidata.body_type = " "
            Apidata.api_description = " "
            Apidata.body_form_data_list = []
            Apidata.body_form_url_encoded_list = []
            Apidata.body_raw = {
                "raw_text": "",
                "raw_type_id": 1
            }

        }

    }, [moduleid])

    useEffect(() => {
        if (moduleId != null) {
            console.log("update")
            getApibyid(moduleId, setModuledetails)
            // console.log(moduledetails)
            // console.log(Apidata)

        }

    }, [])
    useEffect(() => {
        console.log(moduledetails)
        console.log(Apidata)
        try {
            Apidata.api_id = moduledetails.api_id
            Apidata.api_url = moduledetails.api_url
            Apidata.api_name = moduledetails.api_name
            Apidata.module_id = moduledetails.module_id
            Apidata.request_type = moduledetails.request_type
            Apidata.body_type = moduledetails.body_type
            Apidata.api_description = moduledetails.api_description
            Apidata.body_form_data_list = []
            Apidata.body_form_url_encoded_list = []
            Apidata.body_raw = {
                "raw_text": "",
                "raw_type_id": 1
            }
        } catch (error) {
            console.log(error)
        }

    }, [moduledetails])
    return (


        <div style={{ marginTop: "20px", marginLeft: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
            <SnackbarNotify
                open={snackbarsuccess}
                close={setSnackbarsuccess}
                msg="Saved Succesfully"
                severity="success"
            />
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
            >
                <Grid item md={1}>

                    <Button onClick={handleSave} variant="contained">Save</Button>
                </Grid>

            </Grid>



            <Grid container spacing={1} >
                <Grid item md={4}>
                    <input type="text" style={{ width: "100%", height: "35px" }} placeholder='API Name' name="apiname" defaultValue={Apidata.api_name}
                        onChange={e => {
                            Apidata.api_name = e.target.value
                        }}
                    />
                </Grid>
                <Grid item md={8}>
                    <input type='text' style={{ width: "100%", height: "35px" }} placeholder='Description' name="apidesc" defaultValue={Apidata.api_description}
                        onChange={e => {
                            console.log("caling api description")
                            Apidata.api_description = e.target.value
                        }}
                    />
                </Grid>
                <Grid item md={2}>
                    <Select
                        size='small'
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth
                        onChange={e => {
                            Apidata.request_type = e.target.value
                        }}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={1}>Get</MenuItem>
                        <MenuItem value={2}>Post</MenuItem>
                        <MenuItem value={3}>Put</MenuItem>
                        <MenuItem value={4}>Delete</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={4}>
                    <input type="text" style={{ width: "100%", height: "35px" }} placeholder='URL' name="apiurl" defaultValue={Apidata.api_url}
                        onChange={e => {
                            Apidata.api_url = e.target.value
                        }}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField fullWidth placeholder='Resource' size='small' />
                </Grid>
            </Grid>
            <ApiTabs></ApiTabs>
        </div>

    )
}

export default Api
