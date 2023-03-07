import { Chip, Divider, Drawer, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PersistentDrawerRight from './PersistentDrawerRight'
import ElementsTable from './ElementsTable'
import { selected_screen } from './PersistentDrawerRight'

export let teststepData = {
  testcase_id: "",
  testcase_name: "",
  application_id: "",
  application_name: "",
  desccription: ""
}



function TestSteps() {
  let [selectedScreen, setSelectedScreen] = useState([])


  function handleDrop(e) {
    let temp = [...selectedScreen]
    temp.push(selected_screen)
    setSelectedScreen(temp)
   
  }


  return (
    <div>
      <h1>Test steps</h1>
      <div style={{ height: "200px" }}>
        <form>
          <div>
            <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} >
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} spacing={2} >
                <Grid item xs={3} sm={3} md={3}>
                  <label for="">Select Application:</label>
                  <select
                  >
                    <option value={teststepData.application_id}>{teststepData.application_name}</option>
                  </select>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                <Grid item xs={12} sm={12} md={12}><label>Test Case Name <span className="importantfield" >*</span>:</label></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <input type="text" name="testName" disabled defaultValue={teststepData.testcase_name}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                <Grid item xs={12} sm={12} md={12}><label>Description </label></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <textarea rows="3" cols="20" name="description" defaultValue={teststepData.desccription}
                  ></textarea>
                </Grid>
              </Grid>
            </Container>
          </div>
        </form>
      </div>
      <PersistentDrawerRight
        selectedScreen={selectedScreen}
        setSelectedScreen={setSelectedScreen}
      ></PersistentDrawerRight>
      <div onDrop={handleDrop} 
      onDragOver={e => { e.preventDefault() }}>
        <h2 draggable={true}>Screen list</h2>
        {selectedScreen.map(s => {
          return (
            <div >
              <div>
                <Chip label={s.name} color="primary" />
                <ElementsTable
                  screenId={s.screen_id}
                ></ElementsTable>
              </div>
              <hr />
              <br />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default TestSteps
