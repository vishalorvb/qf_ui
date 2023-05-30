import React, { useEffect, useState } from 'react'
import Table from '../../../CustomComponent/Table';
import { getDataset } from '../../../Services/TestCaseService';
import TableActions from '../../../CustomComponent/TableActions';
import { MenuItem } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { DeleteOutlined } from "@mui/icons-material";
import { deleteDataset } from '../../../Services/TestCaseService';
import ConfirmPop from '../../../CustomComponent/ConfirmPop';
import SnackbarNotify from '../../../CustomComponent/SnackbarNotify';


let snackbarmsg = ""
let snackbarType = "warning"

function WebDatasetList(props) {


    let [datasets, setDatasets] = useState([]);
    let [deletepopup, setDeletepopup] = useState(false);
    let [deletedatasetId, setDeletedatasetId] = useState();
    let [snackbar,setSnackbar] = useState(false)


    let column = [
        {
            field: "name",
            headerName: "DataSet Name",
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
                        //   onClick={(e) => {
                        //     getData_for_createDataset(
                        //       setData,
                        //       param.row.testcase_id,
                        //       param.row.dataset_id
                        //     );
                        //     setDrawer(!drawer);
                        //   }}
                        onClick={(e) => {
                            props.setEditDatasetId(param.row.dataset_id)
                            props.setToogle(false)
                            props.setCopy(true)
                          }}
                        >
                            <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
                            Copy
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            props.setEditDatasetId(param.row.dataset_id)
                            props.setToogle(false)
                          }}
                        >
                            <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} ></EditOutlinedIcon>
                            Edit
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            setDeletedatasetId(param.row.dataset_id);
                            setDeletepopup(true);
                          }}
                        >
                            <DeleteOutlined sx={{ color: "red", mr: 1 }}></DeleteOutlined>
                            Delete
                        </MenuItem>
                    </TableActions>
                )
            },
            sortable: false,
            align: "left",
        },
    ];

    useEffect(() => {
        getDataset(setDatasets, props.projectId, props.applicationId, props.testcaseId)
    }, [])

    return (
        <div>
            <Table
                rows={datasets}
                columns={column}
                hidefooter={true}
                getRowId={(row) => row.dataset_id}
            ></Table>
            <ConfirmPop
                open={deletepopup}
                handleClose={() => setDeletepopup(false)}
                heading="Delete Data Set"
                message="Are you sure you want to delete?"
                onConfirm={() => {
                    deleteDataset(deletedatasetId).then((res) => {
                        if (res) {
                            setDeletepopup(false);
                            setDeletedatasetId(null);
                            getDataset(setDatasets, props.projectId, props.applicationId, props.testcaseId);
                            snackbarmsg = "Data Set deleted successfully"
                            setSnackbar(true)
                        }
                    });
                }}
            ></ConfirmPop>
            <SnackbarNotify
                open={snackbar}
                close={setSnackbar}
                msg={snackbarmsg}
                severity={snackbarType}
            ></SnackbarNotify>
        </div>
    )
}

export default WebDatasetList
