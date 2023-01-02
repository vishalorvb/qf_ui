


import EditIcon from '@mui/icons-material/Edit';
import SchemaIcon from '@mui/icons-material/Schema';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import Table from '../../Table';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../Environment';
import CreateProject from '../Actions/ActionCreate';
import ActionOverview from '../Actions/Overview';
import ActionUsers from '../Actions/ActionUsers';
import ConfirmPop from '../../ConfirmPop';





function Favourite() {

    let userId = 112
    let popheader = "Delete Project"
    let popmessage = "Are you sure to delete this project"

    let [rows, setRows] = useState([])
    let [action, setAction] = useState("")
    let [createProject, setCreateProject] = useState(false)
    let [popup, setPopup] = useState(false)
    let [pid, setPid] = useState()
    let [uid, setUid] = useState()
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

    function getRows() {
        axios.get(baseUrl + "/ProjectsMS/Project/getUserFavouriteProject?userId=" + userId).then(response => {
            setRows(response.data)
            console.log(response.data)
        })
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
    function handleDeletePopup(pid, uid) {

        setPopup(true);
        console.log(popheader, popmessage);
        // callback = DeleteProjectFromUser(pid,uid);
        setPid(pid)
        setUid(uid)

    }
    function DeleteProjectFromUser(projectId, userId) {
        console.log(projectId + "=======" + userId)
        axios({
            method: 'delete',
            url: baseUrl + '/ProjectsMS/Project/deleteProjectFromUser',
            data: {
                projectId: projectId,
                userId: userId
            }
        }).then(response => {
            console.table(response)
            if (response.data) {
                // getProject()
                getRows()
               window.location.reload()
                setPopup(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const columns = [
        {

            headerName: 'S.No',
            field: 'sno',
            valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
            flex: 1,
            align: 'center',
            sortable: false,
        },
        {
            field: 'project_name',
            headerName: 'Project Name',
            flex: 3

        },
        {
            field: 'automation_name',
            headerName: 'Automation Type',
            flex: 3

        },

        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <>
                        <Tooltip title="Overview">
                            <IconButton onClick={(e) => { handleOverview(param.row) }}> <PreviewIcon ></PreviewIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => { handleEdit(param.row) }}><EditIcon ></EditIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Workflow">
                            <IconButton><SchemaIcon ></SchemaIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={(e) => { handleDeletePopup(param.row.id, param.row.user_id) }}><DeleteIcon ></DeleteIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="User">
                            <IconButton onClick={(e) => { handleUser(param.row.id) }}><PeopleIcon ></PeopleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Execution">
                            <IconButton><PlayCircleIcon ></PlayCircleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Analytics">
                            <IconButton><AnalyticsIcon ></AnalyticsIcon></IconButton>
                        </Tooltip>
                    </>
                )
            },
            flex: 4,
            headerAlign: "center",
            sortable: false,
            align: 'center',
        }
    ];


    useEffect(() => {
        getRows()
    }, [])

    return (
        <div >
            <div className="recenttable" style={{ margin: "2px", marginBottom: '20px' }} >
            <Button onClick={() => { setCreateProject(pv => !pv); setAction("CreateProject") }} variant="contained" endIcon={createProject ? <RemoveIcon></RemoveIcon> : <AddIcon />} >Create Project </Button>
            </div>
            <Table
                rows={rows}
                columns={columns}
                hidefooter={true}
            ></Table>
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
        </div>
    )
}


export default Favourite
