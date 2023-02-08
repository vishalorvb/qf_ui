import { FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import React, { useState } from 'react'
import GrowingTable from './GrowingTable'



function Body() {

  let [selected, setSelected] = useState("")



  return (
    <div>
      <FormControl>
        <RadioGroup
          row={true}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={e => setSelected(e.target.value)}
        >
          <FormControlLabel value="none" control={<Radio />} label="none" />
          <FormControlLabel value="formdata" control={<Radio />} label="form-data" />
          <FormControlLabel value="urlencoded" control={<Radio />} label="x-www-form-urlencoded" />
          <FormControlLabel value="raw" control={<Radio />} label="raw" />
          {selected == "raw" &&<Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}

          >
            <MenuItem value="1">Text</MenuItem>
            <MenuItem value="2">Text (plain/text)</MenuItem>
            <MenuItem value="3">JSON (application/json)</MenuItem>
            <MenuItem value="4">Javascript (application/javascript)</MenuItem>
            <MenuItem value="5">XML (application/xml)</MenuItem>
            <MenuItem value="6">Javascript (application/javascript)</MenuItem>
            <MenuItem value="7">XML (text/xml)</MenuItem>
            <MenuItem value="8">HTML (text/html)</MenuItem>

          </Select>}
        </RadioGroup>
      </FormControl>
      {selected == "none" && <div style={{ marginTop: "20px", marginLeft: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
        <p>This request does not have a body</p>
      </div>}
      {selected == "formdata" && <div>
        <GrowingTable
          header={["Key", "Value", "Description"]}
        ></GrowingTable>
      </div>}
      {selected == "urlencoded" && <div>
        <GrowingTable
          header={["Key", "Value", "Description"]}
        ></GrowingTable>
      </div>}
      { selected == "raw" && <div style={{marginTop:"10px"}}>
        <textarea rows="12" cols="150"></textarea>
      </div>}
    </div>
  )
}

export default Body
