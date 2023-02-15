
import React, { useEffect, useState } from 'react'
import Table from '../CustomComponent/Table'
// import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Chip } from '@mui/material';
import { Stack } from '@mui/system';
import ConfirmPop from '../CustomComponent/ConfirmPop';
import CreateProject from './CreateProject';
import { getProject } from '../Services/ProjectService';
import { deleteProject } from '../Services/ProjectService';
import { useNavigate } from 'react-router-dom';
import SnackbarNotify from '../CustomComponent/SnackbarNotify';
import useAuth from '../hooks/useAuth';

function ProjectTable() {

    let [popup, setPopup] = useState(false)
    let [pid, setPid] = useState()

    let [edit, setedit] = useState(false)
    let [editprojectInfo, seteditprojectInfo] = useState([])
    let [project, setProject] = useState([])
    let [snackbarsuccess, setSnackbarsuccess] = useState(false);
    const {auth} = useAuth();
    console.log(auth.info)
    const usertoken  = localStorage.getItem("token");
    const loggedInId = auth.info.id;
    console.log(loggedInId)

    function handleDeletePopup(pid) {
        console.log(pid)
        setPopup(true);
        setPid(pid)


    }
    function DeleteProjectFromUser(projectId) {
        console.log(projectId)
        deleteProject(projectId, loggedInId, auth.info.grafana_role).then(res => {
            console.log(res)
            if (res == 'SUCCESS') {
                console.log("dletred")
                setSnackbarsuccess(true)
                getProject(setProject,loggedInId)

            }
        })
     
        setPopup(false)

    }

  
    function handleEdit(project) {
        setedit(!edit)
        seteditprojectInfo(project)
        console.log(project)

        console.log(project)
    }

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
                if (param.row.automation_framework_type == 1) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <Chip label="Selenium" variant="outlined" color="warning" size='small' />
                        </Stack>
                    )
                }
                else {
                    return (
                        <Stack direction="row" spacing={1}>
                            <Chip label="Other" variant="outlined" color="primary" />
                        </Stack>
                    )
                }
            },
            flex: 3,
            sortable: false,
            align: 'center',
        },
    
        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <div >
                        <Tooltip title="Edit">
                            <IconButton onClick={() => { handleEdit(param.row) }} ><EditIcon ></EditIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={(e) => { handleDeletePopup(param.row.project_id) }} ><DeleteIcon ></DeleteIcon></IconButton>
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

    useEffect(() => {

        getProject(setProject, loggedInId)
    }, [])

    return (
        <div>
            <SnackbarNotify
                open={snackbarsuccess}
                close={setSnackbarsuccess}
                msg="Deleted Succesfully"
                severity="success"
            />
            <Table
                rows={project}
                columns={columns}
                hidefooter={true}
                getRowId={row => row.project_id}
            ></Table>
            {edit && <CreateProject
                edit={true}
                project={editprojectInfo}
            ></CreateProject>}
            <ConfirmPop
                open={popup}
                handleClose={() => setPopup(false)}
                heading={"Delete Project"}
                message={"Are you sure you want to delete this project"}
                onConfirm={() => DeleteProjectFromUser(pid)}
            ></ConfirmPop>
        </div>
    )
}

export default ProjectTable
