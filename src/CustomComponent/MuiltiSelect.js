import React, { useEffect, useState } from "react";
// import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MuiltiSelect({ options, id, value, stateList, preselect }) {
  let [selectedval, setSelectedval] = useState([]);
  let [checkbox, setCheckbox] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    stateList([...value]);
    setSelectedval(value);
  };

  useEffect(() => {
    let t = [];
    selectedval.forEach((val) => {
      t.push(val[id]);
    });
    setCheckbox([...t]);
  }, [selectedval]);

  useEffect(() => {

    if(preselect.length !== 0) {
      setSelectedval(preselect);
    }
  }, [preselect]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label"> Select  </InputLabel>
        <Select
          multiple
          emptyRecordMsg = {"No Options Available"}
          value={selectedval}
          onChange={handleChange}
          input={<OutlinedInput label="" />}
          renderValue={(selected) => selected.map((v) => v[value] + ",")}
          MenuProps={MenuProps}
        >
          {options.map((opt) => {
            return (
              <MenuItem key={opt[id]} value={opt}>
                <Checkbox checked={checkbox.indexOf(opt[id]) > -1} />
                <ListItemText primary={opt[value]} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default MuiltiSelect;
