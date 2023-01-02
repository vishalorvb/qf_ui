import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";
import { baseUrl } from "../../../../../Environment";
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

export default function PagesScreen(props) {

  const {module} = props;

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
  const [selectedPage,setSelectedPage] = useState({})
  const [preSelectedElement,setPreSelectedElement] = useState([])

  const getPage = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getModulePages?moduleId=${module?.module_id}`)
    .then((resp)=>{
      setPages(resp.data);
      setSelectedPage(resp.data[0])
    })  
  }

  const getPageElements = () => {
    axios.get(baseUrl+`/ProjectsMS/Project/getModulePagesElements?webPageId=${selectedPage?.web_page_id}`)
    .then((resp)=>{
      setPageElements(resp.data);
      setPreSelectedElement(()=>{
        const data = resp.data;
        const selectedData = data.filter((item)=>item.is_selected === true).map((item)=>item.id);
        console.log(selectedData)
        return selectedData;
      })
    })
  }

  useEffect(()=>{
    getPage();
  },[module])

  useEffect(()=>{
    selectedPage?.web_page_id !== undefined && getPageElements();
  },[selectedPage])

    return(
        <Box sx={{ display: "flex", gap: 1 }}>
      { pages.length > 0 ? <WorkflowNav workflowModules={pages} selectClickedElement={setSelectedPage} navigationHeader={"Pages"}/> : "No Pages Found"}
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
        
        <Table rows={pageElements} columns={columns} hidefooter={false} checkboxSelection={true} selectionModel={preSelectedElement} setSelectionModel={setPreSelectedElement}/>
       
      </Box>
    </Box>
    )
}