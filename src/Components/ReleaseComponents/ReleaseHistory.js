import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getReleaseHistory } from '../../Services/DevopsServices'
import Table from '../../CustomComponent/Table'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { release } from '../../Services/DevopsServices'
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { dateFormater } from '../../utilities/Utility'
function ReleaseHistory() {
    const navigate = useNavigate()
    const location = useLocation()
    const { auth } = useAuth();
    const loggedInId = auth.info.id;
    let [releaseData, setReleasedata] = useState([])
    const { setShowloader } = useHead();
    let col = [
        {
            field: "rid",
            headerName: "Release ID",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Typography
                        variant="p"
                    >
                        {param.row.id}
                    </Typography>
                );
            },
        },
        {
            field: "created_at",
            headerName: "Release Date",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Typography
                        variant="p"
                    >
                        {dateFormater(param.row.created_at)}
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
                    //<Tooltip title="View Log">
                    //    <IconButton
                    //        onClick={() => {
                    //            navigate("/release/logs", { state: { projectId: location.state.projectId, releaseId: location.state.releaseId, historyId: param.row.web_release_id } })
                    //        }}
                    //    >
                    //        <VisibilityIcon />
                    //    </IconButton>
                    //</Tooltip>
                    <div style={{ textDecoration: "underline", color: "cyan", cursor: "pointer" }}
                        onClick={() => {
                            navigate("/release/logs", { state: { projectId: location.state.projectId, releaseId: location.state.releaseId, historyId: param.row.web_release_id } })
                        }}
                    >
                        <p>View Report</p>
                    </div>
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
                                setShowloader(true)
                                release(location.state.projectId, location.state.releaseId, loggedInId).then(res => {
                                    setShowloader(false)
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
                <Table
                    rows={releaseData[0] ?? []}
                    columns={col}
                    getRowId={(row) => row.id}
                />
            </div>

        </div>
    )
}
export default ReleaseHistory
