import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import useHead from '../hooks/useHead';
import useAuth from '../hooks/useAuth';
import SnackbarNotify from '../CustomComponent/SnackbarNotify';
import { useNavigate } from "react-router-dom";


let initialval = {
    organization_id: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
};

export let postVal = { ...initialval };
const UpdateOrganization = () => {
    const { setHeader } = useHead();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [addSuccessMsg, setAddSuccessMsg] = useState(false);
    const [addFailMsg, setAddFailMsg] = useState(false);

    function onSubmitHandler() {
        console.log(postVal)
        try {
            axios({
                method: 'post',
                url: `/qfuserservice/user/updateorgdetails?firstName=${postVal.firstName}&lastName=${postVal.lastName}&organizationName=${postVal.company}&adminEmail=${postVal.email}&phoneNumber=${postVal.phone}&orgId=${postVal.organization_id}`,
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            }).then(res => {
                if (res.data.message == "Organization details updated successfully.") {
                    setAddSuccessMsg(true);
                    setTimeout(() => {
                      setAddSuccessMsg(false);
                     navigate(-1)
                    }, 2000);
                }
                else{
                    setAddFailMsg(true);
                    setTimeout(() => {
                        setAddFailMsg(false);
                    }, 3000);
                }
            })
        } catch (error) {
            console.error(error); // handle error
        }
    };



    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Update Organization",
            };
        });

        return () => {
            postVal = { ...initialval }
        }
    }, []);


    return (
        <>
            <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                <Grid item md={4}>
                    <Stack spacing={0.5}>
                        <label>
                            first Name
                            <span className="importantfield">*</span></label>
                        <input
                            fullWidth
                            defaultValue={postVal.firstName}
                            size="small"
                            onChange={(e) => { postVal.firstName = e.target.value }}
                        />
                    </Stack>
                </Grid>
                <Grid item md={4}>
                    <Stack spacing={0.5}>
                        <label>
                            last Name
                            <span className="importantfield">*</span>
                        </label>
                        <input
                            fullWidth
                            size="small"
                            defaultValue={postVal.lastName}
                            onChange={(e) => { postVal.lastName = e.target.value }}

                        />
                    </Stack>
                </Grid>
                <Grid item md={4}>
                    <Stack spacing={0.5}>
                        <label>
                            Organization Name<span className="importantfield">*</span>
                        </label>
                        <input
                            defaultValue={postVal.company}
                            fullWidth
                            size="small"
                            onChange={(e) => { postVal.company = e.target.value }}

                        />
                    </Stack>
                </Grid>
                <Grid item md={4}>
                    <Stack spacing={0.5}>
                        <label>
                            Admin Email<span className="importantfield">*</span>
                        </label>
                        <input
                            fullWidth
                            size="small"
                            defaultValue={postVal.email}
                            onChange={(e) => { postVal.email = e.target.value }}

                        />
                    </Stack>
                </Grid>
                <Grid item md={4}>
                    <Stack spacing={0.5}>
                        <label>
                            Phone Number
                            <span className="importantfield">*</span></label>
                        <input
                            type='number'
                            defaultValue={postVal.phone}
                            fullWidth
                            size="small"
                            onChange={(e) => { postVal.phone = e.target.value }}

                        />
                    </Stack>
                </Grid>

            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center" mt={2}>
                <Grid item md={1.5}>
                    <Button fullWidth variant="contained" type="submit" style={{ backgroundColor: "#009fee" }}
                        onClick={onSubmitHandler}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
            <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg=" updated successfully."
        severity="success"
      />
      <SnackbarNotify
        open={addFailMsg}
        close={setAddFailMsg}
        msg="Organization name is already exist. Please choose another name.."
        severity="error"
      />
        </>
    )
}

export default UpdateOrganization