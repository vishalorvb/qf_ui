import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'

function TestSteps() {


  let [rows, setRows] = useState([])
  let appname = ["app1", "app5", "app4", "app3", "app2"]
  let pagename = ["page1", "page2", "page3", "page4", "page5", "page6"]
  let fieldname = ["field1", "field2", "field3", "field4", "field5"]
  let fieldtype = ["field1", "field2", "field3", "field"]



  function GetRow() {
    return (
      <TableRow>
        {/* {appname.map(val => <TableCell align="left">{val}</TableCell>)}
        {pagename.map(val => <TableCell align="left">{val}</TableCell>)}
        {fieldname.map(val => <TableCell align="left">{val}</TableCell>)}
        {fieldtype.map(val => <TableCell align="left">{val}</TableCell>)} */}
        <TableCell>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            {appname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </Select>
        </TableCell>
        <TableCell>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            {pagename.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </Select>
        </TableCell>
        <TableCell>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            {fieldname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </Select>
        </TableCell>
        <TableCell>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            {fieldtype.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </Select>
        </TableCell>
        <TableCell>
          <Select
            size='small'
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            {appname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </Select>
        </TableCell>
      </TableRow>
    )
  }
  function updateRow(e) {
    setRows([...rows, <GetRow />])
  }



  return (
    <div onClick={updateRow}>
      <h2>This is test steps</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell align="left">Steps</TableCell>
              <TableCell align="left">App Name</TableCell>
              <TableCell align="left">Page Name</TableCell>
              <TableCell align="left">Field Name</TableCell>
              <TableCell align="left">Field Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TestSteps
