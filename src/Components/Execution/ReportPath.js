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
import axios from "../../api/axios";
import TextField from '@mui/material/TextField';


let initialValue = {
    testset_id:"" ,
    testset_name: "",
    testset_desc: "",
    module_id: "",
    runtime_variables: "",
    testset_command:""
}
export let postVal = { ...initialValue };

function ReportPath(props) {

    const { open, close , getBuilEnvironment,projectId,applicationId,testsetEditData,setTestsetEditData} = props;
    const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
    const [reportFailMsg, setReportFailMsg] = useState(false);

    const handleClose = () => {
        close(false);
    };




    const onSubmitHandler = (params) => { {
//    postVal.module_id=applicationId;
   console.log(postVal)
//   axios.post(`/qfservice/CreateLinkTestset?project_id=${projectId}`, postVal)
  .then((resp) => {
   console.log(resp)
//     if ( resp?.data?.message === "Successfully createdBuild Environment") {
//         setReportSuccessMsg(true);
//         setTimeout(() => {
//             setReportSuccessMsg(false);
//             getBuilEnvironment();
//         }, 3000);
//   handleClose()
//     }
//     else {
//         setReportFailMsg(true);
//         setTimeout(() => {
//             setReportFailMsg(false);
//         }, 3000);
//   handleClose()

//     }
    
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
            <DialogTitle className="dialogTitle">Report Path</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} justifyContent="flex-start" justifyItems="center" sx={{ marginTop: "15px" }}>
                    <Grid xs={2} sx={{ marginTop: "15px" }}> Report Path: </Grid>

                    <Grid xs={8}> <TextField
                     size="small"
                     fullWidth
                      id="outlined-basic"
                       variant="outlined"
                        placeholder="Report path"
                         name= ""
                         defaultValue={postVal.testset_name}
                         onChange={(e) => {postVal.testset_name = e.target.value}}
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

export default ReportPath
