import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../Environment"; 
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateTestcase from "../CreateTestcase";
import Pillnav from "../../../../../Pillnav";

export default function TestCases(props) {

  const {module} = props;

const [testCaseList,setTestCaseList] = useState([]);
const [dataset,setDataset] = useState([]);
const [selectedTestcase,setSelectedTestcase] = useState({})
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

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
             <IconButton><ContentCopyIcon/></IconButton>
             <IconButton><EditIcon/></IconButton>
             <IconButton><DeleteIcon/></IconButton>
             
             
             
          </div>
      )
    },   
  },
  ];

  const getModuleTestCases = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getModuleTestCases?moduleId=${module?.module_id}`)
    .then((resp)=>{
        setTestCaseList(resp.data)
        setSelectedTestcase(resp.data[0])
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  const getDatasets = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getModuleTestCaseDatasets?testcase_id=${selectedTestcase?.testcase_id}`)
    .then((resp)=>{
        setDataset(resp.data)
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  useEffect(() => {
    getModuleTestCases();
  }, [module])

  useEffect(() => {
    selectedTestcase?.testcase_id !== undefined && getDatasets();
  }, [selectedTestcase])
  

    return(
      <Box>
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
        <Pillnav workflowModules={testCaseList} selectClickedElement={console.log}/>

        <Grid container justifyContent='flex-end' sx={{marginBottom:'10px'}} gap={1}>
        <Button
            variant="contained"
          >
            Create TestCase
          </Button>
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