import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function DeleteUserPopup(props) {

    const { openDelete, setOpenDelete,object } = props;
    const user = object.fname + " " + object.lname;
    const UserId = object.sid;

    const handleClose = () => {
        setOpenDelete(false);
    };

    const submit = () => {

    }
  return (
    <div>
        <Dialog open={openDelete} onClose={handleClose} style={{ marginLeft: "15px", marginTop: "20px" }}>
                <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                    padding: 0.5,
                    backgroundColor: "rgba(137,196,244,1)",
                }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                        <Typography sx={{ marginLeft: 1 }} variant="inherit">Delete Users </Typography>
                        <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose} className="btn-close ">
                            <ClearOutlinedIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent className="DeleteUsers" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}>
                    <div>
                        <form>
                            <div>
                                <span>Are you sure you want to delete User {user}</span>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" onClick={submit} startIcon={<DeleteOutlineOutlinedIcon />}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}

export default DeleteUserPopup