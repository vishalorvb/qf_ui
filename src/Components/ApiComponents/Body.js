import { FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import React, { useState } from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'
import { authdata } from './Data'
import { getAuthData } from './Data'

function Body() {

  let [selected, setSelected] = useState("")

  function handleFormData(tabdata){
    console.log("table data from body")
    console.log(tabdata)
    Apidata.body_form_data_list = tabdata
  }
   function handleEncoderData(tabdata){
    Apidata.body_form_url_encoded_list = tabdata
   }



  return (
    <div>
      <FormControl>
        <RadioGroup
          row={true}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={e => {
            setSelected(e.target.value)
            Apidata.body_type = e.target.value
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="none" />
          <FormControlLabel value="2" control={<Radio />} label="form-data" />
          <FormControlLabel value="3" control={<Radio />} label="x-www-form-urlencoded" />
          <FormControlLabel value="4" control={<Radio />} label="raw" />
          {selected == "4" &&<Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={e=>{
              Apidata.body_raw.raw_type_id = e.target.value;
            }}
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
      {selected == "1" && <div style={{ marginTop: "20px", marginLeft: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
        <p>This request does not have a body</p>
      </div>}
      {selected == "2" && <div>
        <GrowingTable
          header={["Key", "Value", "Description"]}
          TableData = {handleFormData}
          keypair ={["key", "value", "description"]}
        ></GrowingTable>
      </div>}
      {selected == "3" && <div>
        <GrowingTable
          header={["Key", "Value", "Description"]}
          TableData ={handleEncoderData}
          keypair ={["key", "value", "description"]}
        ></GrowingTable>
      </div>}
      { selected == "4" && <div style={{marginTop:"10px"}}>
        <textarea 
        onChange={e=>{
          Apidata.body_raw.raw_text = e.target.value;
        }}
        rows="12" cols="100"></textarea>
      </div>}
    </div>
  )
}

export default Body
