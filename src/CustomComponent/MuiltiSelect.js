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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

let options =[
  {
    id:1,
    val:"vishal"
  },
  {
    id:2,
    val:"vishal"
  },
  {
    id:3,
    val:"vishal"
  },
  {
    id:4,
    val:"vishal"
  },
]


function MuiltiSelect() {

    let [selectedval,setSelectedval] = useState([])
    const handleChange = (event) => {
        console.log(event.target)
        let temp = selectedval
        temp.push(event.target.value[0])
        setSelectedval([...temp])
        
    };

    useEffect(() => {
    // console.log(selectedval)
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
          renderValue={(selected) =>{console.log(selected)}}
          MenuProps={MenuProps}
        >
          {options.map((opt) => {
            // console.log()
            return(
            <MenuItem key={opt.id} value={opt.id}>
                {/* checked={selectedval.indexOf(opt.id) > -1} */}
              <Checkbox  />
              <ListItemText primary={opt.val} />
            </MenuItem>
          )})}
        </Select>
      </FormControl>
    </div>
  )
}

export default MuiltiSelect
