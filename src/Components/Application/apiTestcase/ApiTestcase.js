import { CheckBox } from '@mui/icons-material';
import { Alert, Button, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Table from '../../../CustomComponent/Table'
import { getApis } from '../../../Services/ApiService';
import axios from '../../../api/axios';
import { useNavigate } from "react-router-dom";
import SnackbarNotify from '../../../CustomComponent/SnackbarNotify';
import { useLocation } from "react-router-dom";

export let testcasedata = {
  "module_id": "",
  "testcase_name": "",
  "testcase_desc": "",
  "testcase_id": "",
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
      
    ]
}

export function resetTestCaseData() {
  testcasedata = {
    "module_id": "",
    "testcase_name": "",
    "testcase_desc": "",
    "testcase_id": "",
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
       
      ]
  }
}

function ApiTestcase() {

  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [api, setApi] = useState([]);
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
    console.log("api called")
    elementsList = preSelectedElement.map((id) => {
      return { api_id: id };
    })
    testcasedata.testcase_name = location.state.name;
    testcasedata.testcase_desc = location.state.desc;
    testcasedata.module_id = location.state.applicationId;
    testcasedata.apis_list = elementsList;
    testcasedata.testcase_id = location.state.testcaseId;
    axios.post(`/qfservice/CreateNewTestcase`, testcasedata).then((resp) => {
      console.log(resp);
      resp?.data?.status === "SUCCESS" &&
        navigate("http://localhost:3000/ApiTestcase", {
        });
      setOpen(false);
    });

  }

  const moduleId = location.state.module;
  console.log(location.state);
  useEffect(() => {
    getApis(setApi, location.state.applicationId)
  }, []);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleClick() {
    if (preSelectedElement.length === 0) {
      setError(true)
      return;
    }
    else {
      setSuccess(true)

      createTestcase()
    }
  }
  console.log(preSelectedElement)
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
      <br /><br />
      <div>
        <Grid container justifyContent="center" columnSpacing={2}>
          <Grid item xs={3} md={3} lg={3}>
            <Button variant="contained" onClick={handleClick}>Save</Button>
          </Grid>
        </Grid>
      </div>
      <SnackbarNotify
        open={error}
        close={setError}
        msg={"Please select atleast one API!"}
        severity="error"
      />
      <SnackbarNotify
        open={success}
        close={setSuccess}
        msg={"Testcase created successfully."}
        severity="success"
      />
    </div>
  )
}

export default ApiTestcase