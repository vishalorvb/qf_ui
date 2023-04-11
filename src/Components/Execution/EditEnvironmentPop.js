import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "../../api/axios";
import TextField from "@mui/material/TextField";

let initialValue = {
  id: "",
  name: "",
  description: "",
  base_url: "",
  module_id: "",
  project_id: "",
  is_default: false,
  runtime_variables: "",
};
let postVal = { ...initialValue };

function EditEnvironmentPop(props) {
  const { row, editEnvironmentPop, close, editEnvironmentData } = props;
  console.log(editEnvironmentData);
  const handleClose = () => {
    close(false);
  };

  const onUpdateHandler = (params) => {
    {
      //   postVal.project_id=projectId;
      console.log(postVal);
      postVal.id = editEnvironmentData.id;
      postVal.base_url = "";
      postVal.module_id = 76;
      postVal.project_id = 79;
      postVal.url = "";
        axios.post(`/qfservice/CreateBuildEnvironment`, postVal)
        .then((resp) => {
          if ( resp?.data?.message === "Successfully createdBuild Environment") {
              // setReportSuccessMsg(true);
              // getBuilEnvironment();
              setTimeout(() => {
                  // setReportSuccessMsg(false);
              }, 3000);
        handleClose()
          }
          else {
              // setReportFailMsg(true);
              setTimeout(() => {
                  // setReportFailMsg(false);
              }, 3000);
        handleClose()

          }

         });
    }
  };

  return (
    <Dialog
      open={editEnvironmentPop}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="dialogTitle">Edit Environment</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          justifyItems="center"
          sx={{ marginTop: "5px" }}
        >
          <Grid xs={3} sx={{ marginTop: "15px" }}>
            {" "}
            Name{" "}
          </Grid>

          <Grid xs={9}>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              name="name"
              defaultValue={editEnvironmentData?.name}
              sx={{ width: "340px" }}
              onChange={(e) => {postVal.name = e.target.value;}}
            ></TextField>
            {/* <input type="text" defaultValue={editEnvironmentData?.name}
                    onChange={e=>{
                        console.log(e.target.value)
                    }}
                    ></input> */}
          </Grid>
          <Grid xs={3} sx={{ marginTop: "30px" }}>
            {" "}
            Description{" "}
          </Grid>

          <Grid xs={9}>
            <TextField
              size="small"
              id="outlined-basic"
              name="description"
              defaultValue={editEnvironmentData?.description}
              variant="outlined"
              sx={{ marginTop: "15px", width: "340px" }}
              onChange={(e) => {
                postVal.description = e.target.value;
              }}
            ></TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" onClick={onUpdateHandler}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEnvironmentPop;
