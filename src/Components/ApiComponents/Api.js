import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
import { createAPI } from '../../Services/ProjectService';
import { getApiModuleId } from '../../Services/ProjectService';
import { Apidata } from './Data';
import { validateForm } from '../../CustomComponent/FormValidation';





function Api({ projectId }) {

    console.log(projectId)
    let namelist = ["apiname", "apidesc", "apiurl"]


    function handleSave(e) {
        console.log(Apidata)
        if (validateForm(
            [], [], [], [], [], namelist, "error"
        )) {
            console.log("Form submited")
            createAPI(Apidata)
        }
        else{
            console.log("requird field")
        }
       
    }

    let [moduleid, setModuleid] = useState()


    useEffect(() => {
        getApiModuleId(projectId, setModuleid)
        Apidata.module_id = moduleid
    }, [moduleid])


    return (


        <div style={{ marginTop: "20px", marginLeft: "10px", paddingLeft: "10px", paddingRight: "10px" }}>

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
                    <TextField fullWidth placeholder='API Name' variant="outlined" size='small' defaultValue={Apidata.api_name} name="apiname"
                        onChange={e => {
                            Apidata.api_name = e.target.value
                        }}
                    />
                </Grid>
                <Grid item md={8}>
                    <TextField item fullWidth placeholder='Description' size='small' name="apidesc"
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
                    <TextField fullWidth size='small' placeholder='URL'  name="apiurl"
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
