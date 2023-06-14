import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'
import { getData } from './APiListDrawer'

function ApiBody({ ApiDetails }) {
  let [selected, setSelected] = useState(ApiDetails.body_type)

  function handleFormData(tabdata) {

    setGetData(ApiDetails.api_id, "bodyFormDataList", tabdata.slice(0, -1))

  }
  function handleEncoderData(tabdata) {
    setGetData(ApiDetails.api_id, "bodyFormUrlEncodedList", tabdata.slice(0, -1))
  }
  let displayorder = ["key", "value", "description"]

  useEffect(() => {
    if (ApiDetails.bodyRaw === null) {
      let temp = {
        "raw_text": " ",
        "raw_type_id": 1
    }
    setGetData(ApiDetails.api_id, "bodyRaw", temp)
  }
  }, [])

  return (
    <div>
      <FormControl>
        <RadioGroup
          row={true}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={ApiDetails.body_type}
          name="radio-buttons-group"
          onChange={e => {
            setSelected(e.target.value)
            setGetData(ApiDetails.api_id, "body_type", e.target.value)
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="none" />
          <FormControlLabel value="2" control={<Radio />} label="form-data" />
          <FormControlLabel value="3" control={<Radio />} label="x-www-form-urlencoded" />
          <FormControlLabel value="4" control={<Radio />} label="raw" />
          {selected == "4" && <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={ApiDetails.bodyRaw===null?"1":ApiDetails.bodyRaw?.raw_type_id}
            onChange={e => {
              let temp = ApiDetails.bodyRaw 
              temp.raw_type_id = e.target.value
              setGetData(ApiDetails.api_id, "bodyRaw", temp)
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
          TableData={handleFormData}
          keypair={["key", "value", "description"]}
          order={displayorder}
          prefilled={ApiDetails?.bodyFormDataList}
        ></GrowingTable>
      </div>}
      {selected == "3" && <div>
        <GrowingTable
          header={["Key", "Value", "Description"]}
          TableData={handleEncoderData}
          keypair={["key", "value", "description"]}
          order={displayorder}
          prefilled={ApiDetails?.bodyFormUrlEncodedList}
        ></GrowingTable>
      </div>}
      {selected == "4" && <div style={{ marginTop: "10px" }}>
        <textarea
        defaultValue={ApiDetails.bodyRaw?.raw_text}
          onChange={e => {
            let temp = ApiDetails.bodyRaw 
            temp.raw_text = e.target.value
            setGetData(ApiDetails.api_id, "bodyRaw", temp)
          }}
          rows="12" cols="100"></textarea>
      </div>}
    </div>
  )
}

export default ApiBody
