import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function EditUserPopup(props) {
    const [fname, setFname] = useState(props.object.firstName);
    let first_name = useRef();
    const [lname, setLname] = useState(props.object.lastName);
    let last_name = useRef();
    const [email, setEmail] = useState(props.object.email);
    let Email = useRef();
    const [password, setPassword] = useState(props.object.password);
    let Password = useRef();
    const values = {
        uid: props.object.ssoId
    }

    const { openEdit, setOpenEdit } = props;

    const handleClose = () => {
        setOpenEdit(false);
        setFname("");
        setLname("");
        setEmail("");
        setPassword("Password");
    };

    const submit = (e) => {

    }

  return (
    <div>
        <Dialog open={openEdit} onClose={handleClose} style={{ marginLeft: "15px", marginTop: "20px" }} maxWidth='md'>
            <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                padding: 0.5,
                backgroundColor: "rgba(137,196,244,1)",
            }}>
                <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                    <Typography sx={{ marginLeft: 1 }} variant="inherit">Edit Users </Typography>
                    <IconButton sx={{ marginLeft: "auto"}} onClick={handleClose} className="btn-close ">
                        <ClearOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent className="EditUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                <div>
                    <form>
                        <div>
                            <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }} >
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>First Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={8} sm={6} md={8}>
                                        <input value={fname} onChange={(e) => { setFname(e.target.value) }} ref={first_name} placeholder="Enter First Name"
                                        ></input>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Last Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={8} sm={6} md={8}>
                                        <input value={lname} onChange={(e) => { setLname(e.target.value) }} ref={last_name} placeholder="Enter Last Name"
                                        ></input>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Email <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                        <input name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} ref={Email} placeholder="Enter Email"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>User Id <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                        <Tooltip title="Non Editable">
                                            <input
                                                value={values.uid} readOnly="readonly" style={{ color: "grey" }}
                                            />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Password <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} ref={Password} placeholder="Enter atleast 8 Characters" />
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                <Button variant="contained" onClick={submit} startIcon={<EditOutlinedIcon />}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default EditUserPopup