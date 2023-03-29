import { Divider, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setGetData } from './ApiDatasetData'


function ApiAuthorization({ApiDetails}) {
  let [authdata, setAuthdata] = useState({
    "authtype": "",
    "basicauth": {
      "username": "",
      "password": ""
    },
    "apikey": {
      "key": "",
      "value": "",
      "addto": "header"
    },
    "bearertoken": {
      "token": ""
    },
    "oauth2": {
      "tokenurl": "",
      "clientid": "",
      "clientsecret": ""
    }
  })
  let [type, setType] = useState("")

  useEffect(() => {
  if(ApiDetails.auth != null){
    setType(ApiDetails.auth.authtype)
    let temp = ApiDetails.auth
    setAuthdata({ ...temp} )
  }

  }, [])

  useEffect(() => {
    if(authdata.authtype != ""){
      setGetData(ApiDetails.api_id,"auth",authdata)
    }
  }, [authdata])

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
              let temp = authdata
              temp.authtype = e.target.value
              setAuthdata({ ...temp })
            }}
          >
            <option value="">Select</option>
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
                value={authdata.basicauth.username}
                onChange={e => {
                  let temp = authdata
                  temp.basicauth.username = e.target.value
                  setAuthdata({ ...temp })
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Password</label>
            </Grid>
            <Grid item md={10}>
              <input
                value={authdata.basicauth.password}
                onChange={e => {
                  let temp = authdata
                  temp.basicauth.password = e.target.value
                  setAuthdata({ ...temp })
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
                value={authdata.apikey.key}
                onChange={e => {
                  let temp = authdata
                  temp.apikey.key = e.target.value
                  setAuthdata({ ...temp })
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Value</label>
            </Grid>
            <Grid item md={10}>
              <input
                value={authdata.apikey.value}
                onChange={e => {
                  let temp = authdata
                  temp.apikey.value = e.target.value
                  setAuthdata({ ...temp })
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
                  let temp = authdata
                  temp.apikey.addto = e.target.value
                  setAuthdata({ ...temp })
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
                value={authdata.bearertoken.token}
                onChange={e => {
                  let temp = authdata
                  temp.bearertoken = e.target.value
                  setAuthdata({ ...temp })
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
                value={authdata.oauth2.tokenurl}
                onChange={e => {
                  let temp = authdata
                  temp.oauth2.tokenurl = e.target.value
                  setAuthdata({ ...temp })
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Id</label>
            </Grid>
            <Grid item md={10}>
              <input
                value={authdata.oauth2.clientid}
                onChange={e => {
                  let temp = authdata
                  temp.oauth2.clientid = e.target.value
                  setAuthdata({ ...temp })
                }}
              />
            </Grid>
            <Grid item md={2}>
              <label for="">Client Secret</label>
            </Grid>
            <Grid item md={10}>
              <input
                value={authdata.oauth2.clientid}
                onChange={e => {
                  let temp = authdata
                  temp.oauth2.clientsecret = e.target.value
                  setAuthdata({ ...temp })
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
