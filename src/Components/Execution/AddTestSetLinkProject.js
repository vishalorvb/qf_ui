
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextareaAutosize,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Divider, Grid, Typography } from '@mui/material'
import axios from "axios";
import TextField from '@mui/material/TextField';


let initialValue = {
    testset_id:0 ,
    testset_name: "",
    testset_desc: "",
    module_id: "",
    runtime_variables: "",
    testset_command:"",
    project_id:""
}
export let postVal = { ...initialValue };

function AddTestSetLinkProject(props) {

    const { open, close , getBuilEnvironment,projectId,applicationId,testsetEditData,setTestsetEditData} = props;
    const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
    const [reportFailMsg, setReportFailMsg] = useState(false);

    const handleClose = () => {
        close(false);
    };
// console.log(testsetEditData?.length)
// console.log(testsetEditData)

setTestsetEditData("")

    const onSubmitHandler = (params) => { {
   postVal.module_id=applicationId;
   postVal.project_id=projectId;
   console.log(postVal)
  axios.post(`http://10.11.12.243:8083/qfservice/CreateLinkTestset`, postVal)
  .then((resp) => {
   console.log(resp)
    if ( resp?.data?.status === "SUCCESS") {
        setReportSuccessMsg(true);
        setTimeout(() => {
            setReportSuccessMsg(false);
            getBuilEnvironment();
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
    useEffect(() => {
      
    
      return () => {
        postVal = { ...initialValue }
        console.log("clean up")
      }
    }, [])
    
    
    return (
        <>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle className="dialogTitle">Add Environment</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} justifyContent="flex-start" justifyItems="center" sx={{ marginTop: "5px" }}>
                    <Grid xs={3} sx={{ marginTop: "15px" }}> Name </Grid>

                    <Grid xs={9}> <TextField
                     size="small"
                      id="outlined-basic"
                       variant="outlined"
                        placeholder="testset_name"
                         sx={{width:500 }}
                         name= "testset_name"
                         defaultValue={postVal.testset_name}
                         onChange={(e) => {postVal.testset_name = e.target.value}}
                         /></Grid>
                    <Grid xs={3} sx={{ marginTop: "30px" }}> Description </Grid>

                    <Grid xs={9}> <TextField 
                    size="small"
                     id="outlined-basic"
                      variant="outlined" 
                      placeholder="Description"
                      defaultValue={postVal.testset_desc}
                       sx={{ marginTop: "15px" ,width: 500 }}
                       name="testset_desc"
                       onChange={(e) => {postVal.testset_desc = e.target.value}}
                        /></Grid>
                    <Grid xs={3} sx={{ marginTop: "30px" }}> Command </Grid>
                    <Grid xs={9}>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        // defaultValue={command}
                        // placeholder="{key:value}"
                        name="testset_command"
                        style={{ width: 500 , height:300, marginTop:"10px", padding:"10px"}}
                        onChange={(e)=> {postVal.testset_command = e.target.value}}
                    />
                    </Grid>
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

export default AddTestSetLinkProject
