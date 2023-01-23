import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios';
import { Autocomplete, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function AddUserPopup(props) {

    const { open, setOpen, users} = props;

    let first_name = useRef();
    let last_name = useRef();
    let email = useRef();
    let password = useRef();
    let uid = useRef();
    let roleId = useRef();
    const [roleObject, setRoleObject] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const getUserRoles = () => {
        // axios
        //     .get(baseUrl + `/OrganisationMS/Users/getAllRoles`)
        //     .then((Response) => {
        //         var response = Response.data;
        //         setRoleObject(response);
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     });
    };

    useEffect(() => {
        getUserRoles();
    }, []);

    const submit = (e) => {
    }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <DialogTitle id="alert-dialog-title" className="dialogTitle border-bottom" sx={{
                padding: 0.5,
                backgroundColor: "rgba(137,196,244,1)",
            }}>
                <Grid container direction="row" justify="space-between" alignItems="center" className="poptitle">
                    <Typography sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }} variant="inherit">Add User </Typography>
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
                                    <Grid item xs={6} sm={6} md={3}><label>First Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> 
                                    <input type="text" ref={first_name} name="" placeholder="Enter First Name" />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                                    <Grid item xs={6} sm={6} md={3}><label>Last Name <span className="importantfield" >*</span>:</label></Grid>
                                    <Grid item xs={6} sm={6} md={8}> <input type="text" ref={last_name} name="" placeholder="Enter Last Name" /></Grid>
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
                                                <input type="text" name="roleAutocomplete" {...params.inputProps} placeholder="Enter atleast 3 letters" />
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
            <DialogActions style={{ marginTop: "1px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}>
                <Button variant="contained" onClick={submit} startIcon={<SaveOutlinedIcon />}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
  )
}

export default AddUserPopup