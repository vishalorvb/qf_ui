import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useAxios from "../../hooks/useAxios";
import { userservice } from "../../Environment";
import axios from "axios";

function DeleteUserPopup(props) {
  const {
    openDelete,
    setOpenDelete,
    object,
    loggedInId,
    getUsers,
    setDelSuccessMsg,
    setDeleteFailMsg,
  } = props;
  const user = object.firstName + " " + object.lastName;
  const UserId = object.id;
  const loggedInUserId = loggedInId;

  const handleClose = () => {
    setOpenDelete(false);
  };

  const submit = () => {
    axios
      .delete(
        `${userservice}/user/deleteUser?current_user_id=${loggedInUserId}&user_id=${UserId}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setDelSuccessMsg(true);
          getUsers();
          setTimeout(() => {
            setDelSuccessMsg(false);
          }, 3000);
        }

        if (res.data.status === "FAIL") {
          setDeleteFailMsg(true);
          setTimeout(() => {
            setDeleteFailMsg(false);
          }, 3000);
        }
      });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        style={{ marginLeft: "15px", marginTop: "20px" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dialogTitle border-bottom"
          sx={{
            padding: 0.5,
            backgroundColor: "rgba(137,196,244,1)",
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="poptitle"
          >
            <Typography sx={{ marginLeft: 1 }} variant="inherit">
              Delete Users{" "}
            </Typography>
            <IconButton
              sx={{ marginLeft: "auto" }}
              onClick={handleClose}
              className="btn-close "
            >
              <ClearOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent
          className="DeleteUsers"
          style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div>
            <form>
              <div>
                <span>Are you sure you want to delete User {user}</span>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={submit}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteUserPopup;
