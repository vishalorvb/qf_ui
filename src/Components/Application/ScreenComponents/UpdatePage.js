import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Grid } from "@mui/material";
import axios from "../../../api/axios";
import useSnackbar from "../../../hooks/useSnackbar";
import { useRef } from "react";

let initialValue = {
  web_page_id: "",
  page_name: "",
  page_description: "",
};
export let postVal = { ...initialValue };

function UpdatePage(props) {
  const { open, close, location, getPages, setPage } = props;
  const { setSnackbarData } = useSnackbar();
  const pageName = useRef();
  const pageDesc = useRef();

  const handleClose = () => {
    close(false);
  };
  const onUpdateHandler = (params) => {
    {
      if(postVal.page_name !== "" && postVal.page_description !== "")
      {
        (pageName.current.value !== "") ?pageName.current.classList.remove("error") : pageName.current.classList.add("error"); 
        (pageDesc.current.value !== "") ? pageDesc.current.classList.remove("error") :  pageName.current.classList.add("error");
       axios
        .post(
          `/qfservice/webpages/updateWebPage?web_page_id=${postVal.web_page_id}&page_name=${postVal.page_name}&page_description=${postVal.page_description}`
        )
        .then((resp) => {
          if (resp?.data?.status === "SUCCESS") {
            setSnackbarData({
              status: true,
              message: "Page updated successfully",
              severity: "success",
            });
            getPages(setPage, location.state.module_id);
            handleClose();
          }
        });
      }
      else{
        (pageName.current.value === "") && pageName.current.classList.add("error"); 
         (pageDesc.current.value === "") && pageDesc.current.classList.add("error"); 
         setSnackbarData({
          status: true,
          message: "Fill required fields",
          severity: "error",
        });
      }
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
            <label>
              Name :<span className="importantfield">*</span>
            </label>
            </Grid>

            <Grid xs={9}>
              <input
                ref={pageName}
                type="text"
                size="small"
                name="pagename"
                defaultValue={postVal?.page_name}
                sx={{ width: "340px" }}
                onChange={(e) => {
                  postVal.page_name = e.target.value;
                }}
              ></input>
            </Grid>
            <Grid xs={3} sx={{ marginTop: "30px" }}>
            <label>
              Description :<span className="importantfield">*</span>
            </label>
            </Grid>

            <Grid xs={9} sx={{ marginTop: "30px" }} >
              <input
                ref={pageDesc}
                type="text"
                size="small"
                name="description"
                defaultValue={postVal?.page_description}
                placeholder="Page description"
                sx={{ marginTop: "15px", width: "340px" }}
                onChange={(e) => {
                  postVal.page_description = e.target.value;
                }}
              ></input>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" onClick={onUpdateHandler}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdatePage;
