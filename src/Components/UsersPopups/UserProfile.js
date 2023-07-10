import { Button, Divider, Grid, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import useHead from '../../hooks/useHead';
import { UpdateUser } from '../../Services/UserService';
import { validateFormbyName } from '../../CustomComponent/FormValidation';
import SnackbarNotify from '../../CustomComponent/SnackbarNotify';
import { uploadPic } from '../../Services/UserService';
import { getPhoto } from '../../Services/UserService';

let userData = {
    user_id: "",
    firstName: "",
    lastName: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    email: "",
    ssoid: "",
    token: ""
}

let errormsg = ""
let successmsg = ""
function UserProfile() {
    let [currentPassword, setCurrentPassword] = useState('')
    let [newPassword, setnewPassword] = useState('')
    let [confirmPassword, setconfirmPassword] = useState('')
    let [showPassword, setShowPassword] = useState("")
    let [snackbarerror, setSnackbarerror] = useState(false);
    let [snackbarsuccess, setSnackbarsuccess] = useState(false);
    let [imageUrl, setImageUrl] = useState("");
    const { auth } = useAuth();
    const fileInputRef = useRef(null);
    const { setHeader } = useHead();
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleFileInputChange = (event) => {

        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('file', file);
        uploadPic(auth.userId, formData, auth.token).then(res => {
            if (res) {
                successmsg = "Profile Picture update"
                setSnackbarsuccess(true)
                getPhoto(setImageUrl, auth.userId, auth.token)
            }
        })
        if (file.size > 2 * 1024 * 1024) {
        }
    };
    function handleSubmit() {
        if (validateFormbyName(["current", "confirm", "new"], "error")) {
            if (userData.confirm_password == userData.new_password) {
                UpdateUser(userData).then(res => {
                    if (res) {
                        setCurrentPassword('')
                        setnewPassword('')
                        setconfirmPassword('')
                        successmsg = "Password changed successfully"
                        setSnackbarsuccess(true)
                    }
                    else {
                        errormsg = "Something went wrong"
                        setSnackbarerror(true)

                    }
                })
            }
            else {
                errormsg = "Confirm password should be same"
                setSnackbarerror(true)

            }
        }
    }

    useEffect(() => {
        getPhoto(setImageUrl, auth.userId, auth.token)
        setHeader((ps) => {
            return {
                name: "User Profile",
            };
        });
        return () => {
            userData.confirm_password = ""
            userData.new_password = ""
            userData.current_password = ""

        }
    }, []);


    useEffect(() => {
        userData.email = auth.info.email
        userData.user_id = auth.userId
        userData.firstName = auth.info.firstName
        userData.lastName = auth.info.lastName
        userData.token = auth.token
        userData.ssoid = auth.info.ssoId
    }, [])



    return (
        <div style={{ padding: "40px" }} >
            <SnackbarNotify
                open={snackbarerror}
                close={setSnackbarerror}
                msg={errormsg}
                severity="error"
            />
            <SnackbarNotify
                open={snackbarsuccess}
                close={setSnackbarsuccess}
                msg={successmsg}
                severity="success"
            />
            <Grid container spacing={2} justifyContent="center" >
                <Grid item md={4}>
                    <h4
                        style={{ color: "rgb(0, 159, 238)" }}
                    >Profile</h4>
                    <h5>Primary Info</h5>
                </Grid>
                <Grid container md={6} alignItems='center' >

                    <Grid item md={2}>
                        <input type="file"
                            ref={fileInputRef}
                            accept="image/png, image/gif, image/jpeg"
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                        />

                        {imageUrl != "" && <img src={imageUrl} onClick={handleUploadClick} alt="Array of Bytes" width="60" height="60" style={{ borderRadius: "50%" }} />}
                        {imageUrl == "" && <img src="profile.jpg" alt="Array of Bytes" width="60" height="60" style={{ borderRadius: "50%" }} onClick={handleUploadClick} />}
                    </Grid>
                    <Grid item md={7}>
                        <label >Email Address</label>
                        <TextField id="standard-basic" label="" variant="standard" fullWidth
                            defaultValue={auth.info.email}
                            disabled

                        />
                    </Grid>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item md={7}>
                        <label >User Id</label>

                        <TextField id="standard-basic" label="" variant="standard" fullWidth
                            defaultValue={auth.user}
                            disabled
                        />
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Divider></Divider>
            <br />
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={4}>
                    <h4
                        style={{ color: "rgb(0, 159, 238)" }}
                    >Password</h4>
                    <h5>Update Your Password</h5>
                </Grid>
                <Grid container md={6} alignItems='center' spacing={2}>

                    <Grid item md={9}>
                        <label >Current Password</label>
                        <input type={showPassword == "current" ? "text" : "password"}
                            value={currentPassword}
                            onChange={e => {
                                userData.current_password = e.target.value;
                                setCurrentPassword(e.target.value)
                            }}
                            name="current" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                            sx={{ marginTop: "20px" }}
                            onMouseDown={e => {
                                setShowPassword("current")
                            }}
                            onMouseUp={e => {
                                setShowPassword("")
                            }
                            }
                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={9}>
                        <label >New Password</label>
                        <input type={showPassword == "new" ? "text" : "password"}
                            value={newPassword}
                            onChange={e => {
                                userData.new_password = e.target.value;
                                setnewPassword(e.target.value)
                            }}
                            name="new" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                            sx={{ marginTop: "20px" }}
                            onMouseDown={e => {
                                setShowPassword("new")
                            }}
                            onMouseUp={e => {
                                setShowPassword("")
                            }
                            }

                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={9}>
                        <label >Confirm Password</label>
                        <input type={showPassword == "confirm" ? "text" : "password"}
                            value={confirmPassword}
                            onChange={e => {
                                userData.confirm_password = e.target.value;
                                setconfirmPassword(e.target.value);
                            }}
                            name="confirm" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                            sx={{ marginTop: "20px" }}
                            onMouseDown={e => {
                                setShowPassword("confirm")
                            }}
                            onMouseUp={e => {
                                setShowPassword("")
                            }
                            }
                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={9}>
                        <Button variant='contained' onClick={handleSubmit}>Update</Button>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Divider></Divider>
            <br />
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={4}>
                    <h4
                        style={{ color: "rgb(0, 159, 238)" }}
                    >Organization</h4>

                </Grid>
                <Grid item md={6}>
                    <h4  className='userinfodata'>Company</h4>
                    <label className='userinfodata'>Prolifics</label>
                    <h4  className='userinfodata'>Phone</h4>
                    <label className='userinfodata'>987654321</label>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfile
