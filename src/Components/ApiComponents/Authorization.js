import { Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Authorization() {

  let [type, setType] = useState("")
  function handleChange(e) {
    console.log(e.target.value)
    setType(e.target.value)
  }

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
        <Grid item md={3} >
          <Typography variant='h6' gutterBottom>
            Type
          </Typography>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={'No Auth'}>No Auth</MenuItem>
            <MenuItem value={'Basic Auth'}>Basic Auth</MenuItem>
            <MenuItem value={"API Key"}>API Key</MenuItem>
            <MenuItem value={'Bearer Token'}>Bearer Token</MenuItem>
            <MenuItem value={'OAuth 2.0'}>OAuth 2.0</MenuItem>
          </Select>
          <Typography variant='p' gutterBottom>
            The authorization header will be automatically generated when you send the request.
          </Typography>
        </Grid>
        <Divider orientation="vertical" variant='middle' flexItem />
        <Grid item md={8}>
          {type == "No Auth" && <Typography variant='p' gutterBottom align='center'>
            This request does not use any authorization.
          </Typography>}

          {type == "Basic Auth" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">UserName</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth placeholder='Username' size='small' />
            </Grid>
            <Grid item md={2}>
              <label for="">Password</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth type="password" placeholder='Password' size='small' />
            </Grid>
          </Grid>}



         {type == "API Key" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Key</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth placeholder='Key' size='small' />
            </Grid>
            <Grid item md={2}>
              <label for="">Value</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth type="password" placeholder='Value' size='small' />
            </Grid>
            <Grid item md={2}>
              <label for="">Add To</label>
            </Grid>
            <Grid item md={10}>
              <Select
                size='small'
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                fullWidth               
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={'Header'}>No Auth</MenuItem>
                <MenuItem value={'Query Param'}>Basic Auth</MenuItem>
              </Select>
            </Grid>
          </Grid>}

          {type == "Bearer Token" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Token</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth placeholder='Token' size='small' />
            </Grid>
            
          </Grid>}

          {type == "OAuth 2.0" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Token URL</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth placeholder='Token URL' size='small' />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Id</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth placeholder='Client Id' size='small' />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Secret</label>
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth type='password' placeholder='Client Secret' size='small' />
            </Grid>
          </Grid>}

          
        </Grid>
      </Grid>
    </div>
  )
}

export default Authorization
