import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
import { createAPI } from '../../Services/ProjectService';
import { getApiModuleId } from '../../Services/ProjectService';
import useCreateApi from '../../hooks/useCreateApi';
// export let CreateApi = createContext();





function Api({ projectId }) {

    console.log("Api")
    console.log(projectId)
    // let { data, setData } = useContext(CreateApi);
    // let  [data, setData] = useState({}) ;
    const { data, setData } = useCreateApi();

    function handleSave(e) {
        createAPI(data)
    }

    let [moduleid, setModuleid] = useState()

    useEffect(() => {
        getApiModuleId(projectId, setModuleid)
    }, [])

    useEffect(() => {
        console.log(moduleid)
        setData(pv => ({
            ...pv, ["module_id"]: moduleid
        }))
    }, [moduleid])



    useEffect(() => {
        console.log(data)
    }, [data])
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
                    <TextField fullWidth placeholder='API Name' variant="outlined" size='small'
                        onChange={e => {
                            setData(pv => ({
                                // ...pv,"mynamename":e.target.value
                                ...pv, ["api_name"]: e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item md={8}>
                    <TextField item fullWidth placeholder='Description' size='small'
                        onChange={e => {
                            setData(pv => ({
                                ...pv, ["api_description"]: e.target.value
                            }))
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
                            setData(pv => ({
                                ...pv, ["request_type"]: e.target.value
                            }))
                        }}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={1}>Post</MenuItem>
                        <MenuItem value={2}>Get</MenuItem>
                        <MenuItem value={3}>Put</MenuItem>
                        <MenuItem value={4}>Delete</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={4}>
                    <TextField fullWidth size='small' placeholder='URL'
                        onChange={e => {
                            setData(pv => ({
                                ...pv, ["api_url"]: e.target.value
                            }))
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
