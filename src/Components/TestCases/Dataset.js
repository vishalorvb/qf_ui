import React, { useEffect, useState } from 'react'
import { getScreen } from '../../Services/pageService'
import Table from "../../CustomComponent/Table";
import CreateDataSetPopUp from './CreateDataSetPopUp';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import { Stack } from 'immutable';
import { DeleteOutlined } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getDataset } from '../../Services/TestCaseService';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';



function Dataset() {

  let [createpopup, setCreatepopup] = useState(false)
  let [datasets, setDatasets] = useState([])


  let column = [
    {
      field: " ",
      headerName: "Select",
      renderCell: (param) => {
        return (
          <div>
            <input type="radio" name="radio" />
          </div>
        )
      },
      flex: 0.5,
      sortable: false,
      align: "left",
    },
    {
      field: "name",
      headerName: "DataSet Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "dgn",
      headerName: "DataSet Name",
      renderCell: (param) => {
        if (!param.row.is_db_dataset) {
          return (
            <div>
              <h4>Regular</h4>
            </div>
          )
        }
        else {
          return (
            <div>

              <h4>DB DataSet</h4>

            </div>
          )
        }
      },
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
            <Tooltip title="Copy">
              <IconButton>
                <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlined></DeleteOutlined>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
    }
  ]

  useEffect(() => {
    getDataset(setDatasets)
  }, [])


  return (
    <div>
      <div>
        <Button variant="outlined"
          onClick={e => setCreatepopup(true)}
        >Add Datset</Button>
      </div>
      <div>
        <Table
          rows={datasets}
          columns={column}
          hidefooter={true}
          getRowId={(row) => row.dataset_id}
        ></Table>
      </div>
      {createpopup && <CreateDataSetPopUp
        close={setCreatepopup}
      ></CreateDataSetPopUp>}
    </div>
  )
}

export default Dataset
