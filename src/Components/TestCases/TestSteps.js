import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PersistentDrawerRight from './PersistentDrawerRight'
import Table from '../../CustomComponent/Table'



function TestSteps() {
  let [selectedScreen,setSelectedScreen]= useState([])
  return (
    <div>
      <h1>Test steps</h1>
      <div style={{height:"200px"}}>
        <form>
          <div>
            <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} >
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} spacing={2} >
                <Grid item xs={3} sm={3} md={3}>
                  <label for="">Select Application:</label>
                  <select
                    size='small'
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    fullWidth
                  >
                   <option value="wf">Application1</option>
                  </select>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                <Grid item xs={12} sm={12} md={12}><label>Test Case Name <span className="importantfield" >*</span>:</label></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <input type="text" name="testName" placeholder="  Enter test case name"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                <Grid item xs={12} sm={12} md={12}><label>Description <span className="importantfield" >*</span>:</label></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <textarea rows="3" cols="20" name="description"
                  ></textarea>
                </Grid>
              </Grid>
            </Container>
          </div>
        </form>
      </div>
      <PersistentDrawerRight
      selectedScreen = {selectedScreen}
      setSelectedScreen = {setSelectedScreen}
      ></PersistentDrawerRight>
      <div>
        <h4>Screen list</h4>
        {selectedScreen.map(s=>{return(
          <div>
            <h1>{s.name}</h1>
            <p>{s.description}</p>
          </div>
        )})}
      </div>
     
    </div>
  )
}

export default TestSteps
