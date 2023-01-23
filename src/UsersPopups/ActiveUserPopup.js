import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,IconButton, Typography } from '@mui/material'
import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import axios from 'axios';

function ActiveUserPopup(props) {

    const { openActive, setOpenActive, object } = props;
    const  user  = object.fname+" "+object.lname;

    const handleClose = () => {
        setOpenActive(false);
    };

    const submit = () => {

    }

    return (
        <div className="border" style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Dialog open={openActive} onClose={handleClose} style={{ marginLeft: "15px", marginTop: "20px" }}>
                <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                    padding: 0.5,
                    backgroundColor: "rgba(137,196,244,1)",
                }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                        <Typography sx={{ marginLeft: 1 }} variant="inherit">Activate User </Typography>
                        <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose} className="btn-close ">
                            <ClearOutlinedIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent className="DeleteUsers" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}>
                    <div>
                        <form>
                            <div>
                                <span>Are you sure you want to Activate User {user}</span>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" onClick={submit} startIcon={<PersonOutlineOutlinedIcon />}>
                        Activate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ActiveUserPopup