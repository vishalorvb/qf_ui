import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getReleaseHistory } from '../../Services/DevopsServices'
import Table from '../../CustomComponent/Table'
import { IconButton, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';

function ReleaseHistory() {

    const navigate = useNavigate()
    const location = useLocation()

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
            <Table rows={releaseData} columns={col} />
        </div>
    )
}

export default ReleaseHistory
