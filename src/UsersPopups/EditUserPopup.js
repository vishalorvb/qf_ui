import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useAuth from "../hooks/useAuth";
import axios from 'axios';
import { baseUrl } from '../Environment';
import useAxios from '../hooks/useAxios';

function EditUserPopup(props) {
    const [fname, setFname] = useState(props.object.firstName);
    const [lname, setLname] = useState(props.object.lastName);
    const [email, setEmail] = useState(props.object.email);
    const [password, setPassword] = useState(props.object.password);
    const [roleId, setRoleId] = useState(props.object.role);
    const {auth} = useAuth();
    // const token  = localStorage.getItem("token");
    const loggedInId = auth.info.id;
    const values = {
        uid: props.object.ssoId,
        id: props.object.id,
    }
    console.log(props.object);
    const { openEdit, setOpenEdit, getUsers, setEditSuccessMsg } = props;
    const axiosPrivate = useAxios();

    const handleClose = () => {
        setOpenEdit(false);
        setFname("");
        setLname("");
        setEmail("");
        setPassword("Password");
    };

    const submit = (e) => {
        var data = {
            "ssoId" : values.uid,
            "password" : password,
            "firstName" : fname,
            "lastName" : lname,
            "email" : email,
            "role" : roleId,
            "id" : values.id,
            "current_user_id" : loggedInId
        }

        axiosPrivate.post(baseUrl + `/qfauthservice/user/updateUser`, data).then(res => {
            console.log(res.data.info);
            setEditSuccessMsg(true);
            getUsers();
            setTimeout(() => {
                setEditSuccessMsg(false)
            }, 2000);
        })
        handleClose();
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
                                        <input value={fname} onChange={(e) => { setFname(e.target.value) }}  placeholder="Enter First Name"
                                        ></input>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Last Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={8} sm={6} md={8}>
                                        <input value={lname} onChange={(e) => { setLname(e.target.value) }}  placeholder="Enter Last Name"
                                        ></input>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Email <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                        <input name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email"
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
                                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter atleast 8 Characters" />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Role <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                    <select name="selectList" id="selectList" onChange={(e) => setRoleId(e.target.value)}>
                                            <option value="0">Select Role...</option>
                                            <option selected = {roleId == 1?true : false} value="1">AUTOMATION ENGINEER</option>
                                            <option selected = {roleId == 2?true : false} value="2">ADMIN</option>
                                            <option selected = {roleId == 3?true : false} value="3">DBA</option>
                                            <option selected = {roleId == 4?true : false} value="4">AUTOMATION MANAGER</option>
                                        </select>
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