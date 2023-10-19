import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios';
import { Autocomplete, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
function TestsetPopup(props) {
    const { open, setOpen, users} = props;

    let first_name = useRef();
    let last_name = useRef();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // getUserRoles();
    }, []);

    const submit = (e) => {

    }

  return (
    <div>
        <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                padding: 0.5,
                backgroundColor: "rgba(137,196,244,1)",
            }}>
                <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                    <Typography sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }} variant="inherit">Add Testset </Typography>
                    <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose} className="btn-close ">
                        <ClearOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent className="AddUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                <div >
                    <form>
                        <div>
                            <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }} >
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Testset Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> 
                                    <input type="text" ref={first_name} name="" placeholder="Enter First Name" />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Testset Description <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> <input type="text" ref={last_name} name="" placeholder="Enter Last Name" /></Grid>
                                </Grid>
                            </Container>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                <Button variant="contained" onClick={submit} startIcon={<SaveOutlinedIcon />}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default TestsetPopup