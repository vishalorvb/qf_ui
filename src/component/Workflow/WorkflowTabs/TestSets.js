import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Environment"; 
import Table from "../../CustomComponent/Table";
import Pillnav from "../Pillnav";

export default function Testsets(props) {

  const {module} = props;

const [testSetList,setTestSetList] = useState([]);
const [testCases,setTestCases] = useState([]);
const [selectedTestset,setSelectedTestset] = useState({})

const columns = [
  { field: 'id', headerName: 'S.no.', flex: 1, valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, },
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
    field: 'Actions',
    headerName: 'Actions',
    flex: 3,
    sortable:false
  },
  ];

  const getModuleTestSets = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getModuleTestSets?moduleId=${module?.module_id}`)
    .then((resp)=>{
        setTestSetList(resp.data)
        setSelectedTestset(resp.data[0])
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  const getTestCaseInTestSets = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getTestCaseInTestSets?testset_id=${selectedTestset?.testset_id}`)
    .then((resp)=>{
        setTestCases(resp.data)
    })
    .catch((err)=>{
        console.error(err);
    })
  }

  useEffect(() => {
    getModuleTestSets();
  }, [module])
  
  useEffect(() => {
    selectedTestset?.testset_id !== undefined && getTestCaseInTestSets();
  }, [selectedTestset])
  

    return(

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
        <Pillnav workflowModules={testSetList} selectClickedElement={setSelectedTestset}/>

          <Grid container justifyContent='flex-end' sx={{marginBottom:'10px'}}>
            <Button
              variant="contained"
            >
              Create
            </Button>
          </Grid>
          
          <Table rows={testCases} columns={columns} hidefooter={false} checkboxSelection={true}/>
        
        </Box>
    )
}