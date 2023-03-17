import { CheckBox } from '@mui/icons-material';
import { Button, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Table from '../../../CustomComponent/Table'
import { getApis } from '../../../Services/ApiService';
import ApiTestCasePopUp from './ApiTestCasePopUp';
import axios from '../../../api/axios';
import { useNavigate } from "react-router-dom";

export let testcasedata = {
  "module_id": 1031,
  "testcase_name": "",
  "testcase_desc": "",
  "testcase_id": 0,
  "testcase_sprints":
    [
      {
        "sprint_id": "1",
        "sprint_name": "",
        "issue_id": "",
      }
    ],

  "apis_list":
    [
      {
        "api_id": 0,
      }
    ]
}

export function resetTestCaseData() {
  testcasedata = {
    "module_id": "",
    "testcase_name": "",
    "testcase_desc": "",
    "testcase_id": 0,
    "testcase_sprints":
      [
        {
          "sprint_id": "",
          "sprint_name": "",
          "issue_id": "",
        }
      ],

    "apis_list":
      [
        {
          "api_id": 0,
        }
      ]
  }
}

function ApiTestcase() {

  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [api, setApi] = useState([]);
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let elementsList = {};
  
  const columns = [
    {
      field: "api_name",
      headerName: "API Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "api_description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    }

  ]

  function createTestcase() {
    elementsList = preSelectedElement.map((id) => {
      return { api_id: id };
    })
    testcasedata.apis_list = elementsList;
    axios.post(`/qfservice/CreateNewTestcase`, testcasedata).then((resp) => {
      console.log(resp);
      resp?.data?.status === "SUCCESS" &&
        navigate("http://localhost:3000/ApiTestcase", {
        });
        setOpen(false);
    });

  }

  useEffect(() => {
    getApis(setApi, 774)
  }, []);

  return (
    <div>
      <div>
        <Grid container justifyContent="flex-start" columnSpacing={2}>
          <Grid item xs={3} md={3} lg={3}>

            <select
              onChange={e => { testcasedata.testcase_sprints[0].sprint_name = e.target.value }}
            >
              <option> Select</option>
              <option value="Sprint 1"> Sprint 1</option>
              <option value="Sprint 2"> Sprint 2</option>
              <option value="Sprint 3"> Sprint 3</option>
            </select>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <select
              onChange={e => { testcasedata.testcase_sprints[0].issue_id = e.target.value }}
            >
              <option> isssues</option>
              <option value="1" > isssue 1</option>
              <option value="2"> isssue 2</option>
              <option value="3"> isssue 3</option>
            </select>
          </Grid>
        </Grid>
      </div> <br /><br />
      <div>
        <Grid container justifyContent="space-between" columnSpacing={2}>
          <Grid item xs={3} md={3} lg={3}>
            <Button variant="contained" onClick={e =>(elementsList == null?console.log("empty"):setOpen(true))}>Create Testcase</Button>
            {console.log(typeof(elementsList))}
          </Grid>
        </Grid>
      </div>
      <Table
        rows={api}
        columns={columns}
        hidefooter={true}
        checkboxSelection={true}
        getRowId={(row) => row.api_id}
        selectionModel={preSelectedElement}
        setSelectionModel={setPreSelectedElement}
      ></Table>
      <div style={{ width: "200px" }}>
        <ApiTestCasePopUp
          heading={"Create Testcase"}
          open={open}
          setOpen={() => setOpen(false)}
        >
          <Divider></Divider>
          <div style={{ padding: "10px" }}>

            <div>
              <label htmlFor="">Name</label>
              <br />
              <div>
                <div className="row">
                  <div className="col-sm-2" style={{ paddingRight: "0px" }}>
                    <input type="text" placeholder="TC_" readOnly />
                  </div>
                  <div className="col-sm-10" style={{ paddingLeft: "0px" }}>
                    <input
                      type="text"
                      placeholder="Testcase Name"
                      onChange={e => { testcasedata.testcase_name = "TC_"+e.target.value }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div >
                <label htmlFor="">Description</label>
                <br />
                <input
                  type="text"
                  placeholder="Testcase Description"
                  onChange={e => { testcasedata.testcase_desc = e.target.value }}

                />
              </div>
              <br /><br />
              <Divider></Divider>
              <br />
              <div>
                <Grid container justifyContent="flex-end" columnSpacing={2}>
                  <Grid item xs={2} md={2} lg={2}>
                    <Button variant="outlined" type="button" style={{ Color: "grey" }}>Close</Button>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    <Button variant="outlined" type="button" onClick={createTestcase}>Save</Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </ApiTestCasePopUp>
      </div>
    </div>
  )
}

export default ApiTestcase