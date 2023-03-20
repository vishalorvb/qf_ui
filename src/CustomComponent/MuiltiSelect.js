import React, { useEffect, useState } from 'react'
// import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};




function MuiltiSelect({options, id, value , stateList}) {

    let [selectedval,setSelectedval] = useState([])
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedval(value);
    };

    useEffect(() => {
      // console.log(selectedval)
      stateList([...selectedval])
    }, [selectedval])

  return (
    <div>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedval}
          onChange={handleChange}
          input={<OutlinedInput label="" />}
          renderValue={(selected) => selected.map((value) => value + ",")}
          MenuProps={MenuProps}
        >
          {options.map((opt) => {

            return(
            <MenuItem key={opt[id]} value={opt[value]}>
              <Checkbox 
               checked={selectedval.indexOf(opt[value]) > -1}
              />
              <ListItemText primary={opt[value]} />
            </MenuItem>
          )})}
        </Select>
      </FormControl>
    </div>
  )
}

export default MuiltiSelect
