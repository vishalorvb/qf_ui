import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
import { createAPI } from '../../Services/ProjectService';
import { Apidata, resetApiData } from './Data';
import { validateForm } from '../../CustomComponent/FormValidation';
import SnackbarNotify from '../../CustomComponent/SnackbarNotify';
import { useNavigate } from 'react-router-dom';
import { updateAPI } from '../../Services/ProjectService';




function Api({ projectId }) {

    let namelist = ["apiname", "apidesc", "apiurl"]
    let [snackbarsuccess, setSnackbarsuccess] = useState(false);
    let navigate = useNavigate()

    function handleSave(e) {
        if (validateForm(
            [], [], [], [], [], namelist, "error"
        )) {
            console.log("Form submited")
            if (Apidata.hasOwnProperty("api_id") == false) {
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
console.log(Apidata)
return ()=>{
    resetApiData()
}
}, [])
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
                    <select
                        size='small'
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth
                        onChange={e => {
                            Apidata.request_type = e.target.value
                        }}
                    >
                        <option value="">Select</option>
                        <option selected ={Apidata.request_type == 1?true:false} value={1}>Get</option>
                        <option selected ={Apidata.request_type == 2?true:false} value={2}>Post</option>
                        <option selected ={Apidata.request_type == 3?true:false} value={3}>Put</option>
                        <option selected ={Apidata.request_type == 4?true:false} value={4}>Delete</option>
                    </select>
                </Grid>
                <Grid item md={4}>
                    <input type="text" style={{ width: "100%", height: "35px" }} placeholder='URL' name="apiurl" defaultValue={Apidata.api_url}
                        onChange={e => {
                            Apidata.api_url = e.target.value
                        }}
                    />
                </Grid>
                <Grid item md={6}>
                    <input  placeholder='Resource'  />
                </Grid>
            </Grid>
            <ApiTabs></ApiTabs>
        </div>

    )
}

export default Api
