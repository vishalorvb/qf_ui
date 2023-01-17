import { ExpandMore } from '@mui/icons-material'
import { Collapse, Grid, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'

function ActionOverview(props) {
    console.log(props.project)




    useEffect(() => {
        console.log(props.project)
    }, [props])
    return (
        <div>
            <div >
                <Paper elevation={1} sx={{ marginTop: '10px' }} >
                    <Box sx={{ marginBottom: '10px', backgroundColor: 'primary.main' }}>

                        <Typography sx={{ padding: "10px" }} variant='p' gutterBottom>Project Information</Typography></Box>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Project Name <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}>
                                    <input type="text" name="" value={props.project.project_name} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>Automation Framework Type <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}>
                                    {/* <select style={{ width: "100%", height: "28px" }} >
                                    <option value="">Select</option>
                                   
                                </select> */}
                                    <input type="text" name="" value={props.project.automation_name} disabled />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={2}><label>Description <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={10}>
                                    <input type="text" name="" value={props.project.project_description} disabled />
                                </Grid>
                            </Grid>
                        </Container>
                    </Collapse>
                </Paper>

                <Paper elevation={1} sx={{ marginTop: '10px' }}>
                    <Box sx={{ marginBottom: '10px', backgroundColor: 'primary.main' }}>

                        <Typography variant='p' gutterBottom> Repository </Typography></Box>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
                            <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={2}><label>Git URL <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={10}>
                                    <input type="text" name="" value={props.project.repository_url} disabled />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Git Access Token <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}>
                                    <input type="text" name="" value={props.project.repository_token} disabled />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center' ><label>Branch <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" value={props.project.repository_branch} disabled /></Grid>
                            </Grid>

                        </Container>
                    </Collapse>
                </Paper>

                <Paper elevation={1} sx={{ marginTop: '10px' }}>
                    <Box sx={{ marginBottom: '10px', backgroundColor: 'primary.main' }}>

                        <Typography variant='p' gutterBottom>CICD Pipeline</Typography></Box>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Jenkins URL <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}> <input type="text" name="" value={props.project.jenkins_url} disabled
                                /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>Jenkins Token <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" value={props.project.jenkins_token} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Jenkins UserName <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}><input type="text" name="" value={props.project.jenkins_user_name} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>Jenkins Password <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" disabled /></Grid>
                            </Grid>

                        </Container>
                    </Collapse>
                </Paper>

                <Paper elevation={1} sx={{ marginTop: '10px' }}>
                    <Box sx={{ marginBottom: '10px', backgroundColor: 'primary.main' }}>

                        <Typography variant='p' gutterBottom>Database</Typography></Box>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Database Type <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}> <input type="text" name="" value={props.project.db_type} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>Database Name <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" value={props.project.db_name} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Host Name <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}> <input type="text" name="" value={props.project.db_host} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>DB UserName <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" value={props.project.db_user_name} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid item xs={6} sm={6} md={4}><label>Port Number <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={7}> <input type="text" name="" value={props.project.db_port} disabled /></Grid>
                            </Grid>
                            <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                <Grid container item xs={6} sm={6} md={7} justifyContent='center'><label>DB Password <span className="importantfield" >*</span>:</label></Grid>
                                <Grid item xs={6} sm={6} md={5}> <input type="text" name="" disabled /></Grid>
                            </Grid>

                        </Container>
                    </Collapse>
                </Paper>

                {/* <Paper elevation={1} sx={{ marginTop: '10px' }}>
                <Box sx={{ marginBottom: '10px', backgroundColor: 'primary.main' }}>
                    <ExpandMore
                        expand={collaboration}
                        onClick={() => setCollaboration(!collaboration)}
                        aria-expanded={collaboration}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <Typography variant='p' gutterBottom>Collaboration</Typography></Box>
                <Collapse in={collaboration} timeout="auto" unmountOnExit>
                    <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
                        <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={2}><label>Select Issue Tracker <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={10}> <input ref={issueTracker} type="text" name="" /></Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={2}><label>URL <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={10}><input ref={url} type="text" name="" /></Grid>
                        </Grid>
                        <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={4}><label>User Name <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={7}> <input ref={userName} type="text" name="" /></Grid>
                        </Grid>
                        <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                            <Grid container item xs={6} sm={6} md={7} justifyContent="center"><label>Token <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={5}> <input ref={token} type="text" name="" /></Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }}  >
                            <Grid item xs={6} sm={6} md={2}><label>Projects <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={10}> <input ref={projects} type="text" name="" /></Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} justifyContent="space-around" >
                            <Button size='small' onClick={submitHandler} variant="contained" startIcon={<SaveIcon></SaveIcon>} >Save </Button>
                        </Grid>
                    </Container>
                </Collapse>
            </Paper> */}

            </div>
        </div>
    )
}

export default ActionOverview
