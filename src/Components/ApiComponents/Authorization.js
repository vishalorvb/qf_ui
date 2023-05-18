import { Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { authdata } from './Data'
import { authdata } from './Data'


function Authorization() {

  let [type, setType] = useState("")



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
            onChange={e => {
              setType(e.target.value)
              authdata.authtype = e.target.value
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
              defaultValue={ authdata.basicauth.username}
                onChange={e => {
                  authdata.basicauth.username = e.target.value
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Password</label>
            </Grid>
            <Grid item md={10}>
              <input
              defaultValue={authdata.basicauth.password}
                onChange={e => {
                  authdata.basicauth.password = e.target.value
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
               defaultValue={authdata.apikey.key}
                onChange={e => {
                  authdata.apikey.key = e.target.value
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Value</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.apikey.key}
                onChange={e => {
                  authdata.apikey.key = e.target.value
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
                  authdata.apikey.addto = e.target.value
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
               defaultValue={authdata.bearertoken.token}
                onChange={e => {
                  authdata.bearertoken.token = e.target.value
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
               defaultValue={ authdata.oauth2.tokenurl}
                onChange={e => {
                  authdata.oauth2.tokenurl = e.target.value
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Id</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.oauth2.clientid}
                onChange={e => {
                  authdata.oauth2.clientid = e.target.value
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Secret</label>
            </Grid>
            <Grid item md={10}>
              <input
               defaultValue={authdata.oauth2.clientsecret}
               onChange={e => {
                 authdata.oauth2.clientsecret = e.target.value
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
