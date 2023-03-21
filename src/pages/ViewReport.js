import { Button, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../api/axios';
import SnackbarNotify from '../CustomComponent/SnackbarNotify';
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/system";



export default function ViewReport() {
  return <>
  <div>
  <Grid container justifyContent="flex-start" columnSpacing={2}>
            <select
              onChange={e => { }}
            >
              <option> Select</option>
              <option value="Sprint 1"> Sprint 1</option>
              <option value="Sprint 2"> Sprint 2</option>
              <option value="Sprint 3"> Sprint 3</option>
            </select>
          </Grid>
          <Grid container justifyContent="flex-start" columnSpacing={2}>
<h3>abc</h3>
          </Grid>
          <Divider></Divider>
          <Grid container justifyContent="flex-start" columnSpacing={2}>
          <Grid>START TIME</Grid>
          <Grid>START TIME</Grid>
          <Grid>START TIME</Grid>
          </Grid>
          <Divider></Divider>

          <Grid>
          <h3>abc</h3>
          <Divider></Divider>

          <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={5}
      mb={0} >
        <div><h3>abc</h3></div>
        <Divider></Divider>

        <div><h3>abc</h3></div>
        <Divider></Divider>
        
        <div><h3>abc</h3></div>
       <hr/>
        
      </Stack>
          </Grid>
  </div>
  </>;
}
