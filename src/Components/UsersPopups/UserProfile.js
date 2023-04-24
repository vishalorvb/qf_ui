import { Divider, Grid } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
function UserProfile() {

    let [currentPassword, setCurrentPassword] = useState(true)
    let [newPassword, setnewPassword] = useState(true)
    let [confirmPassword, setconfirmPassword] = useState(true)
    const { auth } = useAuth();


    return (
        <div style={{ padding: "40px" }} >
            <Grid container spacing={2} justifyContent="center" >
                <Grid item md={4}>
                    <h4>Profile</h4>
                    <h5>Primary Info</h5>
                </Grid>
                <Grid container md={6} alignItems='center' >
                    <Grid item md={2}>
                        <IconButton>
                            <AccountCircleRoundedIcon fontSize="large"></AccountCircleRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={7}>
                        <label >Email Address</label>
                        <input
                        defaultValue={auth.info.email}
                         type="text" name="email" />
                    </Grid>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item md={2}>

                    </Grid>

                    <Grid item md={7}>
                        <label >User Id</label>
                        <input 
                        defaultValue={auth.user}
                        type="text" name="" />
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Divider></Divider>
            <br />
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={4}>
                    <h4>Password</h4>
                    <h5>Update Your Password</h5>
                </Grid>
                <Grid container md={6} alignItems='center' spacing={2}>

                    <Grid item md={9}>
                        <label >Current Password</label>
                        <input type={currentPassword ? "password" : "text"} name="current" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                            onMouseDown={e => {
                                setCurrentPassword(false)
                            }}
                            onMouseUp={e => {
                                setCurrentPassword(true)
                            }
                            }
                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={9}>
                        <label >New Password</label>
                        <input type={newPassword ? "password" : "text"} name="new" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                         onMouseDown={e => {
                            setnewPassword(false)
                        }}
                        onMouseUp={e => {
                            setnewPassword(true)
                        }
                        }
                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                    <Grid item md={9}>
                        <label >Confirm Password</label>
                        <input type={confirmPassword ? "password" : "text"} name="confirm" />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton
                            onMouseDown={e => {
                                setconfirmPassword(false)
                            }}
                            onMouseUp={e => {
                                setconfirmPassword(true)
                            }
                            }
                        >
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Divider></Divider>
            <br />
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={4}>
                    <h4>Organization</h4>

                </Grid>
                <Grid item md={6}>
                    <label >Company</label>
                    <h4>Prolifics</h4>
                    <label >Phone</label>
                    <h4>987654321</h4>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfile
