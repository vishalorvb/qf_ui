import { Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import MastPop from '../../CustomComponent/MastPop'

function TestSteps(props) {


  let [rows, setRows] = useState([<GetRow />])
  let appname = ["app1", "app5", "app4", "app3", "app2"]
  let pagename = ["page1", "page2", "page3", "page4", "page5", "page6"]
  let fieldname = ["field1", "field2", "field3", "field4", "field5"]
  let fieldtype = ["field1", "field2", "field3", "field"]



  function GetRow() {
    function print() {
      console.log("This is print function")
    }
    return (




      <tr>
        <td>
          <select>
            <MenuItem value=""></MenuItem>
            {appname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </select>
        </td>
        <td>
          <select>
            <MenuItem value=""></MenuItem>
            {pagename.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </select>
        </td>
        <td>
          <select>
            <MenuItem value=""></MenuItem>
            {fieldname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </select>
        </td>
        <td>
          <select>
            <MenuItem value=""></MenuItem>
            {fieldtype.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </select>
        </td>
        <td>
          <select>
            <MenuItem value=""></MenuItem>
            {appname.map(val => <MenuItem value={val}>{val}</MenuItem>)}
          </select>
        </td>
      </tr>
    )
  }
  function updateRow(e) {
    setRows([...rows, <GetRow />])
  }

  function handleSubmit(e) {
    console.log(rows)
  }


  return (
    <MastPop open={props.open} setOpen={props.setOpen}>
      <div >
        {/* <h2 onClick={updateRow}>This is test steps</h2> */}
        <h1>Add Test Steps</h1>
        <Button variant="contained" onClick={updateRow}>Add Step</Button>
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
        <Button variant="contained" onClick={handleSubmit}>Save</Button>

      </div>
    </MastPop>
  )
}

export default TestSteps
