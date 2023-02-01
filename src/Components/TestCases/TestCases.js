import { Autocomplete, Button, Grid, IconButton, Radio, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getProject } from '../../Services/ProjectService'
import AddIcon from '@mui/icons-material/Add';
import TestSteps from './TestSteps';
import Table from '../../CustomComponent/Table';
import { getTestcases } from '../../Services/ProjectService';
import CreateTestCasePopUp from './CreateTestCasePopUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function TestCases() {
    let [project, setproject] = useState([])
    let [testcases, setTestcases] = useState([])
    let [radio, setRadio] = useState(0);
    let [datasets, Setdatasets] = useState([])
    let [addTestcase, setAddTestcase] = useState()
    let [popup, setPopup] = useState(false)
    let [steps, setSteps] = useState(true)

    console.log(addTestcase)


    function handleRadio(testcaseId) {
        setRadio(testcaseId)
        let temp = (testcases.filter(ts => {
            if (ts.testcase_id == testcaseId) {
                return ts.datasetsList
            }
        }))
        Setdatasets(temp[0].datasetsList)
    }

    const columns = [
        {
            field: "radio",
            headerName: "Select",
            renderCell: params => {
                return (
                    <div>
                        <Radio
                            checked={params.row.testcase_id === radio}
                            onChange={(e) => handleRadio(params.row.testcase_id)}

                            name="radio-buttons"

                        >
                        </Radio>
                    </div>
                )
            }
        },

        {
            field: 'testcase_id',
            headerName: 'Test case ID',
            flex: 3,
            sortable: false,
            align: 'left',

        },
        {
            field: 'testcase_name',
            headerName: 'Test case name',
            flex: 3,
            sortable: false,
            align: 'left',

        },
        {
            field: 'testcase_desc',
            headerName: 'Description',
            flex: 3,
            sortable: false,
            align: 'left',

        },


        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <div >

                        <Tooltip title="Add Data Set">
                            <IconButton onClick={e => setAddTestcase(true)} ><AddIcon></AddIcon></IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Data Set">
                            <IconButton  ><EditIcon></EditIcon></IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton  > <DeleteIcon></DeleteIcon> </IconButton>
                        </Tooltip>
                    </div>
                )
            },
            flex: 1,
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
            align: 'left',
        },
        {
            field: "description",
            headerName: "Description",
            flex: 3,
            sortable: false,
            align: 'left',
        },
        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <div >
                        <Tooltip title="Add Data Set">
                            <IconButton  ><AddIcon></AddIcon></IconButton>
                        </Tooltip>
                    </div>
                )
            },
            flex: 1,
            headerAlign: "left",
            sortable: false,
            align: 'left',
        }
    ]

    useEffect(() => {
        getProject(setproject, 4)
        getTestcases(setTestcases, 1031)

    }, [])

    return (
        <div>


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
                            console.log(value)
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={e => setPopup(true)}>Creat Test Case</Button>
                </Grid>
            </Grid>

            <Table
                rows={testcases}
                columns={columns}
                hidefooter={true}
                getRowId={row => row.testcase_id}
            ></Table>

            <Table
                rows={datasets}
                columns={datasetColumn}
                hidefooter={true}
                getRowId={row => row.testcase_dataset_id}
            ></Table>
            <CreateTestCasePopUp
                open={popup}
                setOpen={setPopup}
            ></CreateTestCasePopUp>
            <TestSteps
                open={steps}
                setOpen={() => setSteps(false)}
            ></TestSteps>
        </div>
    )
}

export default TestCases
