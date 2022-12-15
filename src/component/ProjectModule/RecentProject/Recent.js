

import { Alert, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import SchemaIcon from '@mui/icons-material/Schema';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import Table from '../../Table';
import axios from 'axios';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { baseUrl } from '../../../Environment';
import Snackbar from '@mui/material/Snackbar';
import CreateProject from '../Actions/ActionCreate';
import RemoveIcon from '@mui/icons-material/Remove';
import ConfirmPop from '../../ConfirmPop';
import { getProjects, DeleteProjectFromFavourite } from '../Api';
import ActionUsers from '../Actions/ActionUsers';
import Workflow from '../Actions/Workflow/Workflow';
import ActionOverview from '../Actions/Overview';

function Recent() {
    let [createProject, setCreateProject] = useState(false)
    let [popup, setPopup] = useState(false)
    let [pid, setPid] = useState()
    let [uid, setUid] = useState()
    let [row, setRow] = useState([])
    let [action, setAction] = useState("")
    let [user, setUser] = useState({
        flag: false,
        projectId: null
    })

    let [Overview, setOverview] = useState({
        flag: false,
        project: null
    })
    let [edit, setEdit] = useState({
        flag: false,
        project: null
    })

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => {
        console.log("Handle clicked")
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };


    let popheader = "Delete Project"
    let popmessage = "Are you sure to delete this project"


    const userId = 112
    function getProject() {
        getProjects(setRow)
    }


    function AddToFavourite(projectId, userId) {
        console.log(projectId + "=======" + userId)
        axios({
            method: 'post',
            url: baseUrl + '/ProjectMS/Project/addProjectToFavourite',
            data: {
                "projectId": projectId,
                "userId": userId
            }
        }
        ).then(response => {
            console.log(response.data)
            if (response.data) {
                console.log("Inside IF")
                handleClick(
                    {
                        vertical: 'top',
                        horizontal: 'right',
                    })
                getProject()
            }
        }).catch(error => {
            console.log(error)
        })
    }
    function DeleteFromFavourite(projectId, userId) {

        DeleteProjectFromFavourite(projectId, userId).then(() => {
            getProject()
        })
    }
    function DeleteProjectFromUser(projectId, userId) {
        console.log(projectId + "=======" + userId)
        axios({
            method: 'delete',
            url: baseUrl + '/ProjectMS/Project/deleteProjectFromUser',
            data: {
                projectId: projectId,
                userId: userId
            }
        }).then(response => {
            console.table(response)
            if (response.data) {
                getProject()
                setPopup(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleUser(projectId) {
        console.log(projectId)
        setAction("Users")
        if (user.projectId === projectId) {
            setUser((pv) => ({ ...pv, 'flag': !pv.flag, 'projectId': projectId }))
        }
        else {
            setUser((pv) => ({ ...pv, 'flag': true, 'projectId': projectId }))
        }
    }
    function handleOverview(project) {

        setAction("Overview")
        if (Overview.project == null || Overview.project.id == project.id) {
            setOverview((pv) => ({ ...pv, flag: !pv.flag, project: project }))
        }
        else {
            setOverview((pv) => ({ ...pv, flag: true, project: project }))
        }
    }
    function handleEdit(project) {
        setAction("Edit")
        if (edit.project == null || edit.project.id == project.id) {
            setEdit((pv) => ({ ...pv, flag: !pv.flag, project: project }))
        }
        else {
            setEdit((pv) => ({ ...pv, flag: true, project: project }))
        }

    }

    const columns = [
        {

            headerName: 'S.no',
            field: 'sno',
            valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
            flex: 1,
            align: 'center',
            sortable: false,
        },
        {
            field: 'project_name',
            headerName: 'Project Name',
            flex: 3,
            sortable: false,

        },
        {
            field: 'automation_name',
            headerName: 'Automation Framework',
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
                            <IconButton onClick={() => { DeleteFromFavourite(param.row.id, param.row.user_id) }}><StarIcon ></StarIcon></IconButton>
                        </Tooltip>
                    )
                }
                else {
                    return (
                        <Tooltip title='Add to Favourite'>
                            <IconButton onClick={(e) => { AddToFavourite(param.row.id, param.row.user_id) }}><StarBorderOutlinedIcon></StarBorderOutlinedIcon></IconButton>
                        </Tooltip>
                    )
                }
            },
            flex: 2,
            sortable: false,
            align: 'center',
        },
        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <div >
                        <Tooltip title="Overview">
                            <IconButton onClick={(e) => { handleOverview(param.row) }} > <PreviewIcon ></PreviewIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => { handleEdit(param.row) }}><EditIcon ></EditIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Workflow">
                            <IconButton onClick={() => setAction("Workflow")}><SchemaIcon ></SchemaIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={(e) => { handleDeletePopup(param.row.id, param.row.user_id) }}><DeleteIcon ></DeleteIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="User">
                            {/* <IconButton onClick={()=>{setUser((pv)=>({...pv,'flag':!pv.flag,'projectId':param.row.project_id}))}}><PeopleIcon  ></PeopleIcon></IconButton> */}
                            <IconButton onClick={(e) => { handleUser(param.row.id) }}><PeopleIcon  ></PeopleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Execution">
                            <IconButton><PlayCircleIcon ></PlayCircleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Analytics">
                            <IconButton onClick={() => setAction("Analytics")}><AnalyticsIcon ></AnalyticsIcon></IconButton>
                        </Tooltip>
                    </div>
                )
            },
            flex: 4,
            headerAlign: "center",
            sortable: false,
            align: 'center',
        }
    ];


    function handleDeletePopup(pid, uid) {

        setPopup(true);
        console.log(popheader, popmessage);
        // callback = DeleteProjectFromUser(pid,uid);
        setPid(pid)
        setUid(uid)

    }


    useEffect(() => {
        getProject()
        // getProjects(setRow)
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])


    return (
        <div >
            <div className="recenttable" style={{ margin: "2px", marginBottom: '20px' }} >
                <Button onClick={() => { setCreateProject(pv => !pv); setAction("CreateProject") }} variant="contained" endIcon={createProject ? <RemoveIcon></RemoveIcon> : <AddIcon />} >Create Project </Button>
            </div>
            <Table
                rows={row.slice(0, 10)}
                columns={columns}
                hidefooter={true}

            ></Table>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
                autoHideDuration={3000}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Added to Favourite
                </Alert>
            </Snackbar>


            <div className='actions'>
                {createProject && action == "CreateProject" && <CreateProject
                    edit={false}
                ></CreateProject>}

                {action == "Overview" && Overview.flag && <ActionOverview
                    project={Overview.project}
                ></ActionOverview>}

                {user.flag && action == "Users" && <ActionUsers
                    projectId={user.projectId}
                ></ActionUsers>}

                {edit.flag && action == "Edit" && <CreateProject
                    edit={true}
                    project={edit.project}
                ></CreateProject>}
            </div>
            <ConfirmPop
                open={popup}
                handleClose={() => setPopup(false)}
                heading={popheader}
                message={popmessage}
                onConfirm={() => DeleteProjectFromUser(pid, uid)}
            ></ConfirmPop>
            {<Workflow />}


        </div>
    )
}

export default Recent
