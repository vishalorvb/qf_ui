import { Autocomplete, Button, Grid, IconButton, Radio, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getProject } from '../../Services/ProjectService'
import { getModules } from '../../Services/ProjectService';
import AddIcon from '@mui/icons-material/Add';
import TestSteps from './TestSteps';
import Table from '../../CustomComponent/Table';
import { getTestcases } from '../../Services/ProjectService';
import CreateTestCasePopUp from './CreateTestCasePopUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';


function TestCases() {
    let [project, setproject] = useState([])
    let [testcases, setTestcases] = useState([])
    let [radio, setRadio] = useState(0);
    let [datasets, Setdatasets] = useState([])
    let [addTestcase, setAddTestcase] = useState()
    let [popup, setPopup] = useState(false)
    let [steps, setSteps] = useState(true)



    function handleRadio(testcaseId) {
        console.log(testcaseId)
        setRadio(testcaseId)
        // Setdatasets(testcases.filter(ts => {
        //     if (ts.testcase_id == testcaseId) {
        //         return ts.datasetsList
        //     }
        // }))
        let temp = (testcases.filter(ts => {
            if (ts.testcase_id == testcaseId) {
                console.log(ts)
                return ts.datasetsList
            }
        }))
        console.log(temp)
    }

    function handleSteps(para){
        console.log(para)
        setSteps(true)
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
      field: "testcase_name",
      headerName: "Test case name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "testcase_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },

        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <div >
                        <Tooltip title="Add Step">
                            <IconButton onClick={e => handleSteps(param.row.testcase_id)} ><AddBoxIcon></AddBoxIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Add Data Set">
                            <IconButton  ><AddIcon></AddIcon></IconButton>
                        </Tooltip>
                    </div>
                )
            },
            flex: 3,
            headerAlign: "left",
            sortable: false,
            align: 'left',
        }
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
        getProject(setproject)
        getTestcases(setTestcases, 1031)
        console.log(testcases)
    }, [])

    return (
        <div>
            <h1>This is test case component</h1>

            <Grid container>
                <Grid item>
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
                            console.log(value)
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
                getRowId={row => row.testcase_dataset_id}
            ></Table>
        </div>
    )
}

export default TestCases;
