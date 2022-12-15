import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../Environment"; 
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateTestcase from "../CreateTestcase";

export default function TestCases() {


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


const [testCaseList,setTestCaseList] = useState([]);
const [dataset,setDataset] = useState([]);

const columns = [
  { field: 'id', headerName: 'S.no.', flex: 1, valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, },
  {
    field: 'name',
    headerName: 'Dataset Name',
    flex: 3,
    sortable:false
  },
  {
    field: 'input_type',
    headerName: 'Type',
    flex: 3,
    sortable:false,
    renderCell: (param) => {
        return (
            <div >
               {param.row.is_db_dataset === true ? "Database" : param.row.is_regression === true ? "Regression" : "Regular" }
            </div>
        )
    },    
    
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    flex: 3,
    sortable:false,
    align: 'center',
    headerAlign: "center",
    renderCell: (param) => {
      return (
          <div >
             <ContentCopyOutlinedIcon/>
             <ContentCopyOutlinedIcon/>
             <ContentCopyOutlinedIcon/>
          </div>
      )
    },   
  },
  ];

  const getModuleTestCases = () => {
    axios.get(baseUrl+'/ProjectMS/Project/getModuleTestCases?moduleId=1035')
    .then((resp)=>{
        setTestCaseList(resp.data)
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  const getModuleScreensElements = () => {
    axios.get(baseUrl+'/ProjectMS/Project/getModuleTestCaseDatasets?testcase_id=751')
    .then((resp)=>{
        setDataset(resp.data)
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  useEffect(() => {
    getModuleTestCases();
    getModuleScreensElements();
  }, [])
  

    return(
        <Box sx={{ display: "flex", gap: 1 }}>
      <WorkflowNav workflowModules={testCaseList} setWorkFlowModuleHead={console.log} navigationHeader={"TestCases"}/>
      <Box
        component="main"
        sx={{
          border: "snow",
          flexGrow: 1,
          overflow: "auto",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Grid container justifyContent='flex-end' sx={{marginBottom:'10px'}}>
          <Button
           variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         Create Dataset
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Regular Dataset</MenuItem>
        <MenuItem onClick={handleClose}>db Dataset</MenuItem>
      </Menu>
        </Grid>
        
        <Table rows={dataset} columns={columns} hidefooter={false} checkboxSelection={true}/>
       
      </Box>
      <CreateTestcase/>
    </Box>
    )
}