import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getReleaseHistory } from '../../Services/DevopsServices'
import Table from '../../CustomComponent/Table'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { release } from '../../Services/DevopsServices'
import useAuth from "../../hooks/useAuth";
function ReleaseHistory() {

    const navigate = useNavigate()
    const location = useLocation()
    const { auth } = useAuth();
    const loggedInId = auth.info.id;
    let [releaseData, setReleasedata] = useState([])

    let col = [
        {
            field: "release_name",
            headerName: "Name",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Typography
                        variant="p"
                    >
                        {param.row.release_name}
                    </Typography>
                );
            },
        },
        {
            field: "release_desc",
            headerName: "Description",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Typography
                        variant="p"
                    >
                        {param.row.release_name}
                    </Typography>
                );
            },
        },
        {
            field: "release_d",
            headerName: "Logs",
            flex: 1,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Tooltip title="View Log">
                        <IconButton
                            onClick={() => {
                                navigate("/release/logs", { state: { projectId: location.state.projectId, releaseId: location.state.releaseId, historyId: 1 } })
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ]

    useEffect(() => {
        let releaseId
        let projectId
        try {
            releaseId = location.state.releaseId
            projectId = location.state.projectId

        } catch (error) {
            navigate("/release");
            return
        }
        getReleaseHistory(projectId, releaseId, setReleasedata)
    }, [])


    return (
        <div>
            <div className='apptable'>
                <div className="intable">
                    <div style={{ float: "right" }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                console.log(location.state.projectId, location.state.releaseId, loggedInId)
                                release(location.state.projectId, location.state.releaseId, loggedInId).then(res => {
                                    console.log(res)
                                    if (res) {
                                        navigate('/release/logs', { state: { projectId: location.state.projectId, releaseId: location.state.releaseId, historyId: res } })
                                    }
                                    else {

                                    }
                                })
                            }}
                        >
                            Release Now
                        </Button>
                    </div>
                </div>
                <Table rows={releaseData} columns={col} />
            </div>

        </div>
    )
}

export default ReleaseHistory
