import React, { createContext, useState } from 'react'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
// import Item from './Item'

export let CreateApi = createContext();
// console.log(location.state.id)

function Api() {

    const [data, setData] = useState(
        {
            "api_url": "",
            "api_name": "",
            "module_id": 0,
            "request_type": 0,
            "body_type": 0,
            "api_description": "",
            "params_list": [
                {
                    "param_key": "id",
                    "param_value": "1",
                    "param_desc": "id1"
                },
                {
                    "param_key": "name",
                    "param_value": "name",
                    "param_desc": "name1"
                }
            ],
            "apiLinkProperties": [
                {
                    "key": "id",
                    "value": "1",
                    "description": "id1"
                },
                {
                    "key": "name",
                    "value": "name",
                    "description": "name1"
                }
            ],
            "successResponseProperties": [
                {
                    "key": "id",
                    "value": "1",
                    "description": "id1"
                },
                {
                    "key": "name",
                    "value": "name",
                    "description": "name1"
                }
            ],
            "body_form_data_list": [],
            "body_form_url_encoded_list": [],
            "body_raw": {
                "raw_text": "{\n \"api\" : 1,\n \"api-name\":\"api1\"\n}",
                "raw_type_id": 3
            },
            "auth": {
                "auth_data": "{\"authtype\":\"bearertoken\",\"basicauth\":{\"username\":\"\",\"password\":\"\"},\"apikey\":{\"key\":\"\",\"value\":\"\",\"addto\":\"header\"},\"bearertoken\":{\"token\":\"qwert\"},\"oauth2\":{\"tokenurl\":\"\",\"clientid\":\"\",\"clientsecret\":\"\"}}"
            }
        }
    )

    return (
        <CreateApi.Provider value={{data,setData}}>
        <div style={{ marginTop: "20px", marginLeft: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
            <Grid container spacing={1} >
                <Grid item md={4}>
                    <TextField fullWidth placeholder='API Name' variant="outlined" size='small' />
                </Grid>
                <Grid item md={8}>
                    <TextField item fullWidth placeholder='Description' size='small' />
                </Grid>
                <Grid item md={2}>
                    <Select
                        size='small'
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth
                        onChange={e => console.log(e.target.value)}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={1}>Post</MenuItem>
                        <MenuItem value={2}>Get</MenuItem>
                        <MenuItem value={3}>Put</MenuItem>
                        <MenuItem value={4}>Delete</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={4}>
                    <TextField fullWidth size='small' />
                </Grid>
                <Grid item md={6}>
                    <TextField fullWidth placeholder='Resource' size='small' />
                </Grid>
            </Grid>
            <ApiTabs></ApiTabs>
        </div>
        </CreateApi.Provider>
    )
}

export default Api
