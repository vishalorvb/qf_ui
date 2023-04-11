
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Divider, Grid, Typography } from '@mui/material'
import axios from "../../api/axios";
import TextField from '@mui/material/TextField';


let initialValue = {
    id: 0,
    name: "",
    description: "",
    base_url: "",
    module_id: "",
    project_id: "",
    is_default: false,
    runtime_variables: ""
}
let postVal = { ...initialValue };

function AddEnvironmentPop(props) {

    const { addEnvironmentPop, close , getBuilEnvironment} = props;
    const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
    const [reportFailMsg, setReportFailMsg] = useState(false);
    


    const handleClose = () => {
        close(false);
    };

    const onSubmitHandler = (params) => { {
 
    
//   postVal.project_id=projectId;
    
   postVal.base_url="";
   postVal.module_id=76;
   postVal.project_id=79;
   postVal.url="";
  axios.post(`/qfservice/CreateBuildEnvironment`, postVal)
  .then((resp) => {
    
    if ( resp?.data?.message === "Successfully createdBuild Environment") {
        setReportSuccessMsg(true);
        getBuilEnvironment();
        setTimeout(() => {
            setReportSuccessMsg(false);
        }, 3000);
  handleClose()
    }
    else {
        setReportFailMsg(true);
        setTimeout(() => {
            setReportFailMsg(false);
        }, 3000);
  handleClose()

    }
    
   });
    
     }
    
    };
    
    return (
        <>
        <Dialog open={addEnvironmentPop} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="dialogTitle">Add Environment</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} justifyContent="flex-start" justifyItems="center" sx={{ marginTop: "5px" }}>
                    <Grid xs={3} sx={{ marginTop: "15px" }}> Name </Grid>

                    <Grid xs={9}> <TextField
                     size="small"
                      id="outlined-basic"
                       variant="outlined"
                        placeholder="Name"
                         sx={{width:"340px" }}
                         name= "name"
                         onChange={(e) => {postVal.name = e.target.value;}}
                         /></Grid>
                    <Grid xs={3} sx={{ marginTop: "30px" }}> Description </Grid>

                    <Grid xs={9}> <TextField 
                    size="small"
                     id="outlined-basic"
                      variant="outlined" 
                      placeholder="Description"
                       sx={{ marginTop: "15px" ,width:"340px" }}
                       name="description"
                       onChange={(e) => {postVal.description = e.target.value;}}
                        /></Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" type="submit" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                 variant="contained" 
                 type="submit"
                 onClick={onSubmitHandler}
                 >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="Created successfully"
        severity="success"
    />
    <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No Created."
        severity="error"
    />
    </>
    );
}

export default AddEnvironmentPop;
