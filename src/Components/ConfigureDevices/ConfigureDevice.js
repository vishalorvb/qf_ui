import React from 'react'
import Table from '../../CustomComponent/Table'
import { useState ,useEffect} from 'react'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Tooltip, Button ,Grid,Autocomplete} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import useHead from "../../hooks/useHead";
import AddConfigurationPopUp from './AddConfigurationPopUp';
import axios from '../../api/axios';
import TextField from "@mui/material/TextField";
import useAuth from "../../hooks/useAuth";


const ConfigureDevice = () => {
     const [configurations , setConfigurations] = useState([]);
     const [projectsList, setProjectList] = useState([]);
     const [selectedProject,setSelectedProject] = useState('')
     const [popup, setPopup] = useState(false);
     const [snack, setSnack] = useState(false);
     const { auth } = useAuth();
     const navigate = useNavigate();
     
     function getConfigurations(project_id) {
        axios.get(`/qfservice/mobileconfiguration?project_id=${project_id}`).then(res => 
          {
            setConfigurations(res.data.data)
      }).catch(err=>{
        console.log(err)
      })
      }

    function makeDefault()
    {
      const project_id = selectedProject.project_id;
      const config_id = configurations[0]?.specificationId;
      console.log(project_id)
      console.log(config_id)
      axios.get(`/qfservice/mobileconfiguration/${config_id}?project_id=${project_id}`).then(res =>
        {
          getConfigurations(project_id)
        }).catch(err=>{
          console.log(err)
        })
    }

      useEffect(() => {
        console.log("in lien 37-------");
        console.log(configurations[0]?.specificationId)
      }, [configurations])

      useEffect(() => {
        getConfigurations(selectedProject?.project_id)
      }, [selectedProject])
      useEffect(() => {
        axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
          const projects = res?.data?.result?.projects_list;
          setProjectList(projects);
          setSelectedProject(projects[0]);
        });
      }, []);

    const columns = [
        {
          field: "name",
          headerName: "Configurations",
          flex: 2,
          sortable: false,
          align: "left",
          
        },
        {
          field: "url",
          headerName: "URL",
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
            renderCell : (param) => {
                return (
                    <>
                    <Tooltip title="Edit">
                        <IconButton
                          onClick={() =>
                            navigate("/updateConfigureDevice", {
                              state: {
                                id : configurations[0]?.specificationId
                              },
                            })
                          }
                        >
                            <EditIcon style={{color : "black"}} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    </>
                )
            }
        },

        {
            field: "Set as default",
            headerName: "Set as default",
            flex: 2,
            sortable: false,
            align: "left",
            renderCell : (param) => {
                return (
                    <>
                     <Button
                      sx={{ backgroundColor: "#EDFAF9",borderRadius : "10px",height : "25px", marginTop : "5px"}}
                     variant="outlined"
                     onClick={makeDefault}>
                     Make a Default</Button>
                    </>
                )
            }
        },
    ]
    const { setHeader } = useHead();
    useEffect(() => {
      setHeader((ps) => {
        return {
          ...ps,
          name: "Configurations",
          plusButton: true,
          buttonName: "Add Configuration",
          plusCallback: () => setPopup(true),
        };
      });
      return () =>
        setHeader((ps) => {
          return {
            ...ps,
            name: "",
            plusButton: false,
            plusCallback: () => console.log("null"),
          };
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>
    <Grid>
    <Autocomplete
          disablePortal
          id="project_id"
          options={projectsList}
          value={selectedProject}
          sx={{ width: "20%" }}
          getOptionLabel={(option) => option.project_name}
          onChange={(e, value) => {
            setSelectedProject(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Projects" size="small" />
          )}
        />
    </Grid>
       <Table
        rows={configurations}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.specificationId}
      ></Table>
      <AddConfigurationPopUp
       open={popup}
       close={setPopup}
       snackbar={setSnack}
    //    projectId={selectedProject?.project_id}
    //    applicationId={selectedApplication?.module_id}
       setSnack={setSnack}
      />
    </>
  )
}

export default ConfigureDevice