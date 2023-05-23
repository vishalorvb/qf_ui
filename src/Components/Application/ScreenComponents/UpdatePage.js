import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "../../../api/axios";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { getPages } from "../../../Services/ApplicationService";

let initialValue = {
  web_page_id: "",
  page_name: "",
  page_description: "",
};
export let postVal = { ...initialValue };

function UpdatePage(props) {
  const { open, close ,location,getPages,setPage} = props;
  const [editSuccessMsg,setEditSuccessMsg] = useState(false)
  const handleClose = () => {
    close(false);
  };
console.log(location.state)
  const onUpdateHandler = (params) => {
    {
        axios.post(`/qfservice/webpages/updateWebPage?web_page_id=${postVal.web_page_id}&page_name=${postVal.page_name}&page_description=${postVal.page_description}`)
        .then((resp) => {
        if ( resp?.data?.status === "SUCCESS") { 
              setEditSuccessMsg(true)
             setTimeout(() => {
                setEditSuccessMsg(false)
               getPages(setPage,location.state.module_id)
            getPages()
          }, 3000);
        handleClose()
          }
         else {
           setTimeout(() => {
              }, 3000);
        handleClose()

          }

         });
    }
  };

  // console.log(postVal);

  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="dialogTitle">Update Page</DialogTitle>
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
              defaultValue={postVal?.page_name}
              sx={{ width: "340px" }}
              onChange={(e) => {postVal.page_name = e.target.value;}}
            ></TextField>
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
              defaultValue={postVal?.page_description}
              placeholder="Page description"
              variant="outlined"
              sx={{ marginTop: "15px", width: "340px" }}
              onChange={(e) => {
                postVal.page_description = e.target.value;
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
    <SnackbarNotify
        open={editSuccessMsg}
        close={setEditSuccessMsg}
        msg="Page Updated successfully"
        severity="success"
    />
    </>
  );
}

export default UpdatePage;
