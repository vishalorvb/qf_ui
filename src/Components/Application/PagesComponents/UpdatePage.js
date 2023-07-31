import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Grid } from "@mui/material";
import axios from "../../../api/axios";
import { useRef } from "react";
import useHead from "../../../hooks/useHead";
let initialValue = {
  web_page_id: "",
  page_name: "",
  page_description: "",
};
export let postVal = { ...initialValue };

function UpdatePage(props) {
  const { open, close, callGetPages } = props;
  const { setSnackbarData } = useHead();
  const pageName = useRef();
  const pageDesc = useRef();

  const handleClose = () => {
    close(false);
  };
  const onUpdateHandler = (params) => {
    {
      if (postVal.page_name !== "" && postVal.page_description !== "") {
        pageName.current.value !== ""
          ? pageName.current.classList.remove("error")
          : pageName.current.classList.add("error");
        pageDesc.current.value !== ""
          ? pageDesc.current.classList.remove("error")
          : pageName.current.classList.add("error");
        axios
          .post(
            `/qfservice/webpages/updateWebPage?web_page_id=${postVal.web_page_id}&page_name=${postVal.page_name}&page_description=${postVal.page_description}`
          )
          .then((resp) => {
            setSnackbarData({
              status: true,
              message: resp?.data?.message,
              severity: resp?.data?.status,
            });
            callGetPages();
            handleClose();
          });
      } else {
        pageName.current.value === "" &&
          pageName.current.classList.add("error");
        pageDesc.current.value === "" &&
          pageDesc.current.classList.add("error");
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
        <DialogTitle className="dialogTitle">Edit Page Details</DialogTitle>
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

            <Grid xs={9} sx={{ marginTop: "30px" }}>
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
