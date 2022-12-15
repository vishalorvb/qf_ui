import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";
import { baseUrl } from "../../../../../Environment";
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

export default function PagesScreen() {


const columns = [
  { field: 'id', headerName: 'S.no.', flex: 1, valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,},
  {
    field: 'name',
    headerName: 'Field Name',
    flex: 3,
    sortable:false
  },
  {
    field: 'input_type',
    headerName: 'field Type',
    flex: 3,
    sortable:false
    
  },
  {
    field: 'tag_name',
    headerName: 'Fields Tag',
    flex: 3,
    sortable:false
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
             <NearMeOutlinedIcon/>
          </div>
      )
  },    
  },
  ];

  const [pageElements,setPageElements] = useState([])
  const [pages,setPages] = useState([])

  const getPage = () => {
    axios.get(baseUrl+'/ProjectMS/Project/getModulePages?moduleId=79')
    .then((resp)=>{
      setPages(resp.data);
    })  
  }

  const getPageElements = () => {
    axios.get(baseUrl+'/ProjectMS/Project/getModulePagesElements?webPageId=212')
    .then((resp)=>{
      setPageElements(resp.data);
    })
  }

  useEffect(()=>{
    getPage();
    getPageElements();
  },[])

    return(
        <Box sx={{ display: "flex", gap: 1 }}>
      <WorkflowNav workflowModules={pages} setWorkFlowModuleHead={console.log} navigationHeader={"Pages"}/>
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
          >
            Create Page
          </Button>
          
        </Grid>
        
        <Table rows={pageElements} columns={columns} hidefooter={false} checkboxSelection={true}/>
       
      </Box>
    </Box>
    )
}