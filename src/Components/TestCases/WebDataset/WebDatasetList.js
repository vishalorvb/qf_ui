import React, { useEffect, useState } from 'react'
import Table from '../../../CustomComponent/Table';
import { getDataset } from '../../../Services/TestCaseService';
import TableActions from '../../../CustomComponent/TableActions';
import { MenuItem } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { DeleteOutlined } from "@mui/icons-material";


function WebDatasetList(props) {


    let [datasets, setDatasets] = useState([]);


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
                        >
                            <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
                            Copy
                        </MenuItem>
                        <MenuItem
                        //   onClick={(e) => {
                        //     getData_for_createDataset(
                        //       setData,
                        //       param.row.testcase_id,
                        //       param.row.dataset_id
                        //     );
                        //     setDrawer(!drawer);
                        //     datasetinfo.name = param.row.name;
                        //     datasetinfo.description = param.row.description;
                        //     datasetinfo.dataset_id = param.row.dataset_id;
                        //   }}
                        >
                            <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} ></EditOutlinedIcon>
                            Edit
                        </MenuItem> 
                        <MenuItem
                        //   onClick={(e) => {
                        //     setDeletedatasetId(param.row.dataset_id);
                        //     setDeletepopup(true);
                        //   }}
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
    getDataset(setDatasets,props.projectId,props.applicationId,props.testcaseId)
}, [props])

    return (
        <div>
            <Table
                rows={datasets}
                columns={column}
                hidefooter={true}
                getRowId={(row) => row.dataset_id}
            ></Table>
        </div>
    )
}

export default WebDatasetList
