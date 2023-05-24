import { Button, Divider, Grid, IconButton, MenuItem, Tooltip } from '@mui/material'
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
import TableActions from '../../../CustomComponent/TableActions'
import { DeleteOutlined } from '@mui/icons-material'
import useHead from '../../../hooks/useHead'


let snackbarErrorMsg = ""



function ApiDatasets() {

    let [datasets, setDatasets] = useState([])
    let [selectedApi, setSelectedApi] = useState()
    let [selectedApiDetails, setSelectedApiDetails] = useState({})
    let [createDatasets, setCreateDatasets] = useState(false)
    let [save, setSave] = useState(false)
    let [Errorsnackbar, setErrorsnackbar] = useState(false)
    let [snackbar, setSnackbar] = useState(false)
    let [datasetId, setDatasetId] = useState()
    const { auth } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    let projectId
    let testcaseId
    let applicationId
    let tescaseName

    try {
        projectId = location.state.projectId
        testcaseId = location.state.testcaseId
        applicationId = location.state.applicationId
        tescaseName = location.state.tescaseName

    } catch (error) {
        console.log(error)
        navigate("/testcase")
    }

    function handleSave(e) {
        postData.multi_datasets_of_testcase = getData
        if (validateFormbyName(["name", "desc"], "error")) {
            createApiDataset(auth.info.id, postData).then(res => {
                if (res == false) {
                    getApiDatasets(setDatasets, location.state.testcaseId)
                    setSave(false)
                    setCreateDatasets(false)
                    setSnackbar(true)
                    clearPostData()
                }
                else {
                    snackbarErrorMsg = res;
                    setErrorsnackbar(true)
                }
            })
        }
        else {
            snackbarErrorMsg = "Form in not valid: Fill required fields"
            setErrorsnackbar(true)
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
            flex: 6,
            renderCell: param => {

                return (
                    <TableActions
                        heading={param.row?.description}
                    >
                        <MenuItem
                            onClick={() => {
                                setDatasetId(param.row.testcase_dataset_id)
                                setCreateDatasets(true)
                            }}
                        >
                            <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
                            Copy
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                postData.tc_dataset_id = param.row.testcase_dataset_id
                                postData.testcase_dataset_name = param.row.dataset_name_in_testcase
                                postData.description = param.row.description
                                setDatasetId(param.row.testcase_dataset_id)
                                setCreateDatasets(true)
                            }}
                        >
                            <EditOutlinedIcon></EditOutlinedIcon>
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                // console.log(param.row.testcase_dataset_id)
                                DeleteApiDataset(param.row.testcase_dataset_id).then(res => {
                                    getApiDatasets(setDatasets, location.state.testcaseId)
                                })
                            }}
                        >
                            <DeleteOutlined></DeleteOutlined>
                            Delete
                        </MenuItem>
                    </TableActions>
                )
            },
            sortable: false,
            align: "left",
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


    const { setHeader } = useHead();
    useEffect(() => {

        setHeader((ps) => {
            return {
                ...ps,
                name: `${location?.state?.testcaseName} Datasets`,
            };
        });

    }, [location.state.testcaseName]);

    return (
        <div>
            {createDatasets && <div>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <APiListDrawer
                            setSelectedApi={setSelectedApi}
                            datasetId={datasetId}
                        ></APiListDrawer>
                    </Grid>
                    <Grid item md={9}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item md={2}>
                                <input type="text" name='name'
                                    placeholder='Dataset Name'
                                    defaultValue={postData.testcase_dataset_name}
                                    onChange={e => postData.testcase_dataset_name = e.target.value}
                                />
                            </Grid>
                            <Grid item md={2}>
                                <input type="text" name='desc'
                                    placeholder='Dataset Description'
                                    defaultValue={postData.description}
                                    onChange={e => postData.description = e.target.value}
                                />
                            </Grid>
                            <Grid item md={1}>
                                <Button variant="contained"
                                    onClick={handleSave}
                                >Save</Button>
                            </Grid>
                            <Grid item md={1}>
                                <Button variant="outlined"
                                    onClick={e => {
                                        clearPostData()
                                        setDatasetId(datasets[0]?.testcase_dataset_id)
                                        setCreateDatasets(false)
                                    }}
                                >Cancel</Button>
                            </Grid>
                            <Grid item md={0.2}> </Grid>
                        </Grid>
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
                    </Grid>
                </Grid>
            </div>}
            {createDatasets == false && <div className='apptable'>
                <div className="intable">
                    <div style={{ padding: "5px", display: "inline", float: "right" }}>
                        <Button variant="contained"
                            startIcon={<AddIcon />}
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

            </div>
            <div>
                <SnackbarNotify
                    open={snackbar}
                    close={setSnackbar}
                    msg="Saved successfully"
                    severity="success"
                ></SnackbarNotify>
                <SnackbarNotify
                    open={Errorsnackbar}
                    close={setErrorsnackbar}
                    msg={snackbarErrorMsg}
                    severity="error"
                ></SnackbarNotify>
            </div>
        </div>
    )
}

export default ApiDatasets
