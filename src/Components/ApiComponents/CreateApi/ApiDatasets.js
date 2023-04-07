import { Button, Divider, Grid, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../../../CustomComponent/Table'
import { getApiDatasets } from '../../../Services/ApiService'
import APiListDrawer from './APiListDrawer'
import CreateApiTabs from './CreateApiTabs'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { setGetData } from './ApiDatasetData'
import { getData } from './APiListDrawer'
import MastPop from '../../../CustomComponent/MastPop'
import { postData } from './ApiDatasetData'
import { Stack } from "@mui/system";
import { createApiDataset } from '../../../Services/ApiService'
import { validateFormbyName } from '../../../CustomComponent/FormValidation'
import useAuth from '../../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router'
import SnackbarNotify from '../../../CustomComponent/SnackbarNotify'
import { clearPostData } from './ApiDatasetData'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { DeleteApiDataset } from '../../../Services/ApiService'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

function ApiDatasets() {

    let [datasets, setDatasets] = useState([])
    let [selectedApi, setSelectedApi] = useState()
    let [selectedApiDetails, setSelectedApiDetails] = useState({})
    let [createDatasets, setCreateDatasets] = useState(false)
    let [save, setSave] = useState(false)
    let [snackbar, setSnackbar] = useState(false)
    let [datasetId, setDatasetId] = useState()
    const { auth } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    let projectId
    let testcaseId
    let applicationId

    try {
        projectId = location.state.projectId
        testcaseId = location.state.testcaseId
        applicationId = location.state.applicationId

    } catch (error) {
        console.log(error)
        navigate("/testcase")
    }

    function handleSave(e) {
        postData.multi_datasets_of_testcase = getData
        console.log(postData)
        if (validateFormbyName(["name", "desc"], "error")) {
            createApiDataset(auth.info.id, postData).then(res => {
                if (res) {
                    getApiDatasets(setDatasets, location.state.testcaseId)
                    setSave(false)
                    setCreateDatasets(false)
                    setSnackbar(true)
                    clearPostData()

                }
            })
        }
        else {
            console.log("Form in not valid: Fill required fields")
        }

    }

    let col = [
        {
            field: "dataset_name_in_testcase",
            headerName: "Dataset Name",
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
            field: "example",
            headerName: "Action",
            flex: 3,
            sortable: false,
            align: "left",
            renderCell: param => {
                return (
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => {
                                    postData.tc_dataset_id = param.row.testcase_dataset_id
                                    postData.testcase_dataset_name = param.row.dataset_name_in_testcase
                                    postData.description = param.row.description
                                    setDatasetId(param.row.testcase_dataset_id)
                                    setCreateDatasets(true)
                                }}
                            >
                                <EditOutlinedIcon></EditOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy">
                            <IconButton
                                onClick={() => {
                                    setDatasetId(param.row.testcase_dataset_id)
                                    setCreateDatasets(true)
                                }}
                            >
                                <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => {
                                    // console.log(param.row.testcase_dataset_id)
                                    DeleteApiDataset(param.row.testcase_dataset_id).then(res => {
                                        getApiDatasets(setDatasets, location.state.testcaseId)
                                    })
                                }}
                            >
                                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        },
    ]
    useEffect(() => {
        getApiDatasets(setDatasets, location.state.testcaseId)
        postData.testcase_id = location.state.testcaseId

    }, [])
    useEffect(() => {
        setDatasetId(datasets[0]?.testcase_dataset_id)
    }, [datasets])
    useEffect(() => {
        getData?.forEach(element => {
            if (element?.api_id == selectedApi?.api_id) {
                setSelectedApiDetails(element)
            }
        });

    }, [selectedApi])

    useEffect(() => {
        console.log(selectedApiDetails)
    }, [selectedApiDetails])

    return (
        <div>
            {createDatasets && <div>
                <Stack spacing={1} direction="row">

                    <Button variant="contained"
                        onClick={e => setSave(true)}
                    >Save</Button>

                    <Button variant="outlined"
                        onClick={e => {
                            setCreateDatasets(false)
                            clearPostData()
                            setDatasetId(datasets[0]?.testcase_dataset_id)
                        }}
                    >Cancel</Button>

                    <APiListDrawer
                        setSelectedApi={setSelectedApi}
                        datasetId={datasetId}
                    ></APiListDrawer>
                </Stack>
                <br />
                <Divider></Divider>
                <br />
                {selectedApiDetails.api_id != undefined && <div>
                    <div>
                        <Grid container spacing={1} >
                            <Grid item md={4}>

                                <input type="text" style={{ width: "100%", height: "35px" }} placeholder='API Name' name="apiname"
                                    value={selectedApiDetails?.api_name}
                                    onChange={e => {
                                        setGetData(selectedApi.api_id, "api_name", e.target.value)
                                        setSelectedApiDetails(pv => {
                                            return { ...pv, api_name: e.target.value }
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <input type='text' style={{ width: "100%", height: "35px" }} placeholder="Description" name="apidesc"
                                    value={selectedApiDetails?.api_description}
                                    onChange={e => {
                                        setGetData(selectedApi.api_id, "api_description", e.target.value)
                                        setSelectedApiDetails(pv => {
                                            return { ...pv, api_description: e.target.value }
                                        })
                                    }}
                                //  setSelectedApiDetails({...selectedApiDetails, api_description: e.target.value})
                                />
                            </Grid>
                            <Grid item md={2}>
                                <select
                                    size='small'
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    fullWidth
                                    onChange={e => {

                                    }}
                                >

                                    <option value={1}>Get</option>
                                    <option value={2}>Post</option>
                                    <option value={3}>Put</option>
                                    <option value={4}>Delete</option>
                                </select>
                            </Grid>
                            <Grid item md={4}>
                                <input type="text" style={{ width: "100%", height: "35px" }} placeholder='URL' name="apiurl"
                                    value={selectedApiDetails.api_url}
                                    onChange={e => {
                                        setGetData(selectedApi?.api_id, "api_url", e.target.value)
                                        setSelectedApiDetails(pv => {
                                            return { ...pv, api_url: e.target.value }
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <input placeholder='Resource' />
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <CreateApiTabs
                            ApiDetails={selectedApiDetails}
                        ></CreateApiTabs>
                    </div>
                </div>}

            </div>}
            <div>

            </div>
            {createDatasets == false && <div className='apptable'>
                <div className="intable">
                    <div style={{padding:"5px",display:"inline",float:"right"}}>
                        <Button variant="contained"
                        startIcon={<AddIcon/>}
                            onClick={e => setCreateDatasets(true)}
                        >Create Dataset</Button>
                    </div>

                </div>

                <Table
                    rows={datasets}
                    columns={col}
                    hidefooter={true}
                    getRowId={(row) => row.testcase_dataset_id}
                ></Table>
            </div>}
            <div>
                <MastPop
                    open={save}
                    setOpen={() => setSave(false)}
                    heading="Create Dataset For API"
                >
                    <label for="">Dataset Name</label>
                    <input type="text" name='name'
                        defaultValue={postData.testcase_dataset_name}
                        onChange={e => postData.testcase_dataset_name = e.target.value}
                    />
                    <label for="">Description</label>
                    <input type="text" name='desc'
                        defaultValue={postData.description}
                        onChange={e => postData.description = e.target.value}
                    />
                    <Button variant='contained'
                        onClick={handleSave}
                    >Save</Button>
                </MastPop>
            </div>
            <div>
                <SnackbarNotify
                    open={snackbar}
                    close={setSnackbar}
                    msg="Dataset Created successfully"
                    severity="success"
                ></SnackbarNotify>
            </div>
        </div>
    )
}

export default ApiDatasets
