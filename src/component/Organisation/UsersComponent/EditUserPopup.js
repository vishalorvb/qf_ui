import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { baseUrl } from './../../../Environment';
import { validateForm, resetClassName } from '../../../FormValidation';

function EditUserPopup(props) {
    const [fname, setFname] = useState(props.object.fname);
    let first_name = useRef();
    const [lname, setLname] = useState(props.object.lname);
    let last_name = useRef();
    const [email, setEmail] = useState(props.object.email);
    let Email = useRef();
    const [password, setPassword] = useState(props.object.password);
    let Password = useRef();
    const { openEdit, setOpenEdit, getUserDetails, setEditSuccessMsg, setValidationMsg } = props;
    const values = {
        uid: props.object.sid
    }

    let emailFields = [Email];
    let requiredOnlyAlphabets = [first_name,last_name];
    let passwordField = [Password];
    
    const handleClose = () => {
        setOpenEdit(false);
        setFname("");
        setLname("");
        setEmail("");
        setPassword("Password");
    };

    const submit = (e) => {
        e.preventDefault();
        if ( validateForm(emailFields,[],passwordField,requiredOnlyAlphabets,[],[], "error")) 
        {
            var data = {
                FirstName: fname,
                LastName: lname,
                Password: password,
                Email: email,
                UserId: values.uid
            }

            axios.put(baseUrl + '/OrganisationMS/Users/editUser', data)
                .then(response => {
                    if (response.data) {
                        setEditSuccessMsg(true);
                        getUserDetails();
                        setTimeout(() => {
                            setEditSuccessMsg(false)
                        }, 2000);
                    }
                })
            handleClose();
            console.log("Valid form");
        }
        else {
            setValidationMsg(true);
            setTimeout(() => {
                setValidationMsg(false)
            }, 2000);
            console.log("Invalid form");
        }
    }

    return (
        <Dialog open={openEdit} onClose={handleClose} style={{ marginLeft: "15px", marginTop: "20px" }} maxWidth='md'>
            <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                padding: 0.5,
                backgroundColor: 'primary.main',
            }}>
                <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                    <Typography sx={{ marginLeft: 1,color:"white" }} variant="inherit">Edit Users </Typography>
                    <IconButton sx={{ marginLeft: "auto"}} onClick={handleClose} className="btn-close ">
                        <ClearIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent className="EditUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                <div>
                    <form>
                        <div onClick={resetClassName}>
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
            <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto", backgroundColor: 'primary.main' }}>
                <Button variant="contained" onClick={submit} startIcon={<EditIcon />}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditUserPopup