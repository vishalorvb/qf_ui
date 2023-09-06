import { Chip, CircularProgress, Grid } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Logs() {


    let getIcon = {
        pass: <CheckCircleOutlineIcon />,
        fail: <CancelOutlinedIcon />,
        loading: <CircularProgress color="success" size={20} />,
        deploy: <KeyboardDoubleArrowRightIcon />
    }

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
                            avatar={<CheckCircleOutlineIcon />}
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
                            avatar={<CancelOutlinedIcon />}
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
                            avatar={<CircularProgress color="success" size={20} />}
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
                            avatar={getIcon.pass}
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
