
import React, { useState } from 'react'
import Table from '../CustomComponent/Table'
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Chip } from '@mui/material';
import { Stack } from '@mui/system';


function ProjectTable() {
    let row = [{
        id: "1",
        project_name: "My Projects",
        automation_name: "Selenium",
        description: "This is description of the project",
        favourite: true,
    
    
      }]
      const columns = [
    
        {
          field: 'project_name',
          headerName: 'Project Name',
          flex: 3,
          sortable: false,
          align: 'left',
    
        },
        {
          field: 'description',
          headerName: 'Description',
          flex: 3,
          sortable: false,
          align: 'left',
    
        },
        {
          field: " ",
          headerName: "Type",
          renderCell: (param) => {
            if (param.row.automation_name === 'Selenium') {
              return (
                <Stack direction="row" spacing={1}>
                  <Chip label="Selenium" variant="outlined" color="warning" size='small' />
                </Stack>
              )
            }
            else {
              return (
                <Stack direction="row" spacing={1}>    
                  <Chip label="Chip Outlined" variant="outlined" color="primary" />
                </Stack>
              )
            }
          },
          flex: 3,
          sortable: false,
          align: 'center',
        },
        {
          headerName: 'Favourite',
          renderCell: (param) => {
            if (param.row.favourite === true) {
              return (
                <Tooltip title='Remove From Favourite'>
                  <IconButton ><StarIcon ></StarIcon></IconButton>
                </Tooltip>
              )
            }
            else {
              return (
                <Tooltip title='Add to Favourite'>
                  <IconButton ><StarBorderOutlinedIcon></StarBorderOutlinedIcon></IconButton>
                </Tooltip>
              )
            }
          },
          flex: 1,
          sortable: false,
          align: 'left',
        },
        {
          headerName: 'Action',
          field: "action",
          renderCell: (param) => {
            return (
              <div >
                <Tooltip title="Edit">
                  <IconButton ><EditIcon ></EditIcon></IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton ><DeleteIcon ></DeleteIcon></IconButton>
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
      return (
        <div>
          <Table
            rows={row.slice(0, 10)}
            columns={columns}
            hidefooter={true}
    
          ></Table>
        </div>
      )
}

export default ProjectTable
