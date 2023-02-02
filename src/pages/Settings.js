import { Button, Grid, Paper } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useRef, useState } from 'react'
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { validateForm, resetClassName } from '../../../FormValidation';
// import axios from 'axios';
// import SnackbarNotify from '../../SnackbarNotify';
// import Table from '../../Table';

function Settings() {
    let Url = useRef();
    let Uuid = useRef();
    const [uuid, setUuid] = useState('');
    const [url, setUrl] = useState('');
    // const [successMsg, setSuccessMsg] = useState(false);
    // const [validationMsg, setValidationMsg] = useState(false);

    const submit = () => {
        // if (validateForm(requiredFields, "error")) {
            // var data = {
            //     url:url,
            //     uuid:uuid,
            //     organizationId:1
            // }

            // axios.post( baseUrl+'/OrganisationMS/Users/settings', data)
            //     .then(response => {
            //         if (response.data) {
            //             setSuccessMsg(true);
            //             setTimeout(() => {
            //                 setSuccessMsg(false)
            //             }, 2000);
            //         }
            //     })
            //     setUrl("");
            //     setUuid("");
        // }
        // else {
            // setValidationMsg(true);
            // setTimeout(() => {
            //     setValidationMsg(false)
            // }, 2000);
        // }
    }

  return (
    <div>
            <Paper elevation={1} sx={{ padding: '2px', marginTop: "20px", marginBottom: "10px" }}>
                {/* <SnackbarNotify open={successMsg} close={setSuccessMsg} msg="Details are updated Successfully" severity="success" />
                <SnackbarNotify open={validationMsg} close={setValidationMsg} msg="Fill all the required fields" severity="error" /> */}
                {/* <SnackbarNotify open={copyMsg} close={setCopyMsg} msg="Copied" severity="success" /> */}
                <Stack component="div" noValidate spacing={1} sx={{ marginLeft: "15px", marginBottom: "15px" }}>
                    <Grid container item xs={12} sm={8} md={12} sx={{ marginBottom: '5px', marginTop: "10px" }} >
                        <Grid item xs={6} sm={6} md={1}><label>URL <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={10.5}> <input  type="text" name="" value={url}
                            onChange={(e) => setUrl(e.target.value)} />
                        </Grid>
                        {/* <Grid item xs={6} sm={6} md={1} >
                            <Button size='small' variant="contained" onClick={submitCopy} startIcon={<ContentCopyIcon />} sx={{ marginLeft: "2px" }}>
                                Copy
                            </Button>
                        </Grid> */}
                    </Grid>
                    <Grid container item xs={12} sm={8} md={12} sx={{ marginBottom: '10px', marginTop: "5px" }} >
                        <Grid item xs={6} sm={6} md={1}><label>UUID <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={10.5}> <input type="text" name="" value={uuid}
                            onChange={(e) => setUuid(e.target.value)} /></Grid>
                    </Grid>
                </Stack>
                <Button variant="contained" onClick={submit} startIcon={<UpgradeSharpIcon />} sx={{ marginLeft: "45%", marginRight: "auto", marginBottom: "10px" }}>
                    Update
                </Button>
            </Paper>
        </div>
  )
}

export default Settings