import { Divider, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setGetData } from './ApiDatasetData'
import { useRef } from 'react'


function ApiAuthorization({ ApiDetails }) {
  console.log(ApiDetails)
  // console.log(JSON.parse(ApiDetails.auth.auth_data))

  let Auth = useRef(JSON.parse(ApiDetails.auth.auth_data))
  console.log(Auth.current)
  let [type, setType] = useState(Auth.current.authtype)





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
              let temp = ApiDetails.auth
              temp.authtype = e.target.value
              temp.auth_data = JSON.stringify(Auth.current)
              setGetData(ApiDetails.api_id, "auth", temp)
            }}
          >
            {/* <option value="">Select</option> */}
            <option selected={ApiDetails?.auth?.authtype == "noauth"} value={'noauth'} >No Auth</option>
            <option selected={ApiDetails?.auth?.authtype == "basicauth"} value={'basicauth'}>Basic Auth</option>
            <option selected={ApiDetails?.auth?.authtype == "apikey"} value={"apikey"}>API Key</option>
            <option selected={ApiDetails?.auth?.authtype == "bearertoken"} value={'bearertoken'}>Bearer Token</option>
            <option selected={ApiDetails?.auth?.authtype == "oauth2"} value={'oauth2'}>OAuth 2.0</option>
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
                defaultValue={Auth.current.basicauth.username}
                onChange={e => {
                  Auth.current.basicauth.username = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Password</label>
            </Grid>
            <Grid item md={10}>
              <input
                defaultValue={Auth.current.basicauth.password}
                onChange={e => {
                  Auth.current.basicauth.password = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
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
                defaultValue={Auth.current.apikey.key}
                onChange={e => {
                  Auth.currentapikey.key = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Value</label>
            </Grid>
            <Grid item md={10}>
              <input
                defaultValue={Auth.current.apikey.value}
                onChange={e => {
                  Auth.current.apikey.value = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
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
                defaultValue={Auth.current.apikey.addto}
                onChange={e => {
                  Auth.current.apikey.addto = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
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
                defaultValue={Auth.current.bearertoken.token}
                onChange={e => {
                  Auth.current.bearertoken.token = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
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
                defaultValue={Auth.current.oauth2.tokenurl}
                onChange={e => {
                  Auth.current.oauth2.tokenurl = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Id</label>
            </Grid>
            <Grid item md={10}>
              <input
                defaultValue={Auth.current.oauth2.clientid}
                onChange={e => {
                  Auth.current.oauth2.clientid = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Secret</label>
            </Grid>
            <Grid item md={10}>
              <input
                defaultValue={Auth.current.oauth2.clientsecret}
                onChange={e => {
                  Auth.current.oauth2.clientsecret = e.target.value;
                  let temp = ApiDetails.auth
                  temp.auth_data = JSON.stringify(Auth.current)
                  setGetData(ApiDetails.api_id, "auth", temp)
                }}
              />
            </Grid>
          </Grid>}


        </Grid>
      </Grid>
    </div>
  )
}

export default ApiAuthorization
