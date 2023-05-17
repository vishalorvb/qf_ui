import { Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
// import { authdata } from './Data'
import { authdata } from './Data'
import { getAuthData } from './Data'
import { Apidata } from './Data'
function Authorization() {

  let [type, setType] = useState("")
  console.log(authdata)

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
        <Grid item md={3} >
          <Typography variant='h6' gutterBottom>
            Type
          </Typography>
          <select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            // onChange={handleChange}
            onChange={e => {
              setType(e.target.value)
              authdata.authtype = e.target.value
              let x = getAuthData()
              Apidata.auth = x
            }}
          >
            <option value="">Select</option>
            <option value={'noauth'}>No Auth</option>
            <option value={'basicauth'}>Basic Auth</option>
            <option value={"apikey"}>API Key</option>
            <option value={'bearertoken'}>Bearer Token</option>
            <option value={'oauth2'}>OAuth 2.0</option>
          </select>
          <Typography variant='p' gutterBottom>
            The authorization header will be automatically generated when you send the request.
          </Typography>
        </Grid>
        <Divider orientation="vertical" variant='middle' flexItem />
        <Grid item md={8}>
          {type == "noauth" && <Typography variant='p' gutterBottom align='center'>
            This request does not use any authorization.
          </Typography>}

          {type == "basicauth" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">UserName</label>
            </Grid>
            <Grid item md={10}>
              <input
              defaultValue={authdata.username}
                onChange={e => {
                  authdata.username = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Password</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.password}
                onChange={e => {
                  authdata.password = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
          </Grid>}



          {type == "apikey" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Key</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.key}
                onChange={e => {
                  authdata.key = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Value</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.value}
                onChange={e => {
                  authdata.value = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
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
                onChange={e => {
                  authdata.addto = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={'Header'}>Header</MenuItem>
                <MenuItem value={'Query Param'}>Query Param</MenuItem>
              </Select>
            </Grid>
          </Grid>}

          {type == "bearertoken" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Token</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.token}
                onChange={e => {
                  authdata.token = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>

          </Grid>}

          {type == "oauth2" && <Grid container alignItems="center" spacing={4}>
            <Grid item md={2}>
              <label for="">Token URL</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.tokenurl}
                onChange={e => {
                  authdata.tokenurl = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Id</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.clientid}
                onChange={e => {
                  authdata.clientid = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Secret</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.clientsecret}
                onChange={e => {
                  authdata.clientsecret = e.target.value
                  let x = getAuthData()
                  Apidata.auth = x
                }}
              />
            </Grid>
          </Grid>}


        </Grid>
      </Grid>
    </div>
  )
}

export default Authorization
