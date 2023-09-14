import { Chip, CircularProgress, Grid } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import { getGitData } from '../../Services/DevopsServices';
import { useLocation, useNavigate } from 'react-router-dom';

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
        fail: <CancelOutlinedIcon />,
        false: <CircularProgress color="success" size={20} />,
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
                            avatar={getIcon[status.initialize ?? false]}
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
                            avatar={getIcon[status.continuousIntegration ?? false]}
                            variant="outlined"
                            color="error"
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
                            avatar={getIcon[status.testAutomation ?? false]}
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
                            avatar={getIcon[status.testAutomation ?? false]}
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
