import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  Radio,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProject } from "../../Services/ProjectService";

import AddIcon from "@mui/icons-material/Add";
import TestSteps from "./TestSteps";
import Table from "../../CustomComponent/Table";
// import { getTestcases } from '../../Services/ProjectService';
import CreateTestCasePopUp from "./CreateTestCasePopUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { getWebTestCase } from "../../Services/ProjectService";
// import ConfirmPop from '../../CustomComponent/ConfirmPop';
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { testcaseData } from "./CreateTestCasePopUp";
import { getTestcase } from "../../Services/TestCaseService";
import { Navigate, useNavigate } from "react-router";
import { teststepData } from "./TestSteps";
function TestCases() {
  let [project, setproject] = useState([]);
  let [testcases, setTestcases] = useState([]);
  let [radio, setRadio] = useState(0);
  let [datasets, Setdatasets] = useState([]);
  // let [addTestcase, setAddTestcase] = useState();
  let [popup, setPopup] = useState(false);
  let [steps, setSteps] = useState(false);
  let [snack, setSnack] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  function handleRadio(testcaseId) {
    setRadio(testcaseId);
    let temp = testcases.filter((ts) => {
      if (ts.testcase_id == testcaseId) {
        return ts.datasetsList;
      }
    });
    Setdatasets(temp[0].datasetsList);
  }

  function handleSteps(para) {
    console.log(para);
    setSteps(true);
  }

  function handleSteps(para) {
    console.log(para);
    setSteps(true);
  }

  const columns = [
    {
      field: "radio",
      headerName: "Select",
      renderCell: (params) => {
        return (
          <div>
            <Radio
              checked={params.row.testcase_id === radio}
              onChange={(e) => handleRadio(params.row.testcase_id)}
              name="radio-buttons"
            ></Radio>
          </div>
        );
      },
    },

    {
      field: "testcase_id",
      headerName: "Test case ID",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "name",
      headerName: "Test case name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },

    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div>
            <Tooltip title="Add Step">
              <IconButton  onClick={e=>{
                
                console.log(param.row)
                teststepData.application_id =param.row.application_id
                teststepData.application_name = param.row.application_name
                teststepData.testcase_id = param.row.testcase_id
                teststepData.testcase_name = param.row.name
                teststepData.desccription = param.row.description
                navigate("AddTestSteps");
              }}>
                <AddBoxIcon></AddBoxIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Data Set">
              <IconButton>
                <AddIcon></AddIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Data Set">
              <IconButton>
                <EditIcon className="editIcon"></EditIcon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                {" "}
                <DeleteIcon className=""></DeleteIcon>{" "}
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  let datasetColumn = [
    {
      field: "dataset_name_in_testcase",
      headerName: "Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div>
            <Tooltip title="Add Data Set">
              <IconButton>
                <AddIcon></AddIcon>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 1,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    getProject(setproject, auth.info.id);
  }, []);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcases",
        plusButton: true,
        plusCallback: () => setPopup(true),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  return (
    <div>
      <SnackbarNotify
        open={snack}
        close={() => {
          setSnack(false);
        }}
        msg="Test Case Created SuccessFully"
        severity="success"
      ></SnackbarNotify>

      <Grid container>
        <Grid item>
          <h3>Project Name :</h3>
          <Autocomplete
            //   ref={projecid}
            disablePortal
            id="project_id"
            options={project}
            getOptionLabel={(option) => option.project_name}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} />
              </div>
            )}
            onChange={(e, value) => {
              console.log(value.project_id);
              testcaseData.project_id = value.project_id;
              getTestcase(setTestcases, value.project_id);
            }}
          />
        </Grid>
      </Grid>

      <Table
        rows={testcases}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.testcase_id}
      ></Table>

      <Table
        rows={datasets}
        columns={datasetColumn}
        hidefooter={true}
        getRowId={(row) => row.testcase_dataset_id}
      ></Table>
      <CreateTestCasePopUp
        open={popup}
        setOpen={setPopup}
        snackbar={setSnack}
      ></CreateTestCasePopUp>
      {/* <TestSteps open={steps} setOpen={() => setSteps(false)}></TestSteps> */}
    </div>
  );
}

export default TestCases;
