
import React from 'react'
import Table from '../CustomComponent/Table'
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";


const Organization = () => {

  const Data = [
    {
      id:1,
      name:"Organization",
      describe:"Organization"
    },
    {
      id:2,
      name:"Organization",
      describe:"Organization"
    },
    {
      id:3,
      name:"Organization",
      describe:"Organization"
    },
    {
      id:4,
      name:"Organization",
      describe:"Organization"
    }
  ]

const columns = [
  {
    field: "name",
    headerName: "name",
    flex: 2,
    sortable: false,
    align: "left",
  },
  {
    field: "describe",
    headerName: "Description",
    flex: 2,
    sortable: false,
    align: "left",
  },
  {
    field: "Action",
    headerName: "Action",
    flex: 2,
    sortable: false,
    align: "left",
    renderCell: (paOrganization) => {
      return (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
               
              }}
            >
              <EditIcon style={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        </>
      );
    },
  },

];




  return(
    <Table
          columns={columns}
          hideSearch={false}
          rows={Data}
          getRowId={(row) => row?.id}
        />
  )
}

export default Organization