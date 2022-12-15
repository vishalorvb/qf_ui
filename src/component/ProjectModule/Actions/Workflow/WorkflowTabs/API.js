import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";

export default function API() {

const columns = [
  { field: 'id', headerName: 'S.no.', flex: 1 },
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
    sortable:false
  },
  ];

  const [screenElements,setScreenElements] = useState([])
  const [screen,setScreen] = useState([])

  const getScreen = () => {
    axios.get('http://10.11.12.243:8090/ProjectMS/Project/getModulePages?moduleId=79')
    .then((resp)=>{
      setScreen(resp.data);
    })
  }

  const getScreenElements = () => {
    axios.get('http://10.11.12.243:8090/ProjectMS/Project/getModulePagesElements?webscreenId=212')
    .then((resp)=>{
      setScreenElements(resp.data);
    })
  }

  useEffect(()=>{
    getScreen();
    getScreenElements();
  },[])



    return(
        <Box sx={{ display: "flex", gap: 1 }}>
      <WorkflowNav workflowModules={screen} setWorkFlowModuleHead={console.log} navigationHeader={"screen"}/>
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
            Create
          </Button>
        </Grid>
        
        <Table rows={screenElements} columns={columns} hidefooter={false}/>
       
      </Box>
    </Box>
    )
}