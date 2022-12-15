import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,IconButton, Typography} from '@mui/material'
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
import axios from 'axios';
import { baseUrl } from './../../../Environment';

function DeactiveUserPopup(props) {
    const { openDeactive, setOpenDeactive, object, getUserDetails, setDeactSuccessMsg } = props;
    const  user  = object.fname+" "+object.lname;

    const handleClose = () => {
        setOpenDeactive(false);
    };

    const submit = () => {

        var data = {
            UserId:object.sid,
            Status:0
        }

        axios.put(baseUrl+'/OrganisationMS/Users/activateUser', data)
			.then(response => {
                if(response.data)
                {
                    setDeactSuccessMsg(true);
                    getUserDetails();
                    setTimeout(() => {
                        setDeactSuccessMsg(false)
                    }, 2000);
                }
            })
        handleClose();
      }

    return (
        <div className="border" style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Dialog open={openDeactive} onClose={handleClose} style={{ marginLeft: "15px", marginTop: "20px" }}>
                <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                    padding: 0.5,
                    backgroundColor: 'primary.main',
                }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                        <Typography sx={{ marginLeft: 1,color:"white" }} variant="inherit">Deactivate User </Typography>
                        <IconButton sx={{ marginLeft: "auto"}} onClick={handleClose} className="btn-close ">
                            <ClearIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent className="DeleteUsers" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}>
                    <div>
                        <form>
                            <div>
                                <span>Are you sure you want to Deactivate User {user}</span>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" onClick={submit} startIcon={<PersonOffTwoToneIcon />}>
                        Deactivate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeactiveUserPopup