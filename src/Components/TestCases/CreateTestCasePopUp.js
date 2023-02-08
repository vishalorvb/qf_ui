import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { getWebpages } from '../../Services/ProjectService';
import { getScreen } from '../../Services/ProjectService';


function CreateTestCasePopUp(props) {

    let [webpages,setWebpages] = useState([])
    let [allscreen,setallScreen] = useState([])
    let [screen,setScreen] = useState([])
    

    function handleScreen(e){
        console.log("calling handleScreen")
        console.log(e.target.value)
        let x = allscreen.filter(value =>{
            console.log("inside filter")
            if (value.web_page_id == e.target.value){
                return value
            }
        })
        
        setScreen(x)
    }


    useEffect(() => {
        getWebpages(setWebpages,768)
        getScreen(setallScreen,768)
    
    }, [])
    return (
        <div>
            <Dialog open={props.open} maxWidth='md'>
                <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                    padding: 0.5,
                    backgroundColor: "rgba(137,196,244,1)",
                }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                        <Typography sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }} variant="inherit">Create Test Case </Typography>
                        <IconButton sx={{ marginLeft: "auto" }} className="btn-close " onClick={e => props.setOpen(false)}>
                            <ClearOutlinedIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent className="AddUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                    <div >
                        <form>
                            <div>
                                
                                <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} >
                                <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} spacing={2} >
                                        <Grid item xs={3} sm={3} md={3}>
                                            <label for="">Select Application:</label>
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                                <MenuItem value="1">App 1</MenuItem>
                                                <MenuItem value="2">App 2</MenuItem>
                                                <MenuItem value="3">App 3</MenuItem>

                                            </Select>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3}>
                                        <label for="">Select Page Name:</label>
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                                onChange={handleScreen}
                                            >
                                                {webpages.map(val=><MenuItem value={val.web_page_id}>{val.name}</MenuItem>)}
                                                
                                            </Select>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3}>
                                        <label for="">Select Screen Name:</label>
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                                {screen.map(val=><MenuItem value={val.screen_id}>{val.name}</MenuItem>)}
                                                
                                            </Select>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3}>
                                        <label for="">Test Case Type:</label>
                                            {/* <Select
                                                size='small'
                                              
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                               <MenuItem value="" >web</MenuItem>
                                               <MenuItem value="">api</MenuItem>
                                                
                                            </Select> */}
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                                <MenuItem value="app1">App 1</MenuItem>
                                                <MenuItem value="app2">App 2</MenuItem>
                                                <MenuItem value="app3">App 3</MenuItem>

                                            </Select>
                                        </Grid>
                                    </Grid>
                                <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} spacing={2} >
                                        <Grid item xs={4} sm={4} md={4}>
                                            <label for="">Select Sprint:</label>
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                                <MenuItem value="">Sprint 1</MenuItem>

                                            </Select>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4}>
                                        <label for="">Select Issues:</label>
                                            <Select
                                                size='small'
                                                displayEmpty
                                                inputProps={{ "aria-label": "Without label" }}
                                                fullWidth
                                            >
                                                <MenuItem value="">Option</MenuItem>
                                                
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Test Case Name <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <input type="text" name="" placeholder="Enter test case name" />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} >
                                        <Grid item xs={12} sm={12} md={12}><label>Description <span className="importantfield" >*</span>:</label></Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <textarea rows="3" cols="20"></textarea>
                                        </Grid>
                                    </Grid>
                                 

                                </Container>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" startIcon={<SaveOutlinedIcon />}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default CreateTestCasePopUp
