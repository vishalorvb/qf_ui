import { Autocomplete, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { baseUrl } from './../../../Environment';
import { styled } from "@mui/system";
import { StyledTextField } from '../../CustomTextField';
import { validateForm, resetClassName,NumberValidation } from '../../../FormValidation';


function AddUserPopup(props) {

    const { open, setOpen, getUserDetails, setAddSuccessMsg, addErrorMsg, setAddErrorMsg, users, setValidationMsg } = props;
    let first_name = useRef();
    let last_name = useRef();
    let email = useRef();
    let password = useRef();
    let uid = useRef();
    let roleId = useRef();
    const [roleObject, setRoleObject] = useState([]);
    // let roleObject = useRef();

    let emailFields = [email];
    let numberFields = [uid]
    let requiredOnlyAlphabets = [first_name,last_name];
    let passwordField = [password];
    let autoComplete = ["roleAutocomplete"];

    const handleClose = () => {
        setOpen(false);
    };

    const getUserRoles = () => {
        axios
            .get(baseUrl + `/OrganisationMS/Users/getAllRoles`)
            .then((Response) => {
                var response = Response.data;
                setRoleObject(response);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    useEffect(() => {
        getUserRoles();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log("Calling submit")
        if ( validateForm(emailFields,[],passwordField,requiredOnlyAlphabets,numberFields,autoComplete, "error")) 
        {
            console.log(uid);
            if(NumberValidation(uid,4,"error"))
            {
                var data = {
                    ssoId: uid.current.value,
                    FirstName: first_name.current.value,
                    LastName: last_name.current.value,
                    Password: password.current.value,
                    Email: email.current.value,
                    RoleId: roleId.current
                }
        
                users.forEach(element => {
                    if (element.id === uid) {
                        setAddErrorMsg(true);
                        getUserDetails();
                        setTimeout(() => {
                            setAddErrorMsg(false)
                        }, 2000);
                    }
                });
                console.log(addErrorMsg);
                axios.post(baseUrl + '/OrganisationMS/Users/saveUser', data)
                    .then(response => {
                        if (response.data && !addErrorMsg) {
                            setAddSuccessMsg(true);
                            getUserDetails();
                            setTimeout(() => {
                                setAddSuccessMsg(false)
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
        else {
            setValidationMsg(true);
            setTimeout(() => {
                setValidationMsg(false)
            }, 2000);
            console.log("Invalid form");
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                padding: 0.5,
                backgroundColor: 'primary.main',
            }}>
                <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                    <Typography sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto ",color:"white" }} variant="inherit">Add User </Typography>
                    <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose} className="btn-close ">
                        <ClearIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent className="AddUsers" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                <div >
                    <form>
                        <div onClick={resetClassName}>
                            <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }} >
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>First Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> 
                                    <input type="text" ref={first_name} name="" />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Last Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> <input type="text" ref={last_name} name="" /></Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>User Id <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> <input type="text" ref={uid} name="" placeholder="Enter 4 digit number only"/></Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Password <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}><input type="text" ref={password} name="" placeholder="Enter atleast 8 Characters"/></Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Email Id <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> <input name="email" type="text" ref={email} placeholder="Enter Email"/></Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Role  <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}>
                                        <Autocomplete
                                            // ref={roleId}
                                            size="small"
                                            options={roleObject}
                                            onChange={(e, value) => {
                                                roleId.current = value.id
                                            }}
                                            // onSelect={onRoleSelect}
                                            getOptionLabel={(option) => option.type}
                                            noOptionsText={'Role not found'}
                                            renderInput={(params) =>
                                                <div ref={params.InputProps.ref}>
                                                <input type="text" name="roleAutocomplete" {...params.inputProps} placeholder="Please Select" />
                                              </div>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto", backgroundColor: 'primary.main'}}>
                <Button variant="contained" onClick={submit} startIcon={<SaveIcon />}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserPopup
