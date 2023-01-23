import React from 'react'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import ApiTabs from './ApiTabs'
// import Item from './Item'


function Api() {
    return (
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
                    // onChange={handleChange}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={'Post'}>Post</MenuItem>
                        <MenuItem value={'Get'}>Get</MenuItem>
                        <MenuItem value={"Put"}>Put</MenuItem>
                        <MenuItem value={'Delete'}>Delete</MenuItem>
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
    )
}

export default Api
