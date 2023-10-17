import { Chip, CircularProgress, Grid } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react';
import { getGitData } from '../../Services/QfService';
import { useLocation, useNavigate } from 'react-router-dom';
import PauseIcon from '@mui/icons-material/Pause';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

function Logs() {
    const navigate = useNavigate()
    const location = useLocation()
    let [status, setStatus] = useState({
        initialize: "default",
        continuousIntegration: "default",
        releaseAutomationTest: "default",
        testAutomation: "default"

    })
    let getIcon = {
        success: <IconButton><CheckCircleOutlineIcon color="success" /></IconButton>,
        running: <CircularProgress size={20} />,
        pending: <IconButton><PauseIcon color="success" /></IconButton>,
        failed: <IconButton><CancelOutlinedIcon color="error" /></IconButton>,
        created: <IconButton> <HourglassBottomIcon color="success" /></IconButton>,
        default: <CircularProgress size={20} />,
        deploy: <KeyboardDoubleArrowRightIcon color="success" />
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
        if (listOfAllStatus.some(s => s == "running") || listOfAllStatus.some(s => s == "pending") || listOfAllStatus.some(s => s == "default")) {
            setTimeout(() => {
                getGitData(setStatus, releaseId, historyId, projectId)
            }, 1000);

        }
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
                            avatar={getIcon[status.releaseAutomationTest ?? "default"]}
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
