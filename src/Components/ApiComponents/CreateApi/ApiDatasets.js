import { Grid, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../../../CustomComponent/Table'
import { getApiDatasets } from '../../../Services/ApiService'
import APiListDrawer from './APiListDrawer'
import CreateApiTabs from './CreateApiTabs'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { setGetData } from './ApiDatasetData'
import { getData } from './APiListDrawer'



function ApiDatasets() {

    let [datasets, setDatasets] = useState([])
    let [selectedApi, setSelectedApi] = useState()
    let [selectedApiDetails, setSelectedApiDetails] = useState({})

    let col = [
        {
            field: "dataset_name_in_testcase",
            headerName: "Dataset Name",
            flex: 3,
            sortable: false,
            align: "left",
        },
        {
            field: "",
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
                                    console.log(param.row.testcase_dataset_id)
                                }}
                            >
                                <EditOutlinedIcon></EditOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        },
    ]
    useEffect(() => {
        getApiDatasets(setDatasets, 149)
    }, [])
    useEffect(() => {
        getData?.forEach(element => {
            if (element.api_id == selectedApi.api_id) {
                setSelectedApiDetails(element)
            }
        });

    }, [selectedApi])

    useEffect(() => {
        console.log(selectedApiDetails)
    }, [selectedApiDetails])

    return (
        <div>
            <div>
                <APiListDrawer
                    setSelectedApi={setSelectedApi}
                ></APiListDrawer>
            </div>
            <div>
                <div>
                    <Grid container spacing={1} >
                        <Grid item md={4}>

                            <input type="text" style={{ width: "100%", height: "35px" }} placeholder='API Name' name="apiname"
                                defaultValue={selectedApiDetails.api_name}
                                onChange={e => {
                                    setGetData(selectedApi.api_id, "api_name", e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={8}>
                            <input type='text' style={{ width: "100%", height: "35px" }} placeholder="Description" name="apidesc"
                                value={selectedApiDetails.api_description}
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
                                    setGetData(selectedApi.api_id, "api_url", e.target.value)
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
                    <CreateApiTabs></CreateApiTabs>
                </div>
            </div>


            <div>
                <Table
                    rows={datasets}
                    columns={col}
                    hidefooter={true}
                    getRowId={(row) => row.testcase_dataset_id}
                ></Table>
            </div>
        </div>
    )
}

export default ApiDatasets
