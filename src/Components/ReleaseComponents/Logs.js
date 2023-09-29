import { Chip, CircularProgress, Grid } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import { getGitData } from '../../Services/DevopsServices';
import { useLocation, useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PendingIcon from '@mui/icons-material/Pending';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PauseIcon from '@mui/icons-material/Pause';


function Logs() {
    const navigate = useNavigate()
    const location = useLocation()
    let [status, setStatus] = useState({
        initialize: false,
        continuousIntegration: false,
        releaseAutomationTest: false,
        testAutomation: false

    })
    let getIcon = {
        success: <CheckCircleOutlineIcon />,
        running: <CircularProgress color="success" size={20} />,
        pending: <PauseIcon />,
        failed: <CancelOutlinedIcon />,
        created: <DoneOutlineIcon />,


        default: <WarningAmberIcon></WarningAmberIcon>,
        deploy: <KeyboardDoubleArrowRightIcon />
    }
    useEffect(() => {
        let releaseId
        let projectId
        let historyId
        try {
            releaseId = location.state.releaseId
            projectId = location.state.projectId
            historyId = location.state.historyId

        } catch (error) {
            navigate("/release");
            return
        }
        let listOfAllStatus = Object.values(status)
        if (listOfAllStatus.some(s => s != "success")) {
            setTimeout(() => {
                getGitData(setStatus, releaseId, historyId, projectId)
            }, 1000);

        }
        console.log(status)
    }, [status])

    useEffect(() => {
        console.log(status)
    }, [status])

    return (
        <div>
            <Grid container spacing={1} >
                <Grid item md={2.4}>
                    <div className='automation'>
                        <label for="">Initialize</label>
                    </div>
                    <div className='automation'>
                        <Chip
                            label="Initialize"
                            avatar={getIcon[status.initialize ?? "default"]}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </Grid>
                <Grid item md={2.4}>
                    <div className='automation'>
                        <label for="">Continuous integration</label>
                    </div>
                    <div className='automation'>
                        <Chip
                            label="RetriveCode"
                            avatar={getIcon[status.continuousIntegration ?? "default"]}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </Grid>
                <Grid item md={2.4}>
                    <div className='automation'>
                        <label for="">Release automation (test)</label>
                    </div>
                    <div className='automation'>
                        <Chip
                            label="DeployeToDev"
                            avatar={getIcon[status.testAutomation ?? "default"]}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </Grid>
                <Grid item md={2.4}>
                    <div className='automation'>
                        <label for="">Test automation</label>
                    </div>
                    <div className='automation'>
                        <Chip
                            label="RunTests"
                            avatar={getIcon[status.testAutomation ?? "default"]}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </Grid>
                <Grid item md={2.4}>
                    <div className='automation'>
                        <label for="">Release automation </label>
                    </div>
                    <div className='automation'>
                        <Chip
                            label="DeployedToProd"
                            avatar={getIcon.deploy}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                    <div className='automation'>
                        <Chip
                            label="DeployedToStage"
                            avatar={getIcon.deploy}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default Logs
